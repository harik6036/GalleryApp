setTimeout(()=>{

    if(db){
        //videos retrival
        //images retrival
let dbTransaction=db.transaction("video");
let videoStore=dbTransaction.objectStore("video")
let videoRequest=videoStore.getAll() //event

videoRequest.onsuccess=(e)=>{

let galleryCont= document.querySelector(".gallery-cont");
let videoResult = videoRequest.result;

videoResult.forEach((videoObj) => {

let mediaElement=document.createElement("div");
mediaElement.setAttribute("class","media-cont");
mediaElement.setAttribute("id",videoObj.id);
let url=URL.createObjectURL(videoObj.blobData);

mediaElement.innerHTML=`  <div class="media">
<video src="${url}" autoplay loop></video>
</div>

<div class="download">DOWNLOAD</div>

<div class="delete">DELETE</div>
`;

galleryCont.appendChild(mediaElement);

let downloadBtn =mediaElement.querySelector(".download");
downloadBtn.addEventListener("click",downloadListner);

let deleteBtn =mediaElement.querySelector(".delete");
deleteBtn.addEventListener("click",deleteListner);


});
    }


//image

    let imagedbTransaction=db.transaction("image","readonly");
let imageStore=imagedbTransaction.objectStore("image")
let imageRequest=imageStore.getAll() //event

imageRequest.onsuccess=(e)=>{

let galleryCont= document.querySelector(".gallery-cont");
let imageResult = imageRequest.result;
imageResult.forEach((imageObj) => {

let mediaElement=document.createElement("div");
mediaElement.setAttribute("class","media-cont");
mediaElement.setAttribute("id",imageObj.id);
let url=imageObj.url;

mediaElement.innerHTML=`  <div class="media">
<img src="${url}" ></video>
</div>

<div class="download">DOWNLOAD</div>

<div class="delete">DELETE</div>
`;

galleryCont.appendChild(mediaElement);


let downloadBtn =mediaElement.querySelector(".download");
downloadBtn.addEventListener("click",downloadListner);

let deleteBtn =mediaElement.querySelector(".delete");
deleteBtn.addEventListener("click",deleteListner);


});
    }
    
    
    
    }



},1000)



let backButton=document.querySelector(".back-button");
backButton.addEventListener("click",(e)=>{
    location.assign("index.html");
})

// function downloadListner(e)
// {


// }



//ui needs to remove and also remove from database
function deleteListner(e)
{

    let id=e.target.parentElement.getAttribute("id");

    if(id.slice(0,3)==="vid"){
        let dbTransaction=db.transaction("video", "readwrite");
        let videoStore=dbTransaction.objectStore("video");
        videoStore.delete(id);


    }
    else {
        let imagedbTransaction=db.transaction("image","readwrite");
        let imageStore=imagedbTransaction.objectStore("image");
        imageStore.delete(id);

    }

    
}         