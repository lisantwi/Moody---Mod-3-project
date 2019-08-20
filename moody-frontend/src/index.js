
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

    const feedLink = document.querySelector('#feed-link')
    feedLink.addEventListener('click', showFeed)

    // const noteDiv = document.querySelector('.user-notes')
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
    let userMood = ''
    let noteDate = event.target.date_entry.value
    let moodPrivacy = ''
    noteDate = parseInt(noteDate.split('-').join(''))

    let moodRadios = document.getElementsByName('user-mood')
    for (let i=0, length = moodRadios.length; i < length; i++){
        if (moodRadios[i].checked){
            userMood = moodRadios[i].value
            break;
        }
    }

    if (event.target.privacy[0].checked){
       
        moodPrivacy = false
    }  else {
        moodPrivacy = true
    }

    const newNote = {
        user_id: JSON.parse(localStorage.getItem("user")).id,
        mood_name: userMood,
        date_entry: noteDate,
        is_public: moodPrivacy,
        note: userMoodNote
    }
    debugger
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
        <h2>Hi, ${JSON.parse(localStorage.getItem("user")).name}! How are you feeling today?</h2>
        <br>
        <br>
    <input type="radio" name= "user-mood" value="happy"> <i class="far fa-laugh fa-2x">Happy</i><br>
    <input type="radio" name= "user-mood" value="calm"> <i class="far fa-smile fa-2x">Calm</i><br>
    <input type="radio" name= "user-mood" value="anxious"> <i class="far fa-meh fa-2x">Anxious</i><br>
    <input type="radio" name= "user-mood" value="sad"> <i class="far fa-frown fa-2x">Sad</i><br>
    <input type="radio" name= "user-mood" value="angry"> <i class="far far fa-angry fa-2x">Angry</i><br>
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
    <input type="radio" value="false" name="privacy" checked="checked"> Private<br>
    <input type="radio" name="privacy" value="true">Public<br>
    
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

function showFeed(){
    burnDownDOM()
    fetch(USER_MOOD_URL)
    .then(resp => resp.json())
    .then(userMoodArr=> {
        let div = contentDiv()
        div.id = "content"
        
        let divTitle = document.createElement("h3")
        divTitle.innerText = "Your Feed"
        div.appendChild(divTitle)
        userMoodArr.forEach(userMood => showFeedNotes(userMood,div))})
}

function showFeedNotes(userMood, div){
    if (userMood.is_public){
        
            //elements for notecard
        const noteDiv = document.createElement("div")
        const dateP = document.createElement("p")
        const noteBuffer = document.createElement("div")
        const noteContent = document.createElement("div")
        const userH3 = document.createElement("h3") 
        const contentP = document.createElement("p") 
        const commentP = document.createElement("p")
    


        //classes for elements
        noteDiv.classList.add('post' )
        dateP.classList.add('details1')
        noteBuffer.classList.add('buffer')
        noteContent.classList.add('content')
        commentP.classList.add('details2')


        dateP.innerText = userMood.date_entry
        userH3.innerText = userMood.user.name
        commentP.innerText = "0 Comments"
        contentP.innerText = userMood.note
        
        //appending elements
        div.appendChild(noteDiv)
        noteDiv.append(dateP, noteBuffer)
        noteBuffer.append(noteContent, commentP)
        noteContent.append(userH3, contentP)

        

    }


}
