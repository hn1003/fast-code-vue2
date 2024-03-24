function str(
  name,
  key,
  options,
  rules
) {
  return `<template>
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
import { add, edit, getOneById } from '@/api/business/${key}'
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
            rules: ${rules}
          }
        },
        add: '',
        edit: '',
        noSubmit: false,
        options: ${options}
      }
    }
  },

  methods: {
    async open(data = {}) {
      if (!data.id) {
        this.formConfig.add = this.add
        this.title = '新增${name}'
      } else {
        this.formConfig.edit = this.edit
        data = (await getOneById({ id: data.id })).data
        this.title = '修改${name}'
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
          this.$message.success('${name}修改成功！')
          this.$emit('addAfter')
          this.close()
        })
        .finally(() => {
        })
    },
    async add(data) {
      await add(data)
        .then((res) => {
          this.$message.success('${name}添加成功！')
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
`
}
module.exports = str
