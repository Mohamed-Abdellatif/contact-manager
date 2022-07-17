import { Link,useNavigate } from "react-router-dom";

const Navbar = ({ loggedIn, logOut }) => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-dark bg-dark navbar-expand-sm ">
        <div className="container">
          <Link to={"/"} className="navbar-brand">
            <i className="fa fa-mobile text-warning" /> Contact{" "}
            <span className="text-warning fw-bold">Manager</span>
          </Link>
          {loggedIn ? (
            <button className="text-light" onClick={()=> logOut()}>Log Out</button>
          ) : (
            <div className="d-flex justify-content-end">
              <button className="text-light" onClick={()=> navigate('/login')}>Login</button>
              <button className="text-light ms-5" onClick={()=> navigate('/register')}>Register</button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
