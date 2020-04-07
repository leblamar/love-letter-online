<template>
  <div>
    <div v-if="!game.hasStarted">
      <WaitingRoom />
    </div>
    <div v-else>
      <div v-if="!hasFinished">
        <PlayingRoom />
      </div>
      <div v-else>
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