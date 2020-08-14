// ==UserScript==
// @name         AMQ Blocked Count
// @namespace    https://github.com/Metakino
// @version      1.0
// @description  Count the number of blocked player
// @author       Metakino
// @match        https://animemusicquiz.com/*
// @grant        none
// ==/UserScript==


/** --- presets --- **/


if (!window.setupDocumentDone) return;

let blockedCount;

$("div#optionsContainer > ul > li:eq(4)").addClass("kek")
    .click(function () {
    blockedCount = socialTab.blockedPlayers.length;
    $(".blockedIndicator" ).remove();
    $("#blockedPlayerModal .modal-header").append("<h4 class='blockedIndicator' style='text-align: center;'>"+ blockedCount + " players blocked</h4>");
    ;}
          );







