// Consegna
// L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata,
// in cui ogni cella contiene un numero tra quelli compresi in un range:
// con difficoltà 1 => tra 1 e 100
// con difficoltà 2 => tra 1 e 81
// con difficoltà 3 => tra 1 e 49
// Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro (o simili, l’importante è dare all’utente il feedback che ha scoperto una casella che rimarrà scoperta, con il numero relativo).


// Passi logici:

// Chiedo all'utente con quale livello di difficoltà vuole giocare (facile, medio, difficile)
// Salvo la risposta dell'utente
// A seconda del livello scelto, creo un numero di celle corrispondente
    // Confronto il livello scelto dall'utente con i tre livelli di difficoltà
    // creo un ciclo per:
        // generare il numero di celle corrispondenti al livello di difficoltà
        // agganciare a ogni cella l'evento "click"
            // cambio lo sfondo della cella cliccata
            // mostro il numero della cella cliccata


// variabili globali
let difficoltaUtente;

// Chiedo all'utente con quale livello di difficoltà vuole giocare (facile, medio, difficile)
// Salvo la risposta dell'utente
difficoltaUtente = prompt("Scegli un livello di difficoltà (facile, medio, difficile)");

// A seconda del livello scelto, creo un numero di celle corrispondente
// Confronto il livello scelto dall'utente con i tre livelli di difficoltà
if (difficoltaUtente === "facile") {

    const bombe = generaBombe(16, 100);
    console.log("Numeri bomba:", bombe);
    generaCampoMinato(100, "facile", bombe);

} else if (difficoltaUtente === "medio") {

    const bombe = generaBombe(16, 81);
    console.log("Numeri bomba:", bombe);
    generaCampoMinato(81, "medio", bombe);

} else if (difficoltaUtente === "difficile") {

    const bombe = generaBombe(16, 49);
    console.log("Numeri bomba:", bombe);
    generaCampoMinato(49, "difficile", bombe);
}

// Siccome devo ripetere le stesse istruzioni, creo una funzione per generare il campo minato
function generaCampoMinato(numCelle, livelloGioco, arrayBombe) {

    // creo un ciclo per:
    for (let i = 1; i <= numCelle; i++) {

        // generare il numero di celle corrispondenti al livello di difficoltà
        let nuovaCella = document.createElement("div");
        nuovaCella.className = "cella " + livelloGioco;

        if (arrayBombe.includes(i)) {
            nuovaCella.classList.add("bomba");
        }

        nuovaCella.innerHTML = `<div class="numero-cella">${i}</div>`;
        document.getElementById("contenitore-celle").append(nuovaCella);

        // agganciare a ogni cella l'evento "click"
        nuovaCella.addEventListener("click", function() {

            // se la casella cliccata fa parte della lista delle bombe,
            if (arrayBombe.includes(i)) {
                
                // allora seleziono tutti i div che hanno la classe bomba e gli assegno la classe cliccata
                let mostraBombe = document.querySelectorAll(".bomba");
                console.log("mostraBombe selezione:", mostraBombe);

                for (let j = 0; j < mostraBombe.length; j++) {
                    mostraBombe[j].classList.add("cliccata");
                }
                
            } else {
                // altrimenti coloro solo la casella cliccata
                nuovaCella.classList.add("cliccata");
            }

        });        
    }
}

// funzione che genera 16 numeri casuali unici compresi tra i numeri delle caselle create per il livello di difficoltà scelto
function generaBombe(numBombe, numCelle) {

    const listaBombe = [];

    // devo generare un numero casuale finché l'array di bombe non è composto da 16 elementi
    while (listaBombe.length < numBombe) {

        // genero un numero casuale compreso nell'intervallo richiesto
        let numCasuale = Math.floor(Math.random() * numCelle) + 1;
        console.log("numero generato:", numCasuale);

        // se il numero non è già presente, lo aggiungo alla lista delle bombe
        if (!listaBombe.includes(numCasuale)) {
            listaBombe.push(numCasuale);
        } else {
            // a scopo di debug
            console.log("Doppione non inserito nell'array.");
        }
    }

    // finito il ciclo, ritorno l'array di bombe
    return listaBombe;
}