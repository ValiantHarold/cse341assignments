const socket = io('/')

const errorContainer = document.getElementById('errMsg')
const usernameInput = document.getElementById('username')
const date = new Date()

const getData = async (url = '') => {
    const response = await fetch(url, {
        method: 'GET'
    })
    return response.json()
}

const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return response.json()
}

const getTime = () => {
    const d = new Date()

    // Use String.padStart to add leading zeroes
    const hours = d.getHours().toString().padStart(2, '0')
    const mins = d.getMinutes().toString().padStart(2, '0')

    // Return the time as a string
    return `${hours}:${mins}`
}

// Login user to access chat room.
const login = async () => {
    // Get the username from our input
    const username = usernameInput.value

    // Do some simple validation on the client-side
    errorContainer.innerHTML = ''
    if (!username || username.trim() === '') {
        errorContainer.innerHTML = 'Username cannot be empty!'
        return
    }

    // Get JSON data from the server
    const data = await postData('/login', {
        username
    })

    // Check for errors
    if (data.error) {
        errorContainer.innerHTML = data.error
        return
    }

    // No errors, emit a newUser event and redirect to /chat
    socket.emit('newUser', username, getTime())
    window.location = '/chat'
}