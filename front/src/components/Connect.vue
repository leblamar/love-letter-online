<template>
    <div id="connect">
        <header><h1>Love Letter Online</h1></header>
        <div class="form">
            <form>
                <v-row>
                    <v-text-field
                        label="Username"
                        class="input username"
                        solo
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-btn
                        block
                        class="input create"
                        large
                    >
                        Créer une partie
                    </v-btn>
                </v-row>
                <div class="space">
                </div>
                <v-row>
                    <v-col
                        cols="6"
                        sm="4"
                    >
                        <v-text-field
                            label="GameID"
                            class="input gameid"
                            solo
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="6"
                        sm="8"
                    >
                        <v-btn
                            block
                            class="input join"
                            large
                        >
                            Rejoindre une partie
                        </v-btn>
                    </v-col>
                </v-row>
            </form>
        </div>
    </div>
</template>

<script>
</script>

<style>
    h1 {
        font-size: 5em;
        text-align: center;
        margin: 0;
        padding: 20px 0;
        text-shadow: 3px 3px 1px black;
    }

    .form {
        display: flex;
        justify-content: center;
    }

    form {
        font-family: sans-serif;
        border: 1px solid #F0C300;
        border-radius: 1em;
        margin: 1em;
        padding: 1.25em 1.5em;
        padding-bottom: 0;
        width: 60%;
    }

    .space {
        height: 7.5%;
    }

</style>
