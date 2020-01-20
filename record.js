window.onload = function(){
  document.getElementById("record-btn").addEventListener("click", record);
}

var recording = false;

var record = () => {
  if(recording){
    document.getElementById("micicon").style.color = "#000000";
  }else{
    document.getElementById("micicon").style.color = "#ff0000";
  }

  recording = !recording;
}