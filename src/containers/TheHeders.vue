<template>
    <div class="c_ding">
        <div class="c_logo"></div>
        <div class="c_use">
            <CHeader with-subheader>
                <CToggler
                in-header
                class="ml-3 d-lg-none"
                @click="$store.commit('toggleSidebarMobile')"
                />
                <CToggler
                in-header
                class="ml-3 d-md-down-none"
                @click="$store.commit('toggleSidebarDesktop')"
                />
            </CHeader>
            <div class="use_you">
                <div class="use_you_top">欢迎你</div>
                <div class="use_you_top">
                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link">
                            admin<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <div class="use_you_top">
                    <el-badge :value="gEvvalue" :max="999" class="item">
                        <i class="el-icon-message-solid" type="primary"></i>
                    </el-badge>
                </div>
                <div>
                    <el-dropdown trigger="click">
                        <span class="el-dropdown-link">
                            <i class="el-icon-question"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'TheHeders',
        data(){
            return{
                gEvvalue:120,
            }
        }
    }
</script>
<style scoped>
i{
    font-size:16px;
}
/* 铃铛 */
.el-badge >>> .el-badge__content{
    border: 0;
}
.el-badge >>> .el-badge__content.is-fixed{
    top: 10px;
    padding: 0 4px;
}
/* 下拉 */
.el-dropdown{
    color: #FFFFFF;
}
/* 顶部 */
.use_you{
    width: 20%;
    display: flex;
    /* justify-content: space-between; */
}
.use_you .use_you_top{
    margin-right: 30px;
}
.c-header.c-header-fixed{
	position:static;
}
.c-header {
    background: none;
    border-bottom:none;
}
.c_ding{
  width: 100%;
  height: 50px;
  background-image: linear-gradient(to right, #2C2E34 , #41484F);
  position: fixed;
  top: 0;
  bottom: 0;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
}
/* logo */
.c_logo{
	width: 120px;
	height: 100%;
	background: url("../assets/imgs/NVRlogof.svg") no-repeat;
	background-size: 100%;
}
.c_use{
	width: 89%;
	height: 100%;
	font-size:14px;
	font-family:Source Han Sans CN;
	font-weight:400;
	color:rgba(255,255,255,1);
	line-height: 50px;
	display: flex;
	justify-content: space-between;
}
.c-dark-theme .c-header {
    border-bottom: 0;
  }
</style>