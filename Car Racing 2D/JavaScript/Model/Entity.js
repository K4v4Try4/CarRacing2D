/**
 * @class
 */
class Entity {
    /**
     * @constructor Crea una nuova entità.
     * @param {Integer} dx - La direzione x dell'entità.
     * @param {Integer} dy - La direzione y dell'entità.
     * @param {Image} sprite - Lo sprite dell'entità.
     * @param {HitBox} hitBox - L'hitbox dell'entità.
     * @param {Field} field - Il campo da gioco dell'entità.
     */
    constructor(dx, dy, sprite, hitBox, field) {
        this.dx = dx;
        this.dy = dy;
        this.sprite = sprite;
        this.hitBox = hitBox;
        this.field = field;
    }

    // #region Getter

    /**
     * @function
     * Ottieni l'hitbox dell'entità.
     * @returns {HitBox} L'hitbox dell'entità.
     */
    get HitBox() {
        return this.hitBox;
    }

    // #endregion 

    // #region Setter

    /**
     * @function
     * Imposta il nuovo sprite dell'entità.
     * @param {Image} newSprite - Il nuovo sprite dell'entità.
     * @returns {void}
     */
    set Sprite(newSprite) {
        this.sprite = newSprite;
    }

    // #endregion

    // #region Metodi

    /**
     * @function
     * Disegna l'entità.
     * @param {Graphics} graphics - Grafica da disegnare.
     * @returns {void} 
     */
    draw(graphics) {
        graphics.drawImage(this.sprite, this.hitBox.X, this.hitBox.Y, this.hitBox.W, this.hitBox.H);
    }

    /**
     * @function
     * Muovi l'entità. 
     * @returns {void} 
     */
    move() {
        this.hitBox.move(this.dx, this.dy);
    }

    /**
     * @function
     * Aggiorna l'entità disegnandola sulla grafica specificata.
     * @param {Graphics} graphics - Grafica da disegnare.
     * @returns {void} 
     */
    update(graphics) {
        this.move();
        this.draw(graphics);
    }

    /**
     * @function
     * Gestisce l'evento di collisione con un'altra entità.
     * @param {Event} e - Evento. 
     * @returns {null}
     */
    onCollision(e) {
        return;
    }

    /**
     * @function
     * Ottieni il tipo di entità.
     * @returns {String} Il tipo di entità.
     */
    getType() {
        return "";
    }

    /**
     * @function
     * Ottieni la verifica dell'evento della collisione.
     * @param {Event} e - Evento della collisione. 
     * @returns {Boolean} Supposizione della collizione.
     */
    checkCollision(e) {
        return this.hitBox.checkCollision(e.HitBox);
    }

    // #endregion
}