import "./main.css";
import "./util.css";
import { Link } from "react-router-dom";

const LoginPage = ({ logIn }) => {
  return (
    <>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <form className="login100-form validate-form">
              <span className="login100-form-title p-b-26">Welcome</span>
              <span className="login100-form-title p-b-48">
                <i className="zmdi zmdi-font"></i>
              </span>

              <div
                className="wrap-input100 validate-input"
                data-validate="Valid email is: a@b.c"
              >
                Email:
                <input className="input100" type="text" name="email" />
              </div>

              <div
                className="wrap-input100 validate-input"
                data-validate="Enter password"
              >
                <span className="btn-show-pass">
                  <i className="zmdi zmdi-eye"></i>
                </span>
                Password:
                <input className="input100" type="password" name="pass" />
              </div>

              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn"></div>
                  <button
                    className="login100-form-btn"
                    onClick={() => logIn()}
                  >
                    Login
                  </button>
                </div>
              </div>

              <div className="text-center p-t-115">
                <span className="txt1">Don’t have an account?</span>{" "}
                <Link className="txt2" to={'/register'}>
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
