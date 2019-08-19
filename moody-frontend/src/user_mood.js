function fetchAllNotes(){
    console.log('fetching notes...')
    fetch(USER_URL)
    .then(res => res.json())
    .then(userArr => userArr.forEach(renderNotes))
}

function renderNotes(user){
    burnDownDOM()
    const allNotesDiv = document.createElement("div")
    allNotesDiv.classList.add('notes-div')
    contentDiv().appendChild(allNotesDiv)

    const titleH2 = document.createElement("h2")
    titleH2.innerText = "Your Notes"
    allNotesDiv.appendChild(titleH2)

    user.user_moods.forEach(mood => {
        //creating individual note variables
        const noteDiv = document.createElement("div")
        const moodName = document.createElement("h5")
        const noteP = document.createElement("p")
        noteP.innerText = `Note: ${mood.note}`
        moodName.innerText = `Your Mood: ${mood.mood["name"]}`

        //appending stuff
        noteDiv.appendChild(noteP)
        noteDiv.appendChild(moodName)
        allNotesDiv.appendChild(noteDiv)  
    })
}


