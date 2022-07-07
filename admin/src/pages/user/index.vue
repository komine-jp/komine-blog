<template>
  <div>
    <a-row class="margin-t-10 margin-b-10 margin-r-10" align="middle" justify="end">
      <a-button shape="round" type="primary" @click="addUser()">添加用户</a-button>
    </a-row>
    <a-table
      :pagination="state.pagination"
      :data-source="state.list"
      :loading="state.listLoading"
      :columns="clms"
      @change="handlePagination"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'id'">{{ text || '--' }}</template>
        <template v-if="column.dataIndex === 'username'">{{ text || '--' }}</template>
        <template v-if="column.dataIndex === 'phone'">
          {{ text || '--' }}
        </template>
        <template v-if="column.dataIndex === 'role'">{{ roelType(text) }}</template>
        <template v-if="column.dataIndex === 'action'">
          <!-- <a-button
            style="margin-left: -16px; color: #1682e6"
            type="link"
            @click="userDetail(record)"
            >详情</a-button
          > -->
          <a-button style="color: #1682e6" type="link" @click="editUser(record)">编辑</a-button>
          <a-popconfirm
            title="确定要删除设备？删除后不能恢复。"
            ok-text="确定"
            cancel-text="取消"
            @confirm="deleteUser(record)"
          >
            <a-button type="link" danger>删除</a-button>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
  </div>
  <UserDialog
    v-model:visible="userDialog.visible"
    :data="userDialog.data"
    @submit-confirm="handleConfirm"
  />
</template>
<script setup lang="ts">
import { reactive, computed, onMounted } from 'vue'
import paginationGen from '@/utils/pagination'
import UserDialog from './components/UserDialog.vue'
import { UserInfo } from '@/types/index'
import { ROLE_TYPE } from '@/constants'
import { getUserQuery, createUser, updateUser, removeUser } from '@/api/user'
import { message } from 'ant-design-vue'
const roelType = computed(() => {
  return function (type: number) {
    return type ? ROLE_TYPE[type] : '--'
  }
})
const clms = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 200,
    minWidth: 200,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    width: 200,
    minWidth: 200,
  },
  {
    title: '电话号码',
    dataIndex: 'phone',
    width: 200,
    minWidth: 200,
  },
  {
    title: '角色',
    dataIndex: 'role',
    width: 260,
    minWidth: 260,
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'left',
    width: 320,
    minWidth: 320,
  },
]
interface UserDialog {
  visible: boolean
  data?: UserInfo
}

const userDialog = reactive<UserDialog>({
  visible: false,
  data: { username: '', phone: '', role: '' },
})
const state = reactive({
  pagination: paginationGen(),
  list: [],
  listLoading: false,
})
// 获取用户列表
function getList() {
  getUserQuery()
    .then((data) => {
      state.list = data
    })
    .finally(() => {
      state.listLoading = false
    })
}

//分页变化数据重新加载
function handlePagination(page: any) {
  state.pagination.current = page.current
  state.pagination.pageSize = page.pageSize
}
//添加用户
function addUser() {
  userDialog.visible = true
  userDialog.data = <UserInfo>{}
}
//编辑用户
function editUser(params: UserInfo) {
  userDialog.visible = true
  userDialog.data = params
}

//删除用户
function deleteUser(params: UserInfo) {
  const { id } = params
  removeUser(id).then(() => {
    message.success(`删除成功`)
    getList()
  })
}

//跳转到用户详情
function userDetail(params: UserInfo) {}

//弹框确认按钮
function handleConfirm(params: UserInfo) {
  const { id } = params
  id
    ? updateUser(params, id).then(() => {
        message.success(`编辑成功`)
        getList()
      })
    : createUser(params).then(() => {
        message.success(`添加成功`)
        getList()
      })
}
onMounted(() => {
  getList()
})
</script>

<style scoped lang="less">
.on-line-color {
  font-size: 14px;
  color: #42a66a;
}
.out-line-color {
  font-size: 14px;
  color: #e2391a;
}
.on-line {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #67cd90;
}
.out-line {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #f64d2e;
}
</style>
