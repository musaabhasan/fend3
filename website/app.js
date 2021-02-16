/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// API credentials

let baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
const apiKey = '&appid=EnterYourAPIKey&units=metric';

// listen to generate button click

document.getElementById('generate').addEventListener('click', genFunc);

function genFunc(e) {
    const newZip = document.getElementById('zip').value;
    //   console.log(newZip);
    //   console.log(zip);
    const feelings = document.getElementById('feelings').value;
    //    console.log("feelings");
    //    console.log(feelings);
    getWeather(baseURL, newZip, apiKey)
        .then(function(data) {
            //            console.log("data");
            //           console.log(data);
            postData('/add', { date: newDate, temp: data.list[0].main.temp, content: feelings })
            updateUI();
        });
}

const getWeather = async(baseURL, zip, key) => {
    const res = await fetch(baseURL + zip + key)
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("Error", error);
    }
}

//posting the data to the server

const postData = async(url = '', data = {}) => {
    //   console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credemtials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("Error", error);
    }
}


const updateUI = async() => {
    const request = await fetch('/all');
    //   console.log("request");
    //   console.log(request);
    try {
        const allData = await request.json();

        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${allData.temp}`;
        document.getElementById('content').innerHTML = `I feel ${allData.content}`;
    } catch (error) {
        console.log("Error", error);
    }
}