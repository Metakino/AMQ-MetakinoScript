// ==UserScript==
// @name         AMQ List Saving & Quick Load
// @namespace    https://github.com/Metakino
// @version      0.1
// @description  Allow you to save different lists and load them quicker
// @author       Metakino
// @match        https://animemusicquiz.com/*
// @require      https://raw.githubusercontent.com/TheJoseph98/AMQ-Scripts/master/common/amqWindows.js
// @require      https://raw.githubusercontent.com/TheJoseph98/AMQ-Scripts/master/common/amqScriptInfo.js
// @grant        none
// ==/UserScript==


/** --- presets --- **/


if (!window.setupDocumentDone) return;

let maxSave = 5;

let listLoadingWindow;
let listSaved = [];

for (let i = 0; i<maxSave; i++){
    listSaved.push(
        {
            name: "",
            site: "anilist",
        }
    );
};


/** --- saving list tab --- **/


// Add the button to open the List Saving tab
$("div#settingsAnimeListContainer div:first div.row:eq(2)")
    .append($("<div></div>")
            .addClass("col-xs-6 listSaving")
            .append("<label for='listSavingButton'>List Saving & Quick load</label>")
            .append($("<div></div>")
                    .addClass("listSavingUpdateButtonContainer d-flex justify-content-center align-items-center")
                    .append($("<button id='listSavingButton'>Open List Saving Interface</button>")
                            .addClass("btn btn-primary")
                            .attr("onClick", "options.selectTab('settingsListSaving', this)")
                    )
            )
    );

// Add the List Saving tab
$("#settingModal .modal-body")
    .append($("<div></div>")
        .attr("id", "settingsListSaving")
            .addClass("settingContentContainer hide")
        .append($("<div></div>")
            .addClass("listSavingBody")
            .append($("<p>Write the name of the list you want to preset and choose the site it's on.<br> You're allowed up to 5 lists for the moment."
                      + "<br> To open the List Saving window, press Alt+A at any time on the site. From this you'll be able to load in one click one of your preset list</p>"))
        )
    );

// Fill the List Saving tab
for (let i = 0; i<maxSave; i++){
    $("#settingsListSaving .listSavingBody")
        .append($("<div></div>")
                .addClass("row")
                .append($("<div></div>")
                        .addClass("col-xs-12")
                        .append($('<label for="listSavingNameInput'+ i +'">List Saving Slot '+ (i+1) +'</label>'))
                       )
                .append($("<div></div>")
                        .addClass("col-xs-4")
                        .append($('<input style="width: 110%;"></input>')
                                .attr("id", "listSavingNameInput"+ i)
                                .attr("type", "text")
                                .attr("placeholder", "List Name")
                                .attr("maxlenght", "20")
                                .addClass("form-control listSaveInput")
                               ))
                .append($("<div></div>")
                        .addClass("listSaving"+i+"SiteContainer col-xs-4")
                        .append($('<select id="listSavingSite'+ i +'" style="width: 110%; color: black;" class="form-control"></select>')
                                .append($('<option value="anilist" selected>Anilist</option>'))
                                .append($('<option value="mal">MyAnimeList</option>'))
                                .append($('<option value="kitsu">Kitsu</option>'))
                               )
                       )
                .append($("<div></div>")
                        .addClass("listSaving"+i+"BtnContainer col-xs-4")
                        .append('<button id="listSavingSave'+ i +'" class="btn btn-primary btn-listLoadSave">Save</button>')
                        .click(function(){
        let listName = $("#listSavingNameInput"+i).val();
        let listSite = $("#listSavingSite"+i).val();
        storeListSaving(listName, listSite, i);
                              })
                       )

               )
};


/** --- loading list window --- **/


function createListLoadingWindow(){
    listLoadingWindow = new AMQWindow({
        id: "listLoadingWindowID",
        title: "List Loading",
        width: 520,
        height: 520,
        minWidth: 450,
        minHeight: 350,
        zIndex: 1060,
        resizable: false,
        draggable: true
    });
    listLoadingWindow.addPanel({
        id: "listLoadingInfo",
        width: 1.0,
        height: 60
    });
    listLoadingWindow.addPanel({
        id: "listLoadingContainer",
        width: 1.0,
        height: "calc(100% - 60px)",
        position: {
            x: 0,
            y: 60
        },
        scrollable: {
            x: true,
            y: true
        }
    });

    listLoadingWindow.panels[0].panel
    .append($("<div></div>")
            .addClass("listLoadingInfoDiv")
            .append($("<p>You can quickly load all the list you've saved from this window."
                      + "<br>Just click on the Load button right next to the wanted list.</p>"))
    );
    listSaved.forEach(loadingListSaved);
};


