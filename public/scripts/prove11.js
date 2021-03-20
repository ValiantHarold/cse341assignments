const socket = io('/')

socket.on('update-list', () => {
    populateList()
})

// A simple async GET request function
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

const populateList = () => {
    const nameList = document.getElementById('nameList')
    nameList.innerHTML = ''

    const data = getData('/prove/prove11/fetchAll')

    data.then(json => {
        json.avengers.forEach(item => {
            nameList.innerHTML += `<li>Name:${item.name} Color:${item.favoriteColor}</li>`
        })
    })
}

const submitName = () => {
    const newName = document.getElementById('newName').value
    const newColor = document.getElementById('newColor').value
    postData('/prove/prove11/insert', {
        newName: newName,
        newColor: newColor
    }).then(response => {
        console.log(response)
        if (response.status == 200) {
            populateList()
            document.getElementById('newName').value = ''
            socket.emit('new-name', true)
        } else {
            console.error(status)
        }
    )
}


// Initialize the list
populateList()