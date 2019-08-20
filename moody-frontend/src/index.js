
const BASE_URL = "http://localhost:3000"
const USER_MOOD_URL = `${BASE_URL}/user_moods`
const USER_URL = `${BASE_URL}/users`

document.addEventListener('DOMContentLoaded', function(){
    console.log("'ello, is it me you're looking for?")
    // renderForm()
    let navBar = document.querySelector(".display-nav")
    navBar.style.display="none"
    loginForm()

    const notesLink = document.querySelector('#notes-link')
    notesLink.addEventListener('click', fetchAllNotes)
    const homeLink = document.querySelector('#home-link')
    homeLink.addEventListener('click', renderForm)
    const profileLink = document.querySelector('#user-profile')
    profileLink.addEventListener('click', profileLoad)    
})

function profileLoad(){
    burnDownDOM()
    console.log('so you wanna see your profile')
}

function loginForm(){
    // event.preventDefault()
    burnDownDOM()
    const main = document.querySelector("main")
    const formDiv = document.createElement("div")
    const form = document.createElement("form")
    const formInput = document.createElement("input")
    formInput.setAttribute("type", "text")
    formInput.innerText = "Enter your name"

    const h1Text = document.createElement("h1")
    h1Text.innerText = "Enter your Name"
    main.appendChild(formDiv)
    
    form.appendChild(formInput)
    formDiv.classList.add('main-content')
    const submitButton = document.createElement("button")
    submitButton.innerHTML = "Submit"
    submitButton.setAttribute("type", "submit")

    formDiv.append(h1Text, form)
    form.append(formInput, submitButton)

    form.addEventListener("submit", findOrCreate)
}

function findOrCreate(){
    event.preventDefault()
    let data = {
        "name": event.target[0].value
    }

    fetch(USER_URL, {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Accept":"application/json"
        },
        body: JSON.stringify(data)
    }).then(resp => resp.json())
    .then(user => {
        localStorage.setItem("user", JSON.stringify(user))
        burnDownDOM()
        renderForm().addEventListener('submit', noteSubmit)
    })
}

function burnDownDOM(){
    console.log('burning down the DOM')
    let elem = document.querySelector("main")
    let child = elem.lastElementChild;

    while (child) {
        elem.removeChild(child);
        child = elem.lastElementChild;
    }
}

function contentDiv(){
    const div = document.createElement("div")
    const main = document.querySelector("main")
    div.classList.add("main-content")
    return main.appendChild(div)
}

function renderForm(){
    burnDownDOM()
    let navBar = document.querySelector(".display-nav")
    navBar.style.display = ""
    const noteForm = document.createElement('form')
    noteForm.innerHTML = buildForm()
    noteForm.addEventListener('submit', noteSubmit)
    return contentDiv().appendChild(noteForm)
}

function noteSubmit(){
    event.preventDefault()
    const userMoodNote = event.target.querySelector('#mood-note').value
    const userMood = parseInt(event.target.querySelector('#user-mood').value)
    let noteDate = event.target.date_entry.value
    noteDate = parseInt(noteDate.split('-').join('')) // we can call ourselves developers now 

    const newNote = {
        user_id: JSON.parse(localStorage.getItem("user")).id,
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

    let user = JSON.parse(localStorage.getItem("user"))
    
    fetch(USER_MOOD_URL, configObject)
    .then(res => res.json())
    .then(fetchAllNotes)
}

// function renderNewNote(noteObject){
//     const notesDiv = document.querySelector('.notes-div') 
//     const noteDiv = document.createElement("div")
//     const moodName = document.createElement("h3")
//     const noteP = document.createElement("p")
//     noteP.innerText = noteObject.note
//     moodName.innerText = noteObject.mood["name"] 
    
//     noteDiv.append(noteP, moodName)
//     notesDiv.appendChild(noteDiv) 
// }

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
            <option value='9'>Calm</option>
            <option value='6'>Happy</option>
            <option value='8'>Anxious</option>
            <option value='7'>Sad</option>
            <option value='10'>Angry</option>
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

// function buildActivitiesForm(){
//     return `
//     <div class='form-group'>
//         <label for='user-mood'>What's your mood like today?</label>
//         <select class='form-control col-sm-8 form-control-lg'
//             id='user-mood'>
//             <option value='9'>Calm</option>
//             <option value='6'>Happy</option>
//             <option value='8'>Anxious</option>
//             <option value='7'>Sad</option>
//             <option value='10'>Angry</option>
//         </select>
//     </div>
//     <br>
//     <div class='form-group'>
//         <label for='date_entry'>Mood date:</label>
//         <br>  
//         <input type='date' id='date_entry' name='date_entry' value=${todaysDate()} min='2018-01-01' max=${todaysDate()}> 
//     </div> 
//     <br>
//     <div class='form-group'>
//         <label for='mood-note'>Note your mood <3</label>
//         <br>
//         <textarea class="form-control col-sm-8" id='mood-note'
//         placeholder="Write a little about how you're feeling today" 
//         rows="15"></textarea>
//     <br>
//     <input type="submit" class="btn btn-primary" id="edit-submit"></input>    
//     `
// }