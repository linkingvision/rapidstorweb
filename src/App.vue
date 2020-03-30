<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
.el-tree{
	background: none  !important;
	color: #FFFFFF !important;
}
.el-tree-node:focus>.el-tree-node__content{
	background-color: #494B56 !important;
}
.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
	background-color: #494B56 !important;
}
</style>
<style lang="scss">
  // Import Main styles for this application
  @import 'assets/scss/style';
  
  .breadcrumb-item.active{
      color: #55C3EB;
  }
</style>
