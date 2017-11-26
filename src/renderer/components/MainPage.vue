<template>
    <v-layout row>
        <!--<v-flex lg-6 offset-lg-3>-->
        <!--Main page-->
        <!--</v-flex>-->
        <v-flex lg6 sm6 xs-6>
            <v-card>
                <v-card-media src="static/coldplay_demo.jpg" height="300px">
                </v-card-media>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                        <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...
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

<style>

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: 'Source Sans Pro', sans-serif;
    }

    #wrapper {
        height: auto;
        padding: 60px 80px;
        width: 100vw;
    }

    main {
        display: flex;
        justify-content: space-between;
    }

    main > div {
        flex-basis: 50%;
    }

    .left-side {
        display: flex;
        flex-direction: column;
    }

    .welcome {
        color: #555;
        font-size: 23px;
        margin-bottom: 10px;
    }

    .title {
        color: #2c3e50;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 6px;
    }

    .title.alt {
        font-size: 18px;
        margin-bottom: 10px;
    }

    .doc p {
        color: black;
        margin-bottom: 10px;
    }

    .doc button {
        font-size: .8em;
        cursor: pointer;
        outline: none;
        padding: 0.75em 2em;
        border-radius: 2em;
        display: inline-block;
        color: #fff;
        background-color: #4fc08d;
        transition: all 0.15s ease;
        box-sizing: border-box;
        border: 1px solid #4fc08d;
    }

</style>
