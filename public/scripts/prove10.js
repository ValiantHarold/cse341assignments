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

    const data = getData('/prove/prove10/fetchAll')

    data.then(json => {
        json.avengers.forEach(item => {
            nameList.innerHTML += `<li>Name:${item.name} Color:${item.favoriteColor}</li>`
        })
    })
}

const submitName = () => {
    const newName = document.getElementById('newName').value
    const newColor = document.getElementById('newColor').value
    postData('/prove/prove10/insert', {
        newName: newName,
        newColor: newColor

    }).then(
        populateList()
    )
}

// Initialize the list
populateList()