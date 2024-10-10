var games = 'games.json'

fetch(games)
.then(x => x.text())
.then(y => document.getElementById("demo").innerHTML = y);
