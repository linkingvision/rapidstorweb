<template>
    <div class=con_Global>
      <!-- 左侧数据栏 -->
		<div class="con_left">
			<div>
				<el-input
					class="input_toog"
					placeholder="输入关键字进行过滤"
					v-model="filterText">
				</el-input>
			</div>
			<div class="devicetoog" id="device">
				<div class="devicetoog_icon">
					<div>
						<span>{{$t("message.setting.device")}} </span> 
						<span @click="devicetoog" class="iconfont icon-zhiding deviceicon"></span> 
					</div>
					<div>
						<span @click="infil" class="el-icon-search"></span>
					</div>
				</div>
				<el-tree
					:data="data_tree"
					node-key="id"
					ref="tree"
					highlight-current
					@node-click="handleNodeClick"
					:props="defaultProps">
					<span slot-scope="{ node, data }" style="width:100%;">
						<div style="width:100%;display: flex;justify-content: space-between;">
							<span >
								<span :class="data.iconclass" style="color:rgb(142, 132, 132);"></span>
								<span :class="data.iconclass1" style="padding-left: 4px;">{{data.label}}</span>
							</span>
							<span :class="data.iconclass2" class="black" style="">{{$t("message.live.Videorecording")}}</span>
						</div>
					</span>
				</el-tree>
			</div>
			<!-- 二 -->
			<div class="devicetoog" id="device1">
				<div class="devicetoog_icon">
					<div>
						<span>{{$t("message.setting.device")}} </span> 
						<span  @click="devicetoog1" class="iconfont icon-zhiding deviceicon"></span> 
					</div>
					<div>
						<span @click="infil" class="el-icon-search"></span>
					</div>
				</div>
				<div>
					<el-tree 
						node-key="strName" 
						:default-expanded-keys="['root']" 
						:data="data_tree1"
						:props="defaultProps1">
						<span slot-scope="{ node, data }" style="width:100%;">
								<span>
									<span class="mdi mdi-view-sequential fa-fw" style="color:rgb(142, 132, 132);"></span>
									<span :class="data.iconclass1" style="padding-left: 4px;">{{data.strName}}</span>
								</span>
								<div v-if="data.cam.length!=0">
									<el-tree :data="data.cam" :props="defaultProps1">
										<span slot-scope="{ node, data }" style="width:100%;">
											<div style="width:100%;display: flex;justify-content: space-between;">
												<span >
													<span :class="data.iconclass" style="color:rgb(142, 132, 132);"></span>
													<span :class="data.iconclass1" style="padding-left: 4px;">{{data.strName}}</span>
												</span>
												<span :class="data.iconclass2" class="black" style="">{{$t("message.live.Videorecording")}}</span>
											</div>
										</span>
									</el-tree>
								</div>
						</span>
					</el-tree>
				</div>
			</div>
			
		</div>
		<!-- 右边视频栏 -->
      	<div class="con_right" id="videoPanel">
			<div name='flex' style="position: relative;" class="videoColor" v-for="r in rows" :key="r">
				<div class="palace" name="flex" v-for="c in cols" :key="c" @contextmenu.prevent="stopVideo($event)" @click="videoClick(r,c,$event)">
					<live-play v-bind:id="'h'+r+c" :h5id="'h'+r+c" :rows="rows" :cols="cols" :h5videoid="'hvideo'+r+c"></live-play>
				</div>
			</div>
			<div class="btn-group blocks">
				<el-button type="button" class="layout1x1" data-row="1|1" @click="changePanel($event)"></el-button>
				<el-button type="button" class="layout1x3" data-row="1|3" @click="changePanel($event)"></el-button>
				<el-button type="button" class="layout2x2" data-row="2|2" @click="changePanel($event)"></el-button>

				<el-button type="button" class="layout2x3" data-row="1|6" @click="changePanel($event)"></el-button>
				<el-button type="button" class="layout1x7" data-row="1|7" @click="changePanel($event)"></el-button>

				<el-button type="button" class="layout3x3" data-row="3|3" @click="changePanel($event)"></el-button>

				
				<el-button type="button" class="layout1x13" data-row="1|13" @click="changePanel($event)"></el-button>

				<el-button type="button" class="layout4x4" data-row="4|4" @click="changePanel($event)"></el-button>
				<el-button type="button" class="layout5x5" data-row="5|5" @click="changePanel($event)"></el-button>
				<el-button type="button" class="layoutfull" @click="panelFullScreen($event)"> </el-button>
			</div>
		</div>
    </div>
