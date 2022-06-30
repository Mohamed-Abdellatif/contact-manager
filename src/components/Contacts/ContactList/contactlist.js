import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactService } from "../../../Service/ContactService";

const ContactList = () => {
  const [query, setQuery] = useState({
    text: "",
  });
  const [state, setState] = useState({
    contacts: [],
    filteredContacts: [],
  });

  const clickDelete = async (contactId) => {
    try {
      const response = await ContactService.deleteContact(contactId);
      if (response) {
        getData();
      }
    } catch (error) {
      console.log("error");
    }
  };

  const getData = async () => {
    try {
      const response = await ContactService.getAllContacts();
      setState({
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

  const searchContacts = (e) => {
    setQuery({
      ...query,
      text: e.target.value,
    });
    const theContacts = state.contacts.filter((contact) => {
      return contact.name
        .toLowerCase()
        .startsWith(e.target.value.toLowerCase());
    });

    setState({
      ...state,
      filteredContacts: theContacts,
    });
  };

  const { contacts, filteredContacts } = state;
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
                    {" "}
                    <div className="mb-2">
                      <input
                        value={query.text}
                        onChange={searchContacts}
                        name="text"
                        type="text"
                        className="form-control"
                        placeholder="Search Names"
                      />
                    </div>
                  </div>
                  <div className="col">
                    {" "}
                    <div className="mb-2"></div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                        height="auto"
                        className="align-self-center"
                        alt="..."
                      />
                      <div className="card-body bg-primary">
                        <div className="align-items-center">
                          <div className="my-2">
                            <ul className="list-group">
                              <li className="list-group-item list-group-item-action">
                                Name:{" "}
                                <span className="fw-bold">{contact.name}</span>
                              </li>
                              <li className="list-group-item list-group-item-action">
                                Phone:{" "}
                                <span className="fw-bold">{contact.phone}</span>
                              </li>
                              <li className="list-group-item list-group-item-action">
                                Title:{" "}
                                <span className="fw-bold">{contact.title}</span>
                              </li>
                            </ul>
                          </div>
                          <div className="">
                            <Link
                              to={`/contacts/view/${contact.id}`}
                              className="btn btn-warning me-5 ms-3"
                            >
                              <i className="fa fa-eye" />
                            </Link>
                            <Link
                              to={`/contacts/edit/${contact.id}`}
                              className="btn btn-success me-5"
                            >
                              <i className="fa fa-pen" />
                            </Link>
                            <button
                              onClick={() => clickDelete(contact.id)}
                              className="btn btn-danger "
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
    </>
  );
};

export default ContactList;
