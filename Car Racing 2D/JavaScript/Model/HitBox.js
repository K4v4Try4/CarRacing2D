/**
 * @class
 */
class HitBox {
    /**
     * Crea una nuova hitbox
     * @param {Integer} x - La x dell'hitbox
     * @param {Integer} y - La y dell'hitbox
     * @param {Integer} w - La w dell'hitbox
     * @param {Integer} h - L'h dell'hitbox
     */
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    // #region Getter

    /**
     * @function
     * Ottieni la x dell'hitbox
     * @returns {Integer} La x dell'hitbox
     */
    get X() {
        return this.x;
    }

    /**
     * @function
     * Ottieni la y dell'hitbox
     * @returns {Integer} La y dell'hitbox
     */
    get Y() {
        return this.y;
    }

    /**
     * @function
     * Ottieni la w dell'hitbox
     * @returns {Integer} La w dell'hitbox
     */
    get W() {
        return this.w;
    }

    /**
     * @function
     * Ottieni la h dell'hitbox
     * @returns {Integer} La h dell'hitbox
     */
    get H() {
        return this.h;
    }

    // #endregion

    // #region Setter

    /**
     * @function
     * Imposta la nuova x dell'hitbox.
     * @param {Integer} newVal - La nuova x dell'hitbox.
     * @returns {void}
     */
    set X(newVal) {
        this.x = newVal;
    }

    /**
     * @function
     * Imposta la nuova y dell'hitbox.
     * @param {Integer} newVal - La nuova y dell'hitbox.
     * @returns {void}
     */
    set Y(newVal) {
        this.y = newVal;
    }

    /**
     * @function
     * Imposta la nuova w dell'hitbox.
     * @param {Integer} newVal - La nuova w dell'hitbox.
     * @returns {void}
     */
    set W(newVal) {
        this.w = newVal;
    }

    /**
     * @function
     * Imposta la nuova h dell'hitbox.
     * @param {Integer} newVal - La nuova h dell'hitbox.
     * @returns {void}
     */
    set H(newVal) {
        this.h = newVal;
    }

    // #endregion

    // #region Metodi

    /**
     * @function
     * Disegna l'hitbox dell'oggetto
     * @param {Graphics} graphics - Grafica da disegnare.
     * @returns {void} 
     */
    draw(graphics) {
        graphics.fillStyle = "green";
        graphics.strokeRect(this.x, this.y, this.w, this.h); 
    }

    /**
     * @function
     * Verifica la collisione con un altro oggetto
     * @param {HitBox} hb - hitbox dell'oggetto. 
     * @returns {Boolean}
     */
    checkCollision(hb) {
        return (((hb.y >= this.y && hb.y <= this.y+this.h) ||       // controllo lato superiore
            (hb.y+hb.h >= this.y && hb.y+hb.h <= this.y+this.h) ||  // controllo lato inferiore
            (hb.y <= this.y && hb.y+hb.h >= this.y+this.h))         // controllo sovrapposizione verticale
            &&
            ((hb.x >= this.x && hb.x <= this.x+this.w) ||           // controllo lato sinistro
            (hb.x+hb.w >= this.x && hb.x+hb.w <= this.x+this.w) ||  // controllo lato destro
            (hb.x <= this.x && hb.x+hb.w >= this.x+this.w)));       // controllo sovrapposizione orizontale
    }

    /**
     * @function
     * Muovi l'hitbox dell'oggetto
     * @returns {void} 
     */
    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    // #endregion
}