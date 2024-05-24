$(document).ready(function(){
    $("#startBehavior").click(function(){
$.ajax({
    url: "/manipNao", 
    type: "POST",
    data: JSON.stringify({ action: "start_behavior", behavior: "bienvenuenaoudm-cf9638/behavior_1" }), // Ajoutez l'action attendue par le serveur
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(response){
        console.log("Comportement lancé: " + response.message);
    },
    error: function(error){
        alert("Erreur lors du lancement du comportement: " + error.responseText);
    }
});
});
});

$(document).ready(function() {
$("#getVolume").click(function() {
    $.ajax({
        url: "/manipNao",
        type: "POST",
        data: JSON.stringify({ action: "get_volume" }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(response) {
            $("#volumeValue").text(response.volume);
        },
        error: function(error) {
            alert("Erreur lors de la récupération du volume: ", error);
        }
    });
});

$("#setVolume").click(function() {
    var newVolume = $("#volumeInput").val();
    $.ajax({
        url: "/manipNao",
        type: "POST",
        data: JSON.stringify({ action: "set_volume", volume: parseInt(newVolume, 10) }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(response) {
            alert("Volume mis à jour: " + response.message);
            $("#getVolume").click(); // Actualiser l'affichage du volume
        },
        error: function(error) {
            alert("Erreur lors du réglage du volume: ", error);
        }
    });
});
});

$(document).ready(function(){
// ...

function changeRobotMode(mode) {
$.ajax({
    url: "/change-mode",
    type: "POST",
    data: JSON.stringify({ mode: mode }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(response){
        console.log(response.message);
    },
    error: function(error){
        alert("Erreur: " + JSON.stringify(error));
    }
});
}

$(document).ready(function(){
$("#disableAutonomousLife").click(function(){
    changeRobotMode('disable');
});

$("#wakeUpRobot").click(function(){
    changeRobotMode('wake_up');
});

$("#standUpRobot").click(function(){
    changeRobotMode('stand_up');
});
});
// ...
});