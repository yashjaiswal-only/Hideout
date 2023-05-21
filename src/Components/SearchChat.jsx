import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useAuth } from "../contexts/AuthContext";
import styled from "styled-components";
import { useSelector } from "react-redux";
const UserChat=styled.div`
    padding: 0px;
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    color: black;
    cursor: pointer;

    &:hover {
    /* background-color: #2f2d52; */
    }
    
`
const SearchDiv=styled.div`
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    >input{
        width:90%;
        font-size:1.2rem;
    }
`
export const ListItem=styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin:0.5rem 0;
    width:100%;
    cursor:pointer;
`
export const Image=styled.img`
    width:3rem;
    height:3rem;
    aspect-ratio:1/1;
    border-radius:50%;
`
export const Text=styled.div`
    font-size:1.2rem; 
    margin:0 0.2rem;
    width:80%;
    >span{
        font-weight:600;
    }
    >div{
        display: flex;
        justify-content: space-between;
        >p{
            margin:0;
        }
        >span{
            width:20%;
            font-size:1rem;
            color:gray;
        }
    }
`
export const Divider=styled.hr`
    width:90%;
    margin:0;
    opacity:0.2;
`
const Search = () => {
  const [userquery, setUserquery] = useState("");
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState(false);
  const currentUser=useSelector(state=>state.details)
//   const { currentUser } = useAuth();

  const handleSearch = async () => {
    //search for user on firestore
    console.log(userquery)
    setErr(false)
    setUsers([])
    var que=userquery
    que=que.toLowerCase();
    var queLen=que.length;
    var queFrontCode=que.slice(0,queLen-1)
    var queEndCode=que.slice(queLen-1,queLen);
    var endCode=queFrontCode+String.fromCharCode(queEndCode.charCodeAt(0)+1);
    var q = query(
        collection(db, "users"),
        where("displayName", ">=", que),where("displayName",'<',endCode)
    );
    try {
      const querySnapshot = await getDocs(q);
    //   console.log(querySnapshot)
        if(querySnapshot.docs.length){
            var temp=[]
            querySnapshot.forEach((doc) => {
                temp.push(doc.data());
            });
            setUsers(temp)
            console.log(users+users.length)
        }
        else setErr(true)
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
    handleSearch();
  };

  const handleSelect = async (user) => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.name,
            photoURL: currentUser.photo,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUsers([]);
    setUserquery("")
  };
  return (
    <SearchDiv className="search">
        <input
          type="text"
          placeholder="Find a user"
          onKeyUp={handleKey}
          onChange={(e) => setUserquery(e.target.value)}
          value={userquery}
        />
      {err&&userquery!="" && <span>User not found!</span>}
      {users.length?
        <UserChat >
            {users.map(user=>(
                 <>
                 <ListItem onClick={()=>handleSelect(user)} key={user.uid}>
                     <Image src={user.photoURL}/>
                     <Text><span>{user.displayName}</span>
                     <div><p> {user.email}</p>
                    </div></Text>
                 </ListItem>
                 <Divider/>
                 </>
            ))}
            <Divider style={{backgroundColor:'red',width:'100%',opacity:'1'}}/>
        </UserChat>
        :''} 
    </SearchDiv>
  );
};

export default Search;
