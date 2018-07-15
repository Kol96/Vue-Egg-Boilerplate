<template>
  <el-container class="container">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <Sidebar :class="sidebarObj"></Sidebar>

    <el-container class="is-vertical">
      <el-header class="header clearfix">
        <div class="icon-hamburger hamburger"
             :class="{'collapse': isCollapse}"
             @click="collapse"></div>
        <el-breadcrumb separator="/"
          class="breadcrumb">
          <el-breadcrumb-item v-for="(item,index) in levelList"
            :key="index">
            {{ item.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="right-menu">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" class="dropdown-menu">
              <el-dropdown-item @click.native="logout()">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>

      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import ResizeMixin from './mixin/ResizeHandler'
import Sidebar from './Sidebar'

export default {
  mixins: [ResizeMixin],
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {}
  },
  components: {
    Sidebar
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    // 折叠侧边栏
    collapse() {
      this.$store.dispatch('toggleSideBar')
    },
    getBreadcrumb() {
      const matched = this.$route.matched.filter((item) => !!item.name)
      this.levelList = matched
    },
    // 退出登录
    logout() {
      this.$store.dispatch('LogOut')
    },
    handleClickOutside() {
      this.$store.dispatch('closeSideBar')
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    isCollapse() {
      return !this.$store.getters.sidebar.opened
    },
    sidebarObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        mobile: this.device === 'mobile'
      }
    },
    username() {
      return this.$store.getters.userInfo.username
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 9999;
  }
  .mobile {
    /*position: fixed;*/
    &.openSidebar {
      /*top: 0;*/
    }
    &.hideSidebar {
      /*width: 0 !important;*/
    }
  }
  .header {
    box-sizing: border-box;
    height: 53px;
    padding: 22px 15px 19px;
    .hamburger {
      float: left;
      margin-right: 20px;
      font-size: 20px;
      cursor: pointer;
      &.collapse {
        transform: rotate(90deg);
      }
    }
    .breadcrumb {
      float: left;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.45);
      line-height: 22px;
    }
    .right-menu {
      float: right;
      .el-dropdown {
        font-size: 16px;
        cursor: pointer;
        outline: none;
      }
    }
  }
  .main {
    position: relative;
    display: block;
    padding: 0;
    background: #f0f2f5;
    overflow: initial;
  }
}
.el-dropdown-menu.dropdown-menu {
  width: 148px;
  .el-dropdown-menu__item:focus,
  .el-dropdown-menu__item:not(.is-disabled):hover {
    color: #1989fa;
    background: #f5f7fa;
  }
}
</style>
