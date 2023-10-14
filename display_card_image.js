// JSON - JavaScript Object Notation
function handleSearchKeyPress(event) {
    if (event.key === "Enter") {
        searchAltText();
    }
}

function searchAltText() {
    // Get the search query from the input field
    var query = document.getElementById('searchBar').value.toLowerCase();

    // Get all images on the page
    var images = document.getElementsByTagName('img');

    // Create an array to store matching results
    var results = [];

    // Loop through images and check if alt text contains the query
    for (var i = 0; i < images.length; i++) {
        var alt = images[i].alt.toLowerCase();
        if (alt.includes(query)) {
            results.push(images[i]);
        }
    }

    // Display search results
    var searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';
    if (results.length > 0) {
        for (var j = 0; j < results.length; j++) {
            var image = results[j];
            var section = image.closest('section');
            // var closest_class = image.closest('.near.ancestor');

            // Create an anchor link to the image and add an event listener to scroll to it
            var link = document.createElement('a');
            link.textContent = section.id + ': ' + image.alt; // + closest_class.className;

            link.className = 'search-result-link';
            link.href = '#' + section.id;
            link.addEventListener('click', function(e) {
                e.preventDefault();
                var targetId = e.target.getAttribute('href').substring(1);
                var targetElement = document.getElementById(targetId);
                targetElement.scrollIntoView({ behavior: 'smooth' });
            });
            searchResults.appendChild(link);
            searchResults.innerHTML += '<br>';
        }
    } else {
        searchResults.innerHTML = 'No matching alt text found.';
    }
}

function generateTemplateHTML(set_format,color) {
    var selector = `#${color} .template`
    fetch(`${set_format}/template_decks.json`)
        .then(response => response.json())
        .then(data => {
            console.log(data[color]);
            let sealeddeck_url = data[color]
            const elem = document.querySelector(selector)
            elem.innerHTML += `
            <hr>
            A <a href=${sealeddeck_url}> template deck</a> in SealedDeck.Tech
            `;
            })
}

function generateTop5HTML(set_format,color) {
    let selector = `#${color} .top5`
    console.log(selector)
    fetch(`${set_format}/${color}.json`)
        .then(response => response.json())
        .then(data => {
            console.log(data.num_decks);
            // number of decks
            let num = data.num_decks
            const elem = document.querySelector(selector)
            elem.innerHTML += `
            Top 5 most frequent cards (and two most associated cards of each) in ${num}/500 decks
            <br>
            `;

            //top 5 cards
            console.log(data.top5cards);
            let top5 = data.top5cards
            for (var key of Object.keys(top5)){
                console.log(key,top5[key]);
                let num = top5[key]
                let imgLink = `${set_format.substring(0,3)}/card/${key}.png`
                    const elem = document.querySelector(selector)
                    elem.innerHTML += `
                    <figure>
                    <div class='figure-search-text'>"${key}"</div>
                    <img src="${imgLink}" alt="${key} ${num}% (top 5)" style="width: 18vw; min-width: 100px;">
                    <figcaption>${num}%</figcaption>
                    </figure>
                    `;
            }

            document.querySelector(selector).innerHTML += `<br>`;

            // synergy cards
            let synergy_list = data.synergy_list
            // let cardlist_len = synergy_list[0].length
            for (var j=0; j<synergy_list.length; j++) {
                for (var i=0; i<2; i++) {
                // console.log(synergy_list[j][i][0])
                let key = synergy_list[j][i][0]
                let num = synergy_list[j][i][1]
                let imgLink = `${set_format.substring(0,3)}/card/${key}.png`
                    const elem = document.querySelector(selector)
                    elem.innerHTML += `
                    <figure>
                    <div class='figure-search-text'>"${key}"</div>
                    <img src="${imgLink}" alt="${key} ${num}% (main)" style="width: 8.9vw; min-width: 45px;">
                    <figcapsmall>${num}%</figcapsmall>
                    </figure>
                    `;
                }
            }
            document.querySelector(selector).innerHTML += `<br>`;
        })
}

function generateSplashHTML(set_format,color) {
    var selector = `#${color} .splash`
    fetch(`${set_format}/splash.json`)
        .then(response => response.json())
        .then(data => {
            console.log(data[color]);
            // let num = data[color]['deck_count']
            const elem = document.querySelector(selector)
            elem.innerHTML += `
            Cards worth splashing:
            <br>
            `;

            //worthy splashing cards
            let splash_cards = data[color]
            for (var key of Object.keys(splash_cards)){
                console.log(key,splash_cards[key]);
                let num = splash_cards[key]
                let imgLink = `${set_format.substring(0,3)}/card/${key}.png`
                    const elem = document.querySelector(selector)
                    elem.innerHTML += `
                    <figure>
                    <div class='figure-search-text'>"${key}"</div>
                    <img src="${imgLink}" alt="${key} ${num}% (splash)" style="width: 8.9vw; min-width: 45px;">
                    <figcapsmall>${num}%</figcapsmall>
                    </figure>
                    `;
            }
           elem.innerHTML += `<hr>`
        })
}
