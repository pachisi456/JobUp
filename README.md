# Project-ReadMe
## Usecase
Die sich in Arbeit befindliche mobile App soll eine C2C Dienstleistungsvermittlung realisieren. Nutzer können Dienstleistungen anfragen oder anbieten. Dabei handelt es sich nicht nur um die Vermittlung von Handwerkern oder Unterehmensdienstleistungen, sondern soll für Privatpersonen die Möglichkeit bieten, Aufgaben auszulagern oder die eigene Arbeitskraft besser zu nutzen.
## Usergroups
### Dienstleister
Diese Personen geben an, dass sie Kapazitäten besitzen, um Jobs zu übernehmen, die von den Anbietern angeboten werden. Das können jugendliche sein, die neben der Schule etwas Geld verdienen möchten, aber auch Vollzeitkräfte, die Geld für einen Urlaub o.ä. dazuverdienen möchten.
### Anbieter
Diese Personen geben an, dass sie Unterstützung bei der Erledigung von Aktionen benötigen. Das können Rentner oder körperlich eingeschränkte Personen sein, die für die Erledigung physisch nicht in der Lage sind, aber auch Personen die nicht die Zeit, Fachkenntnis o.ä. besitzen, um die Aktion selbst auszuführen.
## Jobs
Jobs sind meistens lokal und temporär gebunden und stehen daher nur einem gewissen Nutzerkreis zur Verfügung. Die App soll dafür sorgen, dass die Jobs den entsprechenden Nutzern, die in Frage kommen, angezeigt werden.
## Hindernisse
### Community
Die App wird nur funktionieren, wenn sich lokale Nutzerbasen entwickeln, da die Community für die Aufträge und Angebote verantwortlich ist.  
### DiesDas
## Lastenheft
1. Angebote können aufgegeben werden
2. Angebote können angenommen werden
3. Nutzer haben ein Profil mit den Inhalten
	1. Rudimentäre personenbezogene Informationen
	2. ...
4. Bilder und andere BLOBs können gesendet, empfangen und angezeigt werden
## Technische Umsetzung
### Client
### Server
#### Funktionsumfang
1. Speichern der Nutzerprofile
2. Speichern der Aufträge
#### Funktionsweise
Über eine REST-Schnittstelle können JSON-Strings an den Server gesendet werden. Entsprechend der Anfrage werden die gesendeten Daten in einer MongoDB mit Hilfe von mongoose gespeichert, geändert oder gelöscht. Es können auch bestehende Daten abgefragt werden.
