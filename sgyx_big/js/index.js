// ~function(){

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
  var s = new Switch(6,JTs,[5,6])

  s.callbacks = {
    1:function(){

        closeLight()
        closeVoice()
        v3dApp.tweenCamera("PhysCamera007", "PhysCamera007.Target", 1);

    },
    2:function(){

        closeLight()
        closeVoice()
        v3dApp.tweenCamera("PhysCamera002", "PhysCamera002.Target", 1);

    },
    3:function(){

        v3dApp.tweenCamera("PhysCamera005", "PhysCamera005.Target", 1);
        closeLight()
        closeVoice()

    },
    4:function(){

        v3dApp.tweenCamera("PhysCamera003", "PhysCamera003.Target", 1);
        closeLight()
        closeVoice()

    },
    5:function(){

        $("canvas").css({
            'opacity':0
        })

        closeLight()
        closeVoice()

    },
    6:function(){

        $("canvas").css({
            'opacity':0
        })

        closeLight()
        closeVoice()

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
    var button1 = new Button({

        buttonID:'panel3_btn1',
        txtID:'panel3_txt1',
        group:'panel3',
        onTouch:function(){

            openLight()

            closeVoice()
            closeDrawer()
            closeCupboard()

        },
        onClose : function(){

            closeLight()

        },

    })

    //音响 镜头6
    var button2 = new Button({

        buttonID:'panel3_btn2',
        txtID:'panel3_txt2',
        group:'panel3',
        onTouch:function(){

            openVoice()

            closeLight()
            closeDrawer()
            closeCupboard()

        },
        onClose : function(){

            closeVoice()

        },


    })

    //抽屉 镜头3
    var button3 = new Button({

        buttonID:'panel4_btn1',
        txtID:'panel4_txt1',
        group:'panel4',
        onTouch:function(){

            openDrawer()

            closeCupboard()
          closeVoice()
          closeLight()


        },
        onClose : function(){

            closeDrawer()

        },


    })



    //柜子 镜头4
    var button4 = new Button({

        buttonID:'panel4_btn2',
        txtID:'panel4_txt2',
        group:'panel4',
        onTouch:function(){

            openCupboard()

            closeDrawer()
            closeVoice()
            closeLight()


        },
        onClose : function(){

            closeCupboard()

        },


    })

  function closeLight(){

    LIGHTs[ currentMatIndex ][0]()

  }
  function closeVoice(){

      v3dApp.operateAnimation("PLAY", "YX", null, null, 'LoopOnce', 1, function() {})
      v3dApp.operateAnimation("STOP", "YX", null, null, 'LoopOnce', 1, function() {})
      music.pause()
  }
    function closeDrawer(){

        v3dApp.operateAnimation("PLAY", "CT", null, null, 'LoopOnce', 1, function() {});
        v3dApp.operateAnimation("STOP", "CT", null, null, 'LoopOnce', 1, function() {});

    }
    function closeCupboard(){

        v3dApp.operateAnimation("PLAY", "GuiMen_G", null, null, 'LoopOnce', 1, function() {});
        v3dApp.operateAnimation("STOP", "GuiMen_G", null, null, 'LoopOnce', 1, function() {});

    }
  function openLight(){

      v3dApp.tweenCamera("PhysCamera005", "PhysCamera005.Target", 1);
      LIGHTs[ currentMatIndex ][1]()

  }
  function openVoice(){

      music.play()
      v3dApp.tweenCamera("PhysCamera006", "PhysCamera006.Target", 1);
      v3dApp.operateAnimation("PLAY", "YX", null, null, 'LoopOnce', 1, function() {})

  }
function openDrawer(){

    v3dApp.operateAnimation("PLAY", "CT", null, null, 'LoopOnce', 1, function() {});
    v3dApp.tweenCamera("PhysCamera003", "PhysCamera003.Target", 1);

}

function openCupboard(){

    v3dApp.operateAnimation("PLAY", "GuiMen_G", null, null, 'LoopOnce', 1, function() {});
    v3dApp.tweenCamera("PhysCamera004", "PhysCamera004.Target", 1);

}




// }()