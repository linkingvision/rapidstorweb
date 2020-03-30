<template>
	<div>
		
		<TheHeders/>
		<div  class="c-app" :class="{ 'c-dark-theme': $store.state.darkMode }">
			<!-- 左边菜单栏 -->
			<TheSidebar/>
			<CWrapper>
				<!-- 顶部导航 -->
				<TheHeader/>
				<!-- 内容 -->
				<div class="c-body">
					<main class="c-main">
						<CContainer fluid>
							<transition name="fade">
								<router-view></router-view>
							</transition>
						</CContainer>
					</main>
				</div>
			</CWrapper>
				
				<!-- 底部 -->
				<TheFooter/>
		</div>
  	</div>
</template>

<script>
import TheSidebar from './TheSidebar'
import TheHeders from './TheHeders'
import TheHeader from './TheHeader'
import TheFooter from './TheFooter'

export default {
  name: 'TheContainer',
  components: {
    TheSidebar,
	TheHeders,
	TheHeader,
	TheFooter,
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
/* 全体的css */
.c-app.c-dark-theme {
    color: #e1e1e1;
    background-color: #353840;
}

/* 左边菜单栏 */
.c-dark-theme .c-sidebar {
    color: #e1e1e1;
    background: #36383E;
    border: 0;
}
.c-sidebar.c-sidebar-fixed {
    position: fixed;
    top: 50px;
	/* bottom: 50px; */
	z-index: 100000;
}
/* 右边内容 */
.c-wrapper{
	/* margin-top: 48px; */
	padding-top: 50px;
	box-sizing: border-box;
}
.c-wrapper:not(.c-wrapper-fluid) {
	height: 95vh;
}
.c-main {
	padding: 0;
}
.c-main > .container-fluid{
	padding: 0;
}
</style>
