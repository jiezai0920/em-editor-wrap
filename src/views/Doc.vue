<template>
  <div class="layout">
<!--    <TopNav class="nav" toggleMenuButtonVisible />-->
    <div class="content">
      <aside v-if="menuVisible">
        <h2>文档</h2>
        <ol>
          <li>
            <router-link to="/doc/intro">介绍</router-link>
          </li>
          <li>
            <router-link to="/doc/install">安装</router-link>
          </li>
          <li>
            <router-link to="/doc/get-started">开始使用</router-link>
          </li>
        </ol>
        <ol>
          <li>
            <router-link to="/doc/editor">Editor 组件</router-link>
          </li>
          <li>
            <router-link to="/doc/material">Material 组件</router-link>
          </li>
        </ol>
      </aside>
      <main id="main">
        <router-view />
      </main>
    </div>
  </div>
</template>
<script lang="ts">
import { inject, onBeforeUnmount, onMounted, Ref } from "vue";
export default {
  setup() {
    const menuVisible = inject<Ref<boolean>>("menuVisible"); // get
    const hideMenu = () => {
      if (menuVisible.value) {
        menuVisible.value = false;
      }
    };
    onMounted(() => {
      if (document.body.offsetWidth < 500) {
        document.getElementById("main").addEventListener("click", hideMenu);
      }
    });
    onBeforeUnmount(() => {
      if (document.body.offsetWidth < 500) {
        document.getElementById("main").removeEventListener("click", hideMenu);
      }
    });
    return { menuVisible };
  },
};
</script>
<style lang="scss" scoped>
$lightgreen: #fff;
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  > .nav {
    flex-shrink: 0;
  }
  > .content {
    flex-grow: 1;
    padding-left: 156px;
    background-color: #f7f8fa;
    @media (max-width: 500px) {
      padding-left: 0;
    }
  }
}
.content {
  display: flex;
  > aside {
    flex-shrink: 0;
  }
  > main {
    flex-grow: 1;
    padding: 16px;
  }
}
aside {
  background: $lightgreen;
  box-shadow: 0 8px 12px #ebedf0;
  width: 150px;
  padding: 16px 0;
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 70px;
  height: 100%;
  z-index: 10;
  color: #333;
  > h2 {
    font-size: 22px;
    margin-bottom: 4px;
    padding: 0 16px;
  }
  > ol {
    > li {
      > a {
        display: block;
        padding: 8px 16px;
        text-decoration: none;
      }

      .router-link-active {
        color: #1996f9;
      }
    }
  }
}
main {
  overflow: auto;
}
</style>
