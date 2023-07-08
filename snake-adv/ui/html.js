
/***  @type {HTMLDivElement} */
const scoreElement = document.createElement('div');
const hudElement = document.createElement("div");
hudElement.appendChild(scoreElement);
document.body.appendChild(hudElement);


export function getScoreObj(){
    return {
        setScore(score){
            scoreElement.innerHTML	= `Score: ${score}`
        }
    }
}
