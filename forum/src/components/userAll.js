import {useState,useEffect} from "react";
import Axios from 'axios';
import Bar from './bar';

const UserAll = () => {

    const [LoginStatus,setLoginStetus] = useState("");
    const [userId,setUserid] = useState("");
    const [userList,setUserlist] = useState([]);

    Axios.defaults.withCredentials = true;

    useEffect(() => {

        Axios.get("http://localhost:3001/login").then((response) => {
            if(response.data.loggedIn === true ){
                setLoginStetus(response.data.user[0].status);
                setUserid(response.data.user[0].user_id);
            }else{
                alert("Login please");
            }
        })
        
        async function showUser(){
            const res = await fetch('http://localhost:3001/userlist');
            res
            .json()
            .then(res => setUserlist(res))
        }
        showUser();
    },[]);

    return (
        <div>
            <Bar />
            <div className="container col-5">
                <div className="card"  style={{textAlign:"center",marginTop:"50px"}}>
                    <div className="card-header">
                        <h4>รายชื่อผู้ใช้</h4>
                    </div>
                    <div className="card-body">
                        <table className="table table-dark table-sm">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                        {userList.map((val,key) => {
                            return (
                                <tbody>
                                    <tr>
                                        <td>{val.id}</td>
                                        <td>{val.name}</td>
                                        <td>{val.email}</td>
                                    </tr>     
                                </tbody>
                            );
                        })}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );


}

export default UserAll;