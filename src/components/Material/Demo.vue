<template>
  <div>
    <h1>Material 组件示例</h1>
    <Demo :component="Demo1" />
  </div>
</template>
<script>
import Demo from "../Demo.vue";
import Demo1 from "./Demo1.vue";

export default {
  components: { Demo },
  setup() {
    return { Demo1 };
  },
};
</script>
