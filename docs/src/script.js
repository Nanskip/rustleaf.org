const playsSpan = document.querySelectorAll("#api-plays");
const plays24hSpan = document.querySelectorAll("#api-plays24h");
const onlineSpan = document.querySelectorAll("#api-online");

const playBtn = document.querySelectorAll(".play-btn");
const dcBtn = document.querySelectorAll(".dc-btn");

const faqPanel = document.querySelectorAll(".faq-panel");

const homePanel = document.querySelectorAll(".home-panel > *");
const cardPanel = document.querySelectorAll(".card > *");

function showElements() {

    homePanel.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.2}s`;
        el.classList.add("active");
    });
}

async function fetchAll() {
    const res = await fetch(
        "https://api.airship.gg/content/games/slug/68205ca8-cf2f-4500-a61c-372e2a954d1e?liveStats=true"
    );
    const data = await res.json();
    const onlineCount = data.game.liveStats.playerCount;
    const plays24hCount = data.game.plays24h;
    const playsCount = data.game.plays;

    console.log(onlineCount);
    console.log(plays24hCount);
    console.log(playsCount);

    playBtn.forEach(button => {
        button.addEventListener('click', () => {
            window.open("https://airship.gg/g/ggfarm", '_blank');
        });
    })
    
    dcBtn.forEach(button => {
        button.addEventListener('click', () => {
            window.open("https://discord.com/invite/jFwz3bvFhb", '_blank');
        });
    });

    onlineSpan.forEach(span => {
        span.textContent = onlineCount; 
    }); 

    plays24hSpan.forEach(span => {
        span.textContent = plays24hCount; 
    }); 

    playsSpan.forEach(span => {
        span.textContent = playsCount; 
    });

    faqPanel.forEach(faqCard => {
        faqCard.addEventListener
    });
}


fetchAll();
window.addEventListener("load", showElements);