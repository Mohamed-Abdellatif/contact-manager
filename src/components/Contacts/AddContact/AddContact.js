import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ContactService } from "../../../Service/ContactService";

const AddContact = () => {
    const navigate = useNavigate()
  const [state, setState] = useState({
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
  })

  const getData  = async () => {
    try{
    const response = await ContactService.getGroups()
    setState({
        ...state, groups : response.data
    })
    }
    catch(error){
        console.log("error")
    }
  }
  useEffect(() => {
    getData();
  }, [state.contact]);

  const updateInput = (e) => {
  setState({
    ...state,
    contact : {...state.contact, [e.target.name] : e.target.value}
  })
  }

  const submitForm = async (e) => {
    e.preventDefault()
    try{
        const response = await ContactService.createContact(state.contact)
        if(response){
            navigate("/contacts/list", {replace : true})
        } 
    }
    catch(error){
        console.log("error")
        navigate("/contacts/add", {replace : false})
    }
  }
  const{contact, groups} = state
  return (
    <>
      <section className="add-contact p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h4 text-success fw-bold">Create Contact</p>
              <p className="fst-italic">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                elementum bibendum felis in finibus. Vestibulum a dui justo. In
                hac habitasse platea dictumst. Nulla fermentum ligula a dui
                elementum, eget.
              </p>
            </div>
          </div>
          <div className="row">
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
                    className="btn btn-success"
                    value="Create"
                  />
                  <Link to={"/contacts/list"} className="btn btn-dark ms-2">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddContact;
