const socket = io('/')

socket.on('update-list', () => {
    populateList()
})

const populateList = () => {
    const nameList = document.getElementById('nameList')

    fetch('/prove/prove11/fetchAll')
        .then(res => res.json())
        .then(data => {
            // Clear the list first
            while (nameList.firstChild) nameList.firstChild.remove()

            // Repopulate the list
            for (const avenger of data.avengers) {
                const li = document.createElement('li')
                li.appendChild(document.createTextNode(`Name: ${avenger.name} `))
                li.appendChild(document.createTextNode(`Color: ${avenger.favoriteColor}`))
                nameList.appendChild(li)
            }
        })
        .catch(err => {
            console.error(err)
        })
}

const submitName = () => {
    const newName = document.getElementById('newName').value // Grab the value of our new name
    const favoriteColor = document.getElementById('newColor').value // Grab the value of our new name

    fetch('/prove/prove11/insert', {
        method: 'POST', // Send a POST request
        headers: {
            // Set the Content-Type, since our server expects JSON
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newName, favoriteColor })
    })
        .then(res => {
            // Clear the input
            document.getElementById('newName').value = ''
            document.getElementById('newColor').value = ''

            // Repopulate the list with our new name added
            populateList()

            // Tell the server to broadcast changes to other users
            socket.emit('new-name')
        })
        .catch(err => {
            // Clear the input
            document.getElementById('newName').value = ''
            document.getElementById('newColor').value = ''
            console.error(err)
        })
}

// Initialize the list
populateList()