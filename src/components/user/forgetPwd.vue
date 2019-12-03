<template>
  <div class="container" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0)">
    <el-row v-if="message" class="message">
      <span>{{message}}</span>
    </el-row>
    <el-row><span>Email：</span></el-row>
    <el-row>
      <el-input v-model="email" placeholder="input email"
        @keyup.enter.native="onForgetPwd" />
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-button @click="onForgetPwd" :disabled="!ableToSubmit">
          Send password reset email
        </el-button>
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
    return {
      email: '',
      message: '',
      loading: false,
    };
  },
  computed: {
    ableToSubmit() {
      return /\S+@\S+\.\S+/.test(this.email);
    },
  },
  methods: {
    async onForgetPwd() {
      if (!this.ableToSubmit) {
        return;
      }

      try {
        this.loading = true;
        const result = await this.$apollo.mutate({
          mutation: gqlUser.forgetPwd,
          variables: {
            email: this.email,
          },
        });
        this.loading = false;

        if (Array.isArray(result.errors) && result.errors.length > 0) {
          this.message = result.errors[0].message;
        } else {
          this.message = result.data.forgetPwd;
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
