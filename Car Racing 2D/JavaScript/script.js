// #region Variabili

let btPlay;
let btVolume;
let btRegole;
let btTasti;

let btIndietroTasti;
let btIndietroRegole;
let btIndietroVolume;

let upMove;
let downMove;
let rightMove;
let leftMove;

let btInGameSettings;

let audioPlayer;
let plus;
let minus;
let volume;
let courrentVolume;

let sonoInGame;

let btVolumeInGame;
let btTastiInGame;
let btRegoleInGame;
let btRicominciaInGame;
let btAbbandonaInGame;

// #endregion

// #region Funzioni per il menu 

/**
 * @function
 * PreGame: Navagiazione nel menù con possibilità di cambiare finestra nelle apoosite finestre: tasti, regole, volume e play (per iniziare il gioco); 
 * InGame: Possibilità di mettere in pausa il gioco ed eventualemte modificare le impostazioni;
 * @returns {void}
 */
function btnUsing() {
    if (btTasti) {
        btTasti.addEventListener("click", () => { 
            document.querySelector(".settinsBgInternalHome").classList.add("nascondi");
            document.querySelector(".settinsBgInternalTasti").classList.remove("nascondi");
        });
    }

    if(btRegole) { 
        btRegole.addEventListener("click", () => { 
            document.querySelector(".settinsBgInternalHome").classList.add("nascondi");
            document.querySelector(".settinsBgInternalRegole").classList.remove("nascondi");
        });
    }

    if(btPlay) { 
        btPlay.addEventListener("click", () => { 
            let nomePlayer = document.querySelector("#nome");
            if(nomePlayer.value != "") {   
                sonoInGame = true;
                document.querySelector(".settinsBgExternal").classList.add("nascondi");
                document.querySelector(".lastSave").classList.add("nascondi");
                document.querySelector("#canvas").classList.remove("nascondi");
                document.querySelector(".namePlayer").classList.remove("nascondi");
                document.querySelector(".namePlayer").innerHTML = "Player: " + nomePlayer.value;
                document.querySelector(".btnSettings").classList.remove("nascondi");
                carRacing2D();
            }
        });
    }
    
    if(btVolume) { 
        btVolume.addEventListener("click", () => { 
            document.querySelector(".settinsBgInternalHome").classList.add("nascondi");
            document.querySelector(".btnSettings").classList.add("nascondi");
            document.querySelector(".settinsBgInternalVolume").classList.remove("nascondi");

        });
    }

    if(btInGameSettings) { 
        btInGameSettings.addEventListener("click", openSettings);
    }

    if(btVolumeInGame) { 
        btVolumeInGame.addEventListener("click", () => { 
            document.querySelector(".settinsWrap").classList.add("nascondi");
            document.querySelector(".btnSettings").classList.add("nascondi");
            document.querySelector(".namePlayer").classList.add("nascondi");
            document.querySelector("#canvas").classList.add("nascondi");
            document.querySelector(".settinsBgExternal").classList.remove("nascondi");
            document.querySelector(".settinsBgInternalHome").classList.add("nascondi");
            document.querySelector(".settinsBgInternalVolume").classList.remove("nascondi");
        });
    }

    if(btTastiInGame) { 
        btTastiInGame.addEventListener("click", () => {
            document.querySelector(".settinsWrap").classList.add("nascondi");
            document.querySelector(".btnSettings").classList.add("nascondi");
            document.querySelector(".namePlayer").classList.add("nascondi");
            document.querySelector("#canvas").classList.add("nascondi");
            document.querySelector(".settinsBgExternal").classList.remove("nascondi");
            document.querySelector(".settinsBgInternalHome").classList.add("nascondi");
            document.querySelector(".settinsBgInternalTasti").classList.remove("nascondi");
        })
    }

    if(btRegoleInGame) { 
        btRegoleInGame.addEventListener("click", () => {
            document.querySelector(".settinsWrap").classList.add("nascondi");
            document.querySelector(".btnSettings").classList.add("nascondi");
            document.querySelector(".namePlayer").classList.add("nascondi");
            document.querySelector("#canvas").classList.add("nascondi");
            document.querySelector(".settinsBgExternal").classList.remove("nascondi");
            document.querySelector(".settinsBgInternalHome").classList.add("nascondi");
            document.querySelector(".settinsBgInternalRegole").classList.remove("nascondi");
        })
    }

    if(btRicominciaInGame) {
        btRicominciaInGame.addEventListener("click", () => { 
            carRacing2D();
            document.querySelector(".settinsWrap").classList.add("nascondi");
        });
    }

    if(btAbbandonaInGame) { 
        btAbbandonaInGame.addEventListener("click", () => { 
            document.querySelector("#canvas").classList.add("nascondi");
            document.querySelector(".settinsWrap").classList.add("nascondi");
            document.querySelector(".btnSettings").classList.add("nascondi");
            document.querySelector(".namePlayer").classList.add("nascondi");
            document.querySelector(".settinsBgExternal").classList.remove("nascondi");
            f = null;
            document.querySelector(".lastSave").classList.remove("nascondi");
        });
    }
}

