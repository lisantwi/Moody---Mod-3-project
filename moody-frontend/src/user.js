/* this function handles what happens after 
a user clicks on 'your profile' on the navbar */
function profileLoad(){
    burnDownDOM()

    // loading text on top of
    const main = document.querySelector('main')
    main.innerHTML = loadHeader()
    const profileP = document.createElement('p')
    profileP.innerHTML = loadProfileMessage()
    contentDiv().appendChild(profileP)

    // activities form 
    const activForm = document.createElement('form')
    activForm.innerHTML = buildActivitiesForm()
    activForm.addEventListener('submit', newActivity)
    contentDiv().appendChild(activForm)
}

function loadHeader(){
    return `
    <h4 class='main-content'>Hi, ${JSON.parse(localStorage.getItem("user")).name}!</h2
    `
}

function loadProfileMessage(){
    return `At Moody, we want our users to be reminded of activities which they like to do or which they find helpful, depending on their mood. To help us remind you, please keep filling out this form. We appreciate you! <i class="far fa-hand-peace"></i>`
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
    .then(console.log)
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

// render a user's favorite activities
function fetchActivities(){
    
}