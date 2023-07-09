import { useScroll } from "framer-motion";
import { useSelector } from "react-redux";
import { updateChatList } from "./Redux/UserRedux";

export const convertDate=(ios)=>{
    var dat=new window.Date(ios);
    var d="";
      d+=dat.toString().slice(0,10);
      var t=dat.toLocaleTimeString('en-US');
      d+=" at "+t.slice(0,-6);
      d+=t.slice(-3);
      return d;
}
export const  addChat=(u,screenSize,chatUsers,dispatch)=>{
  var res=[];
  if(screenSize.width>600){
    if(chatUsers.filter(e=>e.uid==u.uid).length===0){
      if(chatUsers.length<=3)      res=[...chatUsers,u]
      else res=[chatUsers[1],chatUsers[2],u]
    }
  }
  else  res=u;    
  dispatch(updateChatList([res]))
}