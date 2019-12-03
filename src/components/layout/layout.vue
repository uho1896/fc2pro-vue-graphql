<template>
  <div>
    <div class="layout_header">
      <span />
      <span>{{title}}</span>
      <span v-if="!(user && user.email)"/>
      <el-dropdown v-if="user && user.email">
        <span class="el-dropdown-link">
          <i class="el-icon-menu el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item >
            <span @click="onHome">Home</span>
          </el-dropdown-item>
          <el-dropdown-item v-if="isAdmin">
            <span @click="onAdmin">Admin</span>
          </el-dropdown-item>
          <el-dropdown-item >
            <span @click="onLogout">Logout</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="layout_body">
      <router-view :key="key" />
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';

export default {
  name: 'userLayout',
  computed: {
    ...mapState({
      token: (state) => state.user.token,
      user: (state) => state.user.user,
    }),
    key() {
      return this.$route.fullPath;
    },
    title() {
      return this.$route.meta.title;
    },
    isAdmin() {
      return (this.user && this.user.role >= 100);
    },
  },
  methods: {
    ...mapActions('user', [
      'logout',
    ]),
    onHome() {
      if (this.$route.path != '/index') {
        this.$router.push('/index');
      }
    },
    onLogout() {
      this.logout();
      if (this.$route.path != '/user/login') {
        this.$router.push('/user/login');
      }
    },
    onAdmin() {
      if (this.$route.path != '/admin') {
        this.$router.push('/admin');
      }
    },
  },
};
</script>

<style scoped>
.layout_header {
  display: flex;
  color: white;
  justify-content: space-between;
  margin: 10px;
}
.layout_body {
  margin: 10px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #1fe1f8;
}
</style>
