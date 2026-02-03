// DOM Elements
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".btn[alt='Yes']");
const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

const prafulInitContainer = document.getElementById("praful-init-container");
const prafulBtn = document.getElementById("praful-btn");
const finalChoiceContainer = document.getElementById("final-choice-container");
const finalAccept = document.getElementById("final-accept");
const finalDecline = document.getElementById("final-decline");
const horseScreen = document.getElementById("horse-screen");

const chipiAudio = document.getElementById("chipi-audio");
const achyaAudio = document.getElementById("achya-audio");
const behuliAudio = document.getElementById("behuli-audio");

// Add Rain Animation Styles directly via JS to ensure it works
const style = document.createElement('style');
style.innerHTML = `
  .rose {
    position: fixed;
    top: -50px;
    z-index: 9999;
    user-select: none;
    pointer-events: none;
    animation: fall linear forwards;
  }
  @keyframes fall {
    to {
      transform: translateY(110vh) rotate(360deg);
    }
  }
`;
document.head.appendChild(style);

// 1. Open Envelope
envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";
    chipiAudio.play().catch(e => console.log(e));
    setTimeout(() => { document.querySelector(".letter-window").classList.add("open"); }, 50);
});

// 2. Button Fleeing Logic
function moveButton(btn) {
    const min = 150;
    const max = 250;
    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;
    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;
    btn.style.transition = "transform 0.3s ease";
    btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
}

noBtn.addEventListener("mouseover", () => moveButton(noBtn));
finalDecline.addEventListener("mouseover", () => moveButton(finalDecline));

// 3. Transitions
yesBtn.addEventListener("click", () => {
    chipiAudio.pause();
    title.textContent = "Eh Achyaaa!";
    catImg.src = "cat_dance.gif";
    document.querySelector(".letter-window").classList.add("final");
    buttons.style.display = "none";
    finalText.style.display = "block";
    achyaAudio.play().catch(e => console.log(e));
    setTimeout(() => { prafulInitContainer.style.display = "block"; }, 2000);
});

prafulBtn.addEventListener("click", () => {
    prafulInitContainer.style.display = "none";
    finalChoiceContainer.style.display = "block";
});

// 4. Final Sequence (Roses Rain)
finalAccept.addEventListener("click", () => {
    achyaAudio.pause();
    letter.style.display = "none";
    horseScreen.style.display = "flex";
    behuliAudio.play().catch(e => console.log(e));
    
    // Create roses like rain
    setInterval(createRose, 200); 
});

function createRose() {
    const rose = document.createElement("div");
    rose.innerHTML = "🌹"; 
    rose.classList.add("rose");
    rose.style.left = Math.random() * 100 + "vw";
    rose.style.fontSize = Math.random() * 20 + 25 + "px";
    rose.style.animationDuration = Math.random() * 2 + 3 + "s"; 
    document.body.appendChild(rose);
    setTimeout(() => { rose.remove(); }, 5000);
}