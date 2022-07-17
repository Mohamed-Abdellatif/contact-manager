import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContactService } from "../../../Service/ContactService";
import Spinner from "../../Spinner/spinner";

const DeletedContacts = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    loading: false,
    contacts: [],
    filteredContacts: [],
  });

  const clickDelete = async (contactId) => {
    try {
      const response = await ContactService.deleteContactFromBin(contactId);
      if (response) {
        getData();
      }
    } catch (error) {
      console.log("error");
    }
  };

  const getData = async () => {
    try {
      setState({
        ...state,
        loading: true,
      });
      const response = await ContactService.getDeletedContacts();
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

  const restoreData = async (contactId) => {
    try {
      const deletedContact = await ContactService.getDeletedContact(contactId);
      const response = await ContactService.createContact(deletedContact.data);
      const deleteContactFromBin = await ContactService.deleteContactFromBin(
        contactId
      );
      if (response) {
        navigate("/contacts/list", { replace: true });
      }
    } catch (error) {
      console.log("error");
      navigate("/contacts/add", { replace: false });
    }
  };
  const { loading, filteredContacts } = state;
  return (
    <>
      <section className="contact-search p-3">
        <div className="container">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3 fw-bold">
                  Recycle Bin
                  <Link to={"/"} className="btn btn-primary m-2">
                    Back
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
          </div>
        </div>
      </section>
      {loading? <Spinner/> :  <section>
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
                            <button
                              onClick={() => restoreData(contact.id)}
                              className="btn btn-success "
                            >
                              Restore
                            </button>
                            <button
                              onClick={() => clickDelete(contact.id)}
                              className="btn btn-danger ms-2"
                            >
                              Permanent Delete
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
      </section>}
    </>
  );
};

export default DeletedContacts;
