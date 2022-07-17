import "./css/style.css";
import {Link, useNavigate } from "react-router-dom";

const Register = ({logIn}) => {
    const navigate = useNavigate();
  return (
    <div className="main">
      <section className="signup">
        <img src="images/signup-bg.jpg" alt="" />
        <div className="container">
          <div className="signup-content">
            <div id="signup-form" className="signup-form">
              <h2 className="form-title">Create account</h2>
              <div className="form-group">
                <input
                  type="text"
                  className="form-input"
                  name="name"
                  id="name"
                  placeholder="Your Name"
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-input"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-input"
                  name="password"
                  id="password"
                  placeholder="Password"
                />
                <span
                  toggle="#password"
                  className="zmdi zmdi-eye field-icon toggle-password"
                ></span>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-input"
                  name="re_password"
                  id="re_password"
                  placeholder="Repeat your password"
                />
              </div>

              <div className="form-group">
                <button className="form-submit" onClick={()=> logIn()}>Sign up</button>
              </div>
            </div>
            <p className="loginhere">
              Have already an account ?{" "}
              <Link to={'/login'} className="loginhere-link">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
