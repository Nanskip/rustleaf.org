const playsSpan = document.querySelectorAll("#api-plays");
const plays24hSpan = document.querySelectorAll("#api-plays24h");
const onlineSpan = document.querySelectorAll("#api-online");

const playBtn = document.querySelectorAll(".play-btn");
const dcBtn = document.querySelectorAll(".dc-btn");

const faqPanel = document.querySelectorAll(".faq-panel");

const homePanel = document.querySelectorAll(".home-panel > *");

function showElements() {
    homePanel.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.2}s`;
        el.classList.add("active");
    });
}

//DATA CARDS SUKA NAHUI  :[

const cardPanel = document.querySelector(".card-panel");
let currentIndex = 0;

const cardsData = [
    {
        img: "https://cdn.airship.gg/images/c0101a72-4e65-4dc8-86e9-cc8c1a1550cf",
        title: "GG Farm",
        description: "Plant, grow, upgrade — repeat. A comfy farming loop with ongoing updates and tuning.",
        playLink: "https://airship.gg/g/ggfarm",
        discordLink: "https://discord.com/invite/jFwz3bvFhb",
        api: "https://api.airship.gg/content/games/slug/ggfarm?liveStats=true"
    },
    {
        img: "https://cdn.airship.gg/images/b1efac3c-084f-4395-864e-bd8787d5cb6d",
        title: "Drive",
        description: "Simple driving game. Reach the highest score you can!",
        playLink: "https://airship.gg/g/4cc4789d-5b41-4e13-8cda-60ab6a6496c3",
        discordLink: "https://discord.com/invite/jFwz3bvFhb",
        api: "https://api.airship.gg/content/games/slug/4cc4789d-5b41-4e13-8cda-60ab6a6496c3?liveStats=true"
    }
];

async function renderCard(index) {
    const data = cardsData[index];

    const res = await fetch(
        data.api
    );
    const dataAPI = await res.json();
    const onlineCount = dataAPI.game.liveStats.playerCount;
    const playsCount = dataAPI.game.plays;


    cardPanel.innerHTML = `
        <div class="card card-in">
            <div class="card-img">
                <img src="${data.img}" alt="card-img-preview">
            </div>
            <div class="card-info">
                <div class="card-status"> 

                    <div class="card-dot"></div>
                    <div class="status-info">
                        <p>
                            Plays:
                            <span id="api-online" class="card-hg">${playsCount}</span>
                        </p>
                        <p>
                            Online:
                            <span id="api-online" class="card-hg">${onlineCount}</span>
                        </p>
                        
                        
                    </div>
                </div>
                <h1>${data.title}</h1>
                <p>${data.description}</p>
                <div class="card-buttons">
                    <button class="play-btn">Play ${data.title}</button>
                    <button class="dc-btn">Discord</button>
                </div>
            </div>
        </div>
    `;
    const playBtn = cardPanel.querySelector(".play-btn");
    const dcBtn = cardPanel.querySelector(".dc-btn");

    playBtn.onclick = () => window.open(data.playLink, "_blank");
    dcBtn.onclick = () => window.open(data.discordLink, "_blank");
}

function changeCard(newIndex) {
    const card = cardPanel.querySelector(".card");

    if (!card) {
        renderCard(newIndex);
        currentIndex = newIndex;
        return;
    }

    card.classList.remove("card-in");
    card.classList.add("card-out");

    let isChanged = false;
    const triggerChange = () => {
        if (!isChanged) {
            isChanged = true;
            renderCard(newIndex);
            currentIndex = newIndex;
        }
    };

    card.addEventListener("animationend", triggerChange, { once: true });
    setTimeout(triggerChange, 100);
}



document.getElementById("prev-btn").addEventListener("click", () => {
    const newIndex = (currentIndex - 1 + cardsData.length) % cardsData.length;
    changeCard(newIndex);
});

document.getElementById("next-btn").addEventListener("click", () => {
    const newIndex = (currentIndex + 1) % cardsData.length;
    changeCard(newIndex);
});


async function setAll() {
    playBtn.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector("#games").scrollIntoView({
                behavior: "smooth"
            });
        });
    })
    
    dcBtn.forEach(button => {
        button.addEventListener('click', () => {
            window.open("https://discord.com/invite/jFwz3bvFhb", '_blank');
        });
    });
}


setAll();
window.addEventListener("load", showElements);
renderCard(currentIndex);