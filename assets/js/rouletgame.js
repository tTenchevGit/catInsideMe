
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("rouletteModal");
    const btn = document.getElementById("startGame");
    const span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "flex"; // Ensure the modal is centered
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    const wheel = document.getElementById('wheel');
    const spinButton = document.getElementById("spinButton");
    const resultText = document.getElementById("resultText");

    // Correct order of numbers on a roulette wheel
    const numbers = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
    const totalNumbers = numbers.length;
    const colors = ["green", "black", "red", "black", "red", "black", "red", "black", "red", "black", "red", "black", "red", "black", "red", "black", "red", "black", "red", "black", "red", "black", "red", "black", "red", "black", "red", "black", "red", "black", "red", "black", "red", "black", "red", "black", "red"];

    // Insert numbers around the wheel
    for (let i = 0; i < totalNumbers; i++) {
        const angle = i * (360 / totalNumbers);
        const x = 200 + 160 * Math.cos(angle * Math.PI / 180); // 200 is half the wheel's size, 160 is radius
        const y = 200 + 160 * Math.sin(angle * Math.PI / 180); // 200 is half the wheel's size, 160 is radius
        const numberElem = document.createElement('div');
        numberElem.className = `roulette-number ${colors[i]}`;
        numberElem.style.left = `${x}px`;
        numberElem.style.top = `${y}px`;
        numberElem.innerText = numbers[i];
        wheel.appendChild(numberElem);
    }

    spinButton.onclick = function() {
        const randomNumberIndex = Math.floor(Math.random() * totalNumbers);
        const randomNumber = numbers[randomNumberIndex];
        const degrees = randomNumberIndex * (360 / totalNumbers) + (360 * 4); // 4 full spins for better visual
        wheel.style.transition = 'transform 4s ease-out';
        wheel.style.transform = `rotate(${degrees}deg)`;

        setTimeout(() => {
            resultText.innerHTML = "The wheel landed on: " + randomNumber;
            wheel.style.transition = ''; // Remove transition for the next spin
            wheel.style.transform = `rotate(${randomNumberIndex * (360 / totalNumbers)}deg)`; // Reset to final position
        }, 4000); // Duration of the spin animation
    }
});