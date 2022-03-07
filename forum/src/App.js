import Axios from 'axios';
import {useState,useEffect} from 'react';
import Bar from './components/bar';

function App() {

  const [topic,setTopic] = useState("");
  const [content,setContent] = useState("");
  const [topicList,setTopicList] = useState([]);
  const [newTopic,setNewTopic] = useState("");
  const [newContent,setNewContent] = useState("");

  const [LoginStatus,setLoginStetus] = useState("");
  const [userName,setUserName] = useState("");

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
        if(response.data.loggedIn === true ){
          setLoginStetus(response.data.user[0].id);
          setUserName(response.data.user[0].name);
        }else{
          alert("Login please");
        }
    })
},[])

  const getTopic = () => {
    Axios.get("http://localhost:3001/topic").then((response) => {
      setTopicList(response.data);
    });
  }

  const addTopic = () => {
    Axios.post("http://localhost:3001/create",{
      topic:topic,
      content:content,
      user_id:LoginStatus,
      author_name:userName
    }).then((response)=>{
      if(response){
        window.location.href = `/show/${response.data.insertId}`;
        console.log(response.data.insertId);
      }
    });
  }

  const deleteTopic = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setTopicList(
        topicList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  }

  return (
    <div className="App">
        <div><Bar /></div>
        <div className="container">
            <h1>Create Topic</h1>
            <div className="information">
                <div className="mb-3">
                  <label htmlFor="user_id" className="form-label">User ID</label>
                  <input type="text" className="form-control" disabled
                    value={LoginStatus}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="user_name" className="form-label">User Name</label>
                  <input type="text" className="form-control" disabled
                    value={userName}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="topic" className="form-label">Topic</label>
                  <input type="text" className="form-control" placeholder="กรุณาตั้งชื่อกระทู้" 
                  onChange={ (event) => {
                    setTopic(event.target.value);
                  }}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="content" className="form-label">Content</label>
                  <textarea  type="text" className="form-control" placeholder="กรุณาเพิ่มเนื้อหา"
                    onChange={ (event) => {
                        setContent(event.target.value);
                      }}
                  ></textarea>
                </div>
                <button className="btn btn-primary" onClick={addTopic}>Create</button>
            </div>
        </div>
    </div>
  );
}

export default App;
