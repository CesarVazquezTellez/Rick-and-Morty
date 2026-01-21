const url = 'https://rickandmortyapi.com/api/character/'
const container = document.querySelector('.container')
const details = document.querySelector('.details')
const inputSearch = document.querySelector('#inputSearch')
const btnSearch = document.querySelector('#btnSearch')

const getData = (url) => fetch(url).then(response => response.json())

const createCard = (character) => {
    const div = document.createElement('div')
    const html = `
        <h2>${character.name}</h2>
        <img src="${character.image}" alt="${character.name}">
        <button 
            onclick="swichInvisible()"
            class="btn"
            data-id="${character.id}">Detalles</button>
    `
    div.className = 'card'
    div.innerHTML = html
    return div
}

const switchInvisible = () => {
    container.classList.toggle('invisible')
    details.classList.toggle('invisible')
}

const searchById = (e) => {
    if(e.target.classList.contains('btn')){
        const id = e.target.getAttribute('data-id')
        getData(url+ id)
            .then(character => {
                const html = `
                    <h3>Nombre: ${character.name}</h3>
                    <img src="${character.image}" alt="${character.name}">
                    <p>Genero: ${character.gender}</p>
                    <p>Esta vivo? ${character.status}</p>
                    <p>Ubicación: ${character.location.name}</p>
                    <p>Origen: ${character.origin.name}</p>
                `
                details.querySelector('div')
                    .innerHTML = html
        })
    }
}

const searchByName = () => {
    const name = inputSearch.value
    if(name){
        getData(url + '?name=' + name)
            .then(data => {
                container.innerHTML = ''
                data.results.forEach(character => {
                    container.appendChild(createCard(character))
                })
            })
    }
}

const page = Math.round(Math.random() * 42) + 1

getData(url + '?page=' + page)
    .then(data => {
        data.results.forEach( character => {
            container.appendChild(createCard(character))
        })
    }).catch(er => console.log(er))

container.addEventListener('click', searchById)
btnSearch.addEventListener('click', searchByName)