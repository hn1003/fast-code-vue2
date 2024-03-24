<template>
  <div class="search">
    <div v-if="$attrs.leftInputs && $attrs.leftInputs.length" class="searchLeft">
      <div class="searchLeft-box">
        <div
          v-for="(item, index) in hidePart($attrs.leftInputs || [], searchForm)"
          :key="index"
          :prop="item.key"
        >
          <span :style="item.props && item.props.boxStyle" class="rowInput inputStyle">
            <slot
              :data="searchForm[item.key]"
              :search="antiShakeSearch"
              :name="item.slotName"
            >
              <span v-if="item.hasLabel" class="inputLabelStyle">{{ item.name }}：</span>
              <el-input
                v-if="!item.type || item.type === 'input'"
                v-model="searchForm[item.key]"
                class="inputStyle"
                v-bind="item.props"
                clearable
                :placeholder="`请输入` + item.name"
                v-on="item.events"
                @input="antiShakeSearch"
              />

              <el-date-picker
                v-if="item.type === 'dateRange'"
                v-model="searchForm[item.key]"
                v-bind="item.props"
                class="inputStyle"
                type="datetimerange"
                value-format="timestamp"
                range-separator="至"
                :start-placeholder="item.name + `开始日期`"
                :end-placeholder="item.name + `结束日期`"
                clearable
                v-on="item.events"
                @change="antiShakeSearch"
              />

              <el-select
                v-if="item.type === 'select'"
                v-model="searchForm[item.key]"
                v-bind="item.props"
                class="inputStyle"
                clearable
                :placeholder="`请选择` + item.name"
                v-on="item.events"
                @input="antiShakeSearch"
              >
                <el-option
                  v-for="(option, index) in item.options"
                  :key="index"
                  :label="option.label"
                  :value="option.value"
                />
              </el-select>
              <component
                v-if="item.type === 'component'"
                :is="item.component"
                v-model="searchForm[item.key]"
                v-bind="item.props"
                class="inputStyle"
                clearable
                :placeholder="`请选择` + item.name"
                v-on="item.events"
                @input="antiShakeSearch"
              ></component>
            </slot>
          </span>
        </div>
      </div>
    </div>
    <div class="searchRight">
      <div class="mainSearchView">
        <slot name="searchHeader" />
        <div class="header">
          <el-form
            ref="searchForm"
            style="width: 100%"
            v-bind="$attrs.form && $attrs.form.props"
            :inline="true"
            :model="searchForm"
            v-on="$attrs.form && $attrs.form.events"
          >
            <div :class="{ headerCol: $attrs.headerCol }" style="display: flex">
              <div
                v-if="!($attrs.form && $attrs.form.hideSearch)"
                class="searchFormLeft_box"
              >
                <div
                  :style="{ '--inputNum': $attrs.inputNum || 5 }"
                  class="searchFormLeft"
                >
                  <el-form-item
                    v-for="(item, index) in hidePart($attrs.inputs || [], searchForm)"
                    :key="index"
                    :prop="item.key"
                  >
                    <span
                      :style="item.props && item.props.boxStyle"
                      class="inputStyle rowInput"
                    >
                      <span v-if="item.hasLabel" class="inputLabelStyle"
                        >{{ item.name }}：</span
                      >
                      <slot
                        :searchForm="searchForm"
                        :prop="item.key"
                        :config="item"
                        :data="searchForm[item.key]"
                        :search="antiShakeSearch"
                        :name="item.slotName"
                      >
                        <el-input
                          v-if="item.type === 'input'"
                          v-model="searchForm[item.key]"
                          class="inputStyle"
                          v-bind="item.props"
                          :clearable="
                            item.props && typeof item.props.clearable === 'boolean'
                              ? item.props.clearable
                              : true
                          "
                          :placeholder="`请输入` + item.name"
                          v-on="item.events"
                          @input="antiShakeSearch"
                        />

                        <el-date-picker
                          v-if="item.type === 'dateRange'"
                          v-model="searchForm[item.key]"
                          v-bind="item.props"
                          class="inputStyle"
                          type="datetimerange"
                          value-format="timestamp"
                          range-separator="至"
                          :start-placeholder="`开始日期`"
                          :end-placeholder="`结束日期`"
                          :clearable="
                            item.props && typeof item.props.clearable === 'boolean'
                              ? item.props.clearable
                              : true
                          "
                          v-on="item.events"
                          @change="antiShakeSearch"
                        />

                        <el-select
                          v-if="item.type === 'select'"
                          v-model="searchForm[item.key]"
                          v-bind="item.props"
                          class="inputStyle"
                          :clearable="
                            item.props && typeof item.props.clearable === 'boolean'
                              ? item.props.clearable
                              : true
                          "
                          :placeholder="`请选择` + item.name"
                          v-on="item.events"
                          @input="antiShakeSearch"
                        >
                          <el-option
                            v-for="(option, index) in item.options"
                            :key="index"
                            :label="option.label"
                            :value="option.value"
                          />
                        </el-select>
                        <component
                          v-if="item.type === 'component'"
                          :is="item.component"
                          v-model="searchForm[item.key]"
                          v-bind="item.props"
                          class="inputStyle"
                          :clearable="
                            item.props && typeof item.props.clearable === 'boolean'
                              ? item.props.clearable
                              : true
                          "
                          :placeholder="`请选择` + item.name"
                          v-on="item.events"
                          @input="antiShakeSearch"
                        ></component>
                      </slot>
                    </span>
                  </el-form-item>
                  <span v-if="!$attrs.searchBtnsRight" class="inputStyle">
                    <el-form-item v-if="!$attrs.hideRefBtn">
                      <el-button
                        :loading="refLoading"
                        v-bind="$attrs.resetBtn && $attrs.resetBtn.props"
                        @click="refresh"
                        >{{
                          ($attrs.resetBtn && $attrs.resetBtn.label) || "重置"
                        }}</el-button
                      >
                    </el-form-item>
                    <el-form-item v-if="!$attrs.hideSearchBtn">
                      <el-button
                        :loading="loading"
                        v-bind="$attrs.searchBtn && $attrs.searchBtn.props"
                        :type="
                          ($attrs.searchBtn &&
                            $attrs.searchBtn.props &&
                            $attrs.searchBtn.props.type) ||
                          'primary'
                        "
                        @click="search"
                        >{{
                          ($attrs.searchBtn && $attrs.searchBtn.label) || "搜索"
                        }}</el-button
                      >
                    </el-form-item>
                  </span>
                </div>
                <span v-if="$attrs.searchBtnsRight" class="searchBtnsRight_col">
                  <el-form-item v-if="!$attrs.hideSearchBtn">
                    <el-button
                      :loading="loading"
                      v-bind="$attrs.searchBtn && $attrs.searchBtn.props"
                      :type="
                        ($attrs.searchBtn &&
                          $attrs.searchBtn.props &&
                          $attrs.searchBtn.props.type) ||
                        'primary'
                      "
                      @click="search"
                      >{{
                        ($attrs.searchBtn && $attrs.searchBtn.label) || "搜索"
                      }}</el-button
                    >
                  </el-form-item>
                  <el-form-item v-if="!$attrs.hideRefBtn">
                    <el-button
                      :loading="refLoading"
                      v-bind="$attrs.resetBtn && $attrs.resetBtn.props"
                      @click="refresh"
                      >{{
                        ($attrs.resetBtn && $attrs.resetBtn.label) || "重置"
                      }}</el-button
                    >
                  </el-form-item>
                </span>
              </div>
              <div
                class="searchFormRight"
                :class="{ searchFormRightHeaderCol: $attrs.headerCol }"
              >
                <span
                  v-for="(item, index) in hidePart($attrs.btns, searchForm)"
                  :key="index"
                  class="btnStyle"
                  :style="item.props && item.props.boxStyle"
                >
                  <slot :name="item.slotName" :data="searchForm">
                    <el-button
                      :loading="btnsLoading[index]"
                      v-bind="item.props"
                      class="btnStyle"
                      :disabled="disabledCom(item.props)"
                      @click="btnAction(index, item.action)"
                      >{{ item.label }}</el-button
                    >
                  </slot>
                </span>
              </div>
            </div>
          </el-form>
        </div>
        <slot name="contentHeader" />
        <el-tabs
          v-if="$attrs.tabs"
          v-model="searchForm[$attrs.tabs.key]"
          v-on="$attrs.tabs.events"
          v-bind="$attrs.tabs.props"
        >
          <el-tab-pane
            v-for="(item, index) in $attrs.tabs.options"
            :label="item.label"
            :name="item.name"
            :key="index"
          ></el-tab-pane>
        </el-tabs>
        <div
          v-loading="loading || $attrs.contentLoading"
          class="content searchContentView"
        >
          <slot :data="data" />
        </div>
        <div
          v-if="
            $attrs.pagination &&
            !$attrs.pagination.noPagination &&
            !$attrs.pagination.isHide
          "
          class="footer"
        >
          <div />
          <el-pagination
            v-bind="$attrs.pagination && $attrs.pagination.props"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :page-sizes="[5, 10, 20, 50, 100]"
            :total="total"
            :page-size.sync="pageSize"
            :current-page.sync="pageNum"
            v-on="$attrs.pagination && $attrs.pagination.events"
            @size-change="handleCurrentChange"
            @current-change="handleCurrentChange"
          />
        </div>
        <div
          v-if="
            $attrs.pagination &&
            $attrs.pagination.noPagination &&
            !$attrs.pagination.isHide
          "
          class="footer"
        >
          <div />
          <el-pagination
            v-bind="$attrs.pagination && $attrs.pagination.props"
            background
            layout="total"
            :total="total"
            :page-size="20"
            v-on="$attrs.pagination && $attrs.pagination.events"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: Object,
    state: {
      type: String,
      default: "list",
    },
  },
  data() {
    return {
      btnsLoading: [],
      refLoading: false,
      loading: false,
      data: [],
      pageNum: 1,
      total: 0,
      pageSize: 20,
      searchTimer: null,
      times: 0,
      action_flag: 0,
    };
  },
  computed: {
    searchForm: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
    disabledCom: () => {
      return (props) => {
        const disabled = props?.disabled;
        if (disabled === undefined || disabled === null) {
          return false;
        }
        if (typeof disabled === "boolean") {
          return disabled;
        }
        return disabled();
      };
    },
    hidePart: () => {
      return (arr, scope) => {
        return arr.filter((item) => {
          return !item.isHide || (item.isHide && !item.isHide(scope));
        });
      };
    },
  },
  watch: {
    searchForm: {
      handler: function () {
        this.pageNum = 1;
      },
      immediate: true,
      deep: true,
    },
  },
  created() {
    this.$attrs.btns.forEach((item, index) => {
      this.$set(this.btnsLoading, index, false);
    });
  },
  methods: {
    clearForm() {
      this.$refs.searchForm.resetFields();
    },
    refresh() {
      this.$refs.searchForm.resetFields();
      const data = Object.assign(this.searchForm, {
        pageNum: this.$attrs?.pagination?.noPagination ? 1 : this.pageNum,
        pageSize: this.$attrs?.pagination?.noPagination ? 999999 : this.pageSize,
      });
      try {
        this.refLoading = true;
        this.$attrs
          .action(data)
          .then((res) => {
            this.data = res?.data || [];
            this.total = res?.total || 0;
          })
          .finally(() => {
            this.refLoading = false;
          });
      } catch (error) {
        throw new Error("action 方法丢失");
      }
    },
    btnAction(index, action) {
      this.$set(this.btnsLoading, index, true);
      const pro = action(this.searchForm);
      try {
        // 如果是异步就执行 finally
        pro.finally(() => {
          this.$set(this.btnsLoading, index, false);
        });
      } catch (err) {
        this.$set(this.btnsLoading, index, false);
      }
    },
    antiShakeSearch() {
      const newDate = new Date().getTime();
      if (newDate - this.times <= 1000) {
        clearTimeout(this.searchTimer);
      }
      this.times = newDate;
      this.searchTimer = setTimeout(() => {
        clearTimeout(this.searchTimer);
        this.search();
      }, 500);
    },
    async handleCurrentChange() {
      await this.search();
    },
    async search() {
      const data = Object.assign(this.searchForm, {
        pageNum: this.$attrs?.pagination?.noPagination ? 1 : this.pageNum,
        pageSize: this.$attrs?.pagination?.noPagination ? 999999 : this.pageSize,
      });
      try {
        this.loading = true;
        this.action_flag = this.action_flag + 1;
        const action_flag = this.action_flag;
        this.$attrs
          .action(data)
          .then((res) => {
            if (action_flag == this.action_flag) {
              //
              return res;
            }
            return {
              data: this.data,
              total: this.total,
            };
          })
          .then((res) => {
            this.data = res?.data || [];
            this.total = res?.total || 0;
          })
          .finally(() => {
            this.loading = false;
          });
      } catch (error) {
        throw new Error("action 方法丢失");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .searchContentView .el-loading-spinner {
  display: flex;
  justify-content: center;
}
.inputLabelStyle {
  margin-left: 10px;
  color: #333;
}

.rowInput {
  display: flex;
  flex-direction: row;
  .inputStyle {
    display: flex !important;
    flex: 1;
    width: min-content;
  }
}

.btnStyle {
  min-width: 100px;
  display: inline-block;
  margin-left: 5px;
  margin-bottom: 5px;
}

.headerCol {
  flex-direction: column;
}

.search {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 100%;
  overflow: auto;
  color: #333;
  .searchLeft {
    color: #606266;
    display: flex;
    width: 250px;
    flex-direction: column;
    height: 100%;
    padding-right: 20px;
    .searchLeft-box {
      width: 100%;
      // padding: 10px;
      background-color: #fff;
      height: 100%;
      border-radius: 15px;
    }
  }
  .searchRight {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    .searchFormLeft_box {
      display: flex;
      width: 100%;
      padding-bottom: 10px;
    }
    .searchFormLeft {
      --inputNum: 5;
      flex: 1;
      display: grid;
      grid-template-columns: repeat(var(--inputNum), auto);
      grid-gap: 10px;
      ::v-deep .el-form-item__content {
        width: 100% !important;
      }
    }

    .searchBtnsRight_col {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 20px;
      width: 130px;
      border-left: 1px solid #f2f3f5;
      ::v-deep .el-form-item {
        margin: 5px 0;
      }
    }
    .searchFormRightHeaderCol {
      flex-direction: row !important;
      justify-content: left !important;
      max-width: unset !important;
      padding: 0 !important;
      .btnStyle {
        margin-left: 0 !important;
        margin-right: 5px;
      }
    }
    .searchFormRight {
      padding-left: 20px;
      display: flex;
      flex-direction: row-reverse;
      justify-content: right;
      flex-wrap: wrap;
      align-content: flex-start;
      align-items: center;
    }
  }
  .content {
    width: 100%;
    flex: 1;
    overflow: auto;
  }
  .footer {
    height: 60px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
