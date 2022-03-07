import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import './css/bar.css';

function Bar(){

    const [LoginStatus,setLoginStetus] = useState("");
    const [status,setUserStatus] = useState("");
    const [seachName,setSearchname] = useState("");

    Axios.defaults.withCredentials = true;

    const logOut = () => {
        Axios.get("http://localhost:3001/logout").then((res)=>{
                if(res.data.message){
                    console.log(res.data.message);
                    window.location.href = '/';
                }
        })
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/login").then((response) => {
            if(response.data.loggedIn === true ){
                setUserStatus(response.data.user[0].status);
                setLoginStetus(response.data.user[0].name);
                document.getElementById("login-session").style.display = "block";
                document.getElementById("login-regis").style.display = "none";
            } else {
                document.getElementById("login-regis").style.display = "block";
                document.getElementById("login-session").style.display = "none";
            }
        })
    }, [])

    const createTopic = () => {
        if(LoginStatus != "" ){
            window.location.href = '/create';
        } else {
            alert("กรุณาล็อคอินก่อนสร้างกระทู้");
            // window.location.href = '/';
        }
    }
    
    const userList = () => {
        if(LoginStatus != "" ){
            if(status === "admin"){
                window.location.href = '/users';
            }else{
                alert("You is not Admin!!!")
            }
        } else {
            alert("กรุณาล็อคอินก่อนสร้างกระทู้");
            // window.location.href = '/';
        }
    }

    const searchTopic = () => {
        if(seachName === ""){
            alert("กรุณากรอกข้อมูลค้นหา");
        }else{
            window.location = `/search/${seachName}`;
        }
    }

    const backHome = () => {
        window.location.href = '/';
    }

    return(
        <div className="nav-hafu">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-5">
                        <div className="d-flex logo" onClick={backHome}>
                            <img src="/image/cat.png" alt="" />
                            <h4 style={{color:"white" ,margin:"0px 5px"}}>HaFu Board</h4>
                        </div>
                    </div>
                    <div className="col-7">
                        <div className="row r-bar">
                            <div className="col-4">
                                <div className="d-flex justify-content-end">
                                    <button type="button" className="btn btn-outline-primary" style={{marginRight:"5px"}}
                                        onClick={createTopic}
                                    >สร้างกระทู้</button>
                                    <button type="button" className="btn btn-outline-warning"
                                        onClick={userList}
                                    >รายชื่อผู้ใช้</button>
                                </div>
                            </div>
                            <div className="col-4">
                                <form className="d-flex">
                                    <input className="form-control me-2" type="search" placeholder="ค้นหากระทู้" aria-label="Search" 
                                          onChange={e => setSearchname(e.target.value)}
                                    />
                                    <button className="btn btn-outline-success" type="button"
                                        onClick={searchTopic}
                                    >ค้นหา</button>
                                </form>
                            </div>
                            <div className="login-bar col-4">
                                <div id="login-regis">
                                    | <Link to="/login">Login</Link> |{" "}
                                    <Link to="/register">Register</Link>
                                </div>
                                <div id="login-session">
                                    <div style={{color:"red",display: "flex",justifyContent:"space-around",alignItems:"baseline"}}>
                                        <h6>{LoginStatus}</h6>
                                        <button type="button" class="btn btn-outline-danger" onClick={logOut}>LogOut</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Bar;