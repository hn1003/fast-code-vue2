<template>
  <div :class="'dynamicInput col ' + (border ? 'border' : '')">
    <div v-for="(item, index) in value" :key="index" class="dynamicInput-item mar10">
      <div
        v-if="addTypes.indexOf('top') !== -1 && index === 0 && dynamic === true"
        class="mar10 all-btns btns row"
      >
        <div @click="addItem(index)">
          <slot name="addbtnTop">
            <el-button>添加</el-button>
          </slot>
        </div>
      </div>
      <div
        v-if="addTypes.indexOf('center') !== -1 && index !== 0 && dynamic === true"
        class="mar10 all-btns btns row"
      >
        <div @click="addItem(index)">
          <slot name="addbtnCenter">
            <el-button>添加</el-button>
          </slot>
        </div>
      </div>
      <div class="row">
        <div class="dynamicInput-item-input">
          <slot :index="index" :dataList="value"> 请添加输入框 </slot>
        </div>
        <div class="item-btns btns mar-l-r-10">
          <div @click="delItem(index)">
            <slot name="deleteBtn">
              <el-button>
                <i class="el-icon-delete" />
              </el-button>
            </slot>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="dynamic === true && addTypes.indexOf('bottom') !== -1"
      class="mar10 all-btns btns row"
    >
      <div @click="addItem()">
        <slot name="addbtnBottom">
          <el-button>添加</el-button>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "HnDnamicInput",
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    border: {
      default: false,
      type: Boolean,
    },
    addTypes: {
      default: "bottom",
      type: String,
    },
    limit: {
      default: 1,
      type: Number,
    },
    value: {
      default: null,
      type: Array,
    },
    disable: {
      default: false,
      type: Boolean,
    },
    dynamic: {
      default: true,
      type: Boolean,
    },
    type: {
      default: "Object",
      type: String,
    },
  },
  data() {
    return {};
  },
  watch: {
    value: {
      handler(newData) {
        this.$emit("input", newData);
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.addItemByLimit();
    },
    addItemByLimit() {
      for (let i = 0; i < this.limit; i++) {
        this.addItem();
      }
    },
    delItem(index) {
      this.value.splice(index, 1);
      this.$emit("input", this.value);
    },
    addItem(index) {
      let temp = {};
      if (this.type === "Object") {
        temp = {};
      } else if (this.type === "String") {
        temp = "";
      } else if (this.type === "Number") {
        temp = 0;
      } else if (this.type === "Array") {
        temp = [];
      }
      if (index === undefined || index === null) {
        this.value.push(temp);
      }
      if (typeof index === "number") {
        this.value.splice(index, 0, temp);
      }
      this.$emit("input", this.value);
    },
  },
};
</script>
<style lang="scss" scoped>
.col {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
}
.dynamicInput-item {
  width: 100%;
  .dynamicInput-item-input {
    flex: 1;
  }
}
.row {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mar10 {
  margin: 10px;
}

.mar-l-r-10 {
  margin-left: 10px;
  margin-right: 10px;
}
.dynamicInput.border {
  border: 1px solid #cccc;
}
</style>
