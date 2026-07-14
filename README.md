# Tom & Sarah trouwwebsite — versie 9

Deze versie behoudt alle herstelde functionaliteit van versie 8.

Aangepast:
- nieuwe tekst op de voorpagina;
- hogere-resolutiefoto van Lodewijk van Male;
- “Onze uitnodiging” verwijderd van de foto;
- “Wij gaan trouwen” hoger geplaatst;
- uitnodigingstekst vervangen en taalkundig licht gecorrigeerd;
- visueel blok over “Ons verhaal” verwijderd;
- de knop “Lees ons verhaal” blijft behouden;
- uitnodigingskaart iets ruimer gemaakt voor de langere tekst.

Open `index.html` om de website te bekijken.


## Versie 10

- Het live aftelklokje staat nu ook onderaan op:
  - Uitnodiging
  - Ons verhaal
  - De dag
  - Praktisch
  - RSVP
  - Foto’s
- De voorpagina behoudt haar bestaande aftelklok.


## Versie 11 — Ons verhaal

- De pagina `ons-verhaal.html` is een strikt chronologisch fotoverhaal.
- Alle 78 aangeleverde genummerde foto's zijn gebruikt.
- Foto's met hetzelfde nummer staan samen.
- Hoofdstuk 1: Hoe het begon.
- Hoofdstuk 2: foto's 1 t.e.m. 43.
- Hoofdstuk 3: foto's 44 t.e.m. 59.
- Hoofdstuk 4: foto's 60 t.e.m. 69.
- De foto's kunnen chronologisch in een lightbox worden doorbladerd.
- De voorpagina bevat geen geforceerde regelbreuk meer.
- De uitnodiging vermeldt “Wij gaan trouwen!” en “exact vijf jaar samen”.


## Versie 12

- De hoofdstukgrens is gecorrigeerd.
- Hoofdstuk 3 loopt nu van foto 44 t.e.m. 59.
- Hoofdstuk 4 begint bij foto 60 en bevat alle volgende foto's.


## Versie 13

- Twee nachtelijke foto's van Brugge zijn toegevoegd aan hoofdstuk 1.
- Exacte dubbele foto's zijn uit het fotoverhaal en uit het pakket verwijderd.
- Foto 4, voor de Hofburg in Wenen, is de grote hoofdafbeelding van hoofdstuk 2.
- De chronologie blijft behouden: foto's 1–3 verschijnen vóór hoofdafbeelding 4.


## Versie 14

- De eerste foto van hoofdstuk 2 is verplaatst naar de positie tussen de vroegere foto's 36 en 37.
- De Hofburgfoto staat nu naast de tekst van hoofdstuk 2.
- De twee foto's van hoofdstuk 1 staan naast de tekst.
- Het fotoalbum gebruikt nu een chronologische, proportioneel gevulde fotostroom.
  Hierdoor sluiten portret- en landschapsfoto's beter op elkaar aan zonder grote lege vlakken.


## Versie 15 — RSVP

- De placeholderknop is verwijderd.
- Het ingebouwde RSVP-formulier verzendt de antwoorden rechtstreeks naar
  `tom.vandecasteele@hotmail.com`.
- Het onderwerp wordt automatisch opgebouwd als:
  `RSVP - [Naam op de uitnodiging]`.
- Na verzending blijft de gast op de website en verschijnt een bevestiging.
- Het formulier bevat een verborgen honeypot tegen eenvoudige spambots.

### Eenmalige activatie vóór publicatie

FormSubmit vraagt bij het allereerste testantwoord om het ontvangende
e-mailadres te bevestigen. Verstuur daarom zelf één testformulier en klik
vervolgens op de bevestigingslink die naar
`tom.vandecasteele@hotmail.com` wordt gestuurd. Pas daarna worden volgende
RSVP-antwoorden normaal afgeleverd.


## Versie 16 — RSVP-test opgelost

- De AJAX-verzending is vervangen door een gewone formulierverzending.
- Daardoor ontstaat geen CORS-fout meer wanneer het formulier lokaal wordt getest.
- Het formulier stuurt de huidige pagina mee via `_url`, zoals aanbevolen door FormSubmit.
- Op een gepubliceerde website keert de gast na verzending terug naar
  `rsvp-bedankt.html`.
- Bij een lokale test wordt eerst de bevestigings- of bedankpagina van
  FormSubmit getoond.
- Bij het allereerste formulier moet het ontvangende e-mailadres nog steeds
  eenmalig worden bevestigd via de activatiemail.
