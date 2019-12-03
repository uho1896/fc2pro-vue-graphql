<template>
  <div class="container" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0)">
    <el-row v-show="message" class="message">
      <span>{{message}}</span>
    </el-row>
    <el-row><span>email：</span></el-row>
    <el-row>
      <el-input v-model="email" placeholder="input email" />
    </el-row>
    <el-row><span>Password：</span></el-row>
    <el-row>
      <el-input v-model="password" placeholder="input password" show-password
        @keyup.enter.native="onLogin" />
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-button @click="onLogin" :disabled="!ableToSubmit">Login</el-button>
      </el-col>
      <el-col :span="12">
        <el-link type="danger" href="/user/forgetPwd">Forget Password</el-link>
        <span> | </span>
        <el-link type="danger" href="/user/register">Register</el-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
import * as gqlUser from '@/gql/user';

export default {
  data() {
    return {
      email: '',
      password: '',
      message: '',
      loading: false,
    };
  },
  computed: {
    ...mapState({
      token: (state) => state.user.token,
      user: (state) => state.user.user,
    }),
    ableToSubmit() {
      return (/\S+@\S+\.\S+/.test(this.email) && this.password.length > 6);
    },
  },
  mounted() {
    if (this.token) {
      this.getUser();
    }
  },
  methods: {
    ...mapActions('user', [
      'setToken',
      'setUser',
    ]),
    async onLogin() {
      if (!this.ableToSubmit) {
        return;
      }

      try {
        this.loading = true;
        const result = await this.$apollo.mutate({
          mutation: gqlUser.login,
          variables: {
            email: this.email,
            password: this.password,
          },
        });
        this.loading = false;

        if (Array.isArray(result.errors) && result.errors.length > 0) {
          this.message = result.errors[0].message;
        } else if (result.data.login) {
          this.setToken(result.data.login);
          this.getUser();
        }
      } catch (e) {
        this.message = e.message || e;
        this.loading = false;
      }
    },
    async getUser() {
      try {
        this.loading = true;
        const result = await this.$apollo.query({
          query: gqlUser.getUserByEmail,
          variables: {
            email: this.email || (this.user && this.user.email),
          },
        });
        this.loading = false;

        if (Array.isArray(result.errors) && result.errors.length > 0) {
          this.message = result.errors[0].message;
        } else if (result.data.getUserByEmail) {
          this.setUser(result.data.getUserByEmail);
          this.redirect();
        }
      } catch (e) {
        this.message = e.message || e;
        this.loading = false;
      }
    },
    redirect() {
      if (this.$route.redirectedFrom && this.$route.redirectedFrom != this.$route.path) {
        return this.$router.push(this.$route.redirectedFrom);
      } else {
        return this.$router.push('/');
      }
    },
  },
};
</script>
<style scoped>
.container {
  margin: auto;
  max-width: 450px;
}
.container > .el-row {
  margin-top: 10px;
  display: flex;
}
.container span {
  line-height: 2.5;
}
.message {
  color: red;
  word-break: break-word;
  text-align: left;
}
</style>
