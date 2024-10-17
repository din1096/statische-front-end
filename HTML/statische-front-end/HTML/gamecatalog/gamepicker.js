var games = 'games.json';
var winkelmandje = [];

fetch(games)
    .then(response => response.json())
    .then(data => {
        showGames(data);

        document.getElementById('prijsButton').addEventListener('click', () => {
            alert('games gefilterd op prijs');
            let maxprijs = parseFloat(document.getElementById('prijsInput').value);
            if (!isNaN(maxprijs)) {
                let filteredGames = data.filter(game => game.price <= maxprijs);
                showGames(filteredGames);
            }
        });

        document.getElementById('genreButton').addEventListener('click', () => {
            alert('games gefilterd op genre');
            let genre = document.getElementById('genreInput').value.toLowerCase();
            if (genre) {
                let filteredGames = data.filter(game => game.genre.toLowerCase() === genre);
                showGames(filteredGames);
            }
        });

        document.getElementById('ratingButton').addEventListener('click', () => {
            alert('games gefilterd op rating');
            let maxRating = parseFloat(document.getElementById('ratingInput').value);
            if (!isNaN(maxRating)) {
                let filteredGames = data.filter(game => game.rating < maxRating);
                showGames(filteredGames);
            }
        });

        document.getElementById('winkelmandjeButton').addEventListener('click', () => {
            document.getElementById('totaalOverzicht').style.display = 'none';
            document.getElementById('winkelmandje').style.display = 'block';
            showWinkelmandje();
        });

        document.getElementById('totaalOverzichtButton').addEventListener('click', () => {
            document.getElementById('totaalOverzicht').style.display = 'block';
            document.getElementById('winkelmandje').style.display = 'none';
            showGames(data);
        });
    })
    .catch(error => console.error('Error fetching the JSON file:', error));

function showGames(games) {
    let output = "";
    games.forEach((game, index) => {
        output += `<p><strong>titel:</strong> ${game.title}<br>` +
                  `<strong>prijs:</strong> €${game.price.toFixed(2)}<br>` +
                  `<strong>genre:</strong> ${game.genre}<br>` +
                  `<strong>rating:</strong> ${game.rating}<br>` +
                  `<button onclick="addToWinkelmandje(${index})">Voeg toe aan winkelmandje</button></p>`;
    });
    document.getElementById("totaalOverzicht").innerHTML = output;
}

function addToWinkelmandje(index) {
    fetch(games)
        .then(response => response.json())
        .then(data => {
            winkelmandje.push(data[index]);
            alert(`${data[index].title} is toegevoegd aan het winkelmandje!`);
            showWinkelmandje();
        })
        .catch(error => console.error('Error fetching the JSON file:', error));
}

function showWinkelmandje() {
    let output = "<h2>Winkelmandje</h2>";
    winkelmandje.forEach((game, index) => {
        output += `<p><strong>titel:</strong> ${game.title}<br>` +
                  `<strong>prijs:</strong> €${game.price.toFixed(2)}<br>` +
                  `<strong>genre:</strong> ${game.genre}<br>` +
                  `<strong>rating:</strong> ${game.rating}<br>` +
                  `<button onclick="removeFromWinkelmandje(${index})">Verwijder</button></p>`;
    });
    output += `<p><strong>Totaalprijs:</strong> €${calculateTotalPrice().toFixed(2)}</p>`;
    document.getElementById("winkelmandje").innerHTML = output;
}

function removeFromWinkelmandje(index) {
    winkelmandje.splice(index, 1);
    showWinkelmandje();
}

function calculateTotalPrice() {
    let total = winkelmandje.reduce((sum, game) => sum + game.price, 0);
    return total;
}