<template>
  <component
    :is="'el-' + $attrs.component"
    v-model.trim="valueCom"
    v-bind="$attrs.props"
    :disabled="disabledCom($attrs.props)"
    class="inputStyle"
    :clearable="($attrs.props && (typeof $attrs.props.clearable === 'boolean')) ? $attrs.props.clearable : true"
    @input="changeValue"
    v-on="$attrs.events"
  >
    <template v-if="$attrs.component === 'select'">
      <el-option
        v-for="(subitem, index) in $attrs.data"
        :key="index"
        :label="subitem.label"
        :value="subitem.value"
      />
    </template>
    <template v-else-if="$attrs.component === 'checkbox-group'">
      <el-checkbox
        v-for="(subitem, index) in item.data"
        :key="index"
        :label="subitem.value"
      >
        {{ subitem.label }}
      </el-checkbox>
    </template>
    <template v-else-if="$attrs.component === 'radio-group'">
      <el-radio v-for="(subitem, index) in item.data" :key="index" :label="subitem.value">
        {{ subitem.label }}
      </el-radio>
    </template>
  </component>
</template>
<script>
export default {
  name: "HnAnyInput",
  props: ["value", "item"],
  data() {
    return {};
  },
  computed: {
    valueCom: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    disabledCom: function () {
      return (props) => {
        const disabled = props?.disabled;
        if (disabled === undefined || disabled === null) {
          return false;
        }
        if (typeof disabled === "boolean") {
          return disabled;
        }
        return disabled(this.valueCom);
      };
    },
  },
  methods: {
    changeValue(e) {
      this.$forceUpdate();
    },
  },
};
</script>
<style lang="scss" scoped>
.inputStyle {
  display: flex;
  justify-content: space-around;
  width: 100% !important;
  align-items: center;
}
</style>
