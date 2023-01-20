/* Global Variables */
const generateBtn = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1)+'.'+ d.getDate()+'.'+ d.getFullYear();

// weather API
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = ',&appid=58e4e46efd2a4259dbbe7eaa34a94100&units=imperial';


// Event listener to add function to existing HTML DOM element
generateBtn.addEventListener('click', getData);


function getData() {
    let zip = document.getElementById("zip").value;
    let feelings = document.getElementById("feelings").value;

    weatherData(baseUrl, zip, apiKey)
    .then(function(data) {
        postData('/add', {
            temp: data.main.temp,
            date: newDate,
            content: feelings
        });
    }).then(function() {
        updateUI()
    }).catch(function(error) {
        console.log(error);
    });
}


async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            temp: data.temp,
            date: data.date,
            content: data.content
        })
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log(error);
    }
};

const weatherData = async(baseUrl, zip, apiKey) => {
    const res = await fetch(baseUrl + zip + apiKey);
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error', error);
    }
};



async function updateUI() {
    let responce = await (await fetch("/all")).json()

    try {
        document.getElementById('date').innerHTML = responce.date;
        document.getElementById('temp').innerHTML = (responce.temp).toFixed(0) + ' F';
        document.getElementById('content').innerHTML = responce.content;
    } catch (error) {
        console.log(error);
    }
}