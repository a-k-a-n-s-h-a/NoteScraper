function shownotes(){
    let note = localStorage.getItem("note");
    if(note==null){
        noteObj = [];
    }     
   else{
       noteObj = JSON.parse(note);
   }
   let html="";
   noteObj.forEach(function(element, index){
   html+= `
        
            <div class="notecard card my-2 mx-2" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.text}</p>
                    <button id="${index}" onclick="deletenote(this.id)" class="btn btn-outline-dark">
                        Delete note
                    </button>
                </div>
            </div>
        </div>
   `
 });
 let noteInnerElem = document.getElementById('notes');
 if(noteObj.length!=0){
     noteInnerElem.innerHTML=html;
 }
 else{
     noteInnerElem.innerHTML=`Nothing to show! please go to "Add A Note" section above to add a note.`;
 }
}


function deletenote(index){
    console.log("i am deletind",index);
   let note = localStorage.getItem("note");
   if(note==null){
       noteObj = [];
   }     
  else{
      noteObj = JSON.parse(note);
  }
  noteObj.splice(index,1);
  localStorage.setItem("note",JSON.stringify(noteObj));
  shownotes();
}
//  document.getElementById('searchid').preventdefault();
let search = document.getElementById('searchtxt');
search.addEventListener('input',function(){
    // console.log("the search is fired")
    let inputVal = search.value.toLowerCase();
    let notecards = document.getElementsByClassName('notecard');
    Array.from(notecards).forEach(function(element){
        let cardtxt = element.getElementsByTagName('p')[0].innerText;
        if(cardtxt.includes(inputVal)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    })
})

window.onload=function(){
shownotes();
let addbtn = document.getElementById('addbtn');

addbtn.addEventListener('click',function(e){
  let addtxt = document.getElementById('addtxt');
  let addtile = document.getElementById('addtitle');
  let note = localStorage.getItem("note");
  if(note==null){
      noteObj = [];
  }     
 else{
     noteObj = JSON.parse(note);
 }
  
 let myObj = {
     text : addtxt.value , 
     title : addtile.value 
 }
 noteObj.push(myObj);

 localStorage.setItem("note",JSON.stringify(noteObj));
 addtxt.value="";
 addtitle.value="";
 console.log(noteObj);
 shownotes();
 
});




}