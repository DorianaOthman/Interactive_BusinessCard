/*The code below allows the buisness card to flip *only* 
when the card itself is clicked, not any links */

document.getElementById('business-card').addEventListener('click', function(event) {
    if (event.target.closest('.no-flip')) {
        return;
    }
    this.classList.toggle('flipped');
});
