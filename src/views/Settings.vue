<template>
  <div id="settings" class="container">
    <h3>設定</h3>

    <b-form-group
      label="新しいユーザ名"
      label-for="name"
      class="my-2 col-6"
    >
      <b-form-input
        id="name"
        v-model.trim="name"
        placeholder="Enter your name"
      ></b-form-input>
    </b-form-group>
    <b-button @click="updateProfile()">更新</b-button>


    <div v-if="showSuccess" class="alert alert-success" role="alert">
      更新に成功しました。
    </div>
      
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