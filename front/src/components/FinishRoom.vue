<template>
    <div id="finishRoom">
        <v-row
            justify="center"
        >
            <header><h1 class="finish">Fin de la partie !</h1></header>
        </v-row>

        <v-row
            justify="center"
        >
            <header><h2 class="resultat">Résultats :</h2></header>
        </v-row>

        <v-row
            justify="space-around"
        >
            <v-col cols="4">
                <v-card
                    color="rgba(255, 255, 255, 0.7)"
                >
                    <v-card-title>Classement des joueurs vivants :</v-card-title>

                    <v-list
                        dark
                    >
                        <v-list-item
                            v-for="(player, index) in playerAlive()"
                            :key="index"
                        >
                            <v-list-item-icon>
                                <span class="points">
                                    {{ player.card }}
                                </span>
                                <v-avatar>
                                    <v-img
                                        class="icone"
                                        :src="iconsBaseURL + cards[player.card].src"
                                        :alt="'Icône de ' + cards[player.card].altTitle"
                                        :title="'Icône de ' + cards[player.card].altTitle"
                                        width="3em"
                                    ></v-img>
                                </v-avatar>
                            </v-list-item-icon>

                            <v-list-item-content>
                                <div>
                                    {{ player.username }}
                                    <v-avatar
                                        v-if="player.hasSpy"
                                    >
                                        <v-img
                                            class="icone"
                                            :src="iconsBaseURL + 'spy.png'"
                                            alt="Espionne"
                                            title="Espionne"
                                            width="3em"
                                        ></v-img>
                                    </v-avatar>
                                </div>
                            </v-list-item-content>

                            <v-list-item-icon>
                                <span class="points">
                                    {{ player.points }}
                                </span>
                                <v-avatar>
                                    <v-img
                                        class="icone"
                                        :src="imagesBaseURL + 'logo.png'"
                                        alt="Point"
                                        title="Faveur"
                                        width="3em"
                                    ></v-img>
                                </v-avatar>
                            </v-list-item-icon>
                        </v-list-item>
                    </v-list>

                    <v-card-title>Joueurs morts :</v-card-title>

                    <v-list
                        dark
                    >
                        <v-list-item
                            v-for="(player, index) in playerDead()"
                            :key="index"
                        >
                            <v-list-item-icon>
                                <span class="points">
                                    {{ player.card }}
                                </span>
                                <v-avatar>
                                    <v-img
                                        class="icone"
                                        :src="iconsBaseURL + cards[player.card].src"
                                        :alt="'Icône de ' + cards[player.card].altTitle"
                                        :title="'Icône de ' + cards[player.card].altTitle"
                                        width="3em"
                                    ></v-img>
                                </v-avatar>
                            </v-list-item-icon>

                            <v-list-item-content>
                                <div>
                                    {{ player.username }}
                                    <v-avatar
                                        v-if="player.hasSpy"
                                    >
                                        <v-img
                                            class="icone"
                                            :src="iconsBaseURL + 'spy.png'"
                                            alt="Espionne"
                                            title="Espionne"
                                            width="3em"
                                        ></v-img>
                                    </v-avatar>
                                </div>
                            </v-list-item-content>

                            <v-list-item-icon>
                                <span class="points">
                                    {{ player.points }}
                                </span>
                                <v-avatar>
                                    <v-img
                                        class="icone"
                                        :src="imagesBaseURL + 'logo.png'"
                                        alt="Point"
                                        title="Faveur"
                                        width="3em"
                                    ></v-img>
                                </v-avatar>
                            </v-list-item-icon>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>

            <v-col cols="4">
                <v-card
                    color="rgba(255, 255, 255, 0.7)"
                >
                    <v-card-title>Classement général :</v-card-title>
                    <v-list
                        dark
                    >
                        <v-list-item
                            v-for="(player, index) in playerRank()"
                            :key="index"
                        >
                            <v-list-item-content>
                                {{ player.username }}
                            </v-list-item-content>

                            <v-list-item-icon>
                                <span class="points">
                                    {{ player.points }}
                                </span>
                                <v-avatar>
                                    <v-img
                                        class="icone"
                                        :src="imagesBaseURL + 'logo.png'"
                                        alt="Point"
                                        title="Faveur"
                                        width="3em"
                                    ></v-img>
                                </v-avatar>
                            </v-list-item-icon>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-col>
        </v-row>

        <v-row
            justify="center"
        >
            <v-btn
                v-if="isHost"
                @click="launchGame"
                dark
            >
                Recommencer une partie
            </v-btn>
        </v-row>
    </div>
</template>

<script>
    import { mapState, mapGetters } from 'vuex'

    export default {
        name: 'FinishRoom',
        data () {
            let imagesBaseURL = "http://localhost:8080/images/"
            return {
                imagesBaseURL: imagesBaseURL,
                iconsBaseURL: imagesBaseURL + "icons/"
            }
        },
        computed: {
            ...mapState({
                game: 'game',
                cards: 'cards'
            }),
            ...mapGetters({
                isHost: 'isHost'
            })
        },
        methods: {
            playerRank: function() {
                return this.game.players.sort((a, b) => a.points < b.points)
            },
            playerAlive: function() {
                return this.game.players.filter(player => !player.isDead).sort((a, b) => a.card < b.card)
            },
            playerDead: function() {
                return this.game.players.filter(player => player.isDead).sort((a, b) => a.card < b.card)
            },
            launchGame: function() {
                this.$socket.emit('launchGame', this.game.id)
            }
        }
    }
</script>

<style>
    #finishRoom {
        height: 100vh;
        width: 100vw;
        padding: 0;
        margin: 0;
    }

    .finish {
        color: #F0C300;
        font-size: 9em;
        font-family: 'Lovers Quarrel', cursive;
    }

    .resultat {
        font-size: 3em;
    }

    .resBoxTitle {
        font-size: 2em;
        text-align: center;
    }

    .points {
        font-size: 1.8em;
        color: #F0C300;
    }
</style>