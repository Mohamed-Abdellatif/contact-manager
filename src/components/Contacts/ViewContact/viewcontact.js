import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { ContactService } from "../../../Service/ContactService"

const ViewContact = () => {
    const {contactId} = useParams()
    
    const [state, setState] = useState({
        contact : [],
        
    })

    const getData = async () => {
        try {
          const response = await ContactService.getContact(contactId);
          
          setState({
            contact: response.data,
            
          });
        } catch (error) {
          console.log("error");
        }
      };
      useEffect(() => {
        getData();
      }, [contactId]);
    const { contact} = state
    return <>
    <section className="view-contact-intro p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-warning fw-bold">View Contact</p>
              <p className="fst-italic">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt libero inventore numquam optio commodi? Vel hic
                distinctio iusto quia quae, exercitationem excepturi ea odit,
                doloremque quaerat velit. Impedit, commodi cum.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="view-contact mt-3">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-4">
                  <img
                    src={contact.photo}
                    alt="..."
                    width="310"
                    height="auto"
                  />
                </div>
                <div className="col-md-8">
                  <ul className="list-group">
                    <li className="list-group-item list-group-item-action">
                      Name: <span className="fw-bold">{contact.name}</span>
                    </li>
                    <li className="list-group-item list-group-item-action">
                      Phone: <span className="fw-bold">{contact.phone}</span>
                    </li>
                    <li className="list-group-item list-group-item-action">
                      Email: <span className="fw-bold">{contact.email}</span>
                    </li>
                    <li className="list-group-item list-group-item-action">
                      Company: <span className="fw-bold">{contact.company}</span>
                    </li>
                    <li className="list-group-item list-group-item-action">
                      Title: <span className="fw-bold">{contact.title}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row m-4">
                <div className="col">
                  <Link to={"/"} className="btn btn-warning ms-2">
                    Back
                  </Link>
                </div>
              </div>
            </div>
          </section>
    </>
}

export default ViewContact