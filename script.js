/*|||||||||||||||||||LES VARIABLES|||||||||||||||||||||*/
/*----Les joueurs et ennemis sont des variables stockées sous la forme: var entité = [x,y,dernier déplacement, image correspondante]----*/
joueur_xy = [getRandomIntInclusive(0,15),getRandomIntInclusive(0,7),"null", "joueur_xy.png"];
etoile_xy = [getRandomIntInclusive(0,15),getRandomIntInclusive(0,7),"null","etoile_xy.png"];
etoile2_xy = [getRandomIntInclusive(0,15),getRandomIntInclusive(0,7),"null","etoile2_xy.png"];
var last_moove = {"droite": -1, "gauche": 1, "bas": 1, "haut": -1};
var score = 0;
            
/*Fonction pour placer l'image*/
function placer(ww){
    /*Enlever l'image sur l'ancienne case*/
    if(ww[2] == "droite" || ww[2] == "gauche"){
        document.getElementById('x'+(ww[0]+last_moove[ww[2]])+'y'+ww[1]).className = "";
    }
    if(ww[2] == "haut" || ww[2] == "bas"){
        document.getElementById('x'+ww[0]+'y'+(ww[1]+last_moove[ww[2]])).className = "";
    }
    /*On vérifie si les ennemis sont sur la même case, Si oui on télporte aléatoirement un des ennemis*/
    if(ww==etoile_xy && etoile_xy[0]==etoile2_xy[0] && etoile_xy[1]==etoile2_xy[1]){
        etoile_xy[0] = getRandomIntInclusive(0,15);
        etoile_xy[1] = getRandomIntInclusive(0,7);
    }else if(ww==etoile2_xy && etoile_xy[0]==etoile2_xy[0] && etoile_xy[1]==etoile2_xy[1]){
        etoile2_xy[0] = getRandomIntInclusive(0,15);
        etoile2_xy[1] = getRandomIntInclusive(0,7);
    }
    /*Ajouter l'image sur la nouvelle case*/
    var joueurimg = document.getElementById('x'+ww[0]+'y'+ww[1]);
    joueurimg.className = ww[3].split(".")[0];
}
/*Fonction pour modifier et afficher le score*/
function afficher_score(){
    score += 10;
    if(score == 10){
        var div_titre = document.getElementById("titre");
        div_titre.style.fontFamily = "Press-2p";
        div_titre.style.backgroundColor = "black";
    }
    document.getElementById("titre").innerHTML = "SCORE :"+score;
}
/*Fonction du joueur*/
function bouton_(dir){
    dir(joueur_xy);
    ennemis(etoile_xy); 
    ennemis(etoile2_xy); 
    afficher_score();
}
            
/*-----------------------------------
----Association Touches Clavier------
-----------------------------------*/
document.addEventListener('keydown', function(event) {
    touche_pressée;
    var touche_pressée = event.key;
    
    if(touche_pressée == 37 && joueur_xy[0] != 0){ ///Si flèche gauche pressée ET que le joueur n'est pas sur la collone gauche
        joueur_xy[2] = "gauche";
    }else if(touche_pressée == 38 && joueur_xy[1] != 7){ ///Si flèche haute pressée ET que le joueur n'est pas sur la ligne du haut
        joueur_xy[2] = "haut";
    }else if(touche_pressée == 39 && joueur_xy[0] != 15){ ///Si flèche droite pressée ET que le joueur n'est pas sur la collone droite
        joueur_xy[2] = "droite";
    }else if(touche_pressée == 40 && joueur_xy[1] != 0){ ///Si flèche basse pressée ET que le joueur n'est pas sur la ligne du bas
        joueur_xy[2] = "bas";
    }
});
            