</template>

<script>
import Vue from 'vue'
import {Regional,listdatag} from "../assets/api/api"
import liveplay from '../views/widgets/liveplay'
export default {
	name: 'Dashboard',
	components: {
        'live-play': liveplay
    },
	data(){
		return{
			filterText:"",
			data_tree:listdatag,
			data_tree1:[],
			rows: 3,
			cols: 3,
			selectCol: 1,
			selectRow: 1,
			contentHeight: '',
			contentWidth: '',
			defaultProps: {
				children: 'children',
				label: 'label',
				token:"token",
				iconclass:"iconclass"
			},
			defaultProps1: {
				children: 'node',
				label: 'strName',
				cam:"cam",
			},
		}
	},
	methods:{
		handleNodeClick(data, checked, indeterminate){
            let _this =this;
			let vid = 'h' + _this.$data.selectRow + _this.$data.selectCol;
			console.log(data.token, data.streamprofile, data.name,vid);
            // return false;
            if(data.disabled_me==false){
                console.log("----------------------");
                if (data.token) {
                    _this.$root.bus.$emit('liveplay', data.token, data.streamprofile, data.name, vid);
                }
            }else{

                console.log("不可用");
            }
        },
		//点击宫格
		videoClick(r, c, $event) {
            this.selectCol = c;
            this.selectRow = r;
            console.log(r, c);
            if ($($event.target).parent().hasClass('videoClickColor')) {
                $($event.target).parent().removeClass('videoClickColor');
            } else {
                $('#videoPanel div[class*="videoClickColor"]').removeClass('videoClickColor');
                $('#videoPanel>div').eq(r - 1).children('div').eq(c - 1).addClass('videoClickColor');
                //$('#videoPanel>div').eq(r - 1).children('div').eq(c - 1).children(".h5videowrapper").children(".h5video").style.opacity = "0.25";
            }
        },
        stopVideo(event){
            return;
        },
		
		// ui宽度
		updateUI() {
            $(".content").innerHeight($('.content-wrapper').innerHeight() - $('.content-header').outerHeight() - $('.main-header').innerHeight());
            //$('div[name="flex"]').height(($(".content").height() - 50) / this.rows);
            if($(document.body).width() < 768)
            {
                this.contentHeight = $(document.body).height()*0.4;
            }else
            {
                this.contentHeight = $(document.body).height()*0.8;
            }
            $('div[name="flex"]').height(this.contentHeight / this.rows);
            //this.contentHeight = $(document.body).height()*0.8;
            let _this = this;
            // if (H5siOS() === true)
            // {
            //     $('.h5video').prop("controls", true);
            // }
        },
		//点击切换
		changePanel(event) {
            let data = $(event.target).data('row');
            let _this = this;
             window.setTimeout(function() {
                if(data=='1|6'||data=='1|7'||data=='1|13'){
                    console.log("121");
                }else{
                    console.log("45845454545");
                    $("#videoPanel .videoColor .palace").removeClass("Seven_Palace");
                    $("#videoPanel .videoColor .palace").removeClass("Six_Palace");
                    $("#videoPanel .videoColor .palace").removeClass("videoflexitem");
                }
                var list_gong=$(".palace");
                if(data=='1|6'){
                    console.log("23")
                    list_gong.removeClass("videoflexitem");
                    list_gong.removeClass("Seven_Palace");

                    list_gong.addClass("Six_Palace");
                }
                if(data=='1|7'){
                    console.log("234")
                    list_gong.removeClass("videoflexitem");
                    list_gong.removeClass("Six_Palace");

                    list_gong.addClass("Seven_Palace");
                }
                if(data=='1|13'){
                    console.log("2345")
                    list_gong.removeClass("Six_Palace");
                    list_gong.removeClass("Seven_Palace");

                    list_gong.addClass("videoflexitem");
                }

		    }, 50);
            let cols = data.split('|')[1];
            let rows = data.split('|')[0];
            //this.map.clear();
            Object.assign(this.$data, {
                rows: parseInt(rows),
                cols: parseInt(cols)
            });
            Vue.nextTick(function () {
                //$('div[name="flex"]').height(($(".content").height() - 50) / rows);
                $('div[name="flex"]').height(_this.contentHeight / rows);
            })
        },
		//设备隐藏
		infil(){
			var nobl=$(".input_toog").css("display");
			if(nobl=="none"){
				$(".input_toog").css({"display":"block"})
			}else if(nobl=="block"){
				$(".input_toog").css({"display":"none"})
			}
		},

        devicetoog(){
            $("#device").hide();
            $("#device1").show();
        },
        devicetoog1(){
            $("#device1").hide();
            $("#device").show();
        },
	},
	mounted(){
        this.updateUI();
        console.log(listdatag)
		$("#device1").hide();
	},
	created(){
		let _this=this
		Regional(function(databor){
			console.log('浏览最多10文章数据1',databor);
			_this.data_tree1=databor
		});
	}
}
</script>
<style scoped>
/* 九宫格图标排布 */
.btn-group{
    width: 100%;
    text-align: center;
    padding: 20px 20%;
	display: flex;
	justify-content: space-between;
}
/* 切换 */
.input_toog{
	display: none;
}
.el-input >>> .el-input__inner{
	border: 0;
	background: none;
	border-radius: 10px;
}
#device1{
	display: none;
}
.deviceicon:hover{
	color: #55C3EB;
}
.devicetoog_icon{
	width: 100%;
	display: flex;
	justify-content: space-between;
}
/* 下拉菜单 */

