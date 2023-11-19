// open database
// create objectstore- It can be only created in upgradedneeded

let db;
let openRequest= indexedDB.open("myDataBase");
openRequest.addEventListener("success",(e)=>{
    console.log("sucess");
    db=openRequest.result;

})

openRequest.addEventListener("error",(e)=>{
    console.log("error");

})

openRequest.addEventListener("upgradeneeded",(e)=>{
    console.log("upgrade");
    db=openRequest.result;
    db.createObjectStore("video",{keyPath: "id" } );
    db.createObjectStore("image",{keyPath: "id" });

})

