// script.js
const card = document.querySelector('.card');
const shield = document.getElementById('shield');
const swordFront = document.getElementById('sword-front');
const swordBack = document.getElementById('sword-back');
const swordPulled = document.getElementById('sword-pulled');
const swordPlaced = document.getElementById('sword-placed');
const swordSwing = document.getElementById('sword-swing');
swordPlaced.volume = 0.4
swordPulled.volume = 0.12
swordSwing.volume = 0.12

let swordOut = false;
let cardFlipped = false;
// Load only the sword SVG

loadSVG('sword_front.svg', 'sword-front');
loadSVG('shield.svg', 'shield');
loadSVG('sword_back.svg', 'sword-back');

function playSound(sound) {
    if(sound == "sword-pulled"){
        swordPulled.play();
    }
    if(sound == "sword-placed"){
        swordPlaced.play();
    }
    if(sound == "sword-swing"){
        swordSwing.play();
    }
}

function loadSVG(url, containerId) {
    fetch(url)
        .then(response => response.text())
        .then(svgContent => {
            document.getElementById(containerId).innerHTML = svgContent;

            // Attach click event listener after SVG is loaded
            const svgElement = document.getElementById(containerId).querySelector('svg');
            // Select the specific path by ID and store it
            const pathElement = svgElement.querySelector('#outline');
            
            if (!pathElement) {
                console.error("Path element with id 'outline' not found in the SVG.");
                return;
            }

            // Define the hover effect for the specific path
            pathElement.addEventListener('mouseover', () => {
                pathElement.classList.add('highlight');
            });

            pathElement.addEventListener('mouseout', () => {
                pathElement.classList.remove('highlight');
            });

            // Attach click event directly to the path element
            pathElement.addEventListener('click', (event) => {

                click_action(containerId)
                
            });

            
            if (containerId == "sword-front")
            {
                const mySturf = svgElement.querySelector('g#mystuff text');
                // Define the hover effect for the specific path
                console.log('mySturf:', mySturf);

                // Step 5: Create an <a> element and wrap the <text> in it
                const link = document.createElementNS('http://www.w3.org/2000/svg', 'a');
                link.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'https://linktr.ee/Doriana_Othman');
                link.setAttribute('target', '_blank');

                 // Move the <text> element inside the <a> element
                const parent = mySturf.parentNode;
                parent.insertBefore(link, mySturf);
                link.appendChild(mySturf); // Append <text> to the <a>
            }
        })
        .catch(error => console.error('Error loading SVG:', error));
}

function click_action(containerId){
    switch(containerId){

        case "shield":
            if (swordOut) {
                playSound("sword-placed");
                card.classList.remove('sword-out');
                swordFront.classList.remove('flipped-horizontal');
                swordBack.classList.remove('flipped-horizontal');
                swordOut = false;
            } else {
                card.classList.toggle('flipped');
                cardFlipped = !cardFlipped;
            }
            break;

        case "sword-front":
            if (!swordOut) {
                card.classList.add('sword-out');
                swordOut = true;
            } else {
                playSound("sword-swing");
                swordFront.classList.toggle('flipped-horizontal');
                swordBack.classList.toggle('flipped-horizontal');
            }
            break;
            
        case "sword-back":
            if (swordOut) {
                playSound("sword-swing");
                swordFront.classList.toggle('flipped-horizontal');
                swordBack.classList.toggle('flipped-horizontal');
            }
            else{
                playSound("sword-pulled");
                card.classList.add('sword-out');
                swordOut = !swordOut
            }
            break;

    }
}
