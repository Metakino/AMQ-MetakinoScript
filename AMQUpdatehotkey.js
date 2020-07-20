// ==UserScript==
// @name         AMQ Update hotkey
// @namespace    https://github.com/Metakino
// @version      0.1
// @description  Add an Hotkey to update your MAL list automatically
// @author       Metakino
// @match        https://animemusicquiz.com/*
// @grant        none
// ==/UserScript==

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
