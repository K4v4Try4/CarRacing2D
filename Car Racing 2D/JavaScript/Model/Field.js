/**
 * @class
 */
class Field {
    /**
     * @constructor Crea un nuovo field.
     * @param {Integer} h - L'h del field. 
     * @param {Integer} w - L'w del field.
     * @param {Image} background - Il background del field.
     * @param {Graphics} - Grafica da disegnare.
     */
    constructor(w, h, background, graphics) {
        this.h = h;       
        this.w = w;
        this.player = null;
        this.background = background;
        this.mainLoop = null;
        this.points = 0;
        this.frames = 0;
        this.entities = [];
        this.graphics = graphics;
        this.heart = new Image();
        this.hitBox = new HitBox(20,20,this.w-40,this.h-40); // -40 perché tolgo i bordi
        this.onGameOver = () => {}
        this.obstacles = [
            {
                img: "./Images/Sprite/Enemies/ambulance.png",
                w: 788/4.6,
                h: 320/4.6,
                dx: 7
            },
            {
                img: "./Images/Sprite/Enemies/camion.png",
                w: 1154/6.5,
                h: 432/6.2,
                dx: 4
            },
            {
                img: "./Images/Sprite/Enemies/pickup.png",
                w: 684/5.7,
                h: 343/5.7,
                dx: 6
            },
            {
                img: "./Images/Sprite/Enemies/van.png",
                w: 767/6.75,
                h: 472/6.75,
                dx: 5
            },
            {
                img: "./Images/Sprite/Enemies/yellowCar.png",
                w: 1712/15.36,
                h: 922/15.36,
                dx: 10
            }
        ]
    }

    //#region Getter

    /**
     * @function
     * Ottieni l'h del field.
     * @returns {Integer} L'h del field.
     */
    get H() {
        return this.h;
    }

    /**
     * @function
     * Ottieni la w del field.
     * @returns {Integer} La w del field.
     */
    get W() {
        return this.w;
    }

    /**
     * @function
     * Ottieni il player del field.
     * @returns {Player} Il player del field.
     */
    get Player() {
        return this.player;
    }

    /**
     * @function
     * Ottieni i punti del field.
     * @returns {Integer} I punti del field.
     */
    get Points() {
        return this.points;
    }

    /**
     * @function
     * Ottieni le entità del field.
     * @returns {Entity[]} Le entità del field.
     */
    get Entities() {
        return this.entities;
    }

    /**
     * @function 
     * Ottiene una supposizione se il gioco è ancora attivo.
     * @returns {Boolean}
     */
    get IsInGame() {
        return (this.Player && this.Player.lifes > 0);
    }

    //#endregion
    
    //#region Setter

    /**
     * @function
     * Imposta la nuova immagine del field.
     * @param {Image} newBackground - La nuova immagine del field.
     * @returns {void}
     */
    set Background(newBackground) {
        return this.background = newBackground;
    }

    /**
     * @function
     * Imposta il nuovo player del field.
     * @param {Player} newPlayer - Il nuovo player del field.
     * @returns {void}
     */
    set Player(newPlayer) {
        this.player = newPlayer;
    }

    /**
     * @function
     * Imposta l'evento alla fine del gioco. 
     * @param {() => void} callback - La nuova funzione che gestisce l'evento alla fine del gioco.
     * @returns {void} 
     */
    set OnGameOver(callback) {
        if (typeof callback === 'function') {
            this.onGameOver = callback;
        } else {
            throw new Error("Il valore assegnato a onGameOver deve essere una funzione.");
        }
    }

    //#endregion

    //#region Metodi

    /**
     * @function
     * Aggiorna il field e genera gli ostacoli.
     * @param {Field} - Il gioco.
     * @returns {void} 
     */
    update(game) {
        game.graphics.drawImage(game.background,0,0,game.w,game.h);
        for(let e of game.entities) {
            e.update(game.graphics);
        }
        game.Player.update(game.graphics)
        game.drawHearts();
        game.drawPoints();

        for(let e of game.entities) {
            if(e.checkCollision(game.player)) {
                e.onCollision(game.player);
                game.player.onCollision(e);
            }
        }   
        
        if(Math.random() < 1 / 80) {
            let obstacle = new Image()
            let randomIndex = Math.floor(Math.random() * game.obstacles.length);
            let obInfo = game.obstacles[randomIndex];
            obstacle.src = obInfo.img;
            obstacle.onload = () => {
                let y = Math.random()*(game.graphics.canvas.height*8/10-100); //rdn sulla strada (in %)
                y += game.graphics.canvas.height/10 //si stacca dal limite superiore (in %)
                game.entities.push(new Obstacle(-obInfo.dx,0,obstacle,new HitBox(game.W-100,y,obInfo.w,obInfo.h),game));
            }
        } 

        if(game.frames == 15) {
            game.points++;
            game.frames = 0;
        } else {
            game.frames++;
        }
    }

    /**
     * @function
     * Inizio frequenza aggiornamento field.
     * @returns {void}
     */
    startMainLoop() {
        this.mainLoop = setInterval(this.update, 1000/30, this); 
    }

    /**
     * @function
     * Fine frequenza aggiornamento field.
     * @returns {void}
     */
    stopMainLoop() {
        clearInterval(this.mainLoop);
        this.mainLoop = false;
    }

    /**
     * @function
     * Aziona la pausa nel gioco.
     * @returns {void}
     */
    pause() {
        if(this.mainLoop) {
            this.stopMainLoop();
        }
        else {
            this.startMainLoop();
        }
    }

    /**
     * @function
     * Rimuove le entità dall'array delle entità.
     * @param {Entity} entity - Ostacolo.
     * @returns {void}
     */
    removeEntity(entity) {
        this.entities.splice(this.entities.indexOf(entity),1);
    }

    /**
     * @function
     * Fine del gioco.
     * @returns {void}
     */
    gameOver() {
        this.onGameOver();
        this.stopMainLoop();
    }

    /**
     * @function
     * Inizializza il gioco, creando il giocatore, il vettore di entità e caricando le risorse necessarie.
     * @returns {void}
     */ 
    init() {
        this.entities = []; 
        let img = new Image();
        img.src = "./Images/Sprite/car.png";
        img.onload = () => {
            this.player = new Player(0,0,img,new HitBox(100,100,711/6.4,385/6.4),this,"Pippo",false,3);

            this.heart.src = "./Images/Sprite/lifeHeart.png";
            this.heart.onload = () => {
                this.startMainLoop(this.graphics);
            }
        } 
    }

    /**
     * @function
     * Disegna i cuori in alto a destra della finestra.
     * @returns {void}
     */
    drawHearts() {
        for (let i = 0; i < this.player.lifes; i++) {
            this.graphics.drawImage(this.heart, this.w-100-(i+1)*60, 10, 50, 50);
        }
    }

    /**
     * @function
     * Disegna il punteggio in alto al centro della finestra.
     * @returns {void}
     */
    drawPoints() {
        this.graphics.font = "48px Trebuchet MS";
        this.graphics.textAlign = "center"; 
        this.graphics.fillStyle = "blue"; 
        this.graphics.fillText(this.points, this.w/2, 48); 
    }
    
    //#endregion
}
