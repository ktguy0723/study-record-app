<template>
  <div id="settings">
    <h3>設定</h3>
    <p>プロフィールの更新</p>

    <div v-if="showSuccess" class="alert alert-success" role="alert">
      更新に成功しました。
    </div>
        
    <form @submit.prevent>
      <label for="name">名前</label>
      <input v-model.trim="name" type="">
      <b-button @click="updateProfile()">更新</b-button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      name: '',
      showSuccess: false,
    }
  },
  computed: {
    ...mapState(['userProfile'])
  },
  methods: {
    updateProfile() {
      this.$store.dispatch('updateProfile', {
        name: this.name !== '' ? this.name : this.userProfile.name
      })
      this.name = ''
      this.showSuccess = true
      
      setTimeout(() => {
        this.showSuccess = false
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>