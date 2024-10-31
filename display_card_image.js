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
    fetch(`${set_format}/template/template_decks.json`)
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
    fetch(`${set_format}/template/${color}.json`)
        .then(response => response.json())
        .then(data => {
            console.log(data.num_decks);
            // number of decks
            let num = data.num_decks
            const elem = document.querySelector(selector)
            elem.innerHTML += `
            Top 20 most frequent cards (3 rare or above, 7 uncommon, and 10 common) in ${num} decks
            <br>
            `;

            //top 3 rare
            console.log(data.topcards_rare);
            let top_rare = data.topcards_rare;
            var keys = Object.keys(top_rare);
            var n;
            if (keys.length < 3) {
                n = keys.length;
            } else {
                n = 3;
            }
            // for (var key of Object.keys(top_rare)){
            for (var i=0; i < n; i++) {
                var key = keys[i];
                console.log(key,top_rare[key]);
                let num = top_rare[key]
                let imgLink = `${set_format.substring(0,8)}/card/${key}.png`
                    // <div class='figure-search-text'>"${key}"</div>
                    // const elem = document.querySelector(selector)
                    elem.innerHTML += `
                    <figure>
                    <img src="${imgLink}" alt="${key} ${num}% (rare #${i+1})" style="width: 15.5vw; min-width: 45px;">
                    <figcapsmall>${num}%</figcapsmall>
                    </figure>
                    `;
            }

            //top 6 uncommon
            console.log(data.topcards_uncommon);
            let top_uncommon = data.topcards_uncommon;
            var keys = Object.keys(top_uncommon);
            var n;
            if (keys.length < 6) {
                n = keys.length;
            } else {
                n = 6;
            }
            // for (var key of Object.keys(top_rare)){
            for (var i=0; i < n; i++) {
                var key = keys[i];
                console.log(key,top_uncommon[key]);
                let num = top_uncommon[key]
                let imgLink = `${set_format.substring(0,8)}/card/${key}.png`
                    // <div class='figure-search-text'>"${key}"</div>
                    // const elem = document.querySelector(selector)
                    elem.innerHTML += `
                    <figure>
                    <img src="${imgLink}" alt="${key} ${num}% (uncommon #${i+1})" style="width: 15.5vw; min-width: 45px;">
                    <figcapsmall>${num}%</figcapsmall>
                    </figure>
                    `;
            }
            // document.querySelector(selector).innerHTML += `<br>`;

            //top 9 common
            console.log(data.topcards_common);
            let top_common = data.topcards_common;
            var keys = Object.keys(top_common);
            var n;
            if (keys.length < 9) {
                n = keys.length;
            } else {
                n = 9;
            }
            // for (var key of Object.keys(top_rare)){
            for (var i=0; i < n; i++) {
                var key = keys[i];
                console.log(key,top_common[key]);
                let num = top_common[key]
                let imgLink = `${set_format.substring(0,8)}/card/${key}.png`
                    // <div class='figure-search-text'>"${key}"</div>
                    // const elem = document.querySelector(selector)
                    elem.innerHTML += `
                    <figure>
                    <img src="${imgLink}" alt="${key} ${num}% (common #${i+1})" style="width: 15.5vw; min-width: 45px;">
                    <figcapsmall>${num}%</figcapsmall>
                    </figure>
                    `;
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
                if (num>=10) {
                    let imgLink = `${set_format.substring(0,8)}/card/${key}.png`
                        // const elem = document.querySelector(selector)
                        // <div class='figure-search-text'>"${key}"</div>
                        elem.innerHTML += `
                        <figure>
                        <img src="${imgLink}" alt="${key} ${num}% (splash)" style="width: 15.5vw; min-width: 45px;">
                        <figcapsmall>${num}%</figcapsmall>
                        </figure>
                        `;
                }
            }
           elem.innerHTML += `<hr>`
        })
}
