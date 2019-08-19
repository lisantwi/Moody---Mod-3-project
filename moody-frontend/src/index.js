const BASE_URL = "http://localhost:3000"
const USER_MOOD_URL = `${BASE_URL}/user_moods`
const USER_URL = `${BASE_URL}/users`

document.addEventListener('DOMContentLoaded', function(){
    console.log("'ello, is it me you're looking for?")
    // const noteDiv = document.querySelector('.user-notes')
    fetchAllNotes()
    renderForm().addEventListener('submit', noteSubmit)
})

function contentDiv(){
    return document.querySelector('.main-content')
}

function renderForm(){
    const noteForm = document.createElement('form')
    noteForm.innerHTML = buildForm()
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
    .then()
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
        <label for='user-mood'>How are you feeling today?</label>
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
        <input type='date' id='date_entry' name='date_entry' value=${todaysDate()} max=${todaysDate()}> 
    </div> 
    <br>
    <div class='form-group'>
        <textarea class="form-control col-sm-8" id='mood-note'
        placeholder="Write a little about how you're feeling today <3" 
        rows="15"></textarea>
    <br>
    <input type="submit" class="btn btn-primary" id="edit-submit"></input>
    `
}