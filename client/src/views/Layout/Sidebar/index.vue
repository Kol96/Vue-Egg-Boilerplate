<template>
  <div class="el-aside sidebar"
    :class="{'sidebar--collapse': isCollapse}">
    <el-row class="header"
      @click.native="collapse">
      <i class="icon-logo_monitor logo"></i>
      <span class="title">软件平台监控系统</span>
    </el-row>

    <el-scrollbar class="menu-scrollbar"
      wrapClass="sidebar-scrollbar-wrapper">
      <el-menu class="menu"
        mode="vertical"
        background-color="#2b4158"
        text-color="rgba(255, 255, 255, 0.65)"
        active-text-color="#fff"
        :default-active="$route.path"
        :collapse="isCollapse"
        :router="true">
        <sidebar-item :routes="routes"></sidebar-item>
      </el-menu>
    </el-scrollbar>

  </div>
</template>

<script>
import SidebarItem from './SidebarItem'

export default {
  components: {
    SidebarItem
  },
  methods: {
    // 折叠侧边栏
    collapse() {
      this.$store.dispatch('toggleSideBar')
    }
  },
  computed: {
    routes() {
      return this.$store.getters.addRouters
    },
    isCollapse() {
      return !this.$store.getters.sidebar.opened
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  position: relative;
  z-index: 99999;
  width: 200px !important;
  height: 100%;
  background: #2b4158;
  box-shadow: 2px 0px 6px 0px rgba(0, 21, 41, 0.35);
  overflow: hidden;
  transition: all 0.3s;
  &.sidebar--collapse {
    width: 55px !important;
    .header {
      padding: 0 18px;
      .title {
        height: 0;
        width: 0;
        margin-left: 0px;
        overflow: hidden;
        visibility: hidden;
      }
    }
  }
  /*侧边栏顶部logo*/
  .header {
    height: 83px;
    padding: 0 18px;
    line-height: 83px;
    background: #2b4158;
    color: #fff;
    white-space: nowrap;
    .logo {
      display: inline-block;
      font-size: 21px;
      vertical-align: middle;
    }
    .title {
      display: inline-block;
      margin-left: 9px;
      font-size: 16px;
      vertical-align: middle;
    }
  }
}
.menu-scrollbar {
  height: calc(100% - 83px);
}
.menu {
  width: 100%;
  border: none;
}
</style>

<style lang="scss">
.sidebar {
  /*折叠时优先隐藏子菜单*/
  .el-menu--collapse,
  &.sidebar--collapse {
    span,
    .el-submenu__icon-arrow,
    .el-menu--inline {
      height: 0;
      width: 0;
      overflow: hidden;
      visibility: hidden;
    }
  }
  .el-menu--collapse {
    .el-submenu {
      &.is-opened {
        .el-submenu__title {
          background-color: #1890ff !important;
        }
        i {
          color: #fff;
        }
      }
    }
  }
  /*滚动条颜色*/
  .el-scrollbar__thumb {
    background: transparent;
  }
  .el-submenu {
    &.is-active {
      .el-submenu__title {
        color: #fff;
      }
      i {
        color: #fff;
      }
    }
    .el-menu-item {
      background-color: #1b2d3e !important;
    }
  }
  .el-menu-item {
    &.is-active {
      color: #009fff !important;
    }
    &:focus,
    &:hover {
      color: #009fff !important;
    }
  }
}
.sidebar-scrollbar-wrapper {
  overflow-x: hidden;
}
</style>
