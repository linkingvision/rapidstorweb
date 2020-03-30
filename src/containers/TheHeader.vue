<template>
	<CHeader with-subheader>
		<!-- 导航栏 -->
		<CSubheader class="px-3">
			<div class="dao_dian">.</div>
			<CBreadcrumbRouter class="border-0 mb-0">
				
			</CBreadcrumbRouter>
		</CSubheader>
	</CHeader>
</template>

<script>

export default {
  name: 'TheHeader'
}
</script>
<style scoped>
.c-header{
	min-height: 46px;
}
.c-dark-theme .c-subheader {
    background: #475058;
    border-bottom: 1px solid #5B5F63;
}
.c-dark-theme .c-header {
    background: #2c2c34;
    border-bottom: 0;
}
.breadcrumb{
	margin: 0;
	border: 0;
}
.dao_dian{
	text-align: center;
	line-height: 25px;
	font-size: 30px;
	color: #55C3EB;
}
</style>
