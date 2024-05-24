$(document).ready(function() {
    $("#getVolume").click(function() {
        $.ajax({
            url: "/manipPepper",
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
        data: JSON.stringify({ action: "set_volume", volume: parseInt(newVolume, 10) }),
        $.ajax({
            url: "/manipPepper",
            type: "POST",
            data: JSON.stringify({ action: "set_volume", volume: parseInt(newVolume, 10) }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(response) {
                alert("Volume mis à jour: " + response.message);
                $("#getVolume").click(); 
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

$(document).ready(function(){
    $("#bvnrobots").click(function(){
$.ajax({
    url: "/manipPepper", 
    type: "POST",
    data: JSON.stringify({ action: "start_behavior", behavior: "bvnrobotique/behavior_1" }), // Ajoutez l'action attendue par le serveur
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

$(document).ready(function(){
    $("#move-up").click(function(){
$.ajax({
    url: "/manipPepper", 
    type: "POST",
    data: JSON.stringify({ action: "start_behavior", behavior: "mouvements/avancer" }), 
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

$(document).ready(function(){
    $("#move-down").click(function(){
$.ajax({
    url: "/manipPepper", 
    type: "POST",
    data: JSON.stringify({ action: "start_behavior", behavior: "mouvements/reculer" }), 
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

$(document).ready(function(){
    $("#move-left").click(function(){
$.ajax({
    url: "/manipPepper", 
    type: "POST",
    data: JSON.stringify({ action: "start_behavior", behavior: "mouvements/gauche" }), 
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

$(document).ready(function(){
    $("#move-right").click(function(){
$.ajax({
    url: "/manipPepper", 
    type: "POST",
    data: JSON.stringify({ action: "start_behavior", behavior: "mouvements/droite" }), 
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
    $("#increase-theta").click(function() {
        $.ajax({
            url: "/manipPepper",
            type: "POST",
            data: JSON.stringify({ action: "start_behavior", behavior: "mouvements/90dgrsD" }),
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
});

$(document).ready(function() {
    $("#decrease-theta").click(function() {
        $.ajax({
            url: "/manipPepper",
            type: "POST",
            data: JSON.stringify({ action: "start_behavior", behavior: "mouvements/90dgsG" }),
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
});

$(document).ready(function() {
    $("#imprimante").click(function() {
        $.ajax({
            url: "/manipPepper",
            type: "POST",
            data: JSON.stringify({ action: "start_behavior", behavior: "robot/behavior_1" }),
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
});

$(document).ready(function() {
    $("#baxter").click(function() {
        $.ajax({
            url: "/manipPepper",
            type: "POST",
            data: JSON.stringify({ action: "start_behavior", behavior: "robot/baxter" }),
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
});

$(document).ready(function() {
    $("#hexapode").click(function() {
        $.ajax({
            url: "/manipPepper",
            type: "POST",
            data: JSON.stringify({ action: "start_behavior", behavior: "robot/hexapode" }),
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
});

$(document).ready(function() {
    $("#nao").click(function() {
        $.ajax({
            url: "/manipPepper",
            type: "POST",
            data: JSON.stringify({ action: "start_behavior", behavior: "robot/nao" }),
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
});

$(document).ready(function() {
    $("#pandaRobot").click(function() {
        $.ajax({
            url: "/manipPepper",
            type: "POST",
            data: JSON.stringify({ action: "start_behavior", behavior: "robot/pandaRobot" }),
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
});

$(document).ready(function() {
    $("#waypointRobotic").click(function() {
        $.ajax({
            url: "/manipPepper",
            type: "POST",
            data: JSON.stringify({ action: "start_behavior", behavior: "robot/waypointRobotic" }),
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
});

$(document).ready(function() {
    $("#turtleBot").click(function() {
        $.ajax({
            url: "/manipPepper",
            type: "POST",
            data: JSON.stringify({ action: "start_behavior", behavior: "robot/turtleBot" }),
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
});

$(document).ready(function() {
    $("#sunfounderPicarS").click(function() {
        $.ajax({
            url: "/manipPepper",
            type: "POST",
            data: JSON.stringify({ action: "start_behavior", behavior: "robot/sunfounderPicarS" }),
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
});

function redirectToAjoutInfoPepper() {
    window.location.href = "/ajoutInfoPepper";
}
