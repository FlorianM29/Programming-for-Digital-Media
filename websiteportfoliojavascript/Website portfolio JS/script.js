//CONTACT FORM
// Get data
const nameInput = document.querySelector("#name");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const success = document.querySelector("#success");
const errorNodes = document.querySelectorAll(".error"); 

// validate data
function validateForm(){
    clearMessages();
    let errorFlag = false;

    if(nameInput.value.length < 1){
        errorNodes[0].innerText = "Name cannot be blank";
        nameInput.classList.add("error-border");
        errorFlag = true;
    }

    if(!emailIsValid(email.value)){
        errorNodes[1].innerText = "Invalid email address";
        email.classList.add("error-border"); 
        errorFlag = true;
    }

    if(message.value.length < 1){
        errorNodes[2].innerText = "Please enter message";
        message.classList.add("error-border"); 
        errorFlag = true;
    }

    if(!errorFlag){
        success.innerText = "Success!";
        resetForm();
    }
}

// clear error / success messages
function clearMessages(){
    for(let i = 0; i < errorNodes.length; i++){
        errorNodes[i].innerText = "";
    }
    success.innerText = "";
    nameInput.classList.remove("error-border");
    email.classList.remove("error-border");
    message.classList.remove("error-border");
}

// check if email is valid
function emailIsValid(email){
    let pattern = /\S+@\S+\.\S+/;
    return pattern.test(email);
}

// reset form after successful submission
function resetForm() {
    const form = document.querySelector('form');
    form.reset(); 
    setTimeout(() => {
        success.innerText = "";
    }, 3000);
}

// dark mode/light mode
let lightmode = localStorage.getItem('lightmode')
const themeSwitch = document.getElementById('theme-switch')

const enableLightmode = () => {
    document.body.classList.add('lightmode')
    localStorage.setItem('lightmode', 'active')
}

const disableLightmode = () => {
    document.body.classList.remove('lightmode')
    localStorage.setItem('lightmode', 'null')
}

if(lightmode === "active") enableLightmode()
    
themeSwitch.addEventListener("click", () => {
    lightmode = localStorage.getItem('lightmode')
    lightmode !== "active" ? enableLightmode() : disableLightmode()
})

// Highlight current page in navigation
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav .right a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', highlightCurrentPage);

// Lightbox
const lightbox = document.createElement('div')
lightbox.id = 'lightbox'
document.body.appendChild(lightbox)

const images = document.querySelectorAll('.collage img')
images.forEach(image => {
    image.addEventListener('click', e => {
        openLightbox(image)
    })
})

function openLightbox(image) {
    lightbox.classList.add('active')
    
    // lightbox content container
    const lightboxContent = document.createElement('div')
    lightboxContent.className = 'lightbox-content'
    
    // close button
    const closeBtn = document.createElement('button')
    closeBtn.className = 'lightbox-close'
    closeBtn.innerHTML = '×'
    closeBtn.addEventListener('click', closeLightbox)
    
    // image element
    const img = document.createElement('img')
    img.src = image.src
    img.alt = image.alt
    
    // Create title element
    const title = document.createElement('div')
    title.className = 'lightbox-title'
    title.textContent = image.getAttribute('data-title') || image.alt
    
    // lightbox and append new content
    while (lightbox.firstChild) {
        lightbox.removeChild(lightbox.firstChild)
    }
    
    lightboxContent.appendChild(closeBtn)
    lightboxContent.appendChild(img)
    lightboxContent.appendChild(title)
    lightbox.appendChild(lightboxContent)
    
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden'
}

function closeLightbox() {
    lightbox.classList.remove('active')
    document.body.style.overflow = 'auto'
}

lightbox.addEventListener('click', e => {
    if (e.target === lightbox) {
        closeLightbox()
    }
})

// Weather and time in Jakarta
let url = "https://api.open-meteo.com/v1/forecast?latitude=-6.1818&longitude=106.8223&current=temperature_2m"

const weatherParagraph = document.getElementById("temperature");
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
        
