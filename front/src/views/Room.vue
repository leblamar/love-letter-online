<template>
  <div id="room">
    <div
      class="room"
      v-if="!game.hasStarted"
    >
      <WaitingRoom />
    </div>
    <div
      class="room"
      v-else
    >
      <div
        class="room"
        v-if="!hasFinished"
      >
        <PlayingRoom />
      </div>
      <div
        class="room"
        v-else
      >
        <FinishRoom />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

import WaitingRoom from "@/components/WaitingRoom"
import PlayingRoom from "@/components/PlayingRoom"
import FinishRoom from "@/components/FinishRoom"

export default {
  components: {
    WaitingRoom,
    PlayingRoom,
    FinishRoom
  },
  computed: {
    ...mapState({
      game: 'game',
      hasFinished: 'gameIsFinished'
    }),
  },
}
</script>

<style>
  #room {
    background-image: url('/images/game-room.jpg');
    background-size: 100%;
    height: 100vh;
    width: 100vw;
  }

  .room {
    padding: 0;
    margin: 0;
  }

</style>