/**
 * @function
 * Imposta il valore dell'input da tastiera per muoversi (destra, sinistra, avanti ed indietro).
 * @returns {void}
 */
function setKey() {   
    let keys = [upMove.value, downMove.value, rightMove.value, leftMove.value];

    upMove.addEventListener("keyup", (event) => {
        if (!keys.includes(event.key) && event.key !== downMove.value && event.key !== rightMove.value && event.key !== leftMove.value) {
            upMove.value = event.key;
            keys[0] = event.key;
        } else upMove.value = keys[0];
        
    });

    downMove.addEventListener("keyup", (event) => {
        if (!keys.includes(event.key) && event.key !== upMove.value && event.key !== rightMove.value && event.key !== leftMove.value) {
            downMove.value = event.key;
            keys[1] = event.key;
        } else downMove.value = keys[1];
        
    });

    rightMove.addEventListener("keyup", (event) => {
        if(!keys.includes(event.key) && event.key !== upMove.value && event.key !== downMove.value && event.key !== leftMove.value) {
            rightMove.value = event.key;
            keys[2] = event.key; 
        } else rightMove.value = keys[2] ;
    });

    leftMove.addEventListener("keyup", (event) => {
        if(!keys.includes(event.key) && event.key !== upMove.value && event.key !== downMove.value && event.key !== rightMove.value) {
            leftMove.value = event.key;
            keys[3] = event.key;
        } else leftMove.value = keys[3];
    });

    document.addEventListener("keydown",(e)=> {
        if(f == null) return; 
        switch(e.key) {
            case "Escape":
                openSettings();
                break;
            case rightMove.value: //gira a destra 
                f.Player.up();
                break;
            case leftMove.value: //gira a sinistra
                f.Player.down();
                break;
            case downMove.value: //vai indietro
                f.Player.left();
                break;
            case upMove.value: //vai avanti
                f.Player.right();
                break;
        }
    });

    document.addEventListener("keyup",(e)=> {
        if(f == null) return; 
        switch(e.key) {
            case rightMove.value:
            case leftMove.value:
                f.Player.stopY();
                break;
            case downMove.value:
            case upMove.value:
                f.Player.stopX();
                break;
        }
    });
}

/**
 * @function
 * PreGame: se premuto il tasto indietro si ritorna alla home; 
 * InGame: se premuto il tasto indietro si ritorna alla pausa del gioco;
 * @returns {void}
 */
