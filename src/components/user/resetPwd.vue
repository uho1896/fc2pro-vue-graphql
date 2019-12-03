<template>
  <div class="container" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0)">
    <el-row v-if="message" class="message">
      <span>{{message}}</span>
    </el-row>
    <el-row><span>Password：</span></el-row>
    <el-row>
      <el-input v-model="password" placeholder="input password" show-password />
    </el-row>
    <el-row><span>Password confirm：</span></el-row>
    <el-row>
      <el-input v-model="passwordConfirm" placeholder="input password again" show-password
        @keyup.enter.native="onSubmit" />
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-button @click="onSubmit" :disabled="!ableToSubmit">Submit</el-button>
      </el-col>
      <el-col :span="12">
        <el-link type="primary" href="/user/login">Login</el-link>
        <span/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as gqlUser from '@/gql/user';

export default {
  data() {
    const reset = this.$route.query.reset;
    const token = this.$store.state.user && this.$store.state.user.token;
    const message = (reset || token) ? '' : 'invalid password reset';

    return {
      reset,
      password: '',
      passwordConfirm: '',
      message: message,
      loading: false,
    };
  },
  computed: {
    ableToSubmit() {
      return (
        this.password.length > 6 &&
        this.password == this.passwordConfirm
      );
    },
  },
  methods: {
    async onSubmit() {
      if (!this.ableToSubmit) {
        return;
      }

      try {
        this.loading = true;
        const result = await this.$apollo.mutate({
          mutation: gqlUser.resetPwd,
          variables: {
            password: this.password,
            reset: this.reset,
          },
        });
        this.loading = false;

        if (Array.isArray(result.errors) && result.errors.length > 0) {
          this.message = result.errors[0].message;
        } else {
          this.message = result.data.resetPwd;
        }
      } catch (e) {
        this.message = e.message || e;
        this.loading = false;
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
