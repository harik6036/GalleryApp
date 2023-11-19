// const shortid = require('shortid');
 

let video=document.querySelector("video");
let recordButtonCont = document.querySelector(".record-btn-cont");
let recordButton = document.querySelector(".record-btn");
let transparentcolor;

let captureButtonCont = document.querySelector(".capture-btn-cont");
let captureButton = document.querySelector(".capture-btn");
let recordFlag=false;
 

let recorder;
let chunks=[];//  data of video recording will come in form of chunks in a regular period of time.
let constrains={
    video:true,
    audio:true  //if there is false, then it would not have asked for permisson for  audio.
} 
//navigator is a global object provided by browser.It talls info about your browser.
//user-agent whicch uses navigator which will give info about browser..Media device  is a interfere which connects with our hardware.
//getuserMedia -It will give a prompt asking for permisson asking for camera and Microphone...if we click on it, it will start recording video and audio. 
window.navigator.mediaDevices.getUserMedia(constrains).then((stream)=>{
    video.srcObject = stream; //it will put the src value in video element and we will able to see it on live.
    
    

 recorder=new MediaRecorder(stream);

 recorder.addEventListener("start",(e)=>{ 
    //this event will occur when we press the recording key again.
    chunks=[];
 })

 recorder.addEventListener("dataavailable",(e)=>{
    chunks.push(e.data);
 })

 recorder.addEventListener("stop",(e)=>{
    //when we press on stop, we need to convert  media chunkz data to video.

    let blob=new Blob(chunks, { type:"video/mp4" });  //this will convert chunks into mp4  
    //search for blob.
    if(db){
        let VideoId= shortid();
        console.log(VideoId);
        let dbTransaction=db.transaction("video","readwrite");
        let videoStore= dbTransaction.objectStore("video");
        let videoEntry = {
            id:VideoId,
            blobData:blob,

        }
        videoStore.add(videoEntry);
 
    }

    let videourl=URL.createObjectURL(blob);  

    let a=document.createElement("a");
    a.href=videourl;
    a.download="stream.mp4";
    a.click();

 })

})
captureButtonCont.addEventListener("click",(e)=>{

let canvas=document.createElement("canvas");
canvas.width= video.videoWidth;  //setting width and height of our canvas....value will be set in pixels...
canvas.height=video.videoHeight;
let tool=canvas.getContext("2d") //draw image is used to draw on canvas.

tool.drawImage(video,0,0, canvas.width,canvas.height);
tool.fillStyle=transparentcolor;
tool.fillRect(0,0,canvas.width,canvas.height);


let imageUrl=canvas.toDataURL();

if(db){
    let ImageId= shortid();
    // console.log(VideoId);
    let dbTransaction=db.transaction("image","readwrite");
    let ImageStore= dbTransaction.objectStore("image");
    let ImageEntry = {
        id:ImageId,
        url:imageUrl

    }
    ImageStore.add(ImageEntry);

}
let a = document.createElement("a");
a.href=imageUrl;
a.download="image.jpeg";
a.click();


})
recordButtonCont.addEventListener("click",(e)=>{
if(!recorder){
    return;
}

recordFlag=!recordFlag;

if(recordFlag){
    //start recording
recorder.start();
recordButtonCont.classList.add(".scale-record");
alert("recording is Starting");

}
else{
    //stop recording
recorder.stop();
recordButtonCont.classList.remove(".scale-record"); 
//when recording is stop we need to download it...

}


})

let filterLayer=document.querySelector(".filter-layer");

let allFilters=document.querySelectorAll(".filter");
allFilters.forEach((filterElement)=>{
    filterElement.addEventListener("click",(e)=>{

        transparentcolor= getComputedStyle(filterElement).getPropertyValue("background-color");
    filterLayer.style.backgroundColor = transparentcolor;
     
    })

})

 