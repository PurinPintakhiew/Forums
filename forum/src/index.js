import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import Show from './components/show';
import Edit from './components/editTopic';
import UserAll from './components/userAll';
import Search from './components/search';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/create" element={<App/>}/>
        <Route path="/test" element={<TestR/>}/>
        <Route path="/show/:id" element={<Show/>}/>
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/users" element={<UserAll />} />
        <Route path="/search/:name" element={<Search />} />
      </Routes>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
