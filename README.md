# tony-tuts
## Einheit 00 bis 03
- wir `holen` uns Html-Elemente und `speichern` sie in `globalen variablen`:
    - **canvasHtmlElement**
    - **zeichenKontext**
- wir `erstellen` uns Html-Elemente und `speichern` sie in `globalen variablen`:
    - **scoreElement**
    - **hudElement**
- wir `erstellen` und `verwenden` Hilfs-Funktionen
    - **zeichneRechteck**, welche uns das `zeichnen` etwas erleichtert
    - **gibZufälligePosition**, welche uns eine zufällige Position auf dem Spielfeld ausgibt
- wir `zeichnen`:
    - ein Rechteck
    - das Spielfeld
    - die Spielfigur **snake**, erstmals mit einer festen position
    - ein Pick-Up Item **food**, erstmals mit einer festen position
    - den initialen Punktestand "score" in einem entsprechenden HtmlElement
- wir `updaten`:
    - die Bewegungsrichtung von **snake**, in dem wir eine `globale Variable` **playerDirection** je nach tastendruck von W, S, A, D neu setzen auf 'HOCH' | 'RUNTER' | 'LINKS' | 'RECHTS'  
    - die Bewegung von **snake**, in dem wir die x- und y-Koordinate von **snake** jeweils in einer `globalen variable` `speichern` und mit Hilfe der Bewegungsrichtung neu setzen 
    - den Punktestand "score" je nach **Spielregel**, indem wir die `globale Variable` "score" neu setzen
    - die Position von **food** je nach **Spielregel**, indem wir die x- und y-Koordinate von **food** jeweils in einer `globalen variable` `speichern` und mit Hilfe der Funktion **gibZufälligePosition** neu setzen
- wir programmieren bzw. implementieren Spielregeln:
    - **snake** darf nie das Spielfeld verlassen - `wenn` **snake** die Spielfeldgrenzen erreicht, `dann` bleibt die Figur vor der Grenze einfach stehen. 
    - `wenn` wir die Leertaste drücken, `dann` wollen wir das Spiel pausieren.
    - `wenn` **snake** das item **food** erreicht bzw "isst", `dann`:
        - zählen wir den Punktestand um eins hoch (Inkrementieren)  
        - verschieben wir **food** auf eine neue zufällige Position


## Demos
* [Simple Snake Game for beginners](https://dplantera.github.io/tony-tuts/snake-beginner/)
