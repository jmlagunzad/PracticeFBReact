import './App.css';
import React from "react";
import axios from "axios";
import About from './About';

import {Link} from 'react-router-dom';

//import Modal from "./components/Modal.js"

const {useState, useEffect} = React;


// {"results":[{"gender":"female","name":{"title":"Mrs","first":"Consuelo","last":"Gonzalez"},
// "location":{"street":{"number":714,"name":"Calle del Barquillo"},
// "city":"San Sebastián de Los Reyes","state":"Castilla y León",
// "country":"Spain","postcode":61623,
// "coordinates":{"latitude":"-24.5486","longitude":"35.5618"},
// "timezone":{"offset":"+6:00","description":"Almaty, Dhaka, Colombo"}},
// "email":"consuelo.gonzalez@example.com",
// "login":{"uuid":"456c1cc5-99f9-4308-9e5a-f201d6dc7b2c",
// "username":"redwolf249","password":"elizabet","salt":"L0MmcFu6","md5":"c31c8e693f9d0eb9898edf1860270286",
// "sha1":"7789c57d1be0c59598d2757b450d83600e84a4ca","sha256":"100c0f16cae04cf3700f9b566253af2e5577d5596500a9e58dc83b13824b1e08"},
// "dob":{"date":"1947-03-20T12:59:06.945Z","age":73},"registered":{"date":"2003-09-28T06:41:38.121Z","age":17},
// "phone":"938-846-175","cell":"607-138-970","id":{"name":"DNI","value":"22275854-M"},
// "picture":{"large":"https://randomuser.me/api/portraits/women/78.jpg","medium":"https://randomuser.me/api/portraits/med/women/78.jpg",
// "thumbnail":"https://randomuser.me/api/portraits/thumb/women/78.jpg"},"nat":"ES"}

interface UserName{
  first: string;
  last: string;
  title: string;
}

interface UserPicture{
  thumbnail: string;
}

interface UserInfo{
  name: UserName;
  picture: UserPicture;
}

interface UserList{
  users: UserInfo[];
}

interface Item{
  name: string;
  price: number;
}

interface ItemList{
  items: Item[];
}


// [{"id":0,"word":"rice-milk"},{"id":0,"word":"undertows"},{"id":0,"word":"tythe"},{"id":0,"word":"forebodings"}]

interface Post{
  id: number;
  word: string;
}

