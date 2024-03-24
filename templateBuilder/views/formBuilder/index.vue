<template>
  <el-dialog
    v-if="isShow"
    :close-on-click-modal="false"
    width="1200px"
    :visible.sync="isShow"
    :title="title"
    @close="close"
  >
    <div  class="row">
      <textarea style="width: 100%" v-model="res" cols="30" rows="10"></textarea>
    </div>
    <div class="row">
      <el-button @click="()=>{options = formatCodeSnippet(options)}">格式化</el-button>
    </div>
    <div style="display: flex">
      <textarea
        style="flex: 1;height:500px;"
        v-model="options"
        name=""
        id=""
        cols="30"
        rows="10"
      ></textarea>
      <hnFormPage
        style="flex: 2;height:500px; overflow-y: scroll;"
        v-if="isShowForm"
        ref="schemaForm"
        v-model="form"
        v-bind="formConfig"
      />
    </div>
  </el-dialog>
</template>
<script>
import debounce from "../../../utils/debounce";
import formatCodeSnippet from '../../../utils/formatCodeSnippet'
export default {
  data() {
    const self = this;
    return {
      isShow: false,
      isShowForm: true,
      title: "",
      debounceFun: "",
      form: {},
      formConfig: {
        resetTitle: "取消",
        resetAfter: self.close,
        form: {
          props: {
            labelPosition: "right"
          },
        },
        add: "",
        edit: "",
        noSubmit: false,
        options: [],
      },
      options: `[
        {
          component:"input",
          key:"key1",
          label:"key1"
        },
        {
          type:'list',
          key:"key2",
          label:"key2",
          item:{
            type: 'form',
            noSubmit: true,
            options: [
              {
                component:'input',
                label:'a',
                key:'a'
              },
              {
                component:'input',
                label:'b',
                key:'b'
              }
            ]
          },
        },
        {
          type:'form',
          component:"input",
          key:"key3",
          label:"key3",
          noSubmit: true,
            options: [
              {
                component:'input',
                label:'a',
                key:'a'
              },
              {
                component:'input',
                label:'b',
                key:'b'
              }
            ]
        }
      ]  
      `,
    };
  },
  computed:{
    res:function() {
      return  JSON.stringify(this.form, null, 2);
    }
  },
  watch: {
    options: {
      handler(newData) {
        if (this.debounceFun) {
          this.debounceFun(newData);
        } else {
          this.debounceFun = debounce((newData) => {
            this.isShowForm = false;
            this.form = {};
            let fun = new Function("self", `return ${newData}`);
            this.formConfig.options = fun(this);
            setTimeout(() => {
              this.isShowForm = true;
            });
          },100);
          this.debounceFun(newData);
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.open();
  },
  methods: {
    formatCodeSnippet,
    async open(data) {
      this.formConfig.add = this.add;
      this.title = "新增检查纪律";
      this.form = {};
      this.isShow = true;
    },
    close() {
      this.form = {};
      this.isShow = false;
    },
    async add(data) {
      console.log(this.options)
    },
  },
};
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
textarea{
  background-color: #cccccc22;
  padding: 5px;
}
.row{
  margin-bottom: 10px;
}
</style>
