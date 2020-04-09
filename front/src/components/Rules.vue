<template>
    <v-row>
        <v-col>
            <v-row
                justify="center"
            >
                <div class="rules box">
                    <h2>Règle de jeu</h2>
                    <ul>
                        <li>But du jeu</li>
                        <p>Une partie se joue en plusieurs manches. La manche est remportée par le dernier joueur en jeu, ou par le joueur qui a la carte de plus haute valeur à la fin de la pioche. Le joueur avec le plus de point de Faveur à la fin des manches remporte la partie.</p>
                        <li>Mise en place</li>
                        <p>Chaque joueur commence avec une carte en main. Une carte est brûlée (retirée de la pioche pour qu'on ne puisse pas compter les cartes restantes), et le reste des cartes constitue la pioche.</p>
                        <li>Déroulement</li>
                        <p>
                            Tour à tour, les joueurs piochent une carte, en jouent une en la posant devant eux et activent son effet. Voici leurs effets et leur valeur :
                            <ol start=0 >
                                <li><strong>Espionne </strong>: quand un joueur joue l’<strong>Espionne </strong>, s’il est le seul encore en lice ayant joué une <strong>Espionne </strong>, il gagne alors un point de Faveur. 2 Exemplaires</li>
                                <li><strong>Garde </strong>: le joueur désigne un adversaire et nomme une carte (sauf <strong>Garde </strong>). Si c’est la carte que l’adversaire a en main, alors l’adversaire est éliminé de la manche. 6 Exemplaires</li>
                                <li><strong>Prêtre </strong>: le joueur regarde la carte qu’un adversaire de son choix a en main. 2 Exemplaires</li>
                                <li><strong>Baron </strong>: le joueur choisit un adversaire. Les deux se montrent leur carte : celui dont la valeur de la carte est la plus faible est éliminé de la manche. Si leurs valeurs sont égales, alors personne n’est éliminé. 2 Exemplaires</li>
                                <li><strong>Servante </strong>: quand un joueur joue la <strong>Servante </strong>, il ne peut pas subir l’effet d’autres cartes pendant un tour, jusqu’à ce qu’il joue de nouveau. 2 Exemplaires</li>
                                <li><strong>Prince </strong>: le joueur choisit un joueur (lui compris) qui défausse sa carte et en pioche une autre immédiatement. 2 Exemplaires</li>
                                <li><strong>Chancelier </strong>: le joueur pioche 2 cartes. Il conserve 1 carte et place les 2 autres dans l’ordre de son choix sous le paquet. 2 Exemplaires</li>
                                <li><strong>Roi </strong>: le joueur échange sa carte avec celle d’un autre joueur de son choix. 1 Exemplaire</li>
                                <li><strong>Comtesse </strong>: elle n’a pas de pouvoir en soi, mais doit obligatoirement être jouée si le joueur qui la possède a aussi en main un <strong>Prince </strong> ou un <strong>Roi </strong>. 1 Exemplaire</li>
                                <li><strong>Princesse </strong>: elle n’a pas de pouvoir en soi, mais si elle doit être défaussée alors le joueur qui l’avait est éliminé de la manche. 1 Exemplaire</li>
                            </ol>
                        </p>
                        <li>Fin de manche</li>
                        <p>La manche se termine soit quand il n’y a plus qu’un joueur, soit lorsqu’il n’y a plus de carte dans la pioche. Les joueurs comparent alors la valeur de la carte qu’ils ont en main et la plus haute valeur l’emporte. S’il y a un ex-æquo, on regarde l’ensemble des cartes ayant été jouées pendant la manche : le joueur dont la somme est la plus importante l’emporte. Le joueur remportant la manche gagne un point de Faveur.</p>
                        <li>Fin de partie et vainqueur</li>
                        <p>La fin d’une partie est fixée par un nombre de manche. Le joueur possédant le plus de point de Faveur à la fin de la partie gagne.</p>
                    </ul>
                </div>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: 'Rules'
    }
</script>

<style>
    .box {
        border: 1px solid #F0C300;
        border-radius: 1em;
        height: 80vh;
        overflow: auto;
        padding: 1em;
        font-size: 40px;
        width: 45vw;
        background-color: rgba(0, 0, 0, 0.4);
        position: absolute;
        top: 110vh;
    }

    .rules {
        text-align: justify;
    }

    h2 {
        font-size: 2em;
    }

    .rules > ul {
        list-style-type: none;
        list-style-image: url('/images/logo.png');
        list-style-position: inside;
        margin: 0;
        padding: 0;
    }

    ul > li {
        font-size: 1.5em;
    }

    .rules ol {
        list-style-image: none;
        list-style-position: outside;
    }

</style>