function loadingListSaved(listData, index){
    let i = parseFloat(index);
    if (listData.name!=""){
        listLoadingWindow.panels[1].panel
            .append($("<div></div>")
                    .addClass("row listLoadDisplay")
                    .append($("<div></div>")
                            .addClass("col-xs-12")
                            .append($('<label for="listLoadingName'+ i +'">List Loading Slot '+ (i+1) +'</label>'))
                           )
                    .append($("<div></div>")
                            .addClass("col-xs-4")
                            .append($('<input style="width: 110%;" readonly></input>')
                                    .attr("id", "listLoadingName"+ i)
                                    .attr("type", "text")
                                    .attr("placeholder", "List Name")
                                    .attr("maxlenght", "20")
                                    .addClass("form-control listUpdateLoad")
                                    .val(listData.name)
                                   )
                           )
                    .append($("<div></div>")
                            .addClass("col-xs-4")
                            .append($('<select id="listSavingSite'+ i +'" style="width: 110%; color: black;" class="form-control" disabled></select>')
                                    .append($('<option value="anilist" selected>Anilist</option>'))
                                    .append($('<option value="mal">MyAnimeList</option>'))
                                    .append($('<option value="kitsu">Kitsu</option>'))
                                    .val(listData.site)
                                   )
                           )
                    .append($("<div></div>")
                            .addClass("col-xs-4")
                            .append('<button id="listSavingSave'+ i +'" class="btn btn-primary btn-listLoadSave">Load</button>')
                            .click(function(){loadList(i)})
                           )
                   )

    } else {
        listLoadingWindow.panels[1].panel
            .append($("<div></div>")
                    .addClass("row listLoadDisplay")
                    .append($("<div></div>")
                            .addClass("col-xs-12")
                            .append($("<b>No list saved on slot" + (i+1) +"</b>"))
                           )
                   )
    }
}

// Hotkey to open the List Loading Window
function key_up(event) {
    if(event.altKey && event.keyCode==81) {
		listLoadingWindow.open();
	}
};


/** --- local storage management --- **/


// Called everytime a list is saved to store it
function storeListSaving(listName, listSite, id){
    if (listName != ""){
        id = parseFloat(id)
        listSaved[id] = {name: listName, site: listSite};
        localStorage.setItem("listSaved", JSON.stringify(listSaved));
        displayMessage("Update Successful", "This list has been saved in slot "+(id+1))
    }
    updateListSaved();
}

// Load the saved lists
function loadSettings() {
    // load settings, if nothing is loaded, use default settings
    let loadedLists = localStorage.getItem("listSaved");
    if (loadedLists !== null) {
        listSaved = JSON.parse(loadedLists);
    }
    updateListSaved();
}

// Update the lists saved
function updateListSaved() {
    if(listLoadingWindow){
        listLoadingWindow.panels[1].clear();
        listSaved.forEach(loadingListSaved);
    }
    listSaved.forEach(setListSavedInputs);

}

function setListSavedInputs(listData, index){
    let i = parseFloat(index);
    $('#listSavingNameInput'+i).val(listData.name);
    $('#listSavingSite'+i).val(listData.site);
}


/** --- functions call + list update --- **/

function loadList(i){
    if(listSaved[i].site=="anilist"){
        $('#aniListUserNameInput').val(listSaved[i].name);
        options.updateAniList()
    } else if(listSaved[i].site=="kitsu"){
        $('#malUserNameInput').val(listSaved[i].name);
        options.updateMal()
    } else if(listSaved[i].site=="mal"){
        $('#kitsuUserNameInput').val(listSaved[i].name);
        options.updateKitsu()
    }
}


// All functions called at the page's loading
loadSettings();
createListLoadingWindow();


/** --- other things necessary --- **/


options.$SETTING_TABS = $("#settingModal .tab");
options.$SETTING_CONTAINERS = $(".settingContentContainer");
document.addEventListener('keyup', key_up, false);


/** --- script info --- **/

// Add metadata
AMQ_addScriptData({
    name: "List Saving & Quick Loading",
    author: "Metakino",
    description: `
        <p>You can save lists and load them quickly without having to write its name in settings each time. (For those who are playing on different lists or with training lists)</p>
        <p>To save a list, go to <b>Settings -> Anime List -> Open List Saving Interface</b>. Then write the name of the list you want to save, choose the site it's on and save it.</p>
        <p>Once this done, you can open the List Loading window at any moment in the game by pressing <b>Alt+Q</b>. Then you just have to load the list you want and... play :) </p>
        <p>You can save up to 5 lists for the moment. More list means bigger interface (so hard to not look ugly) and I doubt anybody uses billion of lists anyway. Might increase the cap later though.</p>
    `
});


// Custom CSS coz buck footstrap
AMQ_addStyle(`
    #listLoadingInfo {
        border-bottom: 1px solid #6d6d6d;
        padding: 5px;
        text-align: center;
    }
    #listLoadingContainer {
        padding: 5px;
    }
    .btn-listLoadSave {
        margin-left: 10px;
    }
    .listLoadDisplay {
        padding: 5px;
        border-bottom: 1px dashed #6d6d6d;
    }
`);