function backToHomeOrInGame() {
    if(btIndietroVolume) {
        btIndietroVolume.addEventListener("click", () => { 
            document.querySelector(".settinsBgInternalVolume").classList.add("nascondi");
            if(f && f.IsInGame) {
                document.querySelector(".settinsWrap").classList.remove("nascondi");
                document.querySelector(".btnSettings").classList.remove("nascondi");
                document.querySelector(".namePlayer").classList.remove("nascondi");
                document.querySelector("#canvas").classList.remove("nascondi");
                document.querySelector(".settinsBgExternal").classList.add("nascondi");
                document.querySelector(".settinsBgInternalHome").classList.remove("nascondi");
                document.querySelector(".settinsBgInternalVolume").classList.add("nascondi");
            } else {
                document.querySelector(".settinsBgInternalHome").classList.remove("nascondi");
            }
        });
    } 

    if(btIndietroTasti) { 
        btIndietroTasti.addEventListener("click", () => {
            document.querySelector(".settinsBgInternalTasti").classList.add("nascondi");
            if(f && f.IsInGame) {
                document.querySelector(".settinsWrap").classList.remove("nascondi");
                document.querySelector(".btnSettings").classList.remove("nascondi");
                document.querySelector(".namePlayer").classList.remove("nascondi");
                document.querySelector("#canvas").classList.remove("nascondi");
                document.querySelector(".settinsBgExternal").classList.add("nascondi");
                document.querySelector(".settinsBgInternalHome").classList.remove("nascondi");
                document.querySelector(".settinsBgInternalTasti").classList.add("nascondi");
            } else {
                document.querySelector(".settinsBgInternalHome").classList.remove("nascondi");
            }
        })
    }

    if(btIndietroRegole) {
        btIndietroRegole.addEventListener("click", () => { 
            document.querySelector(".settinsBgInternalRegole").classList.add("nascondi");
            if(f && f.IsInGame) {
                document.querySelector(".settinsWrap").classList.remove("nascondi");
                document.querySelector(".btnSettings").classList.remove("nascondi");
                document.querySelector(".namePlayer").classList.remove("nascondi");
                document.querySelector("#canvas").classList.remove("nascondi");
                document.querySelector(".settinsBgExternal").classList.add("nascondi");
                document.querySelector(".settinsBgInternalHome").classList.remove("nascondi");
                document.querySelector(".settinsBgInternalRegole").classList.add("nascondi");
            } else {
                document.querySelector(".settinsBgInternalHome").classList.remove("nascondi");
            }
        });
    }
}

/**
 * @function
 * Possibilità di aprire il menu direttamente dal gioco
 * @returns {void}
 */
function openSettings() {
    f.pause();
    
    let s = document.querySelector(".settinsWrap");
    if(s.classList.contains("nascondi"))
        s.classList.remove("nascondi");
    else
        s.classList.add("nascondi"); 
}

// #endregion

// #region Game

let f;
/**
 * @function
 * Inizio del gioco CarRacing2D.
 * @returns {void}
 */
function carRacing2D() {
    let canvas = document.querySelector("#canvas");
    let graphics = canvas.getContext("2d");

    let imgBg = new Image();
    imgBg.src = "./Images/Sprite/road.png";
    imgBg.onload = () => {
        graphics.canvas.width = window.innerWidth;
        graphics.canvas.height = window.innerHeight;
        
        f = new Field(graphics.canvas.width,graphics.canvas.height,imgBg, graphics);
        f.OnGameOver = endingGame;
        f.init();  
    }
}

/**
 * @function
 * Gestione della conclusione del gioco la quale alla perdita delle vite ti verrà mostrata la schermata di game over.
 * Richiamo delle funzioni per salvare e ripristinare i dati di gioco.
 * @returns {void}
 */
function endingGame() {
    let gameOver = document.querySelector("#gameOver");
    let game = document.querySelector("#canvas");   
    let timeout = setTimeout(()=> {
        game.classList.add("nascondi");
        gameOver.classList.remove("nascondi");
        document.querySelector(".btnSettings").classList.add("nascondi");
        document.querySelector(".namePlayer").classList.add("nascondi");
        document.querySelector(".lastSave").classList.remove("nascondi");
    },2000);

    setTimeout(() => {
        clearTimeout(timeout);
        gameOver.classList.add("nascondi");
        document.querySelector(".settinsBgExternal").classList.remove("nascondi");
    }, 5000);
    
    saveData();

    restoreData();
}

// #endregion

// #region Volume

/**
 * @function
 * Riproduzione della canzone di sottofondo.
 * @returns {void}
 */
function playSong() {
    document.addEventListener("click", () => {
        const audio = document.querySelector("#audio"); 
        if (audio) {
            audio.play().catch(error => {
                console.error("Autoplay non riuscito:", error); // La riproduzione potrebbe essere stata bloccata dal browser
            });
        }
    });
}            

/**
 * @function
 * Imposta il il livello del volume utilizzando la barra di scorrimento.
 * @returns {void}
 */
function setVolume() {
    volume.addEventListener("input", (e) => {
        courrentVolume = e.target.value / 100;
        document.querySelector("#audio").volume = courrentVolume;
        if(courrentVolume >= 1) {
            minus.classList.remove("disabled-button");
            plus.classList.add("disabled-button");
        } else if(courrentVolume <= 0) {
            plus.classList.remove("disabled-button");
            minus.classList.add("disabled-button");
        } else {
            minus.classList.remove("disabled-button");
            plus.classList.remove("disabled-button");
        }
    })
}

