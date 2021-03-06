~function(){

  //材质按钮
  var $buttonMat1 = $("#btn1")
  var $buttonMat2 = $("#btn2")
  var $buttonMat3 = $("#btn3")



    //菜单按钮
  var router = new Router({
    isCanvas:true
  })
  router.openPageCanvas()
  var music = new Music({
      AudioID : "voice"
  })

  //镜头切换
  var JTs = [
    function(){
      v3dApp.tweenCamera("PhysCamera007", "PhysCamera007.Target", 1);
    },
    function(){
      v3dApp.tweenCamera("PhysCamera002", "PhysCamera002.Target", 1);
    },
    function(){
      v3dApp.tweenCamera("PhysCamera005", "PhysCamera005.Target", 1);
    },
    function(){
      v3dApp.tweenCamera("PhysCamera004", "PhysCamera004.Target", 1);
    },
  ]

  //灯光切换
  var LIGHTs = {
    0:[
      function(){
        v3dApp.assignMat("TZ", "TZ_nyj_off");
        v3dApp.assignMat("HXD", "HXD_off");
      },//关
      function(){
        v3dApp.assignMat("TZ", "TZ_nyj_on");
        v3dApp.assignMat("HXD", "HXD_on");
      },//开
    ],
    1:[
      function(){
        v3dApp.assignMat("TZ", "TZ_yyh_off");
        v3dApp.assignMat("HXD", "HXD_off");
      },//关
      function(){
        v3dApp.assignMat("TZ", "TZ_yyh_on");
        v3dApp.assignMat("HXD", "HXD_on");
      },//开
    ],
    2:[
      function(){
        v3dApp.assignMat("TZ", "TZ_bsh_off");
        v3dApp.assignMat("HXD", "HXD_off");
      },//关
      function(){
        v3dApp.assignMat("TZ", "TZ_bsh_on");
        v3dApp.assignMat("HXD", "HXD_on");
      },//开
    ],
  }
  //切换按钮
  var s = new Switch(7,JTs,[6,7])

    s.onLeaves = {
      3:function(){

          //有灯光，有音响，走的时候记得关掉
          voice_btn.close()
          light_btn.close()

      },

    4:function(){
      if(ct_open){
          drawer_btn.close()
      }
      if(gz_open){
          cupboard_btn.close()
      }
    },

      5:function(){
          $("#logo").show()
      }
    }

  s.callbacks = {
    1:function(){

        v3dApp.tweenCamera("PhysCamera007", "PhysCamera007.Target", 1);

    },
    2:function(){

        v3dApp.tweenCamera("PhysCamera002", "PhysCamera002.Target", 1);

    },
    3:function(){

        v3dApp.tweenCamera("PhysCamera005", "PhysCamera005.Target", 1);

    },
    4:function(){

        v3dApp.tweenCamera("PhysCamera003", "PhysCamera003.Target", 1);

    },
    5:function(){

        v3dApp.tweenCamera("PhysCamera007", "PhysCamera007.Target", 1);

    },
    6:function(){

        $("canvas").css({
            'opacity':0
        })

    },

  }


  var currentMatIndex = 0
  //材质切换
  $buttonMat1.on("mouseup",function(){
    v3dApp.assignMat("GZ", "GZ_gtz_tex");
    v3dApp.assignMat("TZ", "TZ_nyj_off");
      v3dApp.assignMat("GuiMen", "GM_gtz");
    currentMatIndex = 0
  })
  $buttonMat2.on("mouseup",function(){
    v3dApp.assignMat("GZ", "GZ_szb_tex");
    v3dApp.assignMat("TZ", "TZ_yyh_off");
      v3dApp.assignMat("GuiMen", "GM_szb");
    currentMatIndex = 1
  })
  $buttonMat3.on("mouseup",function(){
    v3dApp.assignMat("GZ", "GZ_ych_tex");
    v3dApp.assignMat("TZ", "TZ_bsh_off");
      v3dApp.assignMat("GuiMen", "GM_ych");
    currentMatIndex = 2

  })

    //灯光 镜头5
    var light_btn = new Button({

        buttonID:'panel3_btn1',
        txtID:'panel3_txt1',
        group:'panel3',
        onTouch:function(){

            openLight()

            if(voice_open){
                closeVoice()
            }

        },
        onClose : function(){

            closeLight()

        },
    })

    //音响 镜头6
    var voice_btn = new Button({

        buttonID:'panel3_btn2',
        txtID:'panel3_txt2',
        group:'panel3',
        onTouch:function(){

            openVoice()
            closeLight()

        },
        onClose : function(){

            closeVoice()

        },

    })

    //抽屉 镜头3
    var drawer_btn = new Button({

        buttonID:'panel4_btn1',
        txtID:'panel4_txt1',
        group:'panel4',
        onTouch:function(){

            openDrawer()

            if(gz_open){
                closeCupboard()

            }

        },
        onClose : function(){

            closeDrawer()

        },


    })

    //柜子 镜头4
    var cupboard_btn = new Button({

        buttonID:'panel4_btn2',
        txtID:'panel4_txt2',
        group:'panel4',
        onTouch:function(){

            openCupboard()

            if(ct_open){
                closeDrawer()

            }

        },
        onClose : function(){

            closeCupboard()

        },


    })

    //ai670
    var ai670_btn = new Button({

        buttonID:'panel5_btn1',
        txtID:'none',
        group:'panel5',
        onTouch:function(){

            v3dApp.operateAnimation("PLAY", ["jiantou001", "jiantou02", "jiantou03", "jiantou04", "jiantou05", "jiantou06", "biaoxian01", "biaoxian02", "biaoxian03", "biaoxian04", "biaoxian05", "biaoxian06", "A860", "B810", "C710"], null, null, 'LoopOnce', 1, function() {});
            v3dApp.changeVis(["Renwu", "ZI155_163", "A860", "B810", "C710"], true);
            v3dApp.changeVis(["ZI164_171", "ZI172_179", "A910", "A960", "B860", "B910", "C760", "C810"], false);

        },
        onClose : function(){



        },

    })

    //ai720
    var ai720_btn = new Button({

        buttonID:'panel5_btn2',
        txtID:'none',
        group:'panel5',
        onTouch:function(){

            v3dApp.operateAnimation("PLAY", ["jiantou001", "jiantou02", "jiantou03", "jiantou04", "jiantou05", "jiantou06", "biaoxian01", "biaoxian02", "biaoxian03", "biaoxian04", "biaoxian05", "biaoxian06", "A910", "B860", "C760"], null, null, 'LoopOnce', 1, function() {});
            v3dApp.changeVis(["Renwu", "ZI164_171", "A910", "B860", "C760"], true);
            v3dApp.changeVis(["ZI155_163", "ZI172_179", "A860", "A960", "B810", "B910", "C710", "C810"], false);

        },
        onClose : function(){



        },

    })

    //ai770
    var ai770_btn = new Button({

        buttonID:'panel5_btn3',
        txtID:'none',
        group:'panel5',
        onTouch:function(){

            v3dApp.operateAnimation("PLAY", ["jiantou001", "jiantou02", "jiantou03", "jiantou04", "jiantou05", "jiantou06", "biaoxian01", "biaoxian02", "biaoxian03", "biaoxian04", "biaoxian05", "biaoxian06", "A960", "B910", "C810"], null, null, 'LoopOnce', 1, function() {});
            v3dApp.changeVis(["Renwu", "ZI172_179", "A960", "B910", "C810"], true);
            v3dApp.changeVis(["ZI155_163", "ZI164_171", "A860", "A910", "B810", "B860", "C710", "C760"], false);

        },
        onClose : function(){



        },

    })



    var voice_open = false
    var gz_open = false
    var ct_open = false
  function closeLight(){

    LIGHTs[ currentMatIndex ][0]()

  }
  function closeVoice(){

      voice_open = false
      music.pause()
      v3dApp.operateAnimation("STOP", "YX", null, null, 'LoopOnce', 1, function() {})
      v3dApp.operateAnimation("PLAY", "YX", null, null, 'LoopOnce', -1, function() {})
  }
    function closeDrawer(){

      ct_open = false
        v3dApp.operateAnimation("STOP", "CT", null, null, 'LoopOnce', 1, function() {});
        v3dApp.operateAnimation("PLAY", "CT", null, null, 'LoopOnce', -1, function() {});

    }
    function closeCupboard(){

        gz_open = false
        v3dApp.operateAnimation("STOP", "GuiMen_G", null, null, 'LoopOnce', 1, function() {});
        v3dApp.operateAnimation("PLAY", "GuiMen_G", null, null, 'LoopOnce', -1, function() {});

    }
  function openLight(){

      v3dApp.tweenCamera("PhysCamera005", "PhysCamera005.Target", 1);
      LIGHTs[ currentMatIndex ][1]()

  }
  function openVoice(){

      voice_open = true
      music.play()
      v3dApp.tweenCamera("PhysCamera006", "PhysCamera006.Target", 1)
      v3dApp.operateAnimation("STOP", "YX", null, null, 'LoopOnce', 1, function() {})
      v3dApp.operateAnimation("PLAY", "YX", null, null, 'LoopOnce', 1, function() {})

  }
function openDrawer(){

      ct_open = true
    v3dApp.operateAnimation("STOP", "CT", null, null, 'LoopOnce', 1, function() {});
    v3dApp.operateAnimation("PLAY", "CT", null, null, 'LoopOnce', 1, function() {});
    v3dApp.tweenCamera("PhysCamera003", "PhysCamera003.Target", 1);

}

function openCupboard(){

      gz_open = true
    v3dApp.operateAnimation("STOP", "GuiMen_G", null, null, 'LoopOnce', 1, function() {});
    v3dApp.operateAnimation("PLAY", "GuiMen_G", null, null, 'LoopOnce', 1, function() {});
    v3dApp.tweenCamera("PhysCamera004", "PhysCamera004.Target", 1);

}

$("#touch1").on("mouseup",function(){

    window.location.href = 'http://www.borcci.com/channel/5611ff70b5f54781a15f4cd25ba87559.html'

})

$("#touch2").on("mouseup",function(){

    window.location.href = 'https://bochu.tmall.com'

})

$("#weibo").on("mouseup",function(){

    window.location.href = 'https://weibo.com/borccikitchen'

})






}()