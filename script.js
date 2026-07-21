let notes = JSON.parse(localStorage.getItem("notes")) || [];
showNotes();

function save(){
    localStorage.setItem("notes",JSON.stringify(notes));
}

function addNote(){
    let title = document.getElementById("title").value;
    let note = document.getElementById("note").value;
    if(title =="" || note ==""){
        alert("Fill all fields..");
        return;
    }
    notes.push({title,note});
    save();
    showNotes();
    document.getElementById("title").value = "";
    document.getElementById("note").value = "";
}

function showNotes(){
    let html = "";
    notes.forEach((item,index)=> {
     html += `
     <div class="card">
        <h3>${item.title}</h3>
        <p>${item.note}</p>
        <button class ="edit" onclick ="editNote(${index})">Edit</button>
        <button class ="delete" onclick ="deleteNote(${index})">Delete</button>
     </div>
     `;   
    });
    document.getElementById("notes").innerHTML = html;
}

function deleteNote(index){
    notes.splice(index,1);
    save();
    showNotes();
}

function editNote(index){
    let newTitle = prompt("Edit Title",notes[index].title);
    let newNote = prompt("Edit Note",notes[index].note);
    if(newTitle !== null && newNote !== null){
        notes[index].title = newTitle;
        notes[index].note = newNote;
        save();
        showNotes();
    }
}

document.getElementById("search").addEventListener("keyup",function(){
    let value = this.value.toLowerCase();
    let cards = document.querySelectorAll(".card");
    cards.forEach(card =>{
        let text = card.innerText.toLowerCase();
        card.style.display = text.includes(value)? "block":"none";
    })
})