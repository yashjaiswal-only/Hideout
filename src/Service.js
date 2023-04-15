export const convertDate=(ios)=>{
    var dat=new window.Date(ios);
    var d="";
      d+=dat.toString().slice(0,10);
      var t=dat.toLocaleTimeString('en-US');
      d+=" at "+t.slice(0,-6);
      d+=t.slice(-3);
      return d;
}