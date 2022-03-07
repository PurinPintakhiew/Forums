import {useParams} from "react-router-dom";
import React,{useState,useEffect} from "react";
import Axios from "axios";
import Bar from './bar';

const Edit = () => {
    let params = useParams();
    const [topicList,setTopiclist] = useState([]);
    const [topic,setTopic] = useState("")
    const [content,setContent] = useState("");

    useEffect(() => {
        async function showTopic(){
            const res = await fetch(`http://localhost:3001/editTopic/${params.id}`);
            res
            .json()
            .then((res) => {
                setTopiclist(res);
            })
        }
        showTopic();
    }, [])

    const update = (id) => {
        if(topic === ""){
            topicList.map((val,key) => {
                setTopic(val.topic);
            })
        }
        if(content === ""){
            topicList.map((val,key) => {
                setContent(val.content);
            })
        }
        
        Axios.put("http://localhost:3001/update",{
            topic:topic,
            content:content,
            id:id
          }).then((response)=>{
              if(response.data.message){
                  alert(response.data.message);
              }
            setTopiclist(
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

    const cancle = () => {
        window.location = "/";
    }

    return (
        <div>
            <div><Bar /></div>
            <div className="container col-8">
                <div className="card" style={{marginTop:"50px"}}>
                    <div className="card-header">
                        <h3>Edit Topic</h3>
                    </div>
                    <div className="card-body">
                    {topicList.map((val,key) => {
                    return (
                        <form>
                            <div className="mb-2">
                                <label htmlFor="">Topic ID</label>
                                <input type="text"  className="form-control" value={val.id}  disabled/>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="">Topic</label>
                                <input type="text"  className="form-control" defaultValue={val.topic}
                                    onChange={e => setTopic(e.target.value)}
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="">content</label>
                                <textarea type="text"  className="form-control" defaultValue={val.content}
                                    onChange={e => setContent(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="mb-2">
                                <button type="button" className="btn btn-primary" style={{marginRight:"5px"}}
                                    onClick={()=>update(val.id)}
                                >save</button>
                                <button type="button" className="btn btn-danger"
                                    onClick={cancle}
                                >cancle</button>
                            </div>
                        </form>
                )
                })} 
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit;
