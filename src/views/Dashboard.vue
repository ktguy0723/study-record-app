<template>
  <div class="container">
    <div class="row justify-content-center">
      <h1 class="display-1 text-center">{{ timerDisplay }}</h1>
    </div>

    <!-- title -->
    <b-container class="my-4">
      <b-row class="justify-content-center">
        <b-col md="6">
          <b-form-group
            id="title"
            description="学習した内容を書いてください"
            label="学習内容"
            label-for="title"
          >
            <b-form-input id="title" v-model="post.title" trim></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="justify-content-center my-3">
        <b-form-group label="グループ" class="col-md-6">
          <b-form-radio-group
            id="radio-group-2"
            v-model="post.color"
            :options="colorOptions"
            name="color-btn"
            button-variant="outline-secondary"
            buttons
          ></b-form-radio-group>
        </b-form-group>
      </b-row>
    </b-container>


    <div class="row justify-content-center">
      <b-button @click="startTimer" variant="outline-secondary" class="my-2 col-md-3 col-10">
        {{ timerButton }}
      </b-button>
      <b-button v-b-modal.reset variant="outline-secondary" class="my-2 col-md-3 col-10" :class=" seconds ? '' : 'disabled' ">
        リセット
      </b-button>
    </div>

   
    <div class="row justify-content-center">
      <b-button v-b-modal.post-time variant="outline-secondary" class="my-2 col-md-3 col-10" :class=" seconds ? '' : 'disabled' ">
        登録
      </b-button>
    </div>
  <!-- calcel modal -->
    <div>
      <b-modal @ok="resetTimer" id="reset" title="リセット確認">
        <p>リセットしますか？</p>
        <p>登録しないと学習記録は保存されません</p>
      </b-modal>
    </div>

  <!-- 登録モーダル -->
    <div>
      <b-modal @ok="createRecord" id="post-time" title="学習記録の登録確認">
        <p>学習記録を登録しますか？</p>
        <p>学習時間：{{timerDisplay}}</p>
        <p>学習内容：{{post.title}}</p>
        <Tweet :timerDisplay="timerDisplay" :title="post.title"></Tweet>
      </b-modal>
    </div>

  </div>
</template>

<script>
import buttonSfx from '../assets/audio/Click.mp3'
import { mapState } from 'vuex'
import Tweet from '@/components/Tweet'

export default {
  components: {
    Tweet
  },
  data() {
    return {
      audio: null,
      startButtonFlg: false, 
      timerButton: '開始',
      seconds: 0,
      timer: null,
      post: {
        title: '',
        color: 'color-black'
      },

      colorOptions: [
        {text: 'RED', value: 'color-red'},
        {text: 'BLUE', value: 'color-blue'},
        {text: 'YELLOW', value: 'color-yellow'},
        {text: 'GREEN', value: 'color-green'},
        {text: 'BLACK', value: 'color-black'},
      ]
    }
  },
  computed: {
    ...mapState(['userProfile']),
    timerDisplay() {
      let hours = this.zeroPadding( Math.floor(this.seconds / 3600 )) 
      let mins = this.zeroPadding(( Math.floor(this.seconds / 60 )) % 60 )
      let seconds = this.zeroPadding( this.seconds % 60 )
      return `${hours}:${mins}:${seconds}`
    }
  },
  mounted() {
    this.audio = new Audio(buttonSfx)
  },
  methods:{
    startTimer(){
      this.startButtonFlg = !this.startButtonFlg
      // 開始or再開を押下
      if(this.startButtonFlg) {
        this.audio.play()
        this.timerButton = "停止"
        this.timer = setInterval(this.countTimer,1000)
      // 一時停止を押下
      } else {
        this.audio.play()
        this.timerButton = "再開"
        clearInterval(this.timer)
      }
    },
    resetTimer() {
        this.startButtonFlg = false
        this.audio.play()
        clearInterval(this.timer)
        this.seconds = 0
        this.timerButton = "開始"
    },
    countTimer() {
      this.seconds++
    },
    zeroPadding(num) {
      return ('00' + num).slice(-2)
    },
    createRecord() {
      this.$store.dispatch('createRecord', {
        studyTime: this.seconds,
        title: this.post.title,
        color: this.post.color
      })
      this.resetTimer()
      this.post.title = ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&family=Roboto&display=swap');

.container {
  font-family: 'Roboto', sans-serif;

}
</style>