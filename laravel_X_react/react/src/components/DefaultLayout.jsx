import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axiosClient from "../axios-client";

export default function DefaultLayout(){

  const {user, token, setUser,setToken} = useStateContext()

  useEffect(()=>{
    axiosClient.get('/user')
    .then(({data})=>{
      setUser(data)
    }

    )
  }, [])

  if (!token){
    return <Navigate to='/login'/>
  }

  const onLogout = (ev) => {
    ev.preventDefault()
    axiosClient.post('/logout')
    .then(()=>{
      setUser({})
      setToken(null)
    })

  }

  return(
    <div id="defaultLayout">
        <aside>
          <Link to="/dashboard">Dashboard</Link>
          <Link to='/users'>Users</Link>
        </aside>

        <div className="content">
          <header>
            <div>Header</div>
            <div>
              {user.name}
              <a href="#" onClick={onLogout} className="btn-logout"> Log Out</a>
            </div>
          </header>
          <main>
            <Outlet/>
          </main>
        </div>
    </div>
  )
}