.el-tree >>> .el-tree-node__content{
	height: auto !important;
	min-height: 40px;
}
.el-tree >>> .el-tree-node__content:hover{
	background: #494B56 !important;
}
/* 开始 */
.con_Global{
  width: 100%;
  height: 100%;
  display: flex;
  overflow-y: auto;
}
.con_Global .con_left{
  width: 17%;
  padding: 5px 10px;
  height: 100%;
  background-color: #353840;
}
.con_Global .con_right{
  /* width: 70%; */
  height: 100%;
  background-color: #2D3038;
}
/* 播放片段 */
div[name='flex'] {
    display: flex;
    flex-wrap: wrap;
    border-bottom: 0px !important;

}

div[name='flex']+[name='flex'] {
    border-left: 0px !important;
}
div[name="flex"]:hover {
    /*background-color: #3c8dbc;*/
    cursor: pointer;
}
#videoPanel>div:nth-last-child(2) {
    border-bottom: 1px solid rgb(22, 22, 22) !important;
}


#videoPanel:-webkit-full-screen {
    background-color: rgb(73, 74, 75) !important;
	display: block;
	width: 100%;
    height: 100%;
	margin-left: auto;
	margin-right: auto;
	margin-top: auto;
	margin-bottom: auto;
    top: 0;
    left: 0;
    padding: 0px;
	box-shadow: 0px 0px 50px #000;
}


#videoPanel:-moz-full-screen {
    background-color: rgb(73, 74, 75) !important;
	display: block;
	width: 100%;
    height: 100%;
	margin-left: auto;
	margin-right: auto;
	margin-top: auto;
	margin-bottom: auto;
    top: 0;
    left: 0;
    padding: 0px;
	box-shadow: 0px 0px 50px #000;
}

.videoColor {
    /* width: 1500px; */
    background-color: rgb(73, 74, 75) !important;
}

.pre-scrollable {
    max-height: 480px;
    overflow-y: scroll;
}

/* 六 */
.Six_Palace{
    flex: 1 1 33.33%  !important;
    height: 33.33% !important;
}
.Six_Palace:nth-child(1){
    flex: 1 1 66.66% !important;
    height: 66.66% !important;
}
.Six_Palace:nth-child(3){
    width: 33.33% !important;
    position: absolute;
    top: 33.33%;
    right: 0;
}

