import React,{useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import Axios from 'axios';
import Bar from './bar';
import './css/show.css';

function Show() {

let params = useParams();
const [topic,setTopic] = useState([]);
const [userID,setUserid] = useState("");
const [userName,setUserName] = useState("");
const [LoginStatus,setLoginStetus] = useState("");
const [comment,setComment] = useState("");
const [commentList,setCommentlist] = useState([]);
const [newComment,setNewcomment] = useState("");

Axios.defaults.withCredentials = true;

	Axios.get("http://localhost:3001/login").then((response) => {
	if(response.data.loggedIn === true ){
		setUserid(response.data.user[0].id);
		setUserName(response.data.user[0].name);
		setLoginStetus(response.data.user[0].status);
		}
	})

	const getData = () => {
		const topicAPI = `http://localhost:3001/sel/${params.id}`;
		const commentAPI = `http://localhost:3001/comment/${params.id}`;

		const getTopic = Axios.get(topicAPI)
		const getComment = Axios.get(commentAPI)
		Axios.all([getTopic,getComment]).then(
			Axios.spread((...allData) =>{
				const allTopic = allData[0].data;
				const allComment = allData[1].data;

				setTopic(allTopic);
				setCommentlist(allComment);
			})
		)
	}

useEffect(() => {
	getData();
},[])

const addComment = () => {
	Axios.post("http://localhost:3001/addComment",{
		user_id:userID,
		user_name:userName,
		comment:comment,
		topic_id:params.id
	}).then((res)=>{
		setCommentlist([
			...commentList,
			{
				user_id:userID,
				user_name:userName,
				comment:comment,
				topic_id:params.id
			}
		])
		document.getElementById("add-comment").style.display = "none";
		document.getElementById("comment-text").innerHTML = "";
	})
}

const showAdd = () => {
	if(userID !== ""){
		if(document.getElementById("add-comment").style.display === "none"){
			document.getElementById("add-comment").style.display = "block";
		} else {
			document.getElementById("add-comment").style.display = "none";
		}
	} else {
		alert("❄️ Login Please ! ❄️");
	}
}

const delComment = (id,userid) => {
	if(userID !== ""){
		if(LoginStatus === "admin" || userID === userid){
			alert(userID +" = " + userid);  
			Axios.delete(`http://localhost:3001/delComment/${id}`)
			.then((response) => {
				setCommentlist(
					commentList.filter((val) => {
					  return val.comment_id !== id;
					})
				  );
				if(response.data.message){
					alert(response.data.message);
				} else {
					alert(response.data.err);
				}
			})
		}else{
			alert("คุณไม่มีสิทธิ์ลบความคิดเห็นผู้อื่น 😿");
		}
	}else{
		alert("Login Please !")
	}
}

const showEdit = (id,userid) => {
	if(userID !== ""){
		if(LoginStatus === "admin" || userID === userid){
			alert(userID +" = " + userid);
			if(document.getElementById(`edit-comment ${id}`).style.display === "none"){
				var edit_c = document.getElementById(`edit-comment ${id}`);
				edit_c.style.display = "block";
				edit_c.style.position = "fixed";
				edit_c.style.top = "0";
				edit_c.style.bottom = "0";
				edit_c.style.right = "0";
				edit_c.style.left = "0";
				edit_c.style.zIndex = "99999";
				edit_c.style.background = "rgba(0, 0, 0, 0.85)";
			} else {
				document.getElementById(`edit-comment ${id}`).style.display = "none";
			}
		}else{
			alert("คุณไม่มีสิทธิ์แก้ไขความคิดเห็นผู้อื่น 😿");
		}
	}else{
		alert("Login Please !")
	}
}

const updateComment = (id) => {
	if(newComment === ""){
		alert("กรุณาแก้ไขก่อนบันทึก");
	}else{
		Axios.put("http://localhost:3001/updateComment",{
			id:id,
			newcomment:newComment
		}).then((response) => {
			if(response.data.message){
				alert(response.data.message);
			}else{
				alert(response.data.err);
		}
			setCommentlist(
				commentList.map((val)=>{
					return val.comment_id === id ?{
				  		id: val.comment_id,
						user_id:val.user_id,
						user_name:val.user_name,
						topic_id:val.topic_id,
						comment: newComment,
						date:val.date
					}:val;
			  	})
			)
		
	})
		setNewcomment(null);
		document.getElementById(`edit-comment ${id}`).style.display = "none";
	}
}

const edit = (id,userid) => {
	if(userID !== ""){
		if(LoginStatus === "admin" || userID === userid ){
			window.location = `/edit/${id}`;
		} else {
			alert("You is not admin or topic owner 🧐")
		}
	}else{
		alert("😸 Login Please ! 😸");
	}
  }

const closs = (id) => {
	document.getElementById("add-comment").style.display = "none";
	document.getElementById(`edit-comment ${id}`).style.display = "none";
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
		<Bar />
		{topic.map((val,key) => {
			return (
				<div className="container">
					<div className="card" style={{marginTop:"30px"}}>
						<div className="card-header">
							<div className="row">
								<h4 className="col-10">{val.topic}</h4>
								<button type="button" className="btn btn-warning col-1" style={{marginRight:"5px"}}
											onClick={()=>edit(val.id,val.user_id)}
								>Edit</button>
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
					<button type="button" id="btn-show" className="btn btn-primary col-12" style={{marginTop:"10px",marginBottom:"20px"}}
						onClick={showAdd}
					>
						Add Comment
					</button>
					
					<div id="add-comment" >
						<div id="add-c" className="container col-5 card" >
							<div className="mb-2">
								<label htmlFor="user_id" className="form-label">User ID</label>
								<input type="text" className="form-control" placeholder="Disabled input" disabled
									value={userID}
								/>
							</div>
							<div className="mb-2">
								<label htmlFor="user_name" className="form-label">User Name</label>
								<input type="text" className="form-control" placeholder="Disabled input" disabled
									value={userName}
								/>
							</div>
							<div className="mb-2">
								<label htmlFor="user_name" className="form-label">Comment</label>
								<textarea type="text" className="form-control" placeholder="กรุณาแสดงความคิดเห็น" required 
									onChange={(event) =>{
										setComment(event.target.value);
									}}
								></textarea>
							</div>
							<div className="mb-2">
								<button type="button" id="btn-add" className="btn btn-primary" style={{marginRight:"5px"}} 
									onClick={addComment}
								>Add</button>
								<button type="button" id="btn-closs" className="btn btn-danger"
									onClick={closs}
								>Cancle</button>
							</div> 
						</div>
					</div>
				</div>
			)
		})}
		{commentList.map((val,key)=>{
			return (
				<div className="container">
					<div className="card" id="comment-list">
						<div className="card-header" style={{fontSize:"12px",display:"flex",justifyContent:"space-between"}}>
							<div>{"ความคิดเห็นที่ : " + (key + 1)}</div>
							<div class="btn-group btn-group-sm">
								<button type="button" class="btn btn-warning" style={{marginRight:"5px"}}
									onClick={()=>showEdit(val.comment_id,val.user_id)}
								>
									Edit
								</button>
								<button type="button" class="btn btn-danger"
									onClick={()=>delComment(val.comment_id,val.user_id)}
								>
									Delete
								</button>
							</div>
						</div>
						<div className="card-body" style={{fontSize:"16px"}}>
							<p>{val.comment}</p>
						</div>
						<div className="card-footer">
							<p style={{marginBottom:"0px",fontSize:"12px"}}>{"ผู้เขียน : " + val.user_name}</p>
							<p style={{marginBottom:"0px",fontSize:"12px"}}>{"วันที่สร้าง : " + dateCover(new Date(`${val.date}`))}</p>
						</div>
					</div>

					<div id={"edit-comment " + val.comment_id} style={{display: "none"}}>
						<div id="edit-c" className="container col-8 card " >
							<div  className="card-header">Comment</div>
							<div className="card-body">
								<textarea type="text" className="form-control md-2" defaultValue={val.comment}
									onChange={(event) => {
										setNewcomment(event.target.value)
									}}
								>
								</textarea>
								<div  style={{marginTop:"10px"}}>
									<button type="button" class="btn btn-success" style={{marginRight:"5px"}}
										onClick={()=>updateComment(val.comment_id)}
									>save</button>
									<button type="button" id="btn-closs" className="btn btn-danger" 
										onClick={() => closs(val.comment_id)}
									>Cancle</button>
								</div>

							</div>
						</div>
					</div>

				</div>
			);
		})}
	</div>
)
}

export default Show;
