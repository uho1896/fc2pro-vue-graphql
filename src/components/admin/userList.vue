<template>
  <div class="container"
    v-loading="$apollo.queries.users && $apollo.queries.users.loading"
    element-loading-background="rgba(0, 0, 0, 0)"
  >
    <el-row v-if="message" class="message">
      <span>{{message}}</span>
    </el-row>
    <el-row>
      <el-table :data="users" style="width: 100%;">
        <el-table-column prop="email" label="Email" width="180" />
        <el-table-column prop="name" label="Name" width="180">
          <template slot-scope="scope">
            <span :id="`name-${scope.row._id}`"/>
            <el-input v-model="scope.row.name" placeholder="input name"
              @keyup.enter.native="onNameChange(scope.row)"/>
          </template>
        </el-table-column>
        <el-table-column prop="role" label="Role">
          <template slot-scope="scope">
            <span :id="`role-${scope.row._id}`"/>
            <el-select v-model="scope.row.role" style="width: 120px;"
              @change="onRoleChange(scope.row)"
            >
              <el-option
                v-for="item in roles"
                :key="item.value" :value="item.value" :label="item.label"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="Status">
          <template slot-scope="scope">
            <span :id="`status-${scope.row._id}`"/>
            <el-select v-model="scope.row.status" style="width: 120px;"
              @change="onStatusChange(scope.row)" :empty="statuses[0].value"
            >
              <el-option
                v-for="item in statuses"
                :key="item.value" :value="item.value" :label="item.label"
              />
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import {Loading} from 'element-ui';
import * as gqlUser from '@/gql/user';

export default {
  data() {
    const roles = [
      {value: 1, label: 'User'},
      {value: 100, label: 'Admin'},
    ];
    const statuses = [
      {value: -1, label: 'Deactive'},
      {value: 1, label: 'Active'},
    ];
    return {
      message: '',
      roles,
      statuses,
    };
  },
  apollo: {
    users: {
      query: gqlUser.getUsers,
      update: (data) => data.getUsers,
    },
  },
  methods: {
    onNameChange(row) {
      this.updateUser({_id: row._id, name: row.name, target: `#name-${row._id}`});
    },
    onRoleChange(row) {
      this.updateUser({_id: row._id, role: row.role, target: `#role-${row._id}`});
    },
    onStatusChange(row) {
      this.updateUser({_id: row._id, status: row.status, target: `#status-${row._id}`});
    },
    async updateUser(data) {
      const variables = {_id: data._id};
      ('name' in data) && (variables.name = data.name);
      ('role' in data) && (variables.role = data.role);
      ('status' in data) && (variables.status = data.status);

      const loadingInstance = Loading.service({
        fullscreen: false,
        target: data.target,
      });
      this.message = null;

      try {
        const result = await this.$apollo.mutate({
          mutation: gqlUser.updateUser,
          variables,
        });
        this.$nextTick(() => {
          loadingInstance.close();
        });

        if (Array.isArray(result.errors) && result.errors.length > 0) {
          this.message = result.errors[0].message;
        } else {
          this.message = result.data.updateUser;
        }
      } catch (e) {
        this.message = e.message || e;
        this.$nextTick(() => {
          loadingInstance.close();
        });
      }
    },
  },
};
</script>
<style scoped>
.container {
  margin: auto;
}
.message {
  color: red;
  word-break: break-word;
  text-align: left;
}
</style>
