// ==UserScript==
// @name         LSS Lehrgangsausblender
// @namespace    www.leitstellenspiel.de
// @version      1.1
// @description  Versteckt Lehrgänge, die nicht gewünscht/benötigt werden
// @author       MissSobol
// @match        https://www.leitstellenspiel.de/buildings/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Definiere welche Lehrgänge versteckt werden sollen (true um zu verstecken, false um anzuzeigen)
    var filterSettings = {
        "Messtechnik": false,
        "GW-Gefahrgut Lehrgang (3 Tage)": false,
        "Höhenrettung": false,
        "ELW 2": false,
        "Wechsellader": false,
        "Dekon-P": false,
        "Feuerwehrkran": false,
        "Flugfeldlöschfahrzeug": false,
        "Rettungstreppen": false,
        "Werkfeuerwehr": false,
        "Feuerwehr-Verpflegungseinheit": false,
        "LNA": false,
        "OrgL": false,
        "SEG - Einsatzleitung": false,
        "SEG - GW-San": false,
        "Rettungshundeführer (SEG)": false,
        "SEG Drohne": false,
        "Zugtrupp": false,
        "Fachgruppe Räumen": false,
        "Fachgruppe Wassergefahren": false,
        "Fachgruppe Bergungstaucher": false,
        "Fachgruppe Rettungshundeführer": false,
        "Fachgruppe Wasserschaden/Pumpen": false,
        "Fachgruppe Schwere Bergung": false,
        "Fachgruppe Elektroversorgung": false,
        "Trupp Unbemannte Luftfahrtsysteme": false,
        "Führung und Kommunikation": false,
        "Zugführer": false,
        "Hundertschaftsführer": false,
        "Polizeihubschrauber": false,
        "Wasserwerfer": false,
        "SEK": false,
        "MEK": false,
        "Hundeführer (Schutzhund)": false,
        "Motorradstaffel": false,
        "Brandbekämpfung": false,
        "Kriminalpolizei": false,
        "Dienstgruppenleitung": false,
        "Reiterstaffel": false,
        "Notarzt-Ausbildung": {
            "education_keys": {
                "0": false, // Notarzt Rettungsdienst
                "9": true, // Notarzt Feuerwehr
            }
        },
        "Verpflegungshelfer": {
            "education_keys": {
                "11": false, // Verpflegungshelfer Rettungsdienst
                "17": true, // Verpflegungshelfer Feuerwehr
            }
        },
        "Intensivpflege": {
            "education_keys": {
                "8": false, // Intansivpflege Rettungsdienst
                "13": true, // Intansivpflege Feuerwehr
            }
        },
        "Wasserrettung": {
            "education_keys": {
                "5": false, // Wasserrettung Rettungsdienst
                "7": false, // Wasserrettung Feuerwehr
            }
        },
        "GW-Taucher": {
            "education_keys": {
                "6": false, // Taucher Rettungsdienst
                "8": false, // Taucher Feuerwehr
            }
        },
    };

    // Funktion zum Verstecken von Elementen basierend auf den Filtereinstellungen
    function hideElements() {
        var schoolingDiv = document.getElementById('schooling');
        if (schoolingDiv) {
            var radioElements = schoolingDiv.getElementsByClassName('radio');
            for (var i = 0; i < radioElements.length; i++) {
                var label = radioElements[i].getElementsByTagName('label')[0];
                if (label) {
                    var labelText = label.textContent.trim();
                    for (var filter in filterSettings) {
                        if (labelText.includes(filter)) {
                            var educationKey = radioElements[i].querySelector('input.radio').getAttribute('value');
                            var educationSettings = filterSettings[filter]["education_keys"];
                            if (educationSettings && educationSettings[educationKey] !== undefined && educationSettings[educationKey]) {
                                radioElements[i].style.display = 'none';
                                console.log('Verstecke Lehrgang:', filter, 'mit education_key:', educationKey);
                            } else {
                                radioElements[i].style.display = '';
                                console.log('Zeige Lehrgang:', filter, 'mit education_key:', educationKey);
                            }
                        }
                    }
                }
            }
        }
    }

    // Führe die Funktion zum Verstecken auf Seitenladung aus
    hideElements();

})();
