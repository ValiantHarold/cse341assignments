let prev = null
let next = null

const pokeList = document.getElementById('pokeList')

const getData = async (url = '') => {
    const response = await fetch(url, {
        method: 'GET'
    })
    return response.json()
}

const populateList = url => {
    const data = getData(url)
    clearList()

    data.then(json => {
        for (const i in json.results) {
            pokeInfo = getData(json.results[i].url)
            .then(pokeInfo => {
                pokeList.innerHTML += 
                '<article class="card product-item">' + 
                '<header class="card__header">' + 
                    `<h1 class="product__title">${pokeInfo.name}</h1>` +
                '</header>' + 
                '<div class="card__image">' +
                    `<img src="${pokeInfo.sprites.front_default}" alt="${pokeInfo.name}">` +
                '</div>' + 
                '<div class="card__content">' + 
                `<p class="product__description">Types: ${getTypes(pokeInfo.types)} </p>` +
                    `<p class="product__description">Height: ${pokeInfo.height}</p>` +
                    `<p class="product__description">Weight: ${pokeInfo.weight}</p>` +
                '</div></article>'
            })
            .catch(err => {
                console.log(err);
            })
            next = json.next
            prev = json.previous
        }
    })
}

function getTypes(types) {
    let totalTypes = '';
    for (var i = 0; i < types.length; i++) {
        totalTypes += types[i].type.name + ' '
    };
    return totalTypes;
}


const clearList = () => {
    pokeList.innerHTML = ''
}

const populateNext = () => {
    if (next !== null) {
        populateList(next)
    } else {
        return
    }
}

const populatePrev = () => {
    if (prev !== null) {
        populateList(prev)
    } else {
        return
    }
}

populateList('https://pokeapi.co/api/v2/pokemon?offset=0&limit=10')

document.getElementById('nextBtn').addEventListener('click', populateNext)
document.getElementById('prevBtn').addEventListener('click', populatePrev)