/* 十三宫格 */
.videoflexitem{
    width: 25% !important;
    height: 25% !important;
}
.videoflexitem:nth-child(6){
    position: absolute;
    top: 50%;
    left: 0;
}
.videoflexitem:nth-child(7){
    flex: 1 1 50%;
    height: 50% !important;
}
.videoflexitem:nth-child(8){
    flex: 1 1 25%;
    position: absolute;
    top: 50%;
    right: 0;
}
.blocks{
    margin-top: 20px;
}
.palace{
    background: url("./gallery/zuo@2x.png") no-repeat center #26282D !important;
	background-size: 10%;
    flex: 1 1 25%;
    border:1px solid black;
}
.Seven_Palace{
    flex: 1 1 33.33% !important;
    height: 33.33% !important;
}
.Seven_Palace:nth-child(1){
    height: 100% !important;
}
.Seven_Palace:nth-child(3){
    width: 33.33% !important;
    position: absolute;
    top: 33.33%;
    right: 0;
}
.Seven_Palace:nth-child(2){
    width: 33.33% !important;
    position: absolute;
    top: 33.33%;
    right: 33.33%;
}
.Seven_Palace:nth-child(6){
    width: 33.33% !important;
    position: absolute;
    bottom: 0;
    right: 33.33%;
}
.Seven_Palace:nth-child(7){
    width: 33.33% !important;
    position: absolute;
    bottom: 0;
    right: 0;
}
/* 九宫格 */
.layout1x1 {
    background: url('./gallery/1@2x.png') #f2f2f2;
    background-repeat: no-repeat;
    background-size: 32px 32px;
    color: #000;
    height: 32px;
    width: 32px;
    padding: 0;
}
.layout1x3 {
    background: url('./gallery/3@2x.png') #f2f2f2;
    background-repeat: no-repeat;
    background-size: 32px 32px;
    color: #000;
    height: 32px;
    width: 32px;
    padding: 0;
}
.layout2x2 {
    background: url('./gallery/4@2x.png') #f2f2f2;
    background-repeat: no-repeat;
    background-size: 32px 32px;
    color: #000;
    height: 32px;
    width: 32px;
    padding: 0;
}
.layout2x3 {
    background: url('./gallery/6@2x.png') #f2f2f2;
    background-repeat: no-repeat;
    background-size: 32px 32px;
    color: #000;
    height: 32px;
    width: 32px;
    padding: 0;
}
.layout1x7 {
    background: url('./gallery/7@2x.png') #f2f2f2;
    background-repeat: no-repeat;
    background-size: 32px 32px;
    color: #000;
    height: 32px;
    width: 32px;
    padding: 0;
}
.layout3x3 {
    background: url('./gallery/9@2x.png') #f2f2f2;
    background-repeat: no-repeat;
    background-size: 32px 32px;
    color: #000;
    height: 32px;
    width: 32px;
    padding: 0;
}
.layout1x13 {
    background: url('./gallery/13@2x.png') #f2f2f2;
    background-repeat: no-repeat;
    background-size: 32px 32px;
    color: #000;
    height: 32px;
    width: 32px;
    padding: 0;
}
.layout4x4 {
    background: url('./gallery/16@2x.png') #f2f2f2;
    background-repeat: no-repeat;
    background-size: 32px 32px;
    color: #000;
    height: 32px;
    width: 32px;
    padding: 0;
}
.layout5x5 {
    background: url('./gallery/25@2x.png') #ffffff;
    background-repeat: no-repeat;
    background-size: 32px 32px;
    color: #000;
    height: 32px;
    width: 32px;
    padding: 0;
}
.layoutfull {
    background: url('./gallery/quanping.png') center #ffffff;
    background-repeat: no-repeat;
    background-size: 30px 30px;
    color: #000;
    height: 32px;
    width: 32px;
    padding: 0;
}
</style>
<style lang="scss">
.con_right{
	@media screen and (min-width: 992px){
		width: 83%;
        box-sizing: border-box;
	}
	@media screen and (max-width: 992px){
		width: 83%;
	}
}
</style>