import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactService } from "../../../Service/ContactService";                      
import Spinner from "../../Spinner/spinner";
import DeleteModal from "../DeleteModal/DeleteModal";



const ContactList = ({loggedIn, logIn}) => {
 
  
  // for searching contacts!!
  const [query, setQuery] = useState({
    text: "",
  });

  //state management
  const [state, setState] = useState({
    loading: false,
    contacts: [],
    filteredContacts: [],
  });

  // for delete modal!!
  const [contact, setContact] = useState([])
  const [show, setShow] = useState(false);
  const handleShowModal = (contact) => {
    setShow(true)
    setContact(contact)
  };
  const handleCloseModal = () => setShow(false);
  
  // for deleting contact
  const clickDelete = async (contactId) => {
    try {
      const deletedContact = await ContactService.getContact(contactId);
      const addDeletedContact = await ContactService.addToDeletedContacts(deletedContact.data);
      const response = await ContactService.deleteContact(contactId);
      if (response) {
        getData();
      }
      handleCloseModal();
    } catch (error) {
      console.log("error",error);
    }
  };
  
  // getting the contacts to list!!
  const getData = async () => {
    try {
      setState({
        ...state,
        loading: true,
      });
      const response = await ContactService.getAllContacts();
      setState({
        loading: false,
        contacts: response.data,
        filteredContacts: response.data,
      });
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    getData();
  }, []);


  //for searching contacts!!
  const searchContacts = (e) => {
    setQuery({
      ...query,
      text: e.target.value,
    });
   
    const startWithContacts = state.contacts.filter((contact) => {
      return contact.name
        .toLowerCase()
        .startsWith(e.target.value.toLowerCase());
    });

    const notStartingContacts = state.contacts.filter((contact) => {
      return !contact.name
        .toLowerCase()
        .startsWith(e.target.value.toLowerCase());
    });

    const containsContacts = notStartingContacts.filter((contact) => {
      return contact.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });

    setState({
      ...state,
      filteredContacts: startWithContacts.concat(containsContacts),
    });
  };
  

  const { loading, filteredContacts,contacts } = state;
 
  return (
    <> 
      <section className="contact-search p-3">
      <div className="container">
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="h3 fw-bold">
                Contact Manager{" "}
                <Link to={"/contacts/add"} className="btn btn-primary">
                  <i className="fa fa-plus-circle" /> New
                </Link>
                <Link to={"/contacts/recycle-bin"} className="m-3 btn btn-danger">
                  <i className="fa fa-recycle" /> Recycle Bin
                </Link>
              </p>
              <p className="fst-italic">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                elementum bibendum felis in finibus. Vestibulum a dui justo.
                In hac habitasse platea dictumst. Nulla fermentum ligula a dui
                elementum, eget.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <form className="row">
                <div className="col">
                  <div className="mb-2">
                    <input
                      value={query.text}
                      onChange={searchContacts}
                      name="text"
                      type="text"
                      className="form-control"
                      placeholder="Search Names"
                    />
                    {query.text.length > 0 ? <h4 className="text-success" >{filteredContacts.length} Contacts Found</h4> : ""}
                  </div>
                </div>
                <div className="col">
                  <div className="mb-2"></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    {loading ? (
      <Spinner />
    ) : (<>
      <section>
        <div className="container">
          <div className="row">
            {filteredContacts.length > 0 &&
              filteredContacts.map((contact) => {
                return (
                  <div className="col-md-4 mb-4 " key={contact.id}>
                    <div className="card bg-dark" style={{ width: "18rem" }}>
                      <img
                        src={contact.photo}
                        width="240"
                        height="240"
                        className="align-self-center"
                        alt="..."
                      />
                      <div className="card-body bg-primary">
                        <div className="align-items-center">
                          <div className="my-2">
                            <ul className="list-group">
                              <li className="list-group-item list-group-item-action"key={'h'}>
                                Name:{" "}
                                <span className="fw-bold">
                                  {contact.name}
                                </span>
                              </li>
                              <li className="list-group-item list-group-item-action" key={'hhh'}>
                                Phone:{" "}
                                <span className="fw-bold">
                                  {contact.phone}
                                </span>
                              </li>
                              <li className="list-group-item list-group-item-action" key={'hh'}>
                                Title:{" "}
                                <span className="fw-bold">
                                  {contact.title}
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div className="">
                            <Link
                              to={`/contacts/view/${contact.id}`}
                              className="btn btn-warning me-5 ms-3 mt-3 "
                            >
                              <i className="fa fa-eye" />
                            </Link>
                            <Link
                              to={`/contacts/edit/${contact.id}`}
                              className="btn btn-success me-5 mt-3"
                            >
                              <i className="fa fa-pen" />
                            </Link>
                            <button
                              onClick={() => handleShowModal(contact)}
                              className="btn btn-danger mt-3"
                            >
                              <i className="fa fa-trash" />
                            </button>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  </div>
               );
              })}
          </div>
        </div>
      </section>
      <DeleteModal contact={contact} clickDelete ={clickDelete}
                show={show} handleCloseModal={handleCloseModal} />
      <h3>Total Contacts : {contacts.length}</h3> </>
    )}
    </> 
      
  );
};

export default ContactList;
