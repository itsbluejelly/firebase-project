// IMPORTING NECESSARY FILES
    // IMPORTING MODULES
import React from 'react';
import { database } from "../main";
import { getAuth } from 'firebase/auth';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
    // IMPORTING STYLESHEETS
import '../css/Contacts.css'

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

        // A STATE TO KEEP TRACK OF ALL CONTACTS
    const [contacts, setContacts] = React.useState([]);
        // A STATE TO DETERMINE WHETHER OR NOT TO SHOW OVERLAY
    const [showOverlay, setShowOverlay] = React.useState(false);
        // A STATE TO DETERMINE THE EDITED CONTACT ID
    const [editContactId, setEditContactId] = React.useState(null);

    // A USE EFFECT TO FETCH DATA
    React.useEffect(() => {
        fetchData();
    }, []);

    // A FUNCTION TO FETCH THE DATA AND STORE IT AS CONTACTS
    const fetchData = async () => {
        const dataSnapshot = await getDocs(collection(database, "contacts"));
        setContacts(dataSnapshot.docs.map((item) => ({ ...item.data(), id: item.id })));
    }

    // A FUNBCTION TO GAUGE FORM INPUT
    const handleInputs = (event) => {
        let { name, value } = event.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // A FUNCTION TO SUBMIT FORM INPUT
    const handleSubmit = () => {
        addDoc(collection(database, "contacts"), {
            name: data.name,
            email: data.email,
            number: parseInt(data.number)
        })
            .then(() => {
                alert('Data sent');
                fetchData();
                setShowOverlay(false);
                setData({ name: '', email: '', number: '' });
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    // A FUNCTION TO EDIT A CONTACT
    const handleEdit = (id) => {
        const contactToEdit = contacts.find(contact => contact.id === id);
        setData({ ...contactToEdit });
        setEditContactId(id);
        setShowOverlay(true);
    };

    // A FUNCTION TO UPDATE A CONTACT
    const handleUpdate = () => {
        const dataToUpdate = doc(database, "contacts", editContactId);
        updateDoc(dataToUpdate, { ...data })
            .then(() => {
                alert("Data updated");
                fetchData();
                setShowOverlay(false);
                setData({ name: '', email: '', number: '' });
                setEditContactId(null);
            })
            .catch((err) => {
                alert(err);
            });
    };

    // a function TO DELETE DATA
    const deleteData = (id) => {
        const dataToDelete = doc(database, 'contacts', id);
        deleteDoc(dataToDelete)
            .then(() => {
                alert("Data Deleted");
                fetchData();
            })
            .catch((err) => {
                alert(err);
            });
    }

    return (
        <div className='App1'>
            <div className='title'>
                <h1>CONTACTS</h1>
                <button className="button2" onClick={() => setShowOverlay(true)}>Add Contact</button>
            </div>
            {contacts.map(contact => (
                <div className="contact-container" key={contact.id}>
                    <p>{contact.name}</p>
                    <p>{contact.email}</p>
                    <p>{contact.number}</p>
                    <div className="contact-actions">
                        <button onClick={() => handleEdit(contact.id)}>Edit</button>
                        <button onClick={() => deleteData(contact.id)}>Delete</button>
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
                        <button onClick={handleUpdate}>Update</button>
                    ) : (
                        <button onClick={handleSubmit}>Add</button>
                    )}
                    <button onClick={() => {
                        setShowOverlay(false);
                        setData({ name: '', email: '', number: '' });
                        setEditContactId(null);
                    }}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default Contacts;