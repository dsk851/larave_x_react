import { Link } from "react-router-dom";
import { useRef } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function Signup() {

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const { setUser, setToken } = useStateContext()

  const onSubmit = (ev) => {
    ev.preventDefault()
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }

    axiosClient.post("/signup", payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token)
      })
      .catch( err => {
        const response = err.reponse;
        if(response && response.status === 422){
          console.log(response.data.errors)
        }
      })
  }
    return (
      <div>
        <div className="login-signup-form animated fadeInDown">
          <div className="form">
            <form onSubmit={onSubmit}>
              <h1 className="title">Create an account for free</h1>
              <input type="text" placeholder="Full name" ref={nameRef}/>
              <input type="email" placeholder="Email" ref={emailRef}/>
              <input type="password" placeholder="Password" ref={passwordRef} />
              <input type="password" placeholder="Password Confirmation" ref={passwordConfirmationRef}/>
              <button className="btn btn-block">SIgn up</button>
              <p className="message">
                Not Registred ? <Link to='/login'>Log In</Link>
              </p>
            </form>
          </div>
        </div>
        Login
      </div>
    )
}

