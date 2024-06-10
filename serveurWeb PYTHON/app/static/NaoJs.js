$(document).ready(function() {
    function changeRobotMode(mode) {
        $.ajax({
            url: "/change-mode",
            type: "POST",
            data: JSON.stringify({ mode: mode }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(response) {
                console.log("Mode change success: " + response.message);
            },
            error: function(error) {
                alert("Erreur: " + JSON.stringify(error));
            }
        });
    }

    $("#disableAutonomousLife").click(function() {
        changeRobotMode('disable');
    });

    $("#wakeUpRobot").click(function() {
        changeRobotMode('wake_up');
    });

    $("#standUpRobot").click(function() {
        changeRobotMode('stand_up');
    });

    $("#startBehavior").click(function() {
        $.ajax({
            url: "/manipNao",
            type: "POST",
            data: JSON.stringify({ action: "start_behavior", behavior: "bienvenuenaoudm-cf9638/behavior_1" }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(response) {
                console.log("Comportement lancé: " + response.message);
            },
            error: function(error) {
                alert("Erreur lors du lancement du comportement: " + error.responseText);
            }
        });
    });

    $("#babyShark").click(function() {
        $.ajax({
            url: "/manipNao",
            type: "POST",
            data: JSON.stringify({ action: "start_behavior", behavior: "finvisite/behavior_1" }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(response) {
                console.log("Comportement lancé: " + response.message);
            },
            error: function(error) {
                alert("Erreur lors du lancement du comportement: " + error.responseText);
            }
        });
    });


    $("#findevisite").click(function() {
        $.ajax({
            url: "/manipNao",
            type: "POST",
            data: JSON.stringify({ action: "start_behavior", behavior: "finvisite/behavior_1" }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(response) {
                console.log("Comportement lancé: " + response.message);
            },
            error: function(error) {
                alert("Erreur lors du lancement du comportement: " + error.responseText);
            }
        });
    });

    $("#getVolume").click(function() {
        $.ajax({
            url: "/manipNao",
            type: "POST",
            data: JSON.stringify({ action: "get_volume" }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(response) {
                console.log("Volume actuel: " + response.volume);
                $("#volumeValue").text(response.volume);
            },
            error: function(error) {
                alert("Erreur lors de la récupération du volume: " + error.responseText);
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
                console.log("Volume mis à jour: " + response.message);
                $("#getVolume").click(); // Met à jour l'affichage du volume actuel
            },
            error: function(error) {
                alert("Erreur lors du réglage du volume: " + error.responseText);
            }
        });
    });
});
