<template>
  <App>
    <SoundCloud
      class="w-full"
      track="194881641"
      :mini="true"
      @ready="ready"
    />
  </App>
</template>

<script>
import { App } from '@enjine/components';
import SoundCloud from 'vue-soundcloud-player';

export default {
  async mounted() {
      const res = await this.$sc.getUser('equaliser')
      console.log(res);
  },
  components: {
    App,
    SoundCloud
  }
}
</script>

<style>
</style>
