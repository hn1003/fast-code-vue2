function str(
  name,
  key,
  inputs,
  columns
) {
  return `<template>
  <div class="page">
    <hnTablePage ref="tableRef" v-model="searchForm" v-bind="pageContent" />
    <${key}Dialog ref="${key}DialogRef" @addAfter="search" />
  </div>
</template>
<script>
import ${key}Dialog from './dialog/${key}Dialog.vue'
import { STATUS_ENUMS, STATUS_MAP } from '@/common/enum/business/${key}'
import { deepClone, parseTime } from '@/utils'
import { delById, getList } from '@/api/business/${key}'
export default {
  components: {
    ${key}Dialog
  },
  data() {
    const self = this
    return {
      searchForm: {},
      selectItems: [],
      pageContent: {
        inputNum: 5,
        title: '${name}列表',
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
            label: '添加${name}',
            action: self.add,
            props: {
              type: 'primary',
              boxStyle: {
                marginRight: 'auto'
              }
            }
          }
        ],
        columns: ${columns},
        inputs: ${inputs}
      }
    }
  },
  methods: {
    async getData(data) {
      const res = await getList(data)
      return res.data
    },
    async del({ row }) {
      await this.$confirm('确定删除该${name}？', '提示').then(async(res) => {
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
      this.$refs.${key}DialogRef.open()
    },
    edit({ row }) {
      this.$refs.${key}DialogRef.open(row)
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

`
}
module.exports = str
