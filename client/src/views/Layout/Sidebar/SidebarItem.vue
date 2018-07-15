<template>
  <div class="menuWrapper">
    <template v-for="(item, itemIndex) in routes"
      v-if="!item.hidden">

      <router-link v-if="!item.children || !item.children.length"
        :key="itemIndex"
        :to="item.path">
        <el-menu-item :index="item.path">
          <i :class="[item.iconCls, 'icon']"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </router-link>

      <router-link v-else-if="item.children && item.children.length === 1"
        :key="itemIndex"
        :to="item.children[0].path">
        <el-menu-item :index="item.children[0].path">
          <i :class="[item.children[0].iconCls, 'icon']"></i>
          <span slot="title">{{item.children[0].name}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else
        :key="itemIndex"
        :index="item.path"
        popper-class="sidebar-submenu__vertical">
        <template slot="title">
          <i :class="[item.iconCls, 'icon']"></i>
          <span slot="title">{{ item.name }}</span>
        </template>

        <sidebar-item :routes="item.children"></sidebar-item>
      </el-submenu>

    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: ['routes']
}
</script>

<style lang="scss" scoped>
.menuWrapper {
  .icon {
    font-size: 15px;
    margin-right: 19px;
    width: 15px;
    vertical-align: middle;
    text-align: center;
  }
}
</style>

<style lang="scss">
.sidebar-submenu__vertical {
  .el-menu {
    padding: 0;
  }
  .el-menu-item {
    color: rgba(255, 255, 255, 0.65);
    &.is-active {
      color: #009fff !important;
    }
    &:focus,
    &:hover {
      color: #009fff !important;
    }
  }
}
</style>