/**
 * @function
 * Alza il volume tramite il bottone "+".
 * @param {event} e 
 */
function volumeUp(e) {   
    courrentVolume += 0.01;
    if (courrentVolume >= 1.0) {
        courrentVolume = 1.0;
        plus.classList.add("disabled-button");
    } else {
        minus.classList.remove("disabled-button");
    }
    document.querySelector("#audio").volume = courrentVolume;
    volume.value = courrentVolume * 100;
}            

/**
 * @function
 * Abbassa il volume tramite il bottone "-".
 * @param {event} e 
*/
function volumeDown(e) {   
    courrentVolume -= 0.01;
    if (courrentVolume <= 0) {
        courrentVolume = 0;
        minus.classList.add("disabled-button");
    } else {
        plus.classList.remove("disabled-button");
        //minus.disabled = false; //classe disabled
    }
    document.querySelector("#audio").volume = courrentVolume;
    volume.value = courrentVolume * 100;
}

// #endregion

// #region Cookie

/**
 * @function
 * Salva il nome ed il punteggio.
 * @returns {void}
 */
function saveData() {
    //esempio
    const nome = document.querySelector("#nome").value;
    const punti = f.Points;

    if(punti > parseInt(localStorage.getItem("punti"))) {   
        localStorage.setItem("nome",nome);
        localStorage.setItem("punti",punti);
    }
}

/**
 * @function
 * Ripristina i dati salvati nel browser.
 * @returns {void}
 */
function restoreData() {
    const nome = localStorage.getItem('nome');
    const punti = localStorage.getItem('punti');
    
    if (nome) {
        document.querySelector("#lastSaveNome").innerHTML = "";
        document.querySelector("#lastSaveNome").appendChild(document.createTextNode("Nome: " + nome)) ;
    } else {
        localStorage.setItem("nome", "unknown");
    }
    
    if (punti) {
        document.querySelector("#lastSavePunti").innerHTML = "";
        document.querySelector("#lastSavePunti").appendChild(document.createTextNode("Punteggio: " + punti));
    } else {
        localStorage.setItem("punti", "0");
    }
}

/**
 * @function
 * Carica i dati acquisiti al caricamento della pagina.
 * @returns {void}
 */
function rdOnload() {
    window.onload = () => {
        restoreData();
    };
}

// #endregion

document.addEventListener("DOMContentLoaded", () => {

    // #region Variabili nel DOM

    btPlay = document.querySelector("#play");
    btVolume = document.querySelector("#volume");
    btRegole = document.querySelector("#regole");
    btTasti = document.querySelector("#tasti");

    btIndietroTasti = document.querySelector("#btIndietroTasti");
    btIndietroRegole = document.querySelector("#btIndietroRegole");
    btIndietroVolume = document.querySelector("#btIndietroVolume");

    upMove = document.querySelector("#upMove");
    downMove = document.querySelector("#downMove");
    rightMove = document.querySelector("#rightMove");
    leftMove = document.querySelector("#leftMove");

    btInGameSettings = document.querySelector(".btnSettings");

    audioPlayer = document.querySelector("#audioPlayer");
    plus = document.querySelector("#plus");
    plus.addEventListener("click", volumeUp);
    minus = document.querySelector("#minus");
    minus.addEventListener("click", volumeDown);
    volume = document.querySelector("#vol");
    courrentVolume = 0.5;
    document.querySelector("#audio").loop = true;

    sonoInGame = false;

    btVolumeInGame = document.querySelector("#btVolumeInGame");
    btTastiInGame = document.querySelector("#btTastiInGame");;
    btRegoleInGame = document.querySelector("#btRegoleInGame");;
    btRicominciaInGame = document.querySelector("#btRicominciaInGame");;
    btAbbandonaInGame = document.querySelector("#btAbbandonaInGame");;

    // #endregion

    // #region Funzioni nel DOM

    btnUsing();
    backToHomeOrInGame();
    setKey();
    
    playSong();
    setVolume();
    
    rdOnload();

    // #endregion
});