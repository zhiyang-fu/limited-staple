//import axios from 'axios'
// JSON - JavaScript Object Notation
async function fetchCardImage(card) {
    const fetchableName = card.replace(/\s+/g, '+')
    let headers = new Headers([
        ['Content-Type', 'application/json'],
        ['Accept', 'application/json']
        ]);
    let request = new Request(`https://api.scryfall.com/cards/named?exact=${fetchableName}`,{
    method: 'GET',
    headers: headers
    });
    let result = await fetch(request);
    let response = await result.json();
    // console.log(response);
    return response.image_uris.normal;
}

function generateHTML(color) {
    fetch(`json/${color}.json`)
        .then(response => response.json())
        .then(data => {
            console.log(data.num_decks);
            // number of decks
            let num = data.num_decks
            const elem = document.querySelector(`#${color}`)
            elem.innerHTML += `
            ${num}/500
            <hr>
            `;

            //top 5 cards
            console.log(data.top5cards);
            let top5 = data.top5cards
            for (var key of Object.keys(top5)){
                console.log(key,top5[key]);
                let num = top5[key]
                fetchCardImage(key).then(
                    imgLink => {
                    console.log(imgLink);
                    const elem = document.querySelector(`#${color}`)
                    elem.innerHTML += `
                    <figure>
                    <img src="${imgLink}" alt="${key}" style="width: 18vw; min-width: 100px;">
                    <figcaption>${num}%</figcaption>
                    </figure>
                    `;
                    }
                );
            }

            document.querySelector(`#${color}`).innerHTML += `<br>`;

            // synergy cards
            let synergy_list = data.synergy_list
            // let cardlist_len = synergy_list[0].length
            for (var j=0; j<synergy_list.length; j++) {
                for (var i=0; i<2; i++) {
                // console.log(synergy_list[j][i][0])
                let key = synergy_list[j][i][0]
                let num = synergy_list[j][i][1]
                fetchCardImage(key).then(
                    imgLink => {
                    const elem = document.querySelector(`#${color}`)
                    elem.innerHTML += `
                    <figure>
                    <img src="${imgLink}" alt="${key}" style="width: 8.8vw; min-width: 45px;">
                    <figcapsmall>${num}%</figcapsmall>
                    </figure>
                    `;
                    }
                );
                }
            }
        })
}