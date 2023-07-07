/* lesson-01
 * -> wir holen uns HtmlElemente und speichern sie in globalen variablen:
 *       canvasHtmlElement, zeichenKontext
 * -> wir erstellen uns HtmlElemente und speichern sie in globalen variablen:
 *       scoreElement, hudElement
 * - wir erstellen und verwenden Hilfs-Funktionen
 * ->    "zeichneRechteck", welche uns das zeichnen etwas erleichtert
 *       "gibZufälligePosition", welche uns eine zufällige Position auf dem Spielfeld ausgibt
 * -> wir zeichnen:
 *       ein Rechteck
 *       das Spielfeld
 *       die Spielfigur "snake", erstmals mit einer festen position
 *       ein Pick-Up Item "food", erstmals mit einer festen position
 *       den initialen Punktestand "score" in einem entsprechenden HtmlElement
 * - wir updaten:
 *       die Bewegungsrichtung von "snake", in dem wir eine globale Variable "playerDirection" je nach tastendruck von W, S, A, D neu setzen auf 'HOCH' | 'RUNTER' | 'LINKS' | 'RECHTS'  
 *       die Bewegung von "snake", in dem wir die x- und y-Koordinate von "snake" jeweils in einer globalen Variable speichern und mit Hilfe der Bewegungsrichtung neu setzen 
 *       den Punktestand "score" je nach "Spielregel", indem wir die globale Variable "score" neu setzen
 *       die Position von "food" je nach "Spielregel", indem wir die x- und y-Koordinate von "food" jeweils in einer globalen Variable speichern und mit Hilfe der Funktion "gibZufälligePosition" neu setzen
 * - wir implementieren Spielregeln:
 *       "snake" darf nie das Spielfeld verlassen - wenn "snake" die Spielfeldgrenzen erreicht, dann bleibt die Figur vor der Grenze einfach stehen. 
 *       wenn wir die Leertaste drücken, wollen wir das Spiel pausieren.
 *       wenn "snake" das item "food" erreicht bzw "isst", dann:
 *              zählen wir den Punktestand um eins hoch (Inkrementieren)  
 *              verschieben wir "food" auf eine neue zufällige Position
 */


/**
 * ######################################
 * # Html Elemente / html elements
 */


/**
 * ######################################
 * # spielbrett / game board (canvas)
 */


/**
 * ######################################
 * # snake (player)
 */


/** ######################################
 *  # essen / food (pick-up item)
 */

/**
 * ######################################
 * # Verarbeitung von Nutzer Eingaben / handle user input (input handler)
 */

/**
 * ######################################
 * # Hilfsfunktionen / helper functions
 */



/**
 * ######################################
 * # Animation
 */
export function update(){
}

export function zeichne(time) {
}

export function beiStart(){
}
