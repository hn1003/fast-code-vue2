<template>
  <el-dialog
    v-if="isShow"
    :close-on-click-modal="false"
    width="600px"
    :visible.sync="isShow"
    :title="title"
    @close="close"
  >
    <hnFormPage ref="schemaForm" v-model="form" v-bind="formConfig" />
  </el-dialog>
</template>
<script>
import { add, edit, getOneById } from '@/api/business/role'
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
            rules: {"authTag":[{"required":true,"message":"请填写权限字符","trigger":["change","blur"]}],"name":[{"required":true,"message":"请填写角色","trigger":["change","blur"]}]}
          }
        },
        add: '',
        edit: '',
        noSubmit: false,
        options: [{"component":"select","key":"authTag","label":"权限字符","data":"AUTHTAG_ENUMS"},{"component":"input","key":"name","label":"角色"}]
      }
    }
  },

  methods: {
    async open(data = {}) {
      if (!data.id) {
        this.formConfig.add = this.add
        this.title = '新增角色'
      } else {
        this.formConfig.edit = this.edit
        data = (await getOneById({ id: data.id })).data
        this.title = '修改角色'
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
          this.$message.success('角色修改成功！')
          this.$emit('addAfter')
          this.close()
        })
        .finally(() => {
        })
    },
    async add(data) {
      await add(data)
        .then((res) => {
          this.$message.success('角色添加成功！')
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
  .el-card {
    border: unset;
    box-shadow: unset;
    .el-card__body {
      padding: 0;
    }
  }
}
</style>
