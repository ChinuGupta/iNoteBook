import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {

    const [credentials,setcredentials]=useState({email:"",password:""});
   
    const navigate = useNavigate();

    const handelSubmit=async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
          });
          const json = await response.json();
          console.log(json);
          if(json.Success){
            //save the auth token and redirect 
            localStorage.setItem("token",json.authtoken);
            props.showAlert("Logedin Successfully","success");
            navigate("/");
          }
          else{
            props.showAlert("invalid crenditials","danger");
          }
        }

    const onChange=(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value}) 
    }

  return (
    <div className='container mt-2'>
      <h3 className='text-center'>Login to start creating more notes with iNotebook</h3>
    <form onSubmit={handelSubmit} autocomplete='off'>
    <div className="mb-3 my-5">
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChange}/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange}/>
    </div>
   
    <button type="submit" className="btn btn-info" >Login</button>
  </form>
  </div>
  )}
