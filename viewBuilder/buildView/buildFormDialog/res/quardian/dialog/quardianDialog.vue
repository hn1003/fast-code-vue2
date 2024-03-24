<template>
  <el-dialog
    v-if="isShow"
    :close-on-click-modal="false"
    width="500px"
    :visible.sync="isShow"
    :title="title"
    @close="close"
  >
    <hnFormPage ref="schemaForm" v-model="form" v-bind="formConfig" />
  </el-dialog>
</template>
<script>
import { add, edit, getOneById } from '@/api/business/quardian'
export default {
  data() {
    const self = this
    return {
      isShow: false,
      title: '',
      form: {},
      formConfig: {
        resetTitle: '取消',
        resetAfter: self.close,
        form: {
          props: {
            labelPosition: 'left',
            labelWidth: '110px',
            rules: {"name":[{"required":true,"message":"请填写家长姓名","trigger":["change","blur"]}],"idcard":[{"required":true,"message":"请填写身份证","trigger":["change","blur"]}],"photo":[{"required":true,"message":"请填写照片","trigger":["change","blur"]}],"tel":[{"required":true,"message":"请填写电话","trigger":["change","blur"]}]}
          }
        },
        add: '',
        edit: '',
        noSubmit: false,
        options: [{"component":"input","key":"name","label":"家长姓名"},{"component":"input","key":"idcard","label":"身份证"},{"component":"input","key":"photo","label":"照片"},{"component":"input","key":"tel","label":"电话"},{"component":"input","key":"openId","label":""}]
      }
    }
  },

  methods: {
    async open(data = {}) {
      if (!data.id) {
        this.formConfig.add = this.add
        this.title = '新增监护人'
      } else {
        this.formConfig.edit = this.edit
        data = (await getOneById({ id: data.id })).data
        this.title = '修改监护人'
      }
      this.form = data
      this.isShow = true
    },
    close() {
      this.form = {}
      this.isShow = false
    },
    async edit(data) {
      await edit(data)
        .then((res) => {
          this.$message.success('监护人修改成功！')
          this.$emit('addAfter')
          this.close()
        })
        .finally(() => {
        })
    },
    async add(data) {
      await add(data)
        .then((res) => {
          this.$message.success('监护人添加成功！')
          this.$emit('addAfter')
          this.close()
        })
        .finally(() => {
        })
    }
  }
}
</script>
<style lang="scss" scoped>

::v-deep .btnsStyle {
  width: 40%;
  margin: auto;
}
::v-deep .el-dialog {
  display: flex;
  flex-direction: column;
  margin-top: 50px !important;
  margin-bottom: 50px !important;
  max-height: calc( 100vh - 100px );
}

::v-deep .el-dialog__body {
  padding: 0 50px 10px 50px;
  flex: 1;
  overflow-y: scroll;
  .el-card {
    border: unset;
    box-shadow: unset;
    .el-card__body {
      padding: 0;
    }
  }
}
</style>
