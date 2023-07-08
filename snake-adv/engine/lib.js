/***  @type {HTMLCanvasElement} */
const canvasHtmlElement = document.getElementById("spiel-brett");

/***  @returns {CanvasRenderingContext2D} */
export function getContext(){
    return canvasHtmlElement.getContext("2d");
}

export function noop(){
    console.debug("no operation")
}

export function createBlinkAnimation(animationTime, animation) {
    let last;
    let show = true;
    return {
        last,
        render(sec) {
            if (typeof this.last === "undefined") {
                this.last = sec;
            }
            if (show && (sec - this.last) >= animationTime.show) {
                show = !show;
                this.last = sec;
            }
            else if (!show && (sec - this.last) >= animationTime.hide) {
                show = !show;
                this.last = sec;
            }

            if (show) {
                animation();
            }
        }
    }
}
export function createAnimation(animation) {
    let lastRender;
    return {
        render(time, speed) {
            if (typeof lastRender === "undefined") {
                lastRender = time;
            }
            if ((time - lastRender) >= speed) {
                animation();
                lastRender = time;
            }
        }
    }
}

/**
 * draws a colored rectangle
 * 
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @param {'white' | 'black' | 'blue' | 'orange'} color
 */
export function drawRecFilled(x, y, w, h, color) {
    const ctx = getContext();

    ctx.fillStyle = color ?? "black";
    ctx.fillRect(x, y, w, h);
}