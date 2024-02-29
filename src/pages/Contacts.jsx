// IMPORTING NECESSARY FILES
    // IMPORTING MODULES
import React from 'react';
import { database } from "../main";
import { getAuth } from 'firebase/auth';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
    // IMPORTING STYLESHEETS
import '../css/Contacts.css'
    // IMPORTING COMPONENTS
import {Link} from "react-router-dom"

function Contacts() {
    // ENSURE USER IS AUTHENTICATEDD
    getAuth();
    
    // DEFINING STATES
        // A STATE TO KEEP TRACK OF FORM DATA
    const [data, setData] = React.useState({
        name: '',
        email: '',
        number: ''
    });
        // DEFINING A STATE TO TRACK THE SUCCESS AND LOADING STATES
    const [states, setStates]= React.useState({
        success: '',
        loading: false
    })

        // A STATE TO KEEP TRACK OF ALL CONTACTS
    const [contacts, setContacts] = React.useState([]);
        // A STATE TO DETERMINEReact. WHETHER OR NOT TO SHOW OVERLAY
    const [showOverlay, setShowOverlay] = React.useState(false);
        // A STATE TO DETERMINE THE EDITED CONTACT ID
    const [editContactId, setEditContactId] = React.useState(null);

    // A USE EFFECT TO FETCH DATA
    React.useEffect(() => {fetchData();}, []);

    // A FUNCTION TO FETCH THE DATA AND STORE IT AS CONTACTS
    async function fetchData(){
        setStates(prevState => ({...prevState, loading: true}))

        try{
            const dataSnapshot = await getDocs(collection(database, "contacts"));
            setContacts(dataSnapshot.docs.map((item) => ({ ...item.data(), id: item.id })));
            setStates(prevState => ({...prevState, success: "Contacts fetched successfully"}))
        }catch(error){
            setStates(prevState => ({...prevState, success: ""}))
            console.error(error)
            alert(error.message)
        }finally{
            setStates(prevState => ({...prevState, loading: false}))
        }
    }

    // A FUNCTION TO GAUGE FORM INPUT
    function handleInputs(event){
        let { name, value } = event.target;
        setData(prevData => ({...prevData, [name]: value}));
    }

    // A FUNCTION TO SUBMIT FORM INPUT
    async function handleSubmit(){
        setStates(prevState => ({...prevState, loading: true}))

        try{
            await addDoc(collection(database, "contacts"), {
                name: data.name,
                email: data.email,
                number: parseInt(data.number)
            })

            setStates(prevState => ({...prevState, success: "Contact created successfully"}))
            fetchData();
            setShowOverlay(false);
            setData({ name: '', email: '', number: '' });
        }catch(error){
            setStates(prevState => ({...prevState, success: ""}))
            alert(error.message)
        }finally{
            setStates(prevState => ({...prevState, loading: false}))

        }
    }

    // A FUNCTION TO EDIT A CONTACT
    function handleEdit(id){
        const contactToEdit = contacts.find(contact => contact.id === id);
        setData({ ...contactToEdit });
        setEditContactId(id);
        setShowOverlay(true);
    }

    // A FUNCTION TO UPDATE A CONTACT
    async function handleUpdate(){
        setStates(prevState => ({...prevState, loading: true}))

        try{
            const dataToUpdate = doc(database, "contacts", editContactId)
            await updateDoc(dataToUpdate, { ...data })
            setStates(prevState => ({...prevState, success: "Contact updated successfully"}))
            fetchData();
            setShowOverlay(false);
            setData({ name: '', email: '', number: '' });
            setEditContactId(null);
        }catch(error){
            setStates(prevState => ({...prevState, success: ""}))
            alert(error.message)
        }finally{
            setStates(prevState => ({...prevState, loading: false}))
        }
    }

    // a function TO DELETE DATA
    async function deleteData(id){
        setStates(prevState => ({...prevState, loading: true}))

        try{
            const dataToDelete = doc(database, 'contacts', id);
            await deleteDoc(dataToDelete)
            setStates(prevState => ({...prevState, success: "Contact deleted successfully"}))
            fetchData();
        }catch(error){
            setStates(prevState => ({...prevState, success: ""}))
            alert(error.message)
        }finally{
            setStates(prevState => ({...prevState, loading: false}))
        }
    }

    return (
        <div className='App1'>
            <div className='title'>
                <h1>CONTACTS</h1>
                <button className="button2" disabled={states.loading} onClick={() => setShowOverlay(true)}>Add Contact</button>
            </div>
            
            {contacts.map(contact => (
                <div className="contact-container" key={contact.id}>
                    <p>{contact.name}</p>
                    <p>{contact.email}</p>
                    <p>{contact.number}</p>
                    <div className="contact-actions">
                        <button onClick={() => handleEdit(contact.id)} disabled={states.loading}>Edit</button>
                        <button onClick={() => deleteData(contact.id)} disabled={states.loading}>Delete</button>
                    </div>
                </div>
            ))}

            {showOverlay && (
                <div className="overlay">
                    <input
                        className="input-field"
                        type="text"
                        name='name'
                        placeholder='name'
                        value={data.name}
                        onChange={handleInputs}
                    />

                    <input
                        className="input-field"
                        type="email"
                        name='email'
                        placeholder='email'
                        value={data.email}
                        onChange={handleInputs}
                    />

                    <input
                        className="input-field"
                        type="tel"
                        name='number'
                        placeholder='number'
                        value={data.number}
                        onChange={handleInputs}
                    />

                    {editContactId !== null ? (
                        <button onClick={handleUpdate} disabled={states.loading}>Update</button>
                    ) : (
                        <button onClick={handleSubmit} disabled={states.loading}>Add</button>
                    )}

                    <button onClick={() => {
                        setShowOverlay(false);
                        setData({ name: '', email: '', number: '' });
                        setEditContactId(null);
                    }}>Cancel</button>
                </div>
            )}

        <Link to="/logout">Log out</Link>{" "}
        <Link to="/signout">Sign out</Link>

        {states.loading && <p>Loading...</p>}
        {states.success && <p>{states.success}</p>}
        </div>
    );
}

export default Contacts;