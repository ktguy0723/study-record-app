<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/" class="mx-3">Study Monster すたもん</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">タイマー</b-nav-item>
          <b-nav-item to="status">ステータス</b-nav-item>
          <b-nav-item to="record">記録</b-nav-item>
          <b-nav-item to="settings">設定</b-nav-item>
          <b-nav-item v-b-modal.logout-modal>ログアウト</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-modal @ok="logout()" id="logout-modal" title="ログアウト確認">
      ログアウトしますか？
    </b-modal>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>