/*Fonction permettant la répétition des mouvements*/
setInterval(function(){
    if(joueur_xy[2] != "null" && joueur_xy[axes_listes[joueur_xy[2]]] != coordonnées_limites[joueur_xy[2]]){
        bouton_(traduction_fonction[joueur_xy[2]]);
    }
},800);
var traduction_fonction ={//les strings""" empêchent d'exécuter "haut"() comme si c'était haut()
    "haut": haut,
    "bas": bas,
    "gauche": gauche,
    "droite": droite,
}
var coordonnées_limites ={//si y=7 U y=0 U x=15 U x=0----->limite
    "haut":7,
    "bas":0,
    "droite":15,
    "gauche":0,
}
var axes_listes ={///haut et bas correspondent à joueur_xy[1] et droite et gauche correspondent à joueur_xy[0]
    "haut":1,
    "bas" :1,
    "droite" :0,
    "gauche" :0,
}
/*----------------------------
Fonction pour les déplacements
----------------------------*/
function gauche(perso){
    perso[0] -= 1;
    perso[2] = "gauche";
    placer(perso);
}
function haut(perso){
    perso[1] = Number(perso[1]) + 1;
    perso[2] = "haut";
    placer(perso);
}
function bas(perso){
    perso[1] -= 1;
    perso[2] = "bas";
    placer(perso);
}
function droite(perso){
    perso[0] = Number(perso[0]) + 1;
    perso[2] = "droite";
    placer(perso);
}
/*----------------------------------------
----------Intelligence du jeu-------------
----------------------------------------*/
function ennemis(mechant){
    /*On calcule les différences de position x et y*/
    var dif_x = Math.abs(joueur_xy[0]-mechant[0]);
    var dif_y = Math.abs(joueur_xy[1]-mechant[1]);
    /*Si l'ennemi est plus éloigné en x, il se déplace en x*/
    if(dif_x > dif_y){
        dplx(mechant);
    }
    /*Si l'ennemi est plus éloigné en y, il se déplace en y*/
    if(dif_x < dif_y){
       dply(mechant);
    }
    /*Si l'ennemi est à EGALE distance en x et en y*/
    if(dif_x == dif_y){
        var a = getRandomIntInclusive(0, 1)
        if(a == 0){
            dplx(mechant);
        }
        if(a == 1){
            dply(mechant);
        }
    }
    /*On teste après chaque déplacement de l'ennemi si il est sur la même case que le joueur, donc si le joueur a perdu*/
    if(joueur_xy[0]==mechant[0] && joueur_xy[1]==mechant[1]){
        window.alert("Tu as perdu!!!Ton score est de :"+score+'points...');
        window.location.reload();
    }
    sprites(mechant);
}
/*Fonction de Déplacement en x*/
function dplx(ennemi){
        if(joueur_xy[0] > ennemi[0]){
            droite(ennemi);
        }
        if(joueur_xy[0] < ennemi[0]){
            gauche(ennemi);
        }
}
/*Fonction de Déplacement en y*/
function dply(ennemi){
        if(joueur_xy[1] > ennemi[1]){
            haut(ennemi);
        }
        if(joueur_xy[1] < ennemi[1]){
            bas(ennemi);
        }  
}
/*----------------------
-----Random Math--------
----------------------*/
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}
/*Fonction de Création du tableau 16x8*/
function creation_tableau(){
    var k = document.getElementById("divp");
    for (var i = 7; i > -1; i--) {
        for (var j = 0; j < 16; j++){
            var l = document.createElement("div");
            l.setAttribute("id",'x'+j+'y'+i);
            k.appendChild(l);
        }
    }
}
/*Sprites des ennemis*/
function sprites(ennemi){ 
    $('.'+ennemi[3].split(".")[0]).css({backgroundPositionY: bg[ennemi[2]]});///JQuery nécessaire
}
var bg = {// @option pr les sprites directions => position y du bg en fonction de la direction
    haut: 0,
    droite: -124,
    bas: -186,
    gauche: -62
};
/*window.onload = function() {
    creation_tableau();
    placer(joueur_xy);
    placer(etoile_xy);
    placer(etoile2_xy)
}*/