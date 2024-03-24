<template>
  <el-card v-bind="$attrs.cardProps" class="box-card">
    <div v-if="$attrs.title" slot="header" class="box-card-header">
      <span>{{ tilteCom($attrs.title) }}</span>
    </div>
    <el-form
      ref="ruleForm"
      :label-width="
        ($attrs.form && $attrs.form.props && $attrs.form.props.labelWidth) || '80px'
      "
      :model="valueCom"
      v-bind="$attrs.form && $attrs.form.props"
      v-on="$attrs.form && $attrs.form.events"
    >
      <div
        :style="{
          'grid-template-columns':
            'repeat(auto-fit,' + 100 / ( ($attrs.form && $attrs.form.colNum) || 1) + '%)',
        }"
        class="formContent"
      >
        <el-form-item
          v-for="item in hidePart($attrs.options)"
          :key="item.key"
          v-bind="columnsProps($attrs.allItemProps, item.props)"
          :prop="item.key"
          :label="item.label"
          class="form_item form_content_item"
          :style="{ width: item.width }"
        >
          <span class="inputTop inputTextTip">{{ item.topText }}</span>
          <slot
            v-if="item.component === 'slot'"
            :formData="valueCom"
            :prop="item.key"
            :name="item.slotName"
          />
          <div v-else class="inputRow" :class="'form_item_' + item.key">
            <span class="inputBefor inputTextTip">{{ item.beforText }}</span>
            <HnGroupInput
              :ref="item.key + 'Ref'"
              v-model=" item.deep ? valueCom  :  valueCom[item.key]"
              v-bind="item"
              style="flex: 1"
              class="inputStyle"
            >
              <template scope="addbtnTop">
                <slot name="addbtnTop" />
              </template>
              <template scope="addbtnCenter">
                <slot name="addbtnCenter" />
              </template>
              <template scope="addbtnBottom">
                <slot name="addbtnBottom" />
              </template>
              <template scope="deleteBtn">
                <slot name="deleteBtn" />
              </template>
            </HnGroupInput>
            <span class="inputAfter inputTextTip">{{ item.afterText }}</span>
          </div>
          <span class="inputBottom inputTextTip">{{ item.bottomText }}</span>
        </el-form-item>
      </div>
      <div v-if="!$attrs.noSubmit" class="inputStyle btnsStyle">
        <el-form-item v-if="!$attrs.noResetBtn" label-width="0" class="canBtn">
          <el-button plain @click="resetFields">
            {{ $attrs.resetTitle || "重置" }}
          </el-button>
        </el-form-item>
        <el-form-item v-if="!$attrs.noSubmitBtn" label-width="0" class="canBtn">
                      <!-- 历史遗留问题 submitTile ，为了兼容不去除  -->
          <el-button :loading="loading" type="primary" @click="submit">{{
            $attrs.submitTitle ||  $attrs.submitTile || submitTitle
          }}</el-button>
        </el-form-item>
      </div>
    </el-form>
  </el-card>
</template>
<script>
export default {
  name: "HnFormPage",
  components: {
    HnGroupInput: () => import("../hnGroupInput/index.vue"),
  },
  props: ["value"],
  data() {
    return {
      loading: false,
      refs: [],
    };
  },
  computed: {
    hidePart: function () {
      return (arr, val) => {
        return arr.filter((item) => {
          return !item.isHide || (item.isHide && !item.isHide(this.value));
        });
      };
    },
    submitTitle: function () {
      return this.value.id ? "修改" : "新增";
    },
    tilteCom: function () {
      return (title) => {
        if (title instanceof Function) {
          return title(this.value);
        }
        return this.value.id ? "修改" + title : "新增" + title;
      };
    },
    columnsProps: function () {
      return (attrs, props) => {
        return Object.assign({}, attrs || {}, props || {});
      };
    },
    valueCom: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  created() {
    this.$attrs.options.forEach((item) => {
      this.refs.push(item.key + "Ref");
      if (item.type === "list") {
        this.$set(this.value, item.key, this.value[item.key] || item.defValue || []);
      } else if (item.type === "form") {
        this.$set(this.value, item.key, this.value[item.key] || item.defValue || {});
      } else if (item.type === "boolean") {
        this.$set(this.value, item.key, this.value[item.key] || item.defValue || false);
      } else {
        this.$set(this.value, item.key, this.value[item.key] || item.defValue || "");
      }
    });
  },
  methods: {
    changeValue(e) {
      this.$forceUpdate();
    },
    submit() {
      this.validate((valid) => {
        if (valid) {

          if(this.value?.id){
            if(this.$attrs.edit){
              this.$attrs.action = this.$attrs.edit
            }
            if(!this.$attrs.action){
              throw new Error("edit/action 方法不存在");
            }
          }else{
            if(this.$attrs.add){
              this.$attrs.action = this.$attrs.add
            }
            if(!this.$attrs.action){
              throw new Error("add/action 方法不存在");
            }
          }

          this.loading = true;
          this.$attrs.action(this.value).finally(() => {
            this.loading = false;
          });
        }
      });
    },
    validate(callback) {
      this.$refs.ruleForm.validate((valid) => {
        let res = true;
        if (!valid) {
          res = false;
        }
        this.refs.forEach((item) => {
          this.$refs[item]?.forEach((item) => {
            item.validate((v) => {
              if (!v) {
                res = false;
              }
            });
          });
        });
        callback(res);
      });
    },
    resetFields() {
      this.$refs.ruleForm.resetFields();
      this.refs.forEach((item) => {
        this.$refs[item]?.forEach((item) => {
          item.resetFields();
        });
      });
      if (this.$attrs?.resetAfter) {
        this.$attrs?.resetAfter();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
// ::v-deep .el-checkbox {
//   margin-right: -20px !important;
// }
::v-deep .el-form {
  // margin-right: 100px;
}

::v-deep .el-form-item__content {
  // margin-left: 0 !important;
}

::v-deep .el-form-item {
  // flex-direction: column;
  margin-bottom: 20px;
  margin-left: 0 !important;
  margin-right: 0 !important;
}
.inputTextTip {
  display: flex;
  align-items: center;
}

.inputStyle {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100% !important;
}
.box-card {
  width: 100%;
  height: 100%;
  text-shadow: unset !important;
  flex: 1;
  color: #333;
  .box-card-header {
    // height: 40px;
    display: flex;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1f476f;
    align-items: center;
    justify-content: space-between;
  }
}
.form_content_item {
  margin: 5px 25px 15px 5px;
}
.formContent {
  display: grid;
  grid-template-columns: repeat(auto-fit, 100%);
}
.inputRow {
  display: flex;
  color: #333;
}
.inputAfter {
  margin-left: 5px;
}
::v-deep .el-card__body {
  padding: 0;
}
</style>
