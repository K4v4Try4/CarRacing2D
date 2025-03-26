/**
 * @class
 * @extends Entity
 */
class Obstacle extends Entity {
    /**
     * @constructor Crea un nuovo ostacolo.
     * @param {Integer} dx - La direzione x del ostacolo.
     * @param {Integer} dy - La direzione y del ostacolo.
     * @param {Image} sprite - Lo sprite del ostacolo.
     * @param {HitBox} hitBox - L'hitbox del ostacolo.
     * @param {Field} field - Il campo da gioco del ostacolo.
     */
    constructor(dx, dy, sprite,hitBox,field) {
       super(dx, dy, sprite,hitBox,field) 
    }

    // #region Metodi

    /**
     * @function
     * Ottieni il tipo di entità.
     * @returns {String} Il tipo di entità.
     */
    getType() {
        return "Obstacle";
    }

    /**
     * @function
     * Gestisce l'evento di collisione con un'altra entità.
     * @param {Event} e - Evento. 
     * @returns {void}
     */
    onCollision(e) {
        if(e === this) return;
        switch(e.getType()) {
            case "Obstacle":
                break;
            
            case "Player":
                this.field.removeEntity(this);
                break;
        }
    }

    /**
     * @function
     * Aggiorna l'ostacolo e se esce dal canvas viene rimossa dal gioco.
     * @param {Graphics} graphics - Grafica da disegnare. 
     */
    update(graphics) {
        super.update(graphics);
        if(this.hitBox.x < -this.hitBox.w) {
            this.field.removeEntity(this)
        }
    }

    // #endregion
}