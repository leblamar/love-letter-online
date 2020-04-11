<template>
    <v-row>
        <v-col>
            <v-row
                justify="center"
            >
                <div id="cards" class="cards box">
                    <v-carousel
                        height="100%"
                    >
                        <v-carousel-item
                            v-for="test in testNBR"
                            :key="test"
                        >
                            <h2>Test {{ test }}</h2>
                        </v-carousel-item>
                        <v-carousel-item
                            class="carouselItem"
                            v-for="(card,i) in cards"
                            :key="i"
                        >
                            <figure>
                                <img
                                    :src="cardsBaseURL + card.src"
                                    :alt="'Carte ' + card.altTitle"
                                    width="220"
                                    height="320"
                                    :title="'La carte ' + card.altTitle">
                                <figcaption>
                                    <strong>{{ card.name }}</strong> : Valeur {{ card.value }}, {{ card.numberOfCopies }} Exemplaire.
                                </figcaption>
                            </figure>

                            <p v-html="card.cardDesc"></p>
                        </v-carousel-item>
                    </v-carousel>
                </div>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        name: 'Cards',
        computed: {
            ...mapState({
                cards: 'cards'
            })
        },
        data () {
            return {
                cardsBaseURL: "http://localhost:8080/images/cards/",
            }
        }
    }

</script>

<style>
    .cards {
        top: 210vh;
    }

    #cards {
        padding: 0;
    }

    .carouselItem {
        display: flex;
        text-align: center;
        flex-direction: column;
        padding: 5%;
        overflow: auto;
    }

</style>