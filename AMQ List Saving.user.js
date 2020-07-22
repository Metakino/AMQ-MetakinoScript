// ==UserScript==
// @name         AMQ List Saving
// @namespace    https://github.com/Metakino
// @version      0.1
// @description  Allow you to save different lists and load them quicker
// @author       Metakino
// @match        https://animemusicquiz.com/*
// @grant        none
// ==/UserScript==


if (!window.setupDocumentDone) return;

// Add the button to open the List Preset tab
$("div#settingsAnimeListContainer div:first div.row:eq(2)")
    .append($("<div></div>")
            .addClass("col-xs-6 listPreset")
            .append("<label for='listPresetButton'>List preset</label>")
            .append($("<div></div>")
                    .addClass("listPresetUpdateButtonContainer d-flex justify-content-center align-items-center")
                    .append($("<button id='listPresetButton'>Open List Preset Interface</button>")
                            .addClass("btn btn-primary")
                            .attr("onClick", "options.selectTab('settingsListPreset', this)")
                    )
            )
    );

// Add the List Preset tab
$("#settingModal .modal-body")
    .append($("<div></div>")
        .attr("id", "settingsListPreset")
            .addClass("settingContentContainer hide")
        .append($("<div></div>")
            .addClass("listPresetBody")
            .append($("<p>Write the name of the list you want to preset and choose the site it's on.<br> You're allowed up to 5 lists for the moment."
                      + "<br> To open the List Preset window, press Alt+Q at any time on the site. From this you'll be able to load in one click one of your preset list</p>"))
        )
    );

// Fill the List Preset tab
for (let i = 0; i<5; i++){
    $("#settingsListPreset .listPresetBody")
        .append($("<div></div>")
               .addClass("row")
               .append($("<div></div>")
                       .addClass("col-xs-12")
                       .append($('<label for="listPresetNameInput'+ i +'">List Preset '+ (i+1) +'</label>'))
                       .append($("<div></div>")
                               .append($('<input style="width: 50%;"></input>')
                                       .attr("id", "listPresetNameInput"+ i)
                                       .attr("type", "text")
                                       .attr("placeholder", "List Name")
                                       .attr("maxlenght", "20")
                                       .addClass("form-control aniListUpdateInput")
                               )
                               .append($("<div></div>")
                                       .addClass("listPreset"+i+"SiteContainer")
                                       .append($('<select id="listPreset'+ i +'Site" style="width: 30%; color: black;" class="form-control"></select>')
                                               .append($('<option value="anilist" selected>Anilist</option>'))
                                               .append($('<option value="mal">MyAnimeList</option>'))
                                               .append($('<option value="Kitsu">Kitsu</option>'))
                                       )
                               )
                               .append($("<div></div>")
                                       .addClass("listPreset"+i+"SaveContainer")
                                       .append('<button id="listPresetSave'+ i +'" class="btn btn-primary" onclick="TODO">Save</button>')
                               )
                      )
               )
        )
};


options.$SETTING_TABS = $("#settingModal .tab");
options.$SETTING_CONTAINERS = $(".settingContentContainer");