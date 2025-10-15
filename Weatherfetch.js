let url = "https://api.open-meteo.com/v1/forecast?latitude=-6.1818&longitude=106.8223&current=temperature_2m"

const weatherParagraph = document.getElementById("weather");
const timeParagraph = document.getElementById("time");

fetch(url)
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(JSON.stringify(data, null, 2))
        console.log(data.current.temperature_2m)
        console.log(data.current.time)
        weatherParagraph.textContent = data.current.temperature_2m;
        timeParagraph.textContent = data.current.time;
    })
    .catch(err => {
        console.log(err);
        weatherParagraph.textContent = err;
        timeParagraph.textContent = err;
    })
        