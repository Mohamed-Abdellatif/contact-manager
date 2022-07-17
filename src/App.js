
import "./App.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import ContactList from "./components/Contacts/ContactList/contactlist";
import AddContact from "./components/Contacts/AddContact/AddContact";
import EditContact from "./components/Contacts/EditContact/editcontact";
import ViewContact from "./components/Contacts/ViewContact/viewcontact";
import Navbar from "./components/Navbar/NavBar";
import DeletedContacts from "./components/Contacts/DeletedContacts/DeletedContacts";
import { useState } from "react";
import LoginPage from "./components/Contacts/LoginPage/LoginPage";
import Register from "./components/Contacts/Register/Register";


function App() {
  const navigate = useNavigate();

  const [loggedIn,setLoggedIn] = useState(false)

  const logIn = () => {
    setLoggedIn(true);
    navigate('/contacts/list')
  }
  
  const logOut = () => {
    setLoggedIn(false);
    navigate('/login')
  }

  return (
    <>
      <Navbar loggedIn={loggedIn} logOut={logOut}/>
      <Routes>
        <Route path="/contact-manager" element={<Navigate to={"/login"} />} /> 
        <Route path="/contacts/list" element={<ContactList logIn={logIn} loggedIn={loggedIn}/>} />
        <Route path="/contacts/add" element={<AddContact />} />
        <Route path="/contacts/edit/:contactId" element={<EditContact />} />
        <Route path="/contacts/view/:contactId" element={<ViewContact />} />
        <Route path="/contacts/recycle-bin" element={<DeletedContacts />} />
        <Route path="/login" element={<LoginPage logIn={logIn} />} />
        <Route path="/register" element={<Register logIn={logIn}/>} />
      </Routes>
    </>
  );
}

export default App;
