<template>
  <div class="page">
    <hnTablePage ref="tableRef" v-model="searchForm" v-bind="pageContent" />
    <quardianManagementDialog ref="quardianManagementDialogRef" @addAfter="search" />
  </div>
</template>
<script>
import quardianManagementDialog from './dialog/quardianManagementDialog.vue'
import { STATUS_ENUMS, STATUS_MAP } from '@/common/enum/business/quardianManagement'
import { deepClone, parseTime } from '@/utils'
import { delById, getList } from '@/api/business/quardianManagement'
export default {
  components: {
    quardianManagementDialog
  },
  data() {
    const self = this
    return {
      searchForm: {},
      selectItems: [],
      pageContent: {
        inputNum: 5,
        title: '监护人列表',
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
            label: '添加监护人',
            action: self.add,
            props: {
              type: 'primary',
              boxStyle: {
                marginRight: 'auto'
              }
            }
          }
        ],
        columns: [{"key":"name","label":"家长姓名"},{"key":"idcard","label":"身份证"},{"key":"photo","label":"照片"},{"key":"tel","label":"电话"},{"key":"studentName","label":"学生姓名"}],
        inputs: [{"type":"input","key":"name","name":"家长姓名","hasLabel":true},{"type":"input","key":"idcard","name":"身份证","hasLabel":true},{"type":"input","key":"tel","name":"电话","hasLabel":true},{"type":"input","key":"studentName","name":"学生姓名","hasLabel":true}]
      }
    }
  },
  methods: {
    async getData(data) {
      const res = await getList(data)
      return res.data
    },
    async del({ row }) {
      await this.$confirm('确定删除该监护人？', '提示').then(async(res) => {
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
      this.$refs.quardianManagementDialogRef.open()
    },
    edit({ row }) {
      this.$refs.quardianManagementDialogRef.open(row)
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

