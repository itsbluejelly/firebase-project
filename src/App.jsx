// IMPORTING NECESSARY FILES
  // IMPORTING COMPONENTS
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
  // IMPORTING PAGES
import Register from './pages/Signup';
import Signout from './pages/Signout';
import Logout from './pages/Logout';
import Login from './pages/Singin';
import Contacts from './pages/Contacts';
  // IMPORTING LAYOUTS
import AuthLayout from './layouts/AuthLayout';
import HomeLayout from './layouts/HomeLayout';

// CREATING A ROUTER INSTANCE
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route path='' element={<Contacts/>}/>

      <Route path='auth' element={<AuthLayout/>}>
        <Route path='signup' element={<Register />} />
        <Route path='login' element={<Login />} />
      </Route>

      <Route path='home' element={<HomeLayout/>}>
        <Route path='signout' element={<Signout />} />
        <Route path='logout' element={<Logout />} />
        <Route path='contacts' element={<Contacts/>} />
      </Route>
    </Route>
  )
)

// EXPORTING A FUNCTION THAT RETURNS AN APP COMPONENT
const App = () => <RouterProvider router={router}/>
export default App;