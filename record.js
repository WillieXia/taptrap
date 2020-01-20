window.onload = function(){
  document.getElementById("record-btn").addEventListener("click", record);
}

var recording = false;

var record = () => {
  if(recording){
    document.getElementById("record-btn").style.color = "#000000";
  }else{
    document.getElementById("record-btn").style.color = "#ff0000";
  }
}