# WebApp - Notenverwaltung

In Firefox muss unter 'about:config' der Wert 'dom.forms.datetime' auf 'true' gesetzt werden, um HTML5 Datumsfelder zu unterstützen.
Chrome muss mit dem Flag '--disable-web-security' (z.B. chrome --disable-web-security # unix/linux only) gestartet werden, um den Zugriff auf die lokalen Dateien zu gestatten.
Auf dem Client gerät muss
+ Datei: index.html
+ Ordner: js
+ Ordner: css
gespeichert sein, um die WebApp im vollen Funktionsumfang zu benutzen.

## Kurzbeschreibung
Jeder Lehrer möchte gerne seinen Schülern eine gerechte Benotung geben.
Gleichzeitig erwarten die Schüler auch gerecht benotet zu werden.
Für die Lehrer bedeutet es einen imensen Aufwand jedes Quartal für jeden einzelnen Ihrer Schüler Noten zu vergeben.
Die Schüler erhalten damit auch ein zeitlich stark versetztes Feedback Ihrer Leistung.
Durch meine Notenverwaltung entsteht für die Schüler der Vorteil nach jeder Stunde eine Selbsteinschätzung abzugeben, die der Lehrer sieht und entweder akzeptieren kann oder alternative Beurteilung eintragen kann.
Einerseits hat so jeder Schüler einen aktuellen Überblick des Status Quo seiner Leistungen und kann sich bei bedarf zeitnah verbessern.
Andererseits können die Schüler aktiv an einer fairen Benotung mitwirken.
Ebenso erspart es den Lehrern eine Menge Arbeit, da die zu erledigende Benotung während des Unterrichts erfolgt.

## Pflichtkriterien
+ Eine seperate Ansicht für Schüler und Lehrer.
+ Alle Benotungen werden in Prozent (von 0% bis 100%) gespeichert und angezeigt. So ist ein Gemeinsamernenner zwischen verschiedenen Notensystemen (z.B. Noten von 1 bis 6 oder Punkte von 1 bis 15).
+ Schüler werden in Kurse eingetragen und können diese nicht bearbeiten oder sich austragen.
+ Schüler haben die Möglichkeit eigene Noten in Form eine Selbsteinschätzung einzutragen.
+ Der Kurslehrer sieht die Einschätzung des Schülers und kann diese akzeptieren oder korrigieren.