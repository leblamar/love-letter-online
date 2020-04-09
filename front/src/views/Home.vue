<template>
    <div id="home">
        <div id="page1" class="page">
            <v-row justify="center" align="start">
                <Connect></Connect>
            </v-row>
            <v-btn
                class="button gameDown white--text"
                :color="color"
                href="#page2"
                x-large
            >
                Règles du jeu
            </v-btn>
        </div>
        <div id="page2" class="page">
            <v-btn
                class="button rulesUp white--text"
                :color="color"
                href="#page1"
                x-large
            >
                Jouer au jeu
            </v-btn>
            <Rules></Rules>
            <v-btn
                class="button rulesDown white--text"
                :color="color"
                href="#page3"
                x-large
            >
                Les différentes cartes
            </v-btn>
        </div>
        <div id="page3" class="page">
            <v-btn
                class="button cardsUp white--text"
                :color="color"
                href="#page2"
                x-large
            >
                Règles du jeu
            </v-btn>
            <Cards></Cards>
            <v-btn
                class="button cardsDown white--text"
                :color="color"
                href="#page1"
                x-large
            >
                Jouer au jeu
            </v-btn>
        </div>
    </div>
</template>

<script>
    import Cards from '@/components/Cards.vue'
    import Connect from '@/components/Connect.vue'
    import Rules from '@/components/Rules.vue'

    export default {
        name: 'Home',
        components: {
            Cards,
            Connect,
            Rules
        },
        data () {
            return {
                color: 'rgba(0, 0, 0, 0.3)'
            }
        }
    }
</script>

<style>
    #home {
        font-size: 30px;
        font-family: 'Lovers Quarrel', cursive;
        color: #F0C300;
        background-image: url('/images/love-letter-accueil.jpg');
        background-size: 100% auto;
        background-color: #6E0B14;
        background-repeat: repeat;
    }

    .page {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100vh;
    }

    .button {
        position: absolute;
        width: 100%;
        font-family: sans-serif;
    }

    .gameDown {
        bottom: 200vh;
    }

    .rulesUp {
        top: 100vh;
    }

    .rulesDown {
        bottom: 100vh;
    }

    .cardsUp {
        top: 200vh;
    }

    .cardsDown {
        bottom: 0vh;
    }

</style>