import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ContactService } from "../../../Service/ContactService";
import Spinner from "../../Spinner/spinner";

const EditContact = () => {
  const navigate = useNavigate();
  const { contactId } = useParams();

  const [state, setState] = useState({
    loading: false,
    contact: {
      id: "",
      name: "",
      photo: "",
      phone: "",
      email: "",
      title: "",
      company: "",
      groupId: "",
    },
    groups: [],
  });

  const getData = async () => {
    try {
      setState({
        ...state,
        loading: true,
      });
      const response = await ContactService.getContact(contactId);
      const groupResponse = await ContactService.getGroups();
      setState({
        ...state,
        loading: false,
        contact: response.data,
        groups: groupResponse.data,
      });
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    getData();
  }, [contactId]);

  const updateInput = (e) => {
    setState({
      ...state,
      contact: { ...state.contact, [e.target.name]: e.target.value },
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await ContactService.updateContact(
        state.contact,
        contactId
      );
      if (response) {
        navigate("/contacts/list", { replace: true });
      }
    } catch (error) {
      console.log("error");
      navigate(`/contacts/edit/${contact.id}`);
    }
  };

  const { contact, groups, loading } = state;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="edit-contact p-3">
          <div className="container">
            <div className="row">
              <div className="col">
                <p className="h4 text-primary fw-bold">Edit Contact</p>
                <p className="fst-italic">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  elementum bibendum felis in finibus. Vestibulum a dui justo.
                  In hac habitasse platea dictumst. Nulla fermentum ligula a dui
                  elementum, eget.
                </p>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-md-4">
                <form onSubmit={submitForm}>
                  <div className="mb-2">
                    <input
                      required={true}
                      name="name"
                      value={contact.name}
                      onChange={updateInput}
                      type="text"
                      className="form-control"
                      placeholder="Name"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      required={true}
                      name="photo"
                      value={contact.photo}
                      onChange={updateInput}
                      type="text"
                      className="form-control"
                      placeholder="Photo Url"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      required={true}
                      name="phone"
                      value={contact.phone}
                      onChange={updateInput}
                      type="text"
                      className="form-control"
                      placeholder="Phone"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      required={true}
                      name="email"
                      value={contact.email}
                      onChange={updateInput}
                      type="email"
                      className="form-control"
                      placeholder="Email"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      required={true}
                      name="company"
                      value={contact.company}
                      onChange={updateInput}
                      type="text"
                      className="form-control"
                      placeholder="Company"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      required={true}
                      name="title"
                      value={contact.title}
                      onChange={updateInput}
                      type="text"
                      className="form-control"
                      placeholder="Title"
                    />
                  </div>
                  <div className="mb-2">
                    <select
                      required={true}
                      name="groupId"
                      value={contact.groupId}
                      onChange={updateInput}
                      className="form-control"
                    >
                      <option value="">Select a Group</option>
                      {groups &&
                        groups.map((group) => (
                          <option value={group.id} key={group.id}>
                            {group.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="mb-2">
                    <input
                      type="submit"
                      className="btn btn-primary"
                      value="Edit"
                    />
                    <Link to={"/contacts/list"} className="btn btn-dark ms-2">
                      Cancel
                    </Link>
                  </div>
                </form>
              </div>
              <div className="col-md-6">
                <img src={contact.photo} alt="..." width="310" height="auto" />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default EditContact;
