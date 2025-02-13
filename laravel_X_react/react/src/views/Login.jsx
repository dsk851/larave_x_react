import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import axiosClient from "../axios-client"
import { useStateContext } from "../contexts/ContextProvider"
export default function Login(){

  const emailRef = useRef()
  const passwordRef = useRef()

  const [errors, setErrors] = useState(null);
  const { setUser, setToken } = useStateContext();

  const onSubmit = (ev) =>{
    ev.preventDefault()
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }
    setErrors(null);
    console.log(payload);
    axiosClient.post("/login", payload)
      .then(({ data }) => {
        setUser(data.user)
        setToken(data.token)
      })
      .catch(err => {
        const response = err.response;
        if (response && response.status === 422) {
          if(response.data.errors){
            console.log(response.data.errors);
            setErrors(response.data.errors)
          }else{
            console.log(response.data.message);
            setErrors({
              email: [response.data.message]
            })
          }

        } else {
          console.log('mdr')
        }
      })
  }
    return (
        <div>
          <div className="login-signup-form animated fadeInDown">
            <div className="form">
              <form onSubmit={onSubmit}>
                <h1 className="title">Login into your account</h1>

              {errors && <div className="alert">
                {Object.keys(errors).map(key => (
                  <p key={key}> {errors[key][0]} </p>
                )
                )}
              </div>}

                <input type="email" placeholder="Email" ref={emailRef}/>
                <input type="password" placeholder="Password" ref={passwordRef}/>
                <button className="btn btn-block">Login</button>
                <p className="message">
                  Not Registred ? <Link to='/signup'>Create an account</Link>
                </p>
              </form>
            </div>
          </div>
            Login
        </div>
    )
}

