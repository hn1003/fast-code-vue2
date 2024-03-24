<template>
  <div class="page">
    <hnTablePage ref="tableRef" v-model="searchForm" v-bind="pageContent" />
    <roleDialog ref="roleDialogRef" @addAfter="search" />
  </div>
</template>
<script>
import roleDialog from './dialog/roleDialog.vue'
import { STATUS_ENUMS, STATUS_MAP } from '@/common/enum/business/role'
import { deepClone, parseTime } from '@/utils'
import { delById, getList } from '@/api/business/role'
export default {
  components: {
    roleDialog
  },
  data() {
    const self = this
    return {
      searchForm: {},
      selectItems: [],
      pageContent: {
        inputNum: 5,
        title: '角色列表',
        action: self.getData,
        searchBtnsRight: true,
        notitle: false,
        searchBtnRow: true,
        headerCol: true,
        pagination: { 
          noPagination: false
        },
        rowactionsprops: {
          width: 200
        },
        rowactions: [
          {
            name: '删除',
            action: self.del,
            props: {
              style: 'color:#ccc'
            }
          },
          {
            name: '修改',
            action: self.edit
          }
        ],
        btns: [
          {
            label: '添加角色',
            action: self.add,
            props: {
              type: 'primary',
              boxStyle: {
                marginRight: 'auto'
              }
            }
          }
        ],
        columns: [{"key":"name","label":"角色"},{"key":"info","label":"描述"},{"key":"authTag","label":"权限字符"}],
        inputs: [{"type":"input","key":"name","name":"角色","hasLabel":true}]
      }
    }
  },
  methods: {
    async getData(data) {
      const res = await getList(data)
      return res.data
    },
    async del({ row }) {
      await this.$confirm('确定删除该角色？', '提示').then(async(res) => {
        await delById({ id: row.id }).then((res) => {
          this.$message.success('删除成功！')
          this.search()
        })
      })
    },
    search() {
      this.$refs.tableRef.search()
    },
    add() {
      this.$refs.roleDialogRef.open()
    },
    edit({ row }) {
      this.$refs.roleDialogRef.open(row)
    }
  }
}
</script>
<style lang="scss" scoped>
.page {
    flex: 1;
    display: flex;
    overflow: hidden;
}

::v-deep .page>.el-card>.el-card__header {
    border: unset;
}

::v-deep .page>.el-card>.el-card__body {
    padding-top: 0;
}

::v-deep .page .mainSearchView .header .searchFormLeft_box {
    border-bottom: 1px solid rgb(242, 243, 245);
    margin-bottom: 10px;
}

::v-deep .page .mainSearchView .header .searchFormLeft .el-form-item {
    margin-bottom: 10px;
}

::v-deep .page .el-table__header thead tr th {
    background-color: rgb(247, 248, 250);
}
</style>

