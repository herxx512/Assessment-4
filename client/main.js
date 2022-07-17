// const { createCar } = require("../server/controller");
const carSection = document.querySelector('#carSection');
const form = document.querySelector('form')

const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById('fortuneButton')



const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

complimentBtn.addEventListener('click', getCompliment)

// Feature 1: GET
const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
}

fortuneBtn.addEventListener("click", getFortune)

// Add 3 More Features
const carCB = ({ data: cars }) => displayCars(cars)
let baseURL = "http://localhost:4000/api/cars/"

const getAllCars = () => {
    axios.get(baseURL)
        .then(carCB)
}

// Feature 2: POST
const createCar = body => {
    axios.post(baseURL, body)
        .then(carCB)
}

// Feature 3: PUT
const updateCar = (id, type) => {
    axios.put(`${baseURL}${id}`, {type})
    .then(carCB)
    .catch(err => alert(err.response.data))
}

// Feature 4: DELETE
const deleteCar = (id) => {
    axios.delete(`${baseURL}${id}`)
        .then(carCB)
}


function submitHandler(e) {
    e.preventDefault()

    let car = document.querySelector('#car')
    let price = document.querySelector('#price')
    let imageURL = document.querySelector('#img')

    let carObj = {
        car: car.value,
        price: price.value, 
        imageURL: imageURL.value
    }

    createCar(carObj)

    car.value = ''
    price.value = ''
    imageURL.value = ''
}

function createCarCard(car) {
    const carCard = document.createElement('div')
    carCard.classList.add('car-card')

    carCard.innerHTML = `
        <img alt='car cover image' src=${car.imageURL} class="car-cover-image"/>
        <p class="car">${car.car}</p>

        <div class="btns-container">
            <button onclick="updateCar(${car.id}, 'minus')">-</button>
            <p class="car-price">$${car.price}</p>
            <button onclick="updateCar(${car.id}, 'plus')">+</button>
        </div>

        <button onclick="deleteCar(${car.id})">Delete</button>
    `


    carSection.appendChild(carCard)
}

function displayCars(arr) {
    carSection.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createCarCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllCars()