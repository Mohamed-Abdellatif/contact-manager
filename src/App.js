import logo from './logo.svg';
import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom'
import ContactList from './components/Contacts/ContactList/contactlist';
import AddContact from './components/Contacts/AddContact/AddContact';
import EditContact from './components/Contacts/EditContact/editcontact';
import ViewContact from './components/Contacts/ViewContact/viewcontact';
import Navbar from './components/Navbar/NavBar';


function App() {
  return (
    <>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Navigate to={"/contacts/list"} />} />
      <Route path="/contacts/list" element={<ContactList/>} />
      <Route path="/contacts/add" element={<AddContact/>}/>
      <Route path="/contacts/edit/:contactId" element={<EditContact/>}/>
      <Route path="/contacts/view/:contactId" element={<ViewContact/>}/>
    </Routes>
    </>
  );
}

export default App;
