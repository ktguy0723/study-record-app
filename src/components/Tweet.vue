<template>
  <b-button @click="tweet()">tweet</b-button>
</template>

<script>
export default {
  props:['title', 'timerDisplay'],
  methods: {
    tweet() {
      let url = 'https://github.com/ktguy0723';
      let text = '';
      text = `学習時間：${this.timerDisplay}%0D%0A学習内容：${this.title}%0D%0A`
       
      if(text.length > 70) {
        text = text.slice(0, 70) + '…%0D%0A'        
        console.log(text.length, url.length)
      } 
      const sendUrl = `http://twitter.com/share?url=${url}&text=${text}`
      window.open(sendUrl, '_blank', "width=600,height=300")
    }
  }
}
</script>