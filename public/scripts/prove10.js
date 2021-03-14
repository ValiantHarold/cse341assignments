function convertToJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Bad Response");
    }
}


// A simple async GET request function
const getData = async (url = '') => {
    const response = await fetch(url, {
        method: 'GET'
    })
    console.log(response)
    return convertToJson(response)
}

const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    console.log(response.headers)
    return convertToJson(response)
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
    const data = postData('/prove/prove10/insert', {
        newName: newName
    })
    
    data.then(response => {
        if (response.status == 200) {
            populateList() // Repopulate the list
        } else {
            console.error(status) // Console log our status code
        }
    })
}

// Initialize the list
populateList()