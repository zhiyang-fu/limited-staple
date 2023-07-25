//import axios from 'axios'
// JSON - JavaScript Object Notation
function generateTemplateHTML(set_format,color) {
    fetch(`${set_format}/template_decks.json`)
        .then(response => response.json())
        .then(data => {
            console.log(data[color]);
            let sealeddeck_url = data[color]
            const elem = document.querySelector(`#${color}`)
            elem.innerHTML += `
            open a <a href=${sealeddeck_url}> template deck</a> in SealedDeck.Tech
            `;
            })
}

function generateTop5HTML(set_format,color) {
    fetch(`${set_format}/${color}.json`)
        .then(response => response.json())
        .then(data => {
            console.log(data.num_decks);
            // number of decks
            let num = data.num_decks
            const elem = document.querySelector(`#${color}`)
            elem.innerHTML += `
            ${num}/500;
            <hr>
            `;

            //top 5 cards
            console.log(data.top5cards);
            let top5 = data.top5cards
            for (var key of Object.keys(top5)){
                console.log(key,top5[key]);
                let num = top5[key]
                let imgLink = `${set_format.substring(0,3)}/card/${key}.png`
                    const elem = document.querySelector(`#${color}`)
                    elem.innerHTML += `
                    <figure>
                    <img src="${imgLink}" alt="${key}" style="width: 18vw; min-width: 100px;">
                    <figcaption>${num}%</figcaption>
                    </figure>
                    `;
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
                let imgLink = `${set_format.substring(0,3)}/card/${key}.png`
                    const elem = document.querySelector(`#${color}`)
                    elem.innerHTML += `
                    <figure>
                    <img src="${imgLink}" alt="${key}" style="width: 8.9vw; min-width: 45px;">
                    <figcapsmall>${num}%</figcapsmall>
                    </figure>
                    `;
                }
            }
            document.querySelector(`#${color}`).innerHTML += `<br>`;
        })
}

function generateSplashHTML(set_format,color) {
    fetch(`${set_format}/splash.json`)
        .then(response => response.json())
        .then(data => {
            console.log(data[color]);
            // let num = data[color]['deck_count']
            const elem = document.querySelector("#splash")
            elem.innerHTML += `
            cards worth splashing
            <hr>
            `;

            //worthy splashing cards
            let splash_cards = data[color]
            for (var key of Object.keys(splash_cards)){
                console.log(key,splash_cards[key]);
                let num = splash_cards[key]
                let imgLink = `${set_format.substring(0,3)}/card/${key}.png`
                    // const elem = document.querySelector(`#${color}`)
                    const elem = document.querySelector("#splash")
                    elem.innerHTML += `
                    <figure>
                    <img src="${imgLink}" alt="${key}" style="width: 18vw; min-width: 100px;">
                    <figcaption>${num}%</figcaption>
                    </figure>
                    `;
            }
        })
}
