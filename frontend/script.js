import * as model from "./auth/model.js"
const accessKey = "td5MUf96ipXLw6QTZWcO0Mfa50IAmPOcB2KPDJUw7Nc"
const form = document.querySelector('form')
const inputEl = document.querySelector('.search-input')
const serchResults = document.querySelector('.search-results')
const showMore = document.querySelector('.show-more-button')
const logout = document.querySelector('.logout')

let page = 1
let inputData = ""
const searchImages = async () => {
    try {
        let x = inputData
        inputData = inputEl.value
        if (x !== inputEl.value && x !== "") {
            serchResults.innerHTML = ""
        }
        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`
        const res = await fetch(url)
        const data = await res.json()
        const results = data.results
        if (page === 1) {
            serchResults.innerHTML = ""
        }
        results && results.map((e) => {
            const html = `<div class="search-result">
            <img src=${e.urls.small}  />
            <a href=${e.links.html} class="description">${e.alt_description}</a>
        </div>`
            console.log(e);
            serchResults.insertAdjacentHTML('beforeend', html)
        })

        showMore.style.display = 'block'
        page++
    } catch (error) {
        console.log(error);
    }
}
form.addEventListener('submit', (e) => {
    e.preventDefault()
    searchImages()
})
showMore.addEventListener('click', () => {
    searchImages()
})
logout.addEventListener('click', () => {
    model.logout()
})