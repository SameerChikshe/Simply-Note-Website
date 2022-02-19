showNotes()
//We will be adding some event listeners here.If users enters a note,enter it to local storage
let addBtn = document.getElementById('addBtn');
//we will store notes in form of array so we'll have to parse it 
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];                                                               //if for 1st time
    }
    else 
    {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = "";
    showNotes();
})

//Function to show elements from localStorage:
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else 
    {
        notesObj = JSON.parse(notes);
    }
    let html="";
    notesObj.forEach(function(element,index)
    {
        html+=`<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${index+1}</h5>
            <p class="card-text">${element}</p>
            <button id="${index}" onClick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>`
    });
    let notesElem=document.getElementById('notes');
    if(notesObj.length!=0)
    {
        notesElem.innerHTML=html;
    }
    else
    {
        notesElem.innerHTML=`Nothing to display.Use the button above to add notes`
    }
}
// Function to delete a note:
function deleteNote(index)
{
    
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);                                          //(starting,no. of elements to remove)
    localStorage.setItem('notes',JSON.stringify(notesObj))
    showNotes();
}

let search=document.getElementById('searchTxt');
search.addEventListener('input',function()
{
    let inputVal=search.value;                                          //whatever the person searches
    let noteCards=document.getElementsByClassName('noteCard');          //get all noteCards
    Array.from(noteCards).forEach(function(element)                     //form an array outta it
    {
        let cardTxt=element.getElementsByTagName('p')[0].innerText;     //save it in cardTxt
        if(cardTxt.includes(inputVal))
        {
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }

    })
})

