// ==UserScript==
// @name         AMQ Typo fix
// @namespace    https://github.com/Metakino
// @version      1.0
// @description  Allow you to save different lists and load them quicker
// @author       Metakino
// @match        https://animemusicquiz.com/*
// @require      https://raw.githubusercontent.com/TheJoseph98/AMQ-Scripts/master/common/amqScriptInfo.js
// @grant        none
// ==/UserScript==


/** --- presets --- **/


if (!window.setupDocumentDone) return;


/** --- fixing typo --- **/


// TUUUU TU TU TUUUUUUU TU TU TUUUUUU TU TUUUUU TU TUUUUUUUUU
$("div#mhInsertTypeContainer div.checkboxContainer div:eq(0) p")
    .html("Hibike");

// Fuck klinsk
$("div#mhInsertTypeContainer div.checkboxContainer div:eq(1) p")
    .html("Klinsk");


/** --- script info --- **/

// Add metadata
AMQ_addScriptData({
    name: "AMQ Typo fix",
    author: "Metakino",
    description: `
        <p>Just fixing a few typo left by Egerod here and there.</p>
    `
});

