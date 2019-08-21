
const BASE_URL = "http://localhost:3000"
const USER_MOOD_URL = `${BASE_URL}/user_moods`
const USER_URL = `${BASE_URL}/users`

document.addEventListener('DOMContentLoaded', function(){
    console.log("'ello, is it me you're looking for?")
    // renderForm()
    let navBar = document.querySelector(".navbar-primary")
    navBar.style.display="none"
    loginForm()

    const header = document.querySelector('header')
    header.style.display ='none'

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

function loginForm(){
    // event.preventDefault()
    burnDownDOM()
    let div = contentDiv()
    const starDiv = document.createElement('div')
    const starDiv2 = document.createElement('div')
    const wrapDiv = document.createElement('div')
    const centerDiv = document.createElement('div')
    const headerDiv = document.createElement('div')
    const h2Title = document.createElement('h2')
    const h4Prompt = document.createElement('h4')
    const formDiv = document.createElement('div')
    const form = document.createElement('form')
    const formInput = document.createElement("input")
    formInput.setAttribute("type", "text")


    //adding classes
    starDiv.classList.add('stars1')
    starDiv2.classList.add('stars2')
    wrapDiv.classList.add('login-wrap')
    centerDiv.classList.add('center')
    headerDiv.classList.add('header')
    h2Title.classList.add('animation', 'a1')
    h4Prompt.classList.add('animation', 'a2')
    formDiv.classList.add('form')
    form.innerHTML = `<input type="text" name="username" class="form-field animation a3" placeholder="Enter your username"><br><br>
    <button id=login-btn class="animation a6 type="submit" >LOGIN</button>`
    h4Prompt.innerText = 'Enter your existing username or create a new one.'
    


    h2Title.innerHTML = ` <h2 style="font-size:50px;" class="animation a1">Moody<i class="far fa-hand-peace"></i></h2>`
    

    div.append(starDiv, starDiv2, wrapDiv)
    wrapDiv.append(centerDiv)
    centerDiv.append(headerDiv, formDiv)
    headerDiv.append(h2Title,h4Prompt)
    formDiv.appendChild(form)
    form.addEventListener("submit", findOrCreate)


   

    // const main = document.querySelector("main")
    // const formDiv = document.createElement("div")
    // const form = document.createElement("form")
    // const formInput = document.createElement("input")
    // formInput.setAttribute("type", "text")
    // formInput.innerText = "Enter your name"

    // const h1Text = document.createElement("h1")
    // h1Text.innerText = "Enter your Name"
    // main.appendChild(formDiv)
    
    // form.appendChild(formInput)
    // formDiv.classList.add('main-content')
    // const submitButton = document.createElement("button")
    // submitButton.innerHTML = "Submit"
    // submitButton.setAttribute("type", "submit")

    // formDiv.append(h1Text, form)
    // form.append(formInput, submitButton)


}

// function loggingIn(){
//     const divCenter = document.querySelector('div-center')
//     debugger
//     form.addEventListener("submit", findOrCreate)
// }

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
        renderForm()
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

    fetch(`${USER_URL}/${JSON.parse(localStorage.getItem("user")).id}/note`)
    .then(resp => resp.json())
    .then(data => {
        let div = contentDiv()
        const body = document.querySelector('body') 
        body.style.background =  "white"
    
        let navBar = document.querySelector(".navbar-primary")
        navBar.style.display = ""
    
        const header = document.querySelector('header')
        header.style.display =''

        const noteForm = document.createElement('form')
        const messageDiv = document.createElement("div")
        const noteH2 = document.createElement('h2')
        div.appendChild(messageDiv)
        messageDiv.appendChild(noteH2)

        noteForm.innerHTML = buildForm()
        div.appendChild(noteForm)
        noteForm.addEventListener('submit', noteSubmit)

        if (data.note){
           noteH2.innerText = `Your mood for today is: ${data.mood.name}`
        } else{
            noteH2.innerText = 'Hi NAME, How are you feeling today?'
        }
 
    }
        

    )

    // fetch(`${USER_URL}/${id}`)
    // .then(resp => resp.json())

 
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
        note: userMoodNote,
        likes: 0
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
    .then(data => {
        if (data.message){
            alert(data.message)
        } else {
            fetchAllNotes
        }
    })
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
        <br>
        <br>
    <input type="radio" name= "user-mood" value="happy"> <i class="far fa-laugh fa-2x"></i>Happy<br>
    <input type="radio" name= "user-mood" value="calm"> <i class="far fa-smile fa-2x"></i>Calm<br>
    <input type="radio" name= "user-mood" value="anxious"> <i class="far fa-meh fa-2x"></i>Anxious<br>
    <input type="radio" name= "user-mood" value="sad"> <i class="far fa-frown fa-2x"></i>Sad<br>
    <input type="radio" name= "user-mood" value="angry"> <i class="far far fa-angry fa-2x"></i>Angry<br>
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
        const heartButton = document.createElement("i")
        const likeSpan = document.createElement("span")
        heartButton.classList.add('fas','fa-heart', 'fa-2x')
        heartButton.id = 'heart'
        
    
        //classes for elements
        noteDiv.classList.add("card")
        div.classList.add("card-columns")
        userH3.classList.add("card-title")
        noteContent.classList.add("card-body")
        commentP.classList.add("comment-p")
        contentP.classList.add("card-text")
        likeSpan.id = "likes"
 
     
        const noteDate = userMood.date_entry.toString()
        const yyyy = parseInt(noteDate.slice(0,4))
        const mm = parseInt(noteDate.slice(4,6))
        const dd = parseInt(noteDate.slice(6,8))
        const jsDate = new Date(yyyy,mm-1,dd)
        const displayDate = jsDate.toUTCString().split(' ').slice(0,4).join(' ') 

        dateP.innerText = displayDate
        userH3.innerText = userMood.user.name
        commentP.innerText = `Likes: `
        contentP.innerText = userMood.note
        likeSpan.innerText = userMood.likes
        commentP.appendChild(likeSpan)

        heartButton.addEventListener('click', event => likeNote(event, userMood, likeSpan))


        
        //appending elements

        div.appendChild(noteDiv)
        noteDiv.append(dateP, noteBuffer)
        noteBuffer.append(noteContent, heartButton, commentP)
        noteContent.append(userH3, contentP)
    }
}


function likeNote(event, userMood, likeSpan){
    let id = userMood.id
    let currentLikes = userMood.likes
    let data = {
        'likes': currentLikes + 1
    }
    fetch(`${USER_MOOD_URL}/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(note => updateLikes(note, likeSpan))

    function updateLikes(note, likeSpan){
        let currentLikes = parseInt(likeSpan.innerText)
        likeSpan.innerText = currentLikes + 1
        currentLikes +=1 
    }
 
}