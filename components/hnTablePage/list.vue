<template>
  <div>
    <el-table
      ref="tableRef"
      v-bind="$attrs.table && $attrs.table.props"
      :data="data"
      style="width: 100%"
      v-on="$attrs.table && $attrs.table.events"
    >
      <template v-for="item in hidePart($attrs.columns)">
        <el-table-column
          v-if="item.slotName"
          :key="item.key"
          v-bind="columnsProps($attrs.columnsprops, item.props)"
          :prop="item.key"
          :type="item.type"
          :label="item.label"
        >
          <template slot-scope="scope">
            <template v-if="item.slotName">
              <slot :name="item.slotName" v-bind="scope" />
            </template>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="item.key"
          v-bind="columnsProps($attrs.columnsprops, item.props)"
          :prop="item.key"
          :type="item.type"
          :label="item.label"
        />
      </template>

      <el-table-column
        v-if="$attrs.rowactions && $attrs.rowactions.length && !isHideAction"
        label="操作"
        v-bind="columnsProps($attrs.columnsprops, $attrs.rowactionsprops)"
      >
        <template slot-scope="scope">
          <slot name="actions" v-bind="scope">
            <div style="display: flex; flex-wrap: wrap">
              <div
                v-for="(item, index) in hidePartAction($attrs.rowactions, scope)"
                :key="index"
                style="margin: 5px 5px"
              >
                <el-button
                  v-if="item.type !== 'btn'"
                  :loading="
                    actionLoadings[scope.$index] && actionLoadings[scope.$index][index]
                  "
                  type="text"
                  v-bind="item.props"
                  @click.stop="runAction(item.action, scope, scope.$index, index)"
                  >{{ item.name || "操作" }}
                </el-button>
                <el-button
                  v-else
                  :loading="
                    actionLoadings[scope.$index] && actionLoadings[scope.$index][index]
                  "
                  v-bind="item.props"
                  @click.stop="runAction(item.action, scope, scope.$index, index)"
                  >{{ item.name || "操作" }}
                </el-button>
              </div>
            </div>
          </slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isHideAction: false,
      actionLoadings: {},
    };
  },
  computed: {
    hidePartAction: function() {
      return (arr, scope) => {
        let res = arr.filter((item) => {
          return !item.isHide || (item.isHide && !item.isHide(scope));
        });
        this.isHideAction = res?.length ? false : true
        return res
      };
    },
    hidePart:() => {
      return (arr, scope) => {
        let res = arr.filter((item) => {
          return !item.isHide || (item.isHide && !item.isHide(scope));
        });
        return res
      };
    },
    columnsProps: () => {
      return (attrs, props) => Object.assign({}, attrs || {}, props || {});
    },
  },
  methods: {
    runAction(action, scope, $index, index) {
      this.actionLoadings = {
        [$index]: {
          [index]: true,
        },
      };
      const pro = action(scope);
      try {
        pro.finally(() => {
          this.actionLoadings = {};
        });
      } catch (err) {
        this.actionLoadings = {};
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.link {
  margin: 0 5px;
  color: #298cef;
}
</style>
