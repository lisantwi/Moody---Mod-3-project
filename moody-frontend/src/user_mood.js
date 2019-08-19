function fetchAllNotes(){
    let id = JSON.parse(localStorage.getItem("user")).id
    fetch(`${USER_URL}/${id}`)
    .then(res => res.json())
    .then(renderNotes)
}

function renderNotes(user){
    burnDownDOM()
    // const main = document.querySelector("main")
    const allNotesDiv = document.createElement("div")
    allNotesDiv.classList.add('notes-div')
    contentDiv().appendChild(allNotesDiv)

    const titleH2 = document.createElement("h2")
    titleH2.innerText = "Your Notes"
    allNotesDiv.appendChild(titleH2)

    user.user_moods.forEach(user_mood => {
        //creating individual note variables
        const noteDiv = document.createElement("div")
        noteDiv.dataset.userMood = user_mood.id
        const moodName = document.createElement("h5")
        const noteP = document.createElement("p")
        const dateP = document.createElement('p')

        const noteDate = user_mood.date_entry.toString()
        const yyyy = parseInt(noteDate.slice(0,4))
        const mm = parseInt(noteDate.slice(4,6))
        const dd = parseInt(noteDate.slice(6,8))
        const jsDate = new Date(yyyy,mm-1,dd)
        
        dateP.innerText = `Date posted: ${jsDate}`
        noteP.innerText = `Note: ${user_mood.note}`
        moodName.innerText = `Your Mood: ${user_mood.mood["name"]}`
        const deleteButton = document.createElement('button')
        deleteButton.innerText = 'Delete note'
        deleteButton.addEventListener('click', noteDelete)
        //appending stuff
        noteDiv.append(noteP, dateP, moodName, deleteButton)
        allNotesDiv.appendChild(noteDiv)  
    })
}

function noteDelete(event){
    /* perhaps a misnomer, because we're not only deleting the note, 
    we're deleting the entire instance of user_mood, of which note is an attribute */
   const userMoodId = parseInt(event.target.parentNode.dataset.userMood)

   fetch(`${USER_MOOD_URL}/${userMoodId}`, {
        method: "DELETE"})
        .then(res => res.json())
        .then(event.target.parentNode.remove())
}


