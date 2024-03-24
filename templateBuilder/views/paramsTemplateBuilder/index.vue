<template>
  <el-dialog
    v-if="isShow"
    :close-on-click-modal="false"
    width="1200px"
    :visible.sync="isShow"
    :title="title"
    @close="close"
  >
    <div class="row">
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
import configCompoentBuilder from "./configCompoentBuilder.js";
import objectComponentToResult from "./objectComponentToResult.js";
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
        options: [],
      },
      id:"",
      options: `[
        configCompoentBuilder(
          '参数1',
          '参数1',
          {
            component: 'input'
          }
        ),
        configCompoentBuilder(
          '参数2',
          '参数2',
          [
            {
              component: 'input',
              key:'key1',
              label:'key1'
            },
            {
              component: 'input',
              key:'key2',
              label:'key2'
            }
          ],
          true,
          'form'
        ),
        configCompoentBuilder(
          '参数3',
          '参数3',
          {
            component:'input'
          },
          true,
          'array'
        ),
        configCompoentBuilder(
          '参数4',
          '参数4',
          {
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
          false,
          'array'
        )
      ]  
      `,
    };
  },
  computed:{
    res:function() {
      return  objectComponentToResult(this.form);
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
            let fun = new Function("self", "configCompoentBuilder", `return ${newData}`);
            this.formConfig.options = fun(this, configCompoentBuilder);
            setTimeout(() => {
              this.isShowForm = true;
            });
          },300);
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
    async open({id,options,title}={id:'',options:'',title:"参数模板"}) {
      this.formConfig.action = this.action;
      this.title = id ? `修改${title}` : `创建${title}`
      this.id = id
      this.options = id ? options : this.options
      this.isShow = true;
    },
    close() {
      this.id = ''
      this.options = ''
      this.form = {};
      this.isShow = false;
    },
    async action(data) {
      console.log(this.options)
      return {
        id:this.id,
        options:this.options
      }
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
  // max-height: calc(100vh - 100px);
}

::v-deep .el-dialog__body {
  padding: 0 50px 10px 50px;
  flex: 1;
  // overflow-y: scroll;

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
