Ce mini-jeu que j'ai réalisé au début du confinement est avant tout centré sur le Java Script pour le calcul des distances.

L'utilisateur est un fantome poursuivit par 2 Pac-Man (Pour Changer les rôles).
Il se dirige à l'aide des flèches du clavier.
Lorsqu'il appuie sur une flèche, le jeu se met en route.

Le quadrillage de jeu est généré par une double boucle for.
A chaque période donnée, le fantôme, si il n'a pas reçu de changement de trajectoire, répète le même mouvement que le 
précédent. 
Si les ennemis venaient à se superposer, l'un d'eux serait déplacé sur une case aléatoire.

A chaque nouveau déplacement, le programme calcul les distances entre le joueur et ses ennemis (en se basant sur un repère
orthonormé X;Y). Les ennemis se rapprocheront du joueur en se déplacant d'abord sur l'axe qui les éloignent le plus du 
joueur.	

Pour une meilleur expérience de jeu, il est conseillé de mettre le navigateur en plein écran.
