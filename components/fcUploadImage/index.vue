<template>
  <div class="imgUpload">
    <div v-for="(file, index) in valCom" :key="index" class="item" @click="del(file)">
      <div class="cover">
        <svg
          t="1701349662649"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4240"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="200"
          height="200"
        >
          <path
            d="M517.59 21.609c-100.299 0-181.703 79.514-185.167 179.34H98.603c-25.979 0-47.235 21.099-47.235 47.236 0 25.98 21.099 47.237 47.236 47.237h52.117v528.416c0 99.196 67.233 180.285 150.37 180.285h423.55c82.98 0 150.37-80.616 150.37-180.285V295.737h47.236c25.98 0 47.236-21.1 47.236-47.237 0-25.98-21.099-47.236-47.236-47.236H702.441C699.449 101.124 617.888 21.61 517.59 21.61z m-96.677 179.34c3.464-51.172 45.19-90.85 96.834-90.85s93.37 39.835 96.362 90.85H420.913z m-119.98 714.842c-29.444 0-61.88-37.789-61.88-91.953V295.737h547.311V824.31c0 54.007-32.436 91.954-61.88 91.954H300.933v-0.473z m0 0"
            p-id="4241"
          />
          <path
            d="M364.387 802.267c21.57 0 39.363-21.571 39.363-48.653V476.022c0-27.082-17.635-48.654-39.363-48.654-21.572 0-39.364 21.572-39.364 48.654v277.592c0 26.924 17.32 48.653 39.364 48.653z m142.496 0c21.571 0 39.363-21.571 39.363-48.653V476.022c0-27.082-17.635-48.654-39.363-48.654-21.571 0-39.364 21.572-39.364 48.654v277.592c0 26.924 17.793 48.653 39.364 48.653z m149.896 0c21.571 0 39.364-21.571 39.364-48.653V476.022c0-27.082-17.635-48.654-39.364-48.654-21.571 0-39.363 21.572-39.363 48.654v277.592c0 26.924 17.162 48.653 39.363 48.653z m0 0"
            p-id="4242"
          />
        </svg>
      </div>
      <img class="img" :src="file.path" />
    </div>
    <div v-if="valCom.length < limitCom" class="add item">
      <input
        accept="image/*"
        v-bind="$attrs"
        class="addContent"
        type="file"
        @change="change"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: ["value", "limit", "action", "auto"],
  data() {
    return {
      cacheFiles: new Map(),
    };
  },
  computed: {
    limitCom: {
      get() {
        return typeof this.limit === "number" ? this.limit : Infinity;
      },
    },
    valCom: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  methods: {
    del(file) {
      this.$confirm("确定删除？", "提示").then(() => {
        this.valCom = this.value?.filter((item) => {
          return item.file !== file.file;
        });
        if (this.auto) {
          this.$nextTick(() => {
            this.upload();
          });
        }
      });
    },
    async change(val) {
      if (val.target.files.length + this.value.length > this.limit) {
        this.$message.warning(`只可添加${this.limit}照片！`);
        return;
      }
      const list = this.value.length ? this.value : [];
      list.push(
        ...[...val.target.files].map((item) => {
          return {
            file: item,
            path: URL.createObjectURL(item),
          };
        })
      );
      this.valCom = list;
      if (this.auto) {
        this.$nextTick(() => {
          this.upload();
        });
      }
    },
    async upload(readCache = true) {
      try {
        this.$emit('changeLoading', true )
        const list = this.valCom.length ? this.valCom : [];
        const pros = list
          ?.filter((item) => {
            if (readCache) {
              return !item.path.startsWith("http");
            }
            return true;
          })
          .map((item) => {
            return this.createPro(item.file);
          });
        await Promise.all(pros).then((res) => {
          const list = this.valCom.length ? this.valCom : [];
          this.valCom = list.map((it) => {
            const one = res.find((item) => item.file === it.file);
            return {
              file: it.file,
              path: one?.path || it.path,
            };
          });
          return this.valCom.map((item) => item.path);
        });
      } finally {
        this.$emit('changeLoading', false )
      }
    },
    createPro(file) {
      return new Promise((resolve, reject) => {
        this.action(file)
          .then((path) => {
            resolve({
              file,
              path,
            });
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
};
</script>
<style scoped>
.imgUpload {
  --size: 100px;
  --color: rgb(0, 166, 255);
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-flow: wrap;
}
.item .cover .icon {
  width: 0;
  height: 0;
}
.item:hover .cover .icon {
  width: calc(var(--size) / 4);
  height: calc(var(--size) / 4);
  margin: auto;
  z-index: 999;
}
.item:hover .cover {
  color: #fff;
  width: var(--size);
  height: var(--size);
  background-color: #00000055;
  z-index: 99;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-items: center;
  align-items: center;
}
.item {
  width: var(--size);
  height: var(--size);
  margin: 3px;
  border-radius: 4px;
  position: relative;
}
.img {
  width: inherit;
  height: inherit;
  object-fit: cover;
}
.add {
  /* background-color: #fff; */
  border: 3px solid var(--color);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.add::after {
  display: flex;
  width: 40%;
  margin: auto;
  height: 2px;
  content: "";
  position: absolute;
  background-color: var(--color);
}
.add::before {
  display: flex;
  width: 2px;
  margin: auto;
  height: 40%;
  content: "";
  position: absolute;
  background-color: var(--color);
}
.addContent {
  width: inherit;
  height: inherit;
  opacity: 0;
}
</style>
