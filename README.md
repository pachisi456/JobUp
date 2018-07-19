# Usecase
Die mobile App JobUp soll eine C2C Dienstleistungsvermittlung realisieren. Nutzer können Dienstleistungen anbieten (Anbieter), die von anderen Nutzern umgesetzt werden (Dienstleister). Dabei handelt es sich nicht nur um die Vermittlung von Handwerkern oder Unterehmensdienstleistungen, sondern soll für Privatpersonen die Möglichkeit bieten, Aufgaben auszulagern oder die eigene Arbeitskraft besser zu nutzen.
# Kernelemente
## Anbieter
Diese Personen geben an, dass sie Unterstützung bei der Erledigung von Aktionen benötigen. Das können Rentner oder körperlich eingeschränkte Personen sein, die für die Erledigung physisch nicht in der Lage sind, aber auch Personen die nicht die Zeit, Fachkenntnis o.ä. besitzen, um die Aktion selbst auszuführen.
## Dienstleister
Diese Personen geben an, dass sie Kapazitäten besitzen, um Jobs zu übernehmen, die von den Anbietern angeboten werden. Das können jugendliche sein, die neben der Schule etwas Geld verdienen möchten, aber auch Vollzeitkräfte, die Geld für einen Urlaub o.ä. dazuverdienen möchten.
## Jobs
Jobs sind meistens lokal und temporär gebunden und stehen daher nur einem gewissen Nutzerkreis zur Verfügung. Die App soll dafür sorgen, dass die Jobs den entsprechenden Nutzern, die in Frage kommen, angezeigt werden.
# Herausforderungen
## Community
Die App wird nur funktionieren, wenn sich lokale Nutzerbasen entwickeln, da die Community für die Aufträge und Angebote verantwortlich ist.
# Technische Umsetzung
## Client
### Frameworks
Für die plattformunabhängige Entwicklung wird das Cordova Framework verwendet. Darauf operiert das Ionic Framework, das eine moderne und ansprechende Oberfläche durch die Verwendung des Material Designs bereitstellt.
### Pages
In der Mainpage findet lediglich das Routing der Pages statt. Homepage ist die Suchseite, auf der verfügbare Jobs in der Näche angezeigt werden. Die Elemente werden in einer Kartenansicht dargestellt, die durch ein Plugin realisiert wird, und von einem Provider angefordert, der direkt mit dem Server kommuniziert. Die weiteren Pages funktionieren nach dem selben Prinzip. Sie sind zunächst leere HTML Seiten, die von einem Provider mit Informationen gefüllt werden. Updates etc. werden ebenfalls über die POrovider ausgeführt, die alle Änderungen an den Server kommunizieren.
### Provider
Die Provider stellen Dienste dar, die von den Pages für vielfältige Zwecke verwendet werden. Die Hauptaufgabe der meisten Provider ist die Kommunikation mit dem Server. Das Teilen von Variablen und Informationen ist eine sekundäre Funktion. Die Client-Server-Kommunnikation findet ausschließlich auf Anfrage des Clients statt und wird durch eine REST-Schnittstelle realisiert. Grundlegende Methoden sind die Ausführung von CRUD-Operationen, die an die Server-DB weitergeleitet werden. Die Route definiert die DB-Operation, Einschränkungen können durch JSONa im Body der Nachricht angegeben werden. Teilweise wird Logik aber auch direkt im Provider ausgeführt.
## Server
### Frameworks
Der Server operiert in einer Docker-Compose Umgebung, die durch ein einfaches Command den darin enthaltenen Node-Server und die Mongo-DB startet. Als REST-Service wird Express verwendet. Mongoose wird als DBMS eingesetzt. Das hat den Vorteil, dass die eintreffenden JSONs direkt weiter an die Datenbank kommuniziert werden können.
### Abläufe
Mit Express werden die Routen definiert, an die sich die Clients wenden können. Der Body der Anfrage wird als Query an Mongoose gegeben. Das Resultat der DB-Operation wird dann an den Client zurück kommuniziert. Eine Besonderheit stellt das Heraussuchen der relevanten Jobs dar, weil direkt auf dem Servergefiltert wird, welche Jobs relevant sind. Diese Route stellt damit die komplexesten Abläufe auf dem Server dar.
# Artefakte
## Lastenheft
1. Der Nutzer hat ein eigenes Profil
2. Der Nutzer kann 
	1. sich mit seinem Profil einloggen
	2. sein Pofil ansehen
	3. sein Profil bearbeiten
	4. mit einem Bild (Kamera) personalisieren
4. Jobs werden 
	1. auf der Hauptseite in Kartenansicht dargestellt
	2. sinnvoll gefiltert
	3. nur in der Umgebung angezeigt
	4. mit einem persönlichen Bild (Kamera) versehen
6. Die selbsterstellten Jobs können 
	1. angezeigt werden
	2. gelöscht werden
	3. bearbeitet werden
	4. einem Bewerber zugeordnet werden
5. "Gematchte" Jobs können angezeigt werden
6. Gewählter Dienstleister oder Anbieter kann kontaktiert werden
7. Der Nutzer wird über Benachrichtugungen über neue Inhalte informiert
8. Nutzer können sich gegenseitig bewerten
9. Die Daten werden persistent auf einem Server gespeichert
10. Daten werden sicher übertragen
11. Einfache Sicherheitsvorkehrungen sind realisiert
## Backlog
1. Bilder können transferiert werden und als Profil- oder Jobbilder verwendet werden
2. Die Kamera kann als Bildquelle verwendet werden
3. Pushbenachrichtigungen informieren über neue Inhalte
4. Nutzer können sich gegenseitig bewerten
5. Jobs haben eine genauere Zeitangabe und können mit dem Kalender synchronisiert werden
6. Technische und organisatorische Maßnahmen zur Datensicherheit und zum Datenschutz werden realisiert
7. Der Loginprozess wird zum Beispiel mit Tokens optimiert
## Dokumentation
Diese ReadMe ist eine Meta-Dokumentation. Konkrete Codeteile sind direkt in den entsprechenden Dateien kommentiert
## Promo-Video
Eine Präsentation mit Video kann in der Datei ./doc/slides-deck.html eingesehen werden