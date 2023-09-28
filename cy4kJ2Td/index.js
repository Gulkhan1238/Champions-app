// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue,  } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL:  'https://ordering-8a9ff-default-rtdb.firebaseio.com/' 
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const EndorsementsList = ref(database, "EndorsementsList")

let publishBtn = document.getElementById("publish-btn")
let textFieldEl = document.getElementById("text-area")
let ulEl = document.getElementById("ul-el")



publishBtn.addEventListener("click",function(){
    
    let textValue = textFieldEl.value;
    push(EndorsementsList,textValue);
    textFieldEl.value=""
})

onValue(EndorsementsList,function(snapshot){
    if(snapshot.exists()){
        let snapList = Object.values(snapshot.val())
        ulEl.innerHTML = ""
        for(let i = 0 ; i<snapList.length; i++){
         let eList = snapList[i] 
         appendEndorsementList(eList)
        }
    }
    else{
        ulEl.innerHTML = `<h2> Empty list </h2>`
    }

})

function appendEndorsementList(list){
     let li = document.createElement("li")
     
     
     li.textContent += list
     ulEl.append(li) 
}

