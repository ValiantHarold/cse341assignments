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
                li.appendChild(document.createTextNode(avenger.name))
                nameList.appendChild(li)
            }
        })
        .catch(err => {
            console.error(err)
        })
}

const submitName = () => {
    const newName = document.getElementById('newName').value // Grab the value of our new name

    fetch('/prove/prove11/insert', {
        method: 'POST', // Send a POST request
        headers: {
            // Set the Content-Type, since our server expects JSON
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ newName })
    })
        .then(res => {
            // Clear the input
            document.getElementById('newName').value = ''

            // Repopulate the list with our new name added
            populateList()

            // Tell the server to broadcast changes to other users
            socket.emit('new-name')
        })
        .catch(err => {
            // Clear the input
            document.getElementById('newName').value = ''
            console.error(err)
        })
}

// Initialize the list
populateList()




// const populateList = () => {
//     const nameList = document.getElementById('nameList')
//     nameList.innerHTML = ''

//     const data = getData('/prove/prove11/fetchAll')

//     data.then(json => {
//         json.avengers.forEach(item => {
//             nameList.innerHTML += `<li>Name:${item.name} Color:${item.favoriteColor}</li>`
//         })
//     })
// }

// const submitName = () => {
//     const newName = document.getElementById('newName').value
//     const newColor = document.getElementById('newColor').value
//     postData('/prove/prove11/insert', {
//         newName: newName,
//         newColor: newColor
//     }).then(response => {
//         console.log(response)
//         if (response.status == 200) {
//             populateList()
//             document.getElementById('newName').value = ''
//             socket.emit('new-name', true)
//         } else {
//             console.error(status)
//         }
//     )
// }


// // Initialize the list
// populateList()