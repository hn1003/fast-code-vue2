<template>
  <div>
    <DynamicInput
      v-if="$attrs.type === 'list'"
      v-model="valueCom"
      v-bind="$attrs.dynamicProps"
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
      <template slot-scope="{ dataList, index }">
        <HnGroupInput v-model="dataList[index]" v-bind="$attrs.item">
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
      </template>
    </DynamicInput>
    <HnFormPage
      v-else-if="$attrs.type === 'form'"
      ref="hnFormPageRef"
      v-model="valueCom"
      v-bind="$attrs"
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
    </HnFormPage>

    <HnAnyInput v-else v-model="valueCom" v-bind="$attrs" />
  </div>
</template>
<script>
import DynamicInput from "../DynamicInput/index.vue";
import HnAnyInput from "../hnAnyInput/index.vue";
export default {
  name: "HnGroupInput",
  components: {
    HnAnyInput,
    DynamicInput,
    HnFormPage: () => import("../hnFormPage/index.vue"),
  },
  props: ["value"],
  data() {
    return {};
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
  methods: {
    validate(callback) {
      this.$refs.hnFormPageRef &&
        this.$refs.hnFormPageRef.validate((valid) => {
          callback(valid);
        });
    },
    resetFields() {
      this.$refs.hnFormPageRef && this.$refs.hnFormPageRef.resetFields();
    },
  },
};
</script>
<style lang="scss" scoped></style>
