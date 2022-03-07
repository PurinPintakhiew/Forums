import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import Bar from './bar';
import './css/logReg.css'; 

function Login(){

    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");

    const [LoginStatus,setLoginStetus] = useState("");

    Axios.defaults.withCredentials = true;

    const login = () => {
        Axios.post("http://localhost:3001/login",{
            email:email,
            pass:pass
        }).then((response) => {
            if(response.data.message){
                setLoginStetus(response.data.message);
                alert(LoginStatus);
            } else {
                setLoginStetus(response.data[0].id);
                window.location.href = '/';
            }
        });
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            if(response.data.loggedIn === true ){
                setLoginStetus(response.data.user[0].name);
            }
        })
    }, [])


    return (
        <div>
            <div><Bar /></div>
            <div className="container">
            <div className="login col-5">
                <h1>Login</h1>

                <label htmlFor="" className="form-label">Email</label>
                <input type="email" name="user_email" className="form-control" placeholder="Enter email"
                    onChange={(e)=>{
                        setEmail(e.target.value);
                    }}/>

                <label htmlFor="" className="form-label">Password</label>
                <input type="password" name="user_pass" className="form-control" placeholder="Enter password"
                    onChange={(e)=>{
                        setPass(e.target.value);
                    }}/>
                
                <button className="btn btn-primary btnR"
                     onClick={login}>
                         login
                </button>
            </div>
        </div>
        </div>
    );
}

export default Login;