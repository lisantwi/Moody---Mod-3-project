const BASE_URL = "http://localhost:3000"
const USER_MOOD_URL = `${BASE_URL}/user_moods`
const USER_URL = `${BASE_URL}/users`

document.addEventListener('DOMContentLoaded', function(){
    console.log("'ello, is it me you're looking for?")
    renderForm()
    const notesLink = document.querySelector('#notes-link')
    notesLink.addEventListener('click', fetchAllNotes)
    const homeLink = document.querySelector('#home-link')
    homeLink.addEventListener('click', renderForm)
})

function burnDownDOM(){
    console.log('burning down the DOM')
    let elem = document.querySelector(".main-content")
    let child = elem.lastElementChild;
   
    while (child) {
        elem.removeChild(child);
        child = elem.lastElementChild;
    }
}

function contentDiv(){
    return document.querySelector('.main-content')
}

function renderForm(){
    burnDownDOM()
    const noteForm = document.createElement('form')
    noteForm.innerHTML = buildForm()
    noteForm.addEventListener('submit', noteSubmit)
    return contentDiv().appendChild(noteForm)
}

function noteSubmit(){
    event.preventDefault()
    // console.log('submitting note...')    
    const userMoodNote = event.target.querySelector('#mood-note').value
    const userMood = parseInt(event.target.querySelector('#user-mood').value)
    let noteDate = event.target.date_entry.value
    noteDate = parseInt(noteDate.split('-').join('')) // we can call ourselves developers now 

    const newNote = {
        user_id: 1,
        mood_id: userMood,
        date_entry: noteDate,
        note: userMoodNote
    }
    postNote(newNote)
    event.target.reset()
}

function postNote(newNote){

    const configObject = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newNote)
        }
    
    fetch(USER_MOOD_URL, configObject)
    .then(res => res.json())
    .then(renderNewNote)
}

function renderNewNote(noteObject){
    const notesDiv = document.createElement('div')
    notesDiv.classList.add('notes-div') 
    const noteDiv = document.createElement("div")
    const moodName = document.createElement("h3")
    const noteP = document.createElement("p")
    const dateP = document.createElement('p')
    dateP.innerText = `Date posted: ${noteObject.date_entry}`
    noteP.innerText = `Note: ${noteObject.note}`
    moodName.innerText = `Your Mood: ${noteObject.mood["name"]}`
    noteDiv.append(noteP, moodName)
    notesDiv.appendChild(noteDiv) 
}

function todaysDate(){
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth()+1).padStart(2, '0')
    let yyyy = today.getFullYear();
    return today = yyyy + '-' + mm + '-' + dd   
}

function buildForm(){
    return `
    <div class='form-group'>
        <label for='user-mood'>What's your mood like today?</label>
        <select class='form-control col-sm-8 form-control-lg'
            id='user-mood'>
            <option value='4'>Calm</option>
            <option value='1'>Happy</option>
            <option value='3'>Anxious</option>
            <option value='2'>Sad</option>
            <option value='5'>Angry</option>
        </select>
    </div>
    <br>
    <div class='form-group'>
        <label for='date_entry'>Mood date:</label>
        <br>  
        <input type='date' id='date_entry' name='date_entry' value=${todaysDate()} min='2018-01-01' max=${todaysDate()}> 
    </div> 
    <br>
    <div class='form-group'>
        <label for='mood-note'>Note your mood <3</label>
        <br>
        <textarea class="form-control col-sm-8" id='mood-note'
        placeholder="Write a little about how you're feeling today" 
        rows="15"></textarea>
    <br>
    <input type="submit" class="btn btn-primary" id="edit-submit"></input>
    `
}