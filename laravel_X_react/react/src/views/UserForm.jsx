import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axiosClient from "../axios-client"

export default function UserForm(){

  const {id} = useParams()
  const[loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    id: null,
    name: '',
    email:'',
    password:'',
  password_confirmation: ''  })

  if(id){
    useEffect(()=>{
      setLoading(true)
      axiosClient.get(`/users/${id}`)
      .then(({data})=>{
        setLoading(false)
        setUser(data)
      })
      .catch(()=>{
        setLoading(false)
      })
    }, [])
  }


  return(
    <div>
      User Form
    </div>
  )
}