const fetchRandomData = (url: string) => {
    return axios.get(url)
    .then( ({ data }) => {
      // handle success
      console.log(data);
      return data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
}

const UserTab = ({ name, picture } : UserInfo)  => {
  return(
    <div>
      <img src={picture.thumbnail}/>
      <Link to={`/about/${name.first} ${name.last}`}>{name.first + ' ' + name.last}</Link>
    </div>
  );
}

const ChatList = ({ users } : UserList) => {

    return(
      <div>
         {users.map((user: UserInfo, idx: number) => {
              return <UserTab 
                        key={idx} 
                        name={user.name}
                        picture={user.picture}
                        />
          }
        )}
      </div>
    )
}

export default function App() {

  const [users, setUsers] = useState([]);
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [tempPost, setTempPost] = useState('');
  const [editPostId, setEditPostId] = useState(0);
  const [profilePicture, setProfilePicture] = useState('');
  // const [editModal, setEditModal] = useState(false);
  // const [currPost, setCurrPost] = useState([0,'']);

  useEffect(() => {
    fetchRandomData('https://randomuser.me/api/?results=10').then(randomData => {
      setUsers(randomData.results);
    });

    fetchRandomData('http://api.wordnik.com/v4/words.json/randomWords?limit=4&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5')
    .then(randomData => {
      setPosts(randomData);
      // console.log(randomData)
      // console.log(randomData[0])
    });

    fetchRandomData('/items/')
    .then(randomData => {
      randomData.map( (item: Item, idx: number) => {
        console.log(`Item ${idx + 1} is ${item.name} with price of ${item.price}`)
      }

      )
      // console.log(randomData)
      // console.log(randomData[0])
    });

  
    //
  }, []);

  // const changeImage = (e : Event) =>{
  //   if (e.target.files && e.target.files[0]) {
  //     setProfilePicture(URL.createObjectURL(e.target.files[0]))
  //   }
  // }


  return (
    
      <div className="App">
      {/* <NavBar/> */}
      
      <div className="body">
        <br/>
        <div className="row">
          <div className="col-3">
            <div className="card">
              <div className="card-header">
                
                {
                  profilePicture === '' ? ( 
                  <div>
                    Upload a profile picture<br/><br/>
                    <input type="file" onChange={ e => {
                      if (e.target.files && e.target.files[0]) {
                          setProfilePicture(URL.createObjectURL(e.target.files[0]))
                        }
                      } 
                    }/>
                  </div>) : <img id="target" src={profilePicture} width="300" height="300"/>

                }
              </div>
              <div className="card-body">
                <a href="https://www.facebook.com/jm.lagunzad/">Jm Lagunzad</a>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <div className="card-header">
                Write a post
              </div>
              <div className="card-body">
                <textarea value={postText}
                          onChange={event => {
                            setPostText(event.target.value)
                          }}
                          placeholder="What's on your mind?">
                </textarea>
                <br/>
                <button className="btn btn-success" 
                        onClick={() => {
                          if(postText === ''){
                            return;
                          }

                          posts.push({id: 0, word: postText})
                          setPosts(posts)
                          setPostText('');
                        }}
                >Post</button>
              </div>
            </div>
            <br/>
            <div className="card">
              <div className="card-header">
                News Feed
              </div>
              {
                //users.map((user: UserInfo, idx: number) => {
                
                posts.map( (post: Post, idx: number) => {
                  // if(post === ''){
                  //   return;
                  // }

                  if(editMode){
                    if(idx === editPostId){
                        return (
                          <div className="card" key={idx}>
                            <div className="card-header">
                              <button className="btn btn-primary"
                                onClick={() => {
                                  const newPosts = [...posts];
                                  newPosts[idx].word = tempPost;
                                  setPosts(newPosts);
                                  setEditMode(false);
                                  setEditPostId(0);
                                  //setEditModal(!editModal)
                                  //setPosts(newPosts);
                                }}
                              >Confirm Changes</button>
                              <button className="btn btn-danger m-2"
                                onClick={() => {
                                  setEditMode(false);
                                  setEditPostId(0);
                                }}
                              >Cancel</button>
                            </div>
                            <div className="card-body">
                              <blockquote className="blockquote mb-0">
                              <textarea value={tempPost}
                                        onChange={event => {
                                          setTempPost(event.target.value)
                                        }}
                                        placeholder="Edit this post">
                              </textarea>
                              </blockquote>
                            </div>
                          </div>
                        )
                    }
                  }

                  return (
                    <div className="card" key={idx}>
                      <div className="card-header">
                        <button className="btn btn-warning"
                          onClick={() => {
                            setEditMode(true);
                            setEditPostId(idx);
                            setTempPost(post.word);
                          }}
                        >Edit</button>
                        <button className="btn btn-danger m-2"
                          onClick={() => {
                            const newPosts = [...posts];
                            newPosts.splice(idx,1);
                            setPosts(newPosts);
                          }}
                        >Delete</button>
                      </div>
                      <div className="card-body">
                        <blockquote className="blockquote mb-0">
                          <p>{post.word}</p>
                        </blockquote>
                      </div>
                    </div>
                  )
                  


                })
              }
            </div>
          </div>
          <div className="col-3">
            <div className="card">
              <div className="card-header">
                Online Friends
              </div>
              <div className="card-body">
                <blockquote className="blockquote mb-0">
                  <ChatList users={users}/> 
                </blockquote>
              </div>   
            </div>
          </div>
        </div>
        {/* {editModal ? (
          <Modal
            post={postText}
            toggle={() => {
              setEditModal(!editModal)
            }}
            onSave={() =>{
              setEditModal(!editModal)
            }}
            />
        ): null} */}
      </div>
    </div>
 
    
  );
}
