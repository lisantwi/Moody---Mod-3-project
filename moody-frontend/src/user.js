/* this function handles what happens after 
a user clicks on 'your profile' on the navbar */
function profileLoad(){
    burnDownDOM()

    // loading text on top of
    const main = document.querySelector('main')
    main.innerHTML = loadHeader()
    const profileP = document.createElement('p')
    profileP.innerHTML = loadProfileMessage()
    profileP.classList.add('profile-message')
    contentDiv().appendChild(profileP)

    // activities form 
    const activForm = document.createElement('form')
    activForm.innerHTML = buildActivitiesForm()
    activForm.addEventListener('submit', newActivity)
    contentDiv().appendChild(activForm)

    const searchBar = document.createElement('form')
    searchBar.innerHTML = createSearchBar()
    contentDiv().appendChild(searchBar)

    fetchActivities()
}

function loadHeader(){
    return `
    <h4 class='main-content'>Hi, ${JSON.parse(localStorage.getItem("user")).name}!</h2
    `
}

function loadProfileMessage(){
    return `At Moody, we want you to be reminded of activities you like to do or you find helpful when in a particular mood. To help us remind you, please keep filling out this form. We appreciate you! <i class="far fa-hand-peace"></i>`
}

function newActivity(){
    event.preventDefault()

    const userMood = event.target['mood-entry'].value
    const userActivity = event.target['activity-entry'].value

    const newActivity = {
        user_id: JSON.parse(localStorage.getItem("user")).id,
        mood_name: userMood,
        name: userActivity
    }
    postActivity(newActivity)
    event.target.reset()
}

function postActivity(newActivity){
    const configObject = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newActivity)
    }
    
    fetch(`${BASE_URL}/activities`, configObject)
    .then(res => res.json())
    .then(renderNewActivity)
}

function renderNewActivity(activity){
    console.log(activity)
    const activityUl = document.querySelector('.activity-list')
    if (activityUl) {
        appendNewActivity(activity, activityUl)
    } else {
        const activityUl = document.createElement('ul')
        activityUl.classList.add('activity-list')
        contentDiv().appendChild(activityUl)
        appendNewActivity(activity, activityUl)
    }
}

function appendNewActivity(activity, activityUl){
    const activityLi = document.createElement('li')
    activityLi.innerHTML = `When I'm feeling ${activity.mood.name}, I like to ${activity.name}`
    activityUl.appendChild(activityLi)
}

function buildActivitiesForm(){
    return `
    <div class='form-group'>
        <label for='mood-entry'>When you're feeling</label>
        <select id='mood-entry'>
            <option value='happy'>happy</option>
            <option value='calm'>calm</option>        
            <option value='anxious'>anxious</option>
            <option value='sad'>sad</option>
            <option value='angry'>angry</i></option>
            </select>
        <label>you like to: </label>
        <input class="form-control col-md-6" type="text" placeholder="e.g. take a nap, do a silly dance" id="activity-entry">
    </div>
    <input type="submit" class="btn btn-primary" id="edit-submit"></input>    
    `
}

function fetchActivities(){
    const id = JSON.parse(localStorage.getItem("user")).id
    fetch(`${USER_URL}/${id}`)
    .then(res => res.json())
    .then(renderActivities)
}

function renderActivities(userObj){
    const activityUl = document.createElement('ul')
    activityUl.classList.add('activity-list')
    contentDiv().appendChild(activityUl)
    
    userObj.activities.forEach(activity => {
        const activityLi = document.createElement('li')
        activityLi.innerHTML = `When I'm feeling ${activity.mood.name}, I like to ${activity.name}`
        activityUl.appendChild(activityLi)
    })
}

function createSearchBar(){
    return `
    <input type="text" id="myInput" onkeyup="searchActivity()" placeholder="Search for activities by mood">
    `
}

function searchActivity() {
    const input = document.getElementById("myInput") 
    const filter = input.value.toUpperCase();
    const ul = document.querySelector('.activity-list');
    const li = ul.querySelectorAll("li");
    for (i = 0; i < li.length; i++) {
        txtValue = li[i].textContent || li[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}