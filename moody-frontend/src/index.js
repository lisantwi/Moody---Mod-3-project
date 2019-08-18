const BASE_URL = "http://localhost:3000"
const USER_MOOD_URL = `${BASE_URL}/user_moods`
const USER_URL = `${BASE_URL}/users`

document.addEventListener('DOMContentLoaded', function(){
    const noteSpan = document.getElementById("#notes-span")
    debugger
    noteSpan.addEventListener("click",  fetchAllNotes)
})


