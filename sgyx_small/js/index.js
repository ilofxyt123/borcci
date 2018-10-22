// ~function(){

  //材质按钮
  var $buttonMat1 = $("#btn1")
  var $buttonMat2 = $("#btn2")
  var $buttonMat3 = $("#btn3")

  //灯光按钮
  var $buttonLight = $("#buttonLight")
  var $buttonVoice = $("#buttonVoice")

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
      v3dApp.tweenCamera("PhysCamera7", "PhysCamera7.Target", 1);
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
        v3dApp.assignMat("GZ", "GZ_gtz_off_tx");
        v3dApp.assignMat("HXD", "HXD_off");
      },//关
      function(){
        v3dApp.assignMat("GZ", "GZ_gtz_on_tx");
        v3dApp.assignMat("HXD", "HXD_on");
      },//开
    ],
    1:[
      function(){
        v3dApp.assignMat("GZ", "GZ_szb_off_tx");
        v3dApp.assignMat("HXD", "HXD_off");

      },//关
      function(){
        v3dApp.assignMat("GZ", "GZ_szb_on_tx");
        v3dApp.assignMat("HXD", "HXD_on");
      },//开
    ],
    2:[
      function(){
        v3dApp.assignMat("GZ", "GZ_ych_off_tx");
        v3dApp.assignMat("HXD", "HXD_off");
      },//关
      function(){
        v3dApp.assignMat("GZ", "GZ_ych_on_tx");
        v3dApp.assignMat("HXD", "HXD_on");
      },//开
    ],
  }
  //切换按钮
  var s = new Switch(5,JTs)
  
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

        closeLight()
        closeVoice()

    },
    4:function(){

      $("canvas").css({
        'opacity':0
      })

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

  }


  var currentMatIndex = 0
  //材质切换
  $buttonMat1.on("mouseup",function(){
    v3dApp.assignMat("GZ", "GZ_gtz_off_tx");
    v3dApp.assignMat("HG", "HG_nyj");
    v3dApp.assignMat("SG", "SG_nyj");
    currentMatIndex = 0
  })
  $buttonMat2.on("mouseup",function(){
    v3dApp.assignMat("GZ", "GZ_szb_off_tx");
    v3dApp.assignMat("HG", "HG_yyh");
    v3dApp.assignMat("SG", "SG_yyh");
    currentMatIndex = 1
  })
  $buttonMat3.on("mouseup",function(){
    v3dApp.assignMat("GZ", "GZ_ych_off_tx");
    v3dApp.assignMat("HG", "HG_bsh");
    v3dApp.assignMat("SG", "SG_bsh");

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

        },
        onClose:function(){

            closeLight()

        },

    })

    //抽屉 镜头3
    var button2 = new Button({

        buttonID:'panel3_btn2',
        // txtID:'s',
        txtID:'panel3_txt2',
        group:'panel3',
        onTouch:function(){

          closeVoice()
          closeLight()
          openDrawer()

        },
        onClose : function(){

            closeDrawer()

        }

    })

    //音响 镜头6
    var button3 = new Button({

        buttonID:'panel3_btn3',
        txtID:'panel3_txt3',
        group:'panel3',
        onTouch:function(){

            openVoice()
            closeLight()
            closeDrawer()

        },
        onClose : function(){

            closeVoice()

        },

    })

  function closeLight(){

    LIGHTs[ currentMatIndex ][0]()

  }

  function closeDrawer(){

      v3dApp.operateAnimation("PLAY", "chouti", null, null, 'LoopOnce', 1, function() {});
      v3dApp.operateAnimation("STOP", "chouti", null, null, 'LoopOnce', 1, function() {});

  }
  function closeVoice(){

      v3dApp.operateAnimation("PLAY", "YX", null, null, 'LoopOnce', 1, function() {})
      v3dApp.operateAnimation("STOP", "YX", null, null, 'LoopOnce', 1, function() {})
      music.pause()

  }

  function openLight(){

      v3dApp.tweenCamera("PhysCamera005", "PhysCamera005.Target", 1);
      LIGHTs[ currentMatIndex ][1]()

  }

  function openDrawer(){

      v3dApp.operateAnimation("PLAY", "chouti", null, null, 'LoopOnce', 1, function() {});
      v3dApp.tweenCamera("PhysCamera003", "PhysCamera003.Target", 1);

  }
  function openVoice(){

      music.play()
      v3dApp.tweenCamera("PhysCamera006", "PhysCamera006.Target", 1);
      v3dApp.operateAnimation("PLAY", "YX", null, null, 'LoopOnce', 1, function() {})

  }




// }()