import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userProfile: {},
    records: [],
    errorMessage: ''
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setRecords(state, val) {
      state.records = val
    },
    setErrorMessage(state, val) {
      state.errorMessage = val
    }
  },
  actions: {
    async login({ commit, dispatch }, form) {
      try {
        const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
        dispatch('fetchUserProfile', user)
        commit('setErrorMessage', '')
        dispatch('getRecords')
      } catch (err) {
        commit('setErrorMessage', err.message)
      }
    },
    async signup({ dispatch }, form) {
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)
      await fb.usersCollection.doc(user.uid).set({
        name: form.name
      })
      dispatch('fetchUserProfile', user)
      dispatch('getRecords')
    },
    async logout({ commit }){
      await fb.auth.signOut()

      commit('setUserProfile', {})
      router.push('/login')
    },
    async updateProfile({ dispatch }, user) {
      const userId = fb.auth.currentUser.uid
      await fb.usersCollection.doc(userId).update({
        name: user.name
      })
      dispatch('fetchUserProfile', { uid: userId })
      
      const recordDocs = await fb.recordsCollection.where('userId', '==', userId).get()
      recordDocs.forEach(doc => {
        fb.recordsCollection.doc(doc.id).update({
          userName: user.name
        })
      })
    },
    // records
    async createRecord({ state }, post) {
      await fb.recordsCollection.add({
        createdOn: new Date(),
        studyTime: post.studyTime,
        title: post.title,
        userId: fb.auth.currentUser.uid,
        userName: state.userProfile.name,
        color: post.color,
      })
    },
    async deleteRecord(_blank, post) {
      await fb.recordsCollection.doc(post.id).delete()
    },
    async updateRecord(_blank, post) {
      await fb.recordsCollection.doc(post.id).update({
        title: post.title,
        color: post.color,
      })
    },
    async getRecords() {
      fb.recordsCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
        let recordsArray = []
        snapshot.forEach(doc => {
          if (doc.data().userId === fb.auth.currentUser.uid) {
            let record = doc.data()
            record.id = doc.id
            recordsArray.push(record)
          }
        })
        store.commit('setRecords', recordsArray)
      })
    },
    async fetchUserProfile({ commit }, user) {
      const userProfile = await fb.usersCollection.doc(user.uid).get()
      commit('setUserProfile', userProfile.data())
      if (router.currentRoute.path === '/login') {
        router.push('/')      
      }
    },
  },
  modules: {
  }
})

fb.recordsCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
  let recordsArray = []
  snapshot.forEach(doc => {
    if (doc.data().userId === fb.auth.currentUser.uid) {
      let record = doc.data()
      record.id = doc.id
      recordsArray.push(record)      
    }
  })
  store.commit('setRecords', recordsArray)
})

export default store