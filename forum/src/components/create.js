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

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
        if(response.data.loggedIn === true ){
          setLoginStetus(response.data.user[0].id);
        }else{
          alert("Login please");
        }
    })
}, [])

  const getTopic = () => {
    Axios.get("http://localhost:3001/topic").then((response) => {
      setTopicList(response.data);
    });
  }

  const addTopic = () => {
    Axios.post("http://localhost:3001/create",{
      topic:topic,
      content:content,
      user_id:LoginStatus
    }).then((response)=>{
      setTopicList([
        ...topicList,
        {
          topic:topic,
          content:content
        }
      ]);
    });
  }

  const updateTopic = (id) => {
    Axios.put("http://localhost:3001/update",{
      topic:newTopic,
      content:newContent,
      id:id
    }).then((response)=>{
      setTopicList(
        topicList.map((val)=>{
          return val.id === id ?{
            id: val.id,
            topic: val.topic,
            content: val.content
          }:val;
        })
      );
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
        <form>
        <div className="mb-3">
            <label htmlFor="topic" className="form-label">User ID</label>
            <input type="text" className="form-control" 
              value={LoginStatus}
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
        </form>
      </div>
      <hr />
      <div className="showTopic">
          <button className="btn btn-danger" onClick={getTopic}>Show</button>

          {topicList.map((val,key) =>{
            return (
              <div className="card">
                <div className="card-body">
                  <p className="card-text">Topic: {val.topic}</p>
                  <p className="card-text">Content: {val.content}</p>
                  <div className=""> 
                      <input type="text" className="form-control" 
                         onChange={ (event) => {
                          setNewTopic(event.target.value);
                             }}/> 
                      <input type="text" className="form-control" 
                         onChange={ (event) => {
                          setNewContent(event.target.value);
                             }}/>
                      <button className="btn btn-success" onClick={()=>updateTopic(val.id)}>Update</button>
                      <button className="btn btn-danger" onClick={()=>deleteTopic(val.id)}>delete</button>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
      </div>
    </div>
  );
}

export default App;
