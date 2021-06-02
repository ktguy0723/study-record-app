<template>
  <div class="container">
    <table v-if="records.length" class="table table-hover">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">学習日時</th>
          <th scope="col">内容</th>
          <th scope="col">学習時間</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in records" :key="record.id">
          <td :class="record.color"></td>
          <td>{{ record.createdOn | formatDate }}</td>
          <td>{{ record.title }}</td>
          <td>{{ record.studyTime | formatTime }}</td>
          <td><b-button @click="showUpdateModal(record)">変更</b-button></td>
          <td><b-button @click="showDeleteModal(record)">削除</b-button></td>
        </tr>
      </tbody>
    </table>
    
    <div v-else>
      <p>No data</p>
    </div>
    <div>total : {{records | sumTime | formatTime}}</div>

    <!-- delete modal -->
    <b-modal @ok="deleteRecord" id="delete-modal" title="レコード削除">
        削除しますか？
    </b-modal>

    <!-- update modal -->
    <b-modal @ok="updateRecord" id="update-modal" title="内容更新">
      <div>
        <label for="title">更新内容</label> 
        <input v-model="record.title" type="text" id="title">
      </div>
      <b-form-group label="Color" v-slot="{ ariaDescribedby }">
        <b-form-radio-group
          v-model="record.color"
          :aria-describedby="ariaDescribedby"
          button-variant="outline-primary"
          buttons
        >
          <b-form-radio value="color-red">RED</b-form-radio>
          <b-form-radio value="color-blue">BLUE</b-form-radio>
          <b-form-radio value="color-green">GREEN</b-form-radio>
          <b-form-radio value="color-yellow">YELLOW</b-form-radio>
          <b-form-radio value="color-black">BLACK</b-form-radio>
        </b-form-radio-group>
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  data() {
    return {
      record:{},
      title:''
    }
  },
  computed:{
    ...mapState(['records'])
  },
  methods: {
    showDeleteModal(record) {
      this.record = record
      this.$bvModal.show('delete-modal')
    },
    deleteRecord() {
      this.$store.dispatch('deleteRecord', this.record) 
    },
    showUpdateModal(record) {
      this.record = record
      this.$bvModal.show('update-modal')
    },
    updateRecord() {
      console.log(this.record)
      this.$store.dispatch('updateRecord', this.record)
    }    
  },
  filters: {
    formatColor(color) {
      color
    },
    formatDate(val) {
      if(!val) { return '-' }
      let date = val.toDate()
      return moment(date).format('YYYY年MM月DD日 hh時mm分')
    },
    formatTime(val) {
      const hh = ('00' + Math.floor(val / 3600)).slice(-2)
      const mm = ('00' + Math.floor(val / 60) % 60).slice(-2)
      const ss = ('00' + val % 60).slice(-2)
      return `${hh}:${mm}:${ss}`
    },
    sumTime(records) {
      let sum = 0
      records.forEach(obj => {
        sum += obj.studyTime
      })
      return sum
    }
  },
}
</script>

<style lang="scss" scoped>
.color-red {
  background-color: red
}
.color-blue {
  background-color: blue
}
.color-green {
  background-color: green
}
.color-yellow {
  background-color: yellow
}
.color-black {
  background-color: black
}
</style> 