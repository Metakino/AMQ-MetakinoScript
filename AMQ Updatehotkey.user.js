// ==UserScript==
// @name         AMQ Update hotkey
// @namespace    https://github.com/Metakino
// @version      1.1
// @description  Add an Hotkey to update your MAL list automatically
// @author       Metakino
// @match        https://animemusicquiz.com/*
// @require      https://raw.githubusercontent.com/TheJoseph98/AMQ-Scripts/master/common/amqScriptInfo.js
// @grant        none
// ==/UserScript==


if (!window.setupDocumentDone) return;

function key_up(event) {
    if(event.altKey && event.keyCode==82) {
	options.updateAniList();
	} else if(event.altKey && event.keyCode==84){
        options.updateKitsu();
    }else if(event.altKey && event.keyCode==89){
        options.updateMal();
    }
};

document.addEventListener('keyup', key_up, false);


/** --- script info --- **/


// Add metadata
AMQ_addScriptData({
    name: "Update hotkey",
    author: "Metakino",
    description: `
        <p>You can update your lists quickly without having to go in the settings with hotkeys : </p>
        <table>
           <tr><td>• Anilist : <b>[ALT + R]</b></td></tr>
           <tr><td>• Kitsu : <b>[ALT + T]</b></td></tr>
           <tr><td>• Anilist : <b>[ALT + Y]</b></td></tr>
        </table>
    `
});
