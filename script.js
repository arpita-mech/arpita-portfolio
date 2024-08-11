let words = document.querySelectorAll(".word");
words.forEach((word) => {
    let letters = word.textContent.split("");
    word.textContent = "";
    letters.forEach((letter) => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.append(span);
    });
});

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1";

let changeText = () => {
    let currentWord = words[currentWordIndex];
    let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

    Array.from(currentWord.children).forEach((letter, i) => {
        setTimeout(() => {
            letter.className = "letter out";
        }, i * 80);
    });

    nextWord.style.opacity = "1";
    Array.from(nextWord.children).forEach((letter, i) => {
        letter.className = "letter behind";
        setTimeout(() => {
            letter.className = "letter in";
        }, 340 + i * 80);
    });

    setTimeout(() => {
        currentWord.style.opacity = "0";
    }, 2000);

    currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

changeText();
setInterval(changeText, 3000);

// FORM SUBMISSION-----------------------////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const thankYouMessage = document.getElementById("thank-you");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                form.reset(); // Reset the form fields
                thankYouMessage.style.display = "block"; // Show thank you message
            } else {
                alert("Oops! There was a problem submitting your form");
            }
        } catch (error) {
            alert("Oops! There was a problem submitting your form");
        }
    });
});

// CIRCLE SKILLS///////////////////////////////////////////
const circles = document.querySelectorAll('.circle');
circles.forEach(elem => {
    var dots = elem.getAttribute("data-dots");
    var marked = elem.getAttribute("data-percent");
    var percent = Math.floor(dots * marked / 100);
    var points = "";
    var rotate = 360 / dots;

    for (let i = 0; i < dots; i++) {
        points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
    }
    elem.innerHTML = points;

    const pointsMarked = elem.querySelectorAll('.points');
    for (let i = 0; i < percent; i++) {
        pointsMarked[i].classList.add('marked')
    }
});

// MIX-IT UP PORTFOLIO////////////////////////
var mixer = mixitup('.portfolio-gallery');


// ACTIVE MENU////////////////////////////////////////////////


let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

// Function to handle the menu toggle
const toggleMenu = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// Function to handle section clicks
const disableMenu = () => {
    if (navbar.classList.contains('active')) {
        toggleMenu(); // Close the menu if it's open
    }
}

// Scroll event to highlight the active section link
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(id)) {
                    link.classList.add('active');
                }
            });
        }
    });
};

// Toggle menu on menu icon click
menuIcon.onclick = toggleMenu;

// Add event listeners to sections to disable the menu on click
sections.forEach(section => {
    section.addEventListener('click', disableMenu);
});


// PARALLAX///////////////////////////////////////////////////////////////////////
const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show-items");

        } else {

            entry.target.classList.remove("show-items");

        }

    });

});

const scrollScale = document.querySelectorAll(".scroll-scale"); 
scrollScale.forEach((el) => observer.observe(el));

const scrollBottom = document.querySelectorAll(".scroll-bottom");
scrollBottom.forEach((el) => observer.observe(el));

const scrollTop = document.querySelectorAll(".scroll-top");
scrollTop.forEach((el) => observer.observe(el));