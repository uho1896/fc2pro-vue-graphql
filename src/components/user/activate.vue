<template>
  <div class="container" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0)">
    <el-row class="message">
      <span>{{message}}</span>
    </el-row>
    <el-row>
      <el-col :span="12" :offset="12">
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
    const activate = this.$route.query.activate;

    return {
      activate,
      message: 'Activating...',
      loading: false,
    };
  },
  mounted() {
    this.activateUser();
  },
  methods: {
    async activateUser() {
      if (!this.activate) {
        this.message = 'Invalid activate code';
        return;
      }

      try {
        this.loading = true;
        const result = await this.$apollo.mutate({
          mutation: gqlUser.activateUser,
          variables: {
            activate: this.activate,
          },
        });
        this.loading = false;

        if (Array.isArray(result.errors) && result.errors.length > 0) {
          this.message = result.errors[0].message;
        } else {
          this.message = result.data.activateUser;
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
