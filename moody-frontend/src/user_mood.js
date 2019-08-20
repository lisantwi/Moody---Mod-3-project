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
        
        //creating individual note elements
        const noteDiv = document.createElement("div")
        noteDiv.dataset.userMood = user_mood.id
        const moodName = document.createElement("h5")
        const noteP = document.createElement("p")
        const dateP = document.createElement('p') 
        const deleteButton = document.createElement('button')
        const editButton = document.createElement('button')

        // javascript dates why are you like this
        const noteDate = user_mood.date_entry.toString()
        const yyyy = parseInt(noteDate.slice(0,4))
        const mm = parseInt(noteDate.slice(4,6))
        const dd = parseInt(noteDate.slice(6,8))
        const jsDate = new Date(yyyy,mm-1,dd)
        const displayDate = jsDate.toUTCString().split(' ').slice(0,4).join(' ') 

        // inner texts and classes 
        dateP.innerHTML = `Date posted: <span>${displayDate}</span>`
        dateP.classList.add('note-date')
        noteP.innerHTML = `Note: <span>${user_mood.note}</span>`
        noteP.classList.add('note-content')
        moodName.innerText = `Your Mood: ${user_mood.mood["name"]}`
        deleteButton.innerText = 'Delete note'
        editButton.innerText = 'Edit note'
        editButton.classList.add('edit-button')

        // eventListeners
        deleteButton.addEventListener('click', deleteNote)
        editButton.addEventListener('click', showEditForm)
        
        //appending stuff
        noteDiv.append(noteP, dateP, moodName, deleteButton, editButton)
        allNotesDiv.appendChild(noteDiv)  
    })
}

function deleteNote(event){
    /* perhaps a misnomer, because we're not only deleting the note, 
    we're deleting the entire instance of user_mood, of which note is an attribute */
   const userMoodId = parseInt(event.target.parentNode.dataset.userMood)

   fetch(`${USER_MOOD_URL}/${userMoodId}`, {
        method: "DELETE"})
        .then(res => res.json())
        .then(event.target.parentNode.remove())
}

function showEditForm(){
    event.target.disabled = true
    const notesDiv = event.target.parentNode
    const editForm = document.createElement('form')
    editForm.innerHTML = buildEditForm()
    
    notesDiv.appendChild(editForm)
    
    const userMoodId = parseInt(event.target.parentNode.dataset.userMood)

    editForm.addEventListener('submit', (event) => handleEdit(event, userMoodId)) 
}

function handleEdit(event, userMoodId){
    event.preventDefault()

    const updatedNote = event.target.querySelector('#edited-note').value

    const updatedData = {
        user_id: JSON.parse(localStorage.getItem("user")).id,
        note: updatedNote
    }
    patchNote(updatedData, event, userMoodId)
}

function patchNote(updatedData, event, userMoodId) {
    const configObject = {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    }

    fetch(`${USER_MOOD_URL}/${userMoodId}`, configObject)
    .then(res => res.json())
    .then(updated => {
        event.target.parentNode.querySelector('.note-content').querySelector('span').innerText = updated.note
        const editButton = event.target.parentNode.querySelector('.edit-button')
        editButton.disabled = false 
        event.target.remove()
    })
}

function buildEditForm(){
    return `
    <label for='edit-form'>Edit your note:</label><br>
    <textarea id="edited-note">${event.target.parentNode.querySelector('.note-content').querySelector('span').innerText}</textarea><br>
    <input type="submit" class="btn btn-primary" id="edit-submit"></input>
    `
}