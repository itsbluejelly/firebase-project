// IMPORTING NECESSARY FILES
import { getAuth } from "firebase/auth";
import { Navigate, Outlet } from "react-router-dom";

// EXPORTING A FUNCTION THAT RETURNS AN AUTH LAYOUT
export default function AuthLayout(){
    const {currentUser} = getAuth()

    if(currentUser){
        return <Navigate to={'/home/contacts'}/>
    }

    return <Outlet/>
}