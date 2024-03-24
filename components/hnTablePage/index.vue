<template>
  <div class="page">
    <el-card class="box-card">
      <div
        v-if="!$attrs.notitle"
        slot="header"
        :setState="setState"
        :state="state"
        class="box-card-header"
      >
        <slot name="header">
          <span>{{ $attrs.title || "页面标题" }}</span>
          <el-tooltip effect="dark" content="切换布局" placement="top">
            <span class="header-button">
              <slot name="state" :setState="setState" :state="state" />
            </span>
          </el-tooltip>
        </slot>
      </div>
      <div class="card-body">
        <Search ref="searchComponent" v-model="valueCom" v-bind="$attrs" :state="state">
          <template slot="searchHeader">
            <slot name="searchHeader" />
          </template>
          <template
            v-for="item4 in $attrs.btns"
            :slot="item4.slotName"
            slot-scope="scope"
          >
            <slot v-bind="scope" :name="item4.slotName" />
          </template>
          <template slot="contentHeader">
            <slot :setState="setState" :state="state" name="contentHeader" />
          </template>
          <template slot-scope="scope">
            <List
              v-if="state === 'list'"
              ref="listRef"
              v-bind="$attrs"
              :data="scope.data"
            >
              <template
                v-for="item3 in $attrs.columns"
                :slot="item3.slotName"
                slot-scope="scope"
              >
                <slot :name="item3.slotName" v-bind="scope" />
              </template>
              <template slot="actions" slot-scope="scope">
                <slot name="actions" v-bind="scope" />
              </template>
            </List>
            <slot name="content" :state="state" v-bind="scope" />
          </template>
          <template
            v-for="item1 in $attrs.inputs"
            slot-scope="scope"
            :slot="item1.slotName"
          >
            <slot v-bind="scope" :name="item1.slotName" />
          </template>
          <template
            v-for="item2 in $attrs.leftInputs"
            :slot="item2.slotName"
            slot-scope="scope"
          >
            <slot :name="item2.slotName" v-bind="scope" />
          </template>
        </Search>
      </div>
    </el-card>
    <slot />
  </div>
</template>
<script>
import List from "./list.vue";
import Search from "./search.vue";
export default {
  name: "HnTablePage",
  components: {
    Search,
    List,
  },
  props: {
    value: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      state: "list",
    };
  },
  computed: {
    valueCom: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    setState(state) {
      this.state = state;
    },
    async init() {
      await this.$refs.searchComponent.search();
    },
    async clearForm() {
      await this.$refs.searchComponent.clearForm();
    },
    async refresh() {
      await this.$refs.searchComponent.refresh();
    },
    async search() {
      await this.$refs.searchComponent.search();
    },
  },
};
</script>
<style lang="scss" scoped>
.page {
  // margin: 10px;
  color: #333;
  width: calc(100%);
  box-sizing: border-box;
  display: flex;
  flex: auto;
  flex-direction: column;
  ::v-deep .el-card {
    display: flex;
    flex-direction: column;
    .el-card__body {
      box-sizing: border-box;
      // flex: 1;
      height: 100%;
      display: flex;
    }
  }
}
.box-card {
  width: 100%;
  flex: 1;
  text-shadow: unset;
  border-radius: 0;
}
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
.header-button {
  font-size: 25px;
  color: #444343;
}
.header-button:hover {
  color: rgb(0, 162, 255);
}
.card-body {
  width: 100%;
  flex: 1;
  display: flex;
}
</style>
