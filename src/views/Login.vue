<template>
  <div class="container mt-3">
    <b-form v-if="showLoginForm" @submit.prevent>
      <PasswordReset v-if="showPasswordReset" @close="togglePasswordReset()"></PasswordReset>
      <h1>ログイン</h1>
      <b-form-group label-for="email1" label="Email address:">
        <b-form-input 
          v-model.trim="loginForm.email" 
          type="text" 
          placeholder="you@email.com" 
          id="email1"
        />
      </b-form-group>

      <b-form-group label-for="password1" label="Password:">
        <b-form-input 
          v-model.trim="loginForm.password" 
          type="password" 
          placeholder="******" 
          id="password1"
        />  
      </b-form-group>
      <div class="my-2">
        <b-alert v-if="errorMessage !== ''" show variant="danger">{{errorMessage}}</b-alert>
      </div>
      <b-button @click="login()" variant="primary" class="m-2">Log In</b-button>
      <div>
        <b-link @click="togglePasswordReset()" v-b-modal.reset-modal class="m-2">Forgot Password</b-link>
        <b-link @click="toggleForm()" class="m-2">Create an Account</b-link>
      </div>
    </b-form>

    <b-form v-else @submit.prevent>
      <h1>新規登録</h1>
      <b-form-group label-for="name" label="Name:">
        <b-form-input 
          v-model.trim="signupForm.name" 
          type="text" 
          placeholder="name" 
          id="name"
        />
      </b-form-group>

      <b-form-group label-for="email2" label="Email address:">
        <b-form-input 
          v-model.trim="signupForm.email" 
          type="text" 
          placeholder="you@email.com" 
          id="email2"
        />
      </b-form-group>

      <b-form-group label-for="password2" label="Password:">
        <b-form-input  
          v-model.trim="signupForm.password" 
          type="text" 
          placeholder="min 6 characters" 
          id="password2"
        />
      </b-form-group>

      <b-button @click="signup()" variant="primary" class="m-2">Sign Up</b-button>
      <div>
        <b-link @click="toggleForm()" class="m-2">Back to Log In</b-link>
      </div>
    </b-form>
  </div>

</template>

<script>
import PasswordReset from '@/components/PasswordReset'
import { mapState } from 'vuex' 
export default {
  components: {
    PasswordReset
  },
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      signupForm: {
        name: '',
        email: '',
        password: ''
      },
      showLoginForm: true,
      showPasswordReset: false,
    }
  },
  computed: {
    ...mapState(['errorMessage']),
  },
  methods: {
    login() {
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password
      })
    },
    signup() {
      this.$store.dispatch('signup', {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name
      })
    },
    toggleForm() {
      this.showLoginForm = !this.showLoginForm
    },
    togglePasswordReset() {
      this.showPasswordReset = !this.showPasswordReset
    }
  }
}
</script>

<style lang="scss" scoped>

</style>