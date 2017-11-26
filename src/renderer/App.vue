<template>
    <div id="app">
        <v-app id="inspire">

            <!--content-->
            <v-content>
                <v-container fluid fill-height>
                    <v-layout justify-center align-center>
                        <keep-alive>
                            <router-view style="width: 100%;"></router-view>
                        </keep-alive>
                    </v-layout>
                </v-container>
            </v-content>

            <!--fab-->
            <v-btn
                    fab
                    bottom
                    right
                    color="pink"
                    dark
                    fixed
                    @click.stop="onMusicClockFabClick">
                <v-icon ref="fabIcon">play_arrow</v-icon>
            </v-btn>

            <!--drawer-->
            <v-navigation-drawer
                    fixed
                    clipped
                    :app="true"
                    v-model="drawer"
                    permanent
                    :width="260">
                <v-list dense>
                    <template v-for="(item, i) in items">
                        <v-layout
                                row
                                v-if="item.heading"
                                align-center
                                :key="i">
                            <v-flex xs6>
                                <v-subheader v-if="item.heading">
                                    {{ item.heading }}
                                </v-subheader>
                            </v-flex>
                            <v-flex xs6 class="text-xs-center">
                                <a href="#!" class="body-2 black--text">EDIT</a>
                            </v-flex>
                        </v-layout>
                        <v-list-group v-else-if="item.children" v-model="item.model" no-action>
                            <v-list-tile slot="item" @click="">
                                <v-list-tile-action>
                                    <v-icon>{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        {{ item.text }}
                                    </v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile
                                    v-for="(child, i) in item.children"
                                    :key="i"
                                    @click="">
                                <v-list-tile-action v-if="child.icon">
                                    <v-icon>{{ child.icon }}</v-icon>
                                </v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        {{ child.text }}
                                    </v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list-group>
                        <v-list-tile v-else @click="onDrawerItemClicked(item.linkTo)">
                            <v-list-tile-action>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{ item.text }}
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </template>
                </v-list>
            </v-navigation-drawer>

            <!--toolbar-->
            <v-toolbar
                    color="blue darken-3"
                    dark
                    app
                    clipped-left
                    fixed>
                <v-toolbar-title
                        :style="$vuetify.breakpoint.smAndUp ? 'width: 300px; min-width: 250px' : 'min-width: 72px'"
                        class="ml-0 pl-3">
                    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                    <span class="hidden-xs-only">Music Clock</span>
                </v-toolbar-title>
                <!--<v-text-field-->
                <!--light-->
                <!--solo-->
                <!--prepend-icon="search"-->
                <!--placeholder="Search"-->
                <!--style="max-width: 500px; min-width: 128px">-->
                <!--</v-text-field>-->
                <div class="d-flex align-center" style="margin-left: auto">
                    <v-btn icon>
                        <v-icon>apps</v-icon>
                    </v-btn>
                    <v-chip disabled color="pink" text-color="white" class="top-count-down">
                        <v-icon left>alarm</v-icon>
                        <span class="count-time-label">{{countDown.currentCountDownLabel}}</span>
                    </v-chip>
                </div>
            </v-toolbar>
        </v-app>
    </div>
</template>

<script>
  import * as EventBus from './eventbus/EventBus'
  import * as Types from './store/types'
  import {Howl} from 'howler'

  export default {
    name: 'ssthouse-tool',
    data () {
      return {
        dialog: false,
        drawer: null,
        music: null,
        countDown: {
          running: false,
          startTime: null,
          currentCountDownLabel: this.getCountDownLabel(this.$store.state.Setting.timeSpan * 60)
        },
        countDownHandler: null,
        timeSchedule: null,
        items: [
          {icon: 'contacts', text: 'Main Page', linkTo: 'mainPage'},
          {icon: 'history', text: 'Music List', linkTo: 'musicList'},
          {icon: 'content_copy', text: 'Setting', linkTo: 'setting'}
        ]
      }
    },
    methods: {
      onDrawerItemClicked (linkTo) {
        this.$router.push(linkTo)
      },
      onMusicClockFabClick () {
        // this.music.play()
        if (this.countDown.running) {
          this.endCountDown()
        } else {
          this.startCountDown()
        }
      },
      initListener () {
        var self = this
        // listen to music control event
        EventBus.instance.$on(EventBus.MUSIC_PAUSE, () => {
          self.music.pause()
        })
        EventBus.instance.$on(EventBus.MUSIC_RESUME, () => {
          if (self.music.playing()) {
            return
          }
          self.music.play()
        })
        EventBus.instance.$on(EventBus.TIME_SPAN_CHANGE, (value) => {
          if (this.countDown.running !== true) {
            this.countDown.currentCountDownLabel = this.getCountDownLabel(value * 60)
          }
        })
      },
      initFabListener () {
        EventBus.instance.$on(EventBus)
      },
      getCountDownLabel (secondNum) {
        var minuteNum = Number.parseInt(secondNum / 60)
        var second = Number.parseInt(secondNum % 60)
        var secondStr = second >= 10 ? second : '0' + second
        return minuteNum + ':' + secondStr
      },
      startCountDown () {
        var self = this
        this.$refs.fabIcon.textContent = 'pause'
        var startTime = new Date()
        this.countDown.running = true
        this.countDown.startTime = startTime
        this.countDownHandler = setInterval(() => {
          var curDate = new Date()
          var secondPassNum = Math.floor((curDate - this.countDown.startTime) / 1000)
          var leftSecNum = this.$store.state.Setting.timeSpan * 60 - secondPassNum
          self.countDown.currentCountDownLabel = this.getCountDownLabel(leftSecNum)

          // when time is over
          if (leftSecNum === 0) {
            this.music.play()
            this.endCountDown()
          }
        }, 1000)
      },
      endCountDown () {
        // TODO for now: restore count down
        clearInterval(this.countDownHandler)
        this.$refs.fabIcon.textContent = 'play_arrow'
        this.countDown.running = false
        this.countDown.currentCountDownLabel = this.getCountDownLabel(this.$store.state.Setting.timeSpan * 60)
      }
    },
    props: {
      source: String
    },
    created: function () {
      this.$router.push('mainPage')
      EventBus.instance.$on(EventBus.TIME_SPAN_CHANGE, (value) => {
        this.$store.commit(Types.UPDATE_TIME_SPAN, value)
      })
      // try play music
      // var demoMusicPath = require('path').resolve('static', 'music', 'Yellow.mp3')
      this.music = new Howl({
        src: ['static/music/Yellow.mp3']
      })
      this.initListener()
    }
  }
</script>

<style lang="less">
    /* CSS */
    .top-count-down {
        padding-left: 8px;
        padding-right: 8px;

        .count-time-label {
            font-size: larger;
        }
    }
</style>
