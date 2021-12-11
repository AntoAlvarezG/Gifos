const KEY = "Zt6N7LUtU68Rv4dbIxa6ZK6CugsDHN20";
var offset = 0;

async function getData (url) {
    try {
        let response = await fetch(url);
        response = await response.json();
        let data = response.data;
        return data;
    } catch {
        err => console.log(err);
    }
}

function createCard (url, user, title, className) {
    let cardContainer = document.createElement('div');
    let cardContent = `<img class="card_img" src="${url}">
                        <div class="hover_info">
                            <h4>${user}</h4>
                            <h3>${title}</h3>
                        </div>`;  
    cardContainer.innerHTML = cardContent;
    cardContainer.classList.add(className);
    return cardContainer;
}


// search gifs funcionality

const SEARCH_RESULTS = document.getElementById('search_results_section');
const TT_SECTION = document.getElementById('tt_section');
const SEARCH_ICON = document.getElementById('search_img');
const RESULTS_TITLE = document.getElementById('search_title');
const RESULTS_CONTAINER = document.getElementById('cont_search_cards');
const NO_RESULTS_SECTION = document.getElementById('search_noresults_section');
const NO_RESULTS_TITLE = document.getElementById('search_title_noresults');
const SEARCH_INPUT = document.getElementById('hero_input');
const SHOW_MORE_BTN = document.getElementById('btn_more');

async function searchGifs (query) {
    try{
        let searchData = await getData(`https://api.giphy.com/v1/gifs/search?api_key=${KEY}&q=${query}&limit=12&offset=${offset}`);
        if (searchData.length == 0) {
            // no results section display
            NO_RESULTS_SECTION.style.display = "flex";
            NO_RESULTS_TITLE.innerText = `${query.charAt().toUpperCase() + query.toLowerCase().slice(1)}`;
            NO_RESULTS_SECTION.scrollIntoView();
        } 
        if (searchData.length != 0 && searchData.length < 12) {
            // results section display
            SEARCH_RESULTS.style.display = "flex";
            TT_SECTION.style.display = "none";
            for (let i = 0; i <= searchData.length; i++) {
                // get search info
                let url = searchData[i].images.downsized_medium.url;
                let user = searchData[i].username;
                let title = searchData[i].title;
                // create search cards
                let searchCard = createCard(url, user, title, 'search_card');
                // append search cards
                RESULTS_CONTAINER.appendChild(searchCard);
                // change title according to search value
                RESULTS_TITLE.innerText = `${query.charAt().toUpperCase() + query.toLowerCase().slice(1)}`;
                hoverInfo("search_card");
            }
        }
        if (searchData.length >= 12) {
            // results section display without show more button
            SEARCH_RESULTS.style.display = "flex";
            TT_SECTION.style.display = "none";
            for (let i = 0; i <= searchData.length; i++) {
                let url = searchData[i].images.downsized_medium.url;
                let user = searchData[i].username;
                let title = searchData[i].title;
                let searchCard = createCard(url, user, title, 'search_card');
                RESULTS_CONTAINER.appendChild(searchCard);
                RESULTS_TITLE.innerText = `${query.charAt().toUpperCase() + query.toLowerCase().slice(1)}`;
                SHOW_MORE_BTN.classList.remove("hidden");
                hoverInfo("search_card");
            }
        } 
    } catch {
        err => console.log(err);
    }
}

function displayMore (value) {
    SHOW_MORE_BTN.addEventListener('click', () => {
        offset += 12;
        searchGifs(value);
    })
} 

SEARCH_ICON.addEventListener("click", () => {
    searchGifs(SEARCH_INPUT.value);
    displayMore(SEARCH_INPUT.value);
})

SEARCH_INPUT.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        searchGifs(SEARCH_INPUT.value);
        displayMore(SEARCH_INPUT.value);
    }    
})


// display trending topics functionality

const TT_LIST = document.getElementsByClassName('tt_li');
const LAST_TT = document.getElementsByClassName('tt_li last');

async function showTopics () {
    try{
        // get trending topics data
        let topics = await getData(`https://api.giphy.com/v1/trending/searches?api_key=${KEY}`);
        topics = topics.slice(0,5);
        // show trending topics list
        for (let i = 0; i < topics.length; i++) {
            TT_LIST[i].innerText = `${topics[i].charAt().toUpperCase() + topics[i].toLowerCase().slice(1)}, `;
            LAST_TT[0].innerText = `${topics[i].charAt().toUpperCase() + topics[i].toLowerCase().slice(1)}`;
        }
    } catch {
        err => console.log(err);
    }
}

showTopics();


// search trending topics functionality

for (let i = 0; i < TT_LIST.length; i++) {
    TT_LIST[i].addEventListener("click", () => {
        searchGifs(TT_LIST[i].innerText.replace(/,\s*$/, ""));
        displayMore(TT_LIST[i].innerText.replace(/,\s*$/, ""));
    })
}


// trending slider functionality

const LEFT_BTN = document.getElementById("btn_left_slider");
const RIGHT_BTN = document.getElementById("btn_right_slider");
const TRENDING_CONTAINER = document.getElementById('cont_trending_cards');

RIGHT_BTN.addEventListener("click", () => {
    TRENDING_CONTAINER.innerHTML = "";
    offset += 3;
    trendingGifs();
})

LEFT_BTN.addEventListener("click", () => {
    if (offset != 0) {
        TRENDING_CONTAINER.innerHTML = "";
        offset -= 3;
        trendingGifs();
    }
})

async function trendingGifs () {
    try {
        let trendingData = await getData(`https://api.giphy.com/v1/gifs/trending?api_key=${KEY}&limit=3&offset=${offset}`); 
        for (let i = 0; i <= trendingData.length; i++) {
            // get trending gifs info
            let url = trendingData[i].images.downsized_medium.url;
            let user = trendingData[i].username;
            let title = trendingData[i].title;
            // create trending cards
            let trendingCard = createCard(url, user, title, 'trending_card');
            // append trending cards into slider 
            TRENDING_CONTAINER.appendChild(trendingCard);
            // call hover function
            hoverInfo("trending_card");
        }
    } catch {
        err => console.log(err);
    }
}

trendingGifs();


// display gifs info on hover functionality

function hoverInfo (className) {
    let array = document.getElementsByClassName(className);
    for (let i = 0; i < array.length; i++) {
        // on mouse enter show info
        array[i].addEventListener("mouseenter", () => {
            document.getElementsByClassName("hover_info")[i].style.display = "flex";
        });
        // on mouse leave hide info
        array[i].addEventListener("mouseleave", () => {
            document.getElementsByClassName("hover_info")[i].style.display = "none";
        })
    }
}


