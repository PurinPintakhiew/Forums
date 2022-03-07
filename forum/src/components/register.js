import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import Bar from './bar';
import './css/logReg.css';
 
function Login(){

    const [userReg,setUserReg] = useState("");
    const [emailReg,setEmailReg] = useState("");
    const [passReg,setPassReg] = useState("");

    Axios.defaults.withCredentials = true;

    const register = () => {
        Axios.post("http://localhost:3001/register",{
            username:userReg,
            email:emailReg,
            pass:passReg
        }).then((response) => { 
            if(response.data.message){
                alert(response.data.message);
            } else if(response.data.completed) {
                alert(response.data.completed);
            } else {
                console.log(response);
            }
        });
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            if(response.data.loggedIn === true ){
                window.location.href = '/';
            }
        })
    }, [])

    return (
        <div>
            <div><Bar /></div>
            <div className="container">
            <div className="register col-5">
                <div className="Reg-header">
                    <h1>Register Access</h1>
                </div>

                <label htmlFor="" className="form-label" >User Name</label>
                <input type="text" name="user_name" className="form-control"  placeholder="Enter username"
                    onChange={(e)=> {
                        setUserReg(e.target.value);
                }} />

                <label htmlFor="" className="form-label">Email address</label>
                <input type="email" name="user_email" className="form-control" placeholder="Enter email"
                    onChange={(e)=> {
                        setEmailReg(e.target.value);
                }} />

                <label htmlFor="" className="form-label">Password</label>
                <input type="password" name="user_pass" className="form-control" placeholder="Enter password"
                    onChange={(e)=>{
                        setPassReg(e.target.value);
                    }}/>
                <button className="btn btn-primary btnR" 
                 onClick={register}>
                     Register
                </button>   
                
            </div>
        </div>
        </div>
    );
}

export default Login;