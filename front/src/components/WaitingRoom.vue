<template>
    <div id="waitingRoom">
        <v-row
            justify="center"
        >
            <header><h1 class="waitingRoomGameID"> {{ game.id }} </h1></header>
        </v-row>

        <v-row
            justify="center"
        >
            <v-card
                color="rgba(255, 255, 255, 0.5)"
                elevation="24"
                height="30%"
                width="20%"
                shape
            >
                <v-card-title><h3>Joueurs</h3></v-card-title>
                <v-card-text>
                    <v-list
                        color="rgba(255, 255, 255, 0)"
                        width="100%"
                    >
                        <v-list-item
                            v-for="player in game.players"
                            :key="player.username"
                            class="users"
                        >
                            {{ player.username }}
                        </v-list-item>
                    </v-list>
                </v-card-text>
            </v-card>
        </v-row>

        <v-row
            justify="center"
            v-if="isHost"
        >
            <v-btn
                :disabled="!isGameReady"
                @click="launchGame"
                class="white--text"
                color="rgba(0, 0, 0, 0.5)"
            >
                Lancer la partie
            </v-btn>
        </v-row>
        
    </div>
</template>

<script>
    import { mapState, mapGetters } from 'vuex'

    export default {
        name: 'WaitingRoom',
        computed: {
            ...mapState({
                game: 'game'
            }),
            ...mapGetters({
                isHost: 'isHost',
                isGameReady: 'isGameReady'
            })
        },
        methods: {
            launchGame: function() {
                console.log("launching game")
                this.$socket.emit('launchGame', this.game.id)
            }
        }
    }
</script>

<style>
    #waitingRoom {
        height: 100vh;
        width: 100vw;
        padding: 0;
        margin: 0;
    }

    .waitingRoomGameID {
        text-shadow: none;
        padding-bottom: 8vh;
    }

    .users {
        font-size: 1.5em;
    }

    h3 {
        font-size: 1.5em;
    }
</style>