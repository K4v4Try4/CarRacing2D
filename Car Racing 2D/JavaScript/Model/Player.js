/**
 * @class
 * @extends Entity
 */
class Player extends Entity {
    /**
     * @constructor Crea un nuovo player.
     * @param {Integer} dx 
     * @param {Integer} dy 
     * @param {Image} sprite 
     * @param {HitBox} hitBox 
     * @param {Field} field 
     * @param {String} name 
     * @param {Boolean} isCrashed 
     * @param {Integer} lifes 
     */
    constructor(dx, dy, sprite, hitBox, field, name, isCrashed, lifes) {
       super(dx, dy, sprite, hitBox, field) 
       this.name = name;
       this.isCrashed = isCrashed;
       this.lifes = lifes;
       this.animation = 0;
       this.vel = 5;
    }

    // #region Metodi

    /**
     * @function
     * Ottieni il tipo di entità.
     * @returns {String} Il tipo di entità.
     */
    getType() {
        return "Player";
    }

    /**
     * @function
     * Gestisce l'evento di collisione con un'altra entità e dell'eventuale animazione del player.
     * @param {Event} e - Evento. 
     * @returns {void}
     */
    onCollision(e) {
        if(this.animation) return;
        if(e === this) return;
        switch(e.getType()) {
            case "Obstacle":
                this.lifes--;
                if(this.lifes <= 0) this.field.gameOver();
                this.animation = 30*2;
                this.vel /= 2;
                break;
            
            case "Player":
                break;
        }
    }

    /**
     * @function
     * Sposta il player verso l'alto diminuendo la velocità della y.
     * @returns {void}
     */
    up() {
        this.dy = -this.vel
    }

    /**
     * @function
     * Sposta il player verso il basso aumentando la velocità della y.
     * @returns {void}
     */
    down() {
        this.dy = this.vel
    }

    /**
     * @function
     * Sposta il player verso sinistra diminuendo la velocità della x
     * @returns {void}
     */
    left() {
        this.dx = -this.vel
    }

    /**
     * @function
     * Sposta il player verso destra aumentando la velocità della x
     * @returns {void}
     */
    right() {
        this.dx = this.vel
    }

    /**
     * @function
     * Ferma il movimento del player impostando la x a 0
     * @returns {void}
     */
    stopX() {
        this.dx = 0;
    }

    /**
     * @function
     * Ferma il movimento del player impostando la y a 0
     * @returns {void}
     */
    stopY() {
        this.dy = 0;
    }

    /**
     * @function
     * Gestione del movimento del player
     * @returns {void}
    */
    move() {
        this.hitBox.move(this.dx,0);
        if(!this.hitBox.checkCollision(this.field.hitBox)) {
            this.hitBox.move(-this.dx,0);
        }
        
        this.hitBox.move(0,this.dy);
        if(!this.hitBox.checkCollision(this.field.hitBox)) {
            this.hitBox.move(-0,-this.dy);
        }
    }

    /**
     * @function
     * Aggiorna il player disegnandolo sulla grafica specificata e controlla se l'animazione è attiva 
     * @param {Graphics} graphics - Grafica da disegnare.
     * @returns {void}
    */
    update(graphics) {
        if(this.animation > 0) {
            this.dx = -1;
            this.animation--;
            graphics.save();
            graphics.globalAlpha = this.animation%15/15;
            super.update(graphics)
            graphics.restore();
            if(this.animation == 0){
                this.dx = 0;
                this.vel *=2;
            }
        }
        else {
            super.update(graphics);
        }
    }

    // #endregion
}