import {useParams} from "react-router-dom";
import React,{useState,useEffect} from "react";
import {Link} from 'react-router-dom'; 
import Axios from "axios";
import Bar from './bar';
import './css/search.css';

const Seach = () => {

    Axios.defaults.withCredentials = true;
    let params = useParams();
    const [topicList,setTopiclist] = useState([]);
    const [LoginStatus,setLoginStetus] = useState("");
    const [userId,setUserid] = useState("");

    useEffect(() => {

        Axios.get("http://localhost:3001/login").then((response) => {
            if(response.data.loggedIn === true ){
                setLoginStetus(response.data.user[0].status);
                setUserid(response.data.user[0].user_id);
            }
        })

        async function showTopic(){
            const res = await fetch(`http://localhost:3001/search/${params.name}`);
            res
            .json()
            .then((res) => {
                if(res.length < 1){
                    console.log("no data")
                    let dataNull = document.getElementById("dataNull");
                    dataNull.style.display = "block";
                    dataNull.innerHTML = "ไม่พบข้อมูล";
                }
                setTopiclist(res);
            })
        }
        showTopic();
    }, [])

    const deleteTopic = (id,userid) => {
        if(userId !== ""){
            if(LoginStatus === "admin" || userId === userid ){
                Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
                    setTopiclist(
                    topicList.filter((val) => {
                        return val.id !== id;
                    })
                    );
                });
            } else {
                alert("You is not admin or topic owner 🧐");
            }
        }else{
            alert("😸 Login Please ! 😸");
        }
    }

      const edit = (id,userid) => {
        if(userId !== ""){
            if(LoginStatus === "admin" || userId === userid ){
                window.location = `/edit/${id}`;
            } else {
                alert("You is not admin or topic owner 🧐")
            }
        }else{
            alert("😸 Login Please ! 😸");
        }
      }

      // time
function addZero(i) {
	if (i < 10) {i = "0" + i}
	return i;
  }

const monthNames = ["January", "February", "March", "April", "May", "June",
					"July", "August", "September", "October", "November", "December" ];

function dateCover(date){
	var time = date.getDay() + " " + monthNames[date.getMonth()] + " " + date.getFullYear() + " " + addZero(date.getHours()) + ":" + addZero(date.getMinutes());
	return time;
}


    return (
        <div>
           <Bar/>
            <div className="container">
            <h1 style={{marginTop:"15px"}}>ข้อมูลจากการค้นหา</h1>
            <div id="dataNull"></div>
            {topicList.map((val,key) => {
                return (
                    <div className="card card-home">
                    <div className="card-header ">
                        <div className="row">
                            <Link to={`/show/${val.id}`} id="idTopic" className="col-9" style={{marginRight:"auto"}}>
                                {val.topic}
                            </Link>
                            <button type="button" className="btn btn-warning col-1" style={{marginRight:"5px"}}
                                onClick={()=>edit(val.id,val.user_id)}
                            >Edit</button>
                            <button type="button" className="btn btn-danger col-1" 
                                onClick={()=>deleteTopic(val.id,val.user_id)}
                            >Delete</button>
                        </div>
                    </div>
                    <div className="card-body">
                        <p>{val.content}</p>
                    </div>
                    <div className="card-footer">
                        <p style={{marginBottom:"0px",fontSize:"14px"}}>{"ผู้เขียน : " + val.author_name}</p>
                        <p style={{marginBottom:"0px",fontSize:"14px"}}>{"วันที่สร้าง : " + dateCover(new Date(`${val.datetime}`))}</p>
                    </div>
                </div>
                );
            })}
            </div>
        </div>
    );

    
}

export default Seach;