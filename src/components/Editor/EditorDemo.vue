<template>
  <div>
    <h1>Editor 组件示例</h1>
    <Demo :component="Editor1Demo" />
  </div>
</template>
<script>
import Demo from "../Demo.vue";
import Editor1Demo from "./Editor1.demo.vue";

export default {
  components: { Demo },
  setup() {
    return { Editor1Demo };
  },
};
</script>
