<template>
    <v-layout row>
        <v-flex lg6 sm6 xs-6>
            <v-card>
                <v-card-media src="static/coldplay_demo.jpg" height="300px">
                </v-card-media>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">Cold play</h3>
                        <div class="music-card-content">It's so cold 🐹🐷
                        </div>
                    </div>
                </v-card-title>
                <v-card-actions>
                    <v-btn flat color="blue" @click="onMusicPauseClick">Pause</v-btn>
                    <v-btn flat color="blue" @click="onMusicResumeClick">Resume</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
  import * as EventBus from '../eventbus/EventBus'

  export default {
    data () {
      return {
        timeSpan: this.$store.state.Setting.timeSpan
      }
    },
    name: 'landing-page',
    components: {},
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      onMusicPauseClick () {
        EventBus.instance.$emit(EventBus.MUSIC_PAUSE)
      },
      onMusicResumeClick () {
        EventBus.instance.$emit(EventBus.MUSIC_RESUME)
      }
    }
  }
</script>

<style lang="less">

    .music-card-content {
        font-size: larger;
    }

</style>
