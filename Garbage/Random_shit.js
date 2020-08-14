$("#settingModal .tabContainer")
    .append($("<div></div>")
        .addClass("tab leftRightButtonTop clickAble")
        .attr("onClick", "options.selectTab('settingsTest', this)")
        .append($("<h5></h5>")
            .text("Test")
        )
    );

$("#settingModal #settingsAnimeListContainer")
    .append($("<div></div>")
        .addClass("modal fade")
        .attr("id", "listPresetModal")
        .attr("tabindex", "-1")
        .attr("role", "dialog")
        .append($("<div></div>")
               .addClass("modal-dialog")
               .attr("role", "document")
               .append($("<div></div>")
                       .addClass("modal-content")
                       .append($("<div></div>")
                               .addClass("modal-header")
                               .append($('<button type="button" class="close" data-dismiss="modal" data-target="#listPresetModal" aria-label="Close"><span aria-hidden="true">×</span></button>'))
                               .append($("<h4></h4>")
                                      .text("List Preset")
                               )
                       )
               )
        )
    );

function getFriendList(){
    friendListAR = [];
    onlineUserAR = [];
    let fl = document.querySelector("#friendOnlineList").querySelectorAll('.stPlayerName');
    let ul = document.querySelector("#allUserList").querySelectorAll('.stPlayerName');
    fl.forEach(element => friendListAR.push(element.innerText.trim()));
    ul.forEach(element => onlineUserAR.push(element.innerText.trim()));
    updateFrUsList();
}
