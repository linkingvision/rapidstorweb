import Vue from 'vue'
import axios from 'axios'
import VueI18n from 'vue-i18n'
import LangEn from '../../../static/lang/en'
import LangZhCHS from '../../../static/lang/zhchs'
import LangZhCHT from '../../../static/lang/zhcht'
Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: "zhchs",
    messages: {
      'en': LangEn,
      'zhchs': LangZhCHS,
      'zhcht': LangZhCHT
    }
})


let root=process.env.VUE_APP_URL;
if (root == undefined){
    root = window.location.protocol + '//' + window.location.host + window.location.pathname;
}

let listdatag=[];
// 实时播放页面
// 摄像机
function loadtest (){
    // let listdatag=[];
    let url = root + "/api/v1//GetSrcCamera";
    axios.get(url).then(result => {
        if(result.status == 200){
            var data =  result.data;
            var srcGroup = {children: []};
            srcGroup.label=i18n.tc('message.live.camera');
            srcGroup.iconclass="mdi mdi-view-sequential fa-fw";
            for(var i=0; i< data.src.length; i++){
                 var item = data.src[i];
                if(item['nOriginalType'] == 'H5_CH_GB'){
                    continue;
                }else{
                    // 主副流
                    var node=[{
                    token : item['strToken'],
                    streamprofile : "main",
                    label :i18n.tc('message.live.mainstream'),
                    name:item['strName']+"--"+i18n.tc('message.live.mainstream'),
                    iconclass : 'mdi mdi-playlist-play fa-fw',
                    disabled_me:false
                    },{
                    token : item['strToken'],
                    streamprofile : "sub",
                    label :i18n.tc('message.live.substream'),
                    name:item['strName']+"--"+i18n.tc('message.live.substream'),
                    iconclass : 'mdi mdi-playlist-play fa-fw',
                    disabled_me:false
                    }]
                    var newItem ={
                            token : item['strToken'],
                            label : item['strName'],
                            iconclass : 'mdi mdi-camcorder fa-fw',
                            iconclass2 : 'mdi mdi-camcorder fa-fw',
                            name:item['strName']+"--"+i18n.tc('message.live.mainstream'),
                            children:node,
                            disabled_me:false};
                    
                    if(!item['bOnline'])
                        newItem['iconclass'] = 'mdi mdi-camcorder-off fa-fw';

                    if(item['nType'] == 'H5_CLOUD')
                        newItem['iconclass'] = 'mdi mdi-cloud-upload fa-fw';
                    
                    if(item['bRec'] == true)
                        newItem['iconclass2'] = 'iconfont icon-radioboxfill none';
                        
                srcGroup.children.push(newItem);
                }
            }
            listdatag.push(srcGroup);
          } 
    })
}
loadtest ();
//dev
function loadDevice(){
    let url = root + "/api/v1//GetDevice";
    axios.get(url).then(result => {
        if(result.status == 200){
            var srcData = [];
              var data=result.data;
              for(var i = 0; i < data.dev.length; i++){
                  var item=data.dev[i];
                  var srclevel=[];
                  srclevel["strToken"]=item.strToken;
                  srclevel["strName"]=item.strName;
                  DeviceSrc(srclevel,srcData);
              }
        } 
    })
}
function DeviceSrc(srclevel){
    console.log(srclevel)
    var url = root + "/api/v1/GetDeviceSrc?token="+ srclevel.strToken

    axios.get(url).then(result => {
        if (result.status == 200)
        {
            var data =  result.data;
            var srcGroup = {children: []};
            srcGroup.label=srclevel.strName;
            srcGroup.iconclass="mdi mdi-view-sequential fa-fw";
            for(var i=0; i< data.src.length; i++){
                var item = data.src[i];
                // 主副流
                var node=[{
                  token : item['strToken'],
                  streamprofile : "main",
                  label :i18n.tc('message.live.mainstream'),
                  name:item['strName']+"--"+i18n.tc('message.live.mainstream'),
                  iconclass : 'mdi mdi-playlist-play fa-fw',
                  disabled_me:false
                },{
                  token : item['strToken'],
                  streamprofile : "sub",
                  label :i18n.tc('message.live.substream'),
                  name:item['strName']+"--"+i18n.tc('message.live.substream'),
                  iconclass : 'mdi mdi-playlist-play fa-fw',
                  disabled_me:false
                }]
                for(var l=0; l< node.length; l++){
                    if(item['bDisable'] == true){
                        node[l].disabled_me =true;
                    }
                }
                
                var newItem ={
                        token : item['strToken'],
                        label : item['strName'],
                        iconclass : 'mdi mdi-camcorder fa-fw',
                        iconclass1 : '',
                        name:item['strName']+"--"+i18n.tc('message.live.mainstream'),
                        children:node,
                        disabled_me:false};

                if(!item['bOnline'])
                    newItem['iconclass'] = 'mdi mdi-camcorder-off fa-fw';

                if(item['nType'] == 'H5_CLOUD')
                    newItem['iconclass'] = 'mdi mdi-cloud-upload fa-fw';

                if(item['bRec'] == true)
                        newItem['iconclass2'] = 'iconfont icon-radioboxfill none';

                if(item['bDisable'] == true){
                    newItem['disabled_me'] =true;
                    newItem['iconclass1'] = 'camera';
                }

               srcGroup.children.push(newItem);
            }
            listdatag.push(srcGroup);
        }
    })
}
loadDevice()
//管理系统
const Regional=(callback)=>{
    let listdatag=[];
    let url = root + "/api/v1//GetRegion";
    axios.get(url).then(result=>{
        var oldarr=result.data.root;
        var oldarr1=result.data.src;
        var dataroot=getchild(oldarr,oldarr1);
        // console.log(oldarr,oldarr1);
        listdatag.push(dataroot);
        callback && callback(listdatag);
    })
}
function getchild(arr,arr1){
    for(var i in arr.cam){
        if(!arr.cam[i].strName){
            for(var j in arr1){
                if(arr.cam[i].strToken == arr1[j].strToken){
                    var node1=[{
                        strToken : arr1[j].strToken,
                        streamprofile : "main",
                        strName :i18n.tc('message.live.mainstream'),
                        name:arr1[j].strName+"--"+i18n.tc('message.live.mainstream'),
                        iconclass : 'mdi mdi-playlist-play fa-fw',
                      },{
                        strToken : arr1[j].strToken,
                        streamprofile : "sub",
                        strName :i18n.tc('message.live.substream'),
                        name:arr1[j].strName+"--"+i18n.tc('message.live.substream'),
                        iconclass : 'mdi mdi-playlist-play fa-fw',
                      }]
                    arr.cam[i].node=node1;
                    arr.cam[i].strName = arr1[j].strName;
                    arr.cam[i].name=arr1[j].strName+"--"+i18n.tc('message.live.mainstream'),
                    arr.cam[i].bOnline = arr1[j].bOnline;
                    arr.cam[i].iconclass="mdi mdi-camcorder fa-fw"
                    if(!arr1[j].bOnline)
                        arr.cam[i].iconclass = 'mdi mdi-camcorder-off fa-fw';

                    if(arr1[j].nConnectType == 'H5_CLOUD')
                        arr.cam[i].iconclass = 'mdi mdi-camcorder fa-fw';

                    if(arr1[j].bRec == true)
                        arr.cam[i].iconclass2  = 'iconfont icon-radioboxfill none';
                }
            }
        }
    }
    if(arr.node && arr.node.length>0){
        for (var i = 0; i < arr.node.length; i++) {
            arr.node[i] = getchild(arr.node[i],arr1);
        }
    }
    return arr;
}

export {Regional,listdatag}