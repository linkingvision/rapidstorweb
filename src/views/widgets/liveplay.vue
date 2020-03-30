<template>
    <div class="play_content">
        <video class="h5video" :id="videoid" autoplay webkit-playsinline playsinline></video>
    </div>
</template>
<script>
import '../../assets/js/adapter'
import {H5sPlayerWS,H5sPlayerHls,H5sPlayerRTC,H5sPlayerAudBack} from '../../assets/js/h5splayer'
import {H5siOS,H5sPlayerCreate} from '../../assets/js/h5splayerhelper'
export default {
    name:"liveplay",
    props:['h5id', 'h5videoid',"cols","rows"],
    data(){
        return{
            videoid: this.h5videoid,
            h5handler:undefined,
        }
    },
    mounted(){
        let _this = this;
        this.$root.bus.$on('liveplay', function(token,streamprofile,label, id)
        {
            // console.log("++++++++++++++++++++",label,this.videoname)
            if (_this.h5id != id)
            {
                return;
            }
            _this.PlayVideo(token,streamprofile,label);
            _this.tokenshou=token;
            console.log("-----------------",_this.tokenshou)
        });
    },
    methods:{
        //播放
        PlayVideo(token,streamprofile,label)
        {
            var root = process.env.API_ROOT;
            var wsroot = process.env.VUE_APP_PORT;
            if (root == undefined){
                root = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
            if (wsroot == undefined)
            {
                wsroot = window.location.host;
            }
            let conf = {
                videoid: this.h5videoid,
                protocol: window.location.protocol, //http: or https:
                host: wsroot, //localhost:8080
	            streamprofile: streamprofile, // {string} - stream profile, main/sub or other predefine transcoding profile
                rootpath: '/', // '/'
                token: token,
                hlsver: 'v1', //v1 is for ts, v2 is for fmp4
                session: this.$store.state.token //session got from login
            };
            if (this.proto == 'RTC' || (H5siOS() === true))
            {
                this.h5handler = new H5sPlayerRTC(conf);
            }else
            {
                this.h5handler = new H5sPlayerWS(conf);
            }

            this.h5handler.connect();
        },
    }
}
</script>
<style scoped>
.play_content{
    width: 100%;
    height: 100%;
}
.h5video{
   object-fit: fill;
}
video {
    width: 100%;
    height: 100%
}
</style>