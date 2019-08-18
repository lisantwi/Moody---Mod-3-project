function fetchAllNotes(){
    fetch(USER_URL)
    .then(res => res.json())
    .then(userArr => userArr.forEach(renderNotes))
}

function renderNotes(user){
    const main = document.querySelector("main")
    const allNotesDiv = document.createElement("div")
    main.appendChild(allNotesDiv)
    allNotesDiv.classList.add("main-content")

    const titleH2 = document.createElement("h2")
    titleH2.innerText = "Your Notes"
    allNotesDiv.appendChild(titleH2)

    user.user_moods.forEach(mood => {
        //creating individual note variables
        const noteDiv = document.createElement("div")
        const moodName = document.createElement("h3")
        const noteP = document.createElement("p")
        noteP.innerText = mood.note
        moodName.innerText = mood.mood["name"]

        //appending stuff
        noteDiv.appendChild(noteP)
        noteDiv.appendChild(moodName)
        allNotesDiv.appendChild(noteDiv)  
    })
}


