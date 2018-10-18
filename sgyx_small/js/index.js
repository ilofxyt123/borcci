~function(){

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
        v3dApp.assignMat("GuiZi", "GZ_gtz_gd");
        v3dApp.assignMat("HXD", "HXDG");
      },//关
      function(){
        v3dApp.assignMat("GuiZi", "GZ_gtz_kd");
        v3dApp.assignMat("HXD", "HXDK");
      },//开
    ],
    1:[
      function(){
        v3dApp.assignMat("GuiZi", "GZ_szb_gd");
        v3dApp.assignMat("HXD", "HXDG");

      },//关
      function(){
        v3dApp.assignMat("GuiZi", "GZ_szb_kd");
        v3dApp.assignMat("HXD", "HXDK");
      },//开
    ],
    2:[
      function(){
        v3dApp.assignMat("GuiZi", "GZ_ych_gd");
        v3dApp.assignMat("HXD", "HXDG");
      },//关
      function(){
        v3dApp.assignMat("GuiZi", "GZ_ych_kd");
        v3dApp.assignMat("HXD", "HXDK");
      },//开
    ],
  }
  //切换按钮
  var s = new Switch(5,JTs)
  
  s.callbacks = {
    1:function(){

        closeLight()
        closeVoice()

    },
    2:function(){

        closeLight()
        closeVoice()

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
  $buttonMat1.on("touchend",function(){
    v3dApp.assignMat("GuiZi", "GZ_gtz_gd");
    v3dApp.assignMat("HengGui", "HG_nyj");
    v3dApp.assignMat("ShuGui", "SG_nyj");
    currentMatIndex = 0
  })
  $buttonMat2.on("touchend",function(){
    v3dApp.assignMat("GuiZi", "GZ_szb_gd");
    v3dApp.assignMat("HengGui", "HG_yyh");
    v3dApp.assignMat("ShuGui", "SG_yyh");
    currentMatIndex = 1
  })
  $buttonMat3.on("touchend",function(){
    v3dApp.assignMat("GuiZi", "GZ_ych_gd");
    v3dApp.assignMat("HengGui", "HG_bsh");
    v3dApp.assignMat("ShuGui", "SG_bsh");

    currentMatIndex = 2

  })

  var lightStatus = 0//默认是关着的灯
  var voiceStatus = 0//默认是关着的音响
  $buttonLight.on("touchend",function(){

    if( lightStatus == 0 ){

      closeVoice()
      openLight()

    }
    else{

      closeLight()

    }



    LIGHTs[ currentMatIndex ][ lightStatus ]()

  })

  $buttonVoice.on("touchend",function(){

    if( voiceStatus == 0 ){

      closeLight()
      openVoice()

    }
    else{

      closeVoice()

    }
  })

  function closeLight(){
    lightStatus = 0//关buttonLight
      $(".button1 .normal").show()
      $(".button1 .active").hide()
      $(".txt_light").hide()
      $(".txt_init").show()
  }
  function closeVoice(){
    voiceStatus = 0//关buttonLight
      $(".button2 .normal").show()
      $(".button2 .active").hide()
      $(".txt_voice").hide()
      $(".txt_init").show()
      music.pause()
  }
  function openLight(){
      lightStatus = 1//开
      v3dApp.tweenCamera("PhysCamera005", "PhysCamera005.Target", 1);
      $(".button1 .normal").hide()
      $(".button1 .active").show()
      $(".txt_group img").hide()
      $(".txt_light").show()
  }
  function openVoice(){
    voiceStatus = 1//开
      v3dApp.tweenCamera("PhysCamera006", "PhysCamera006.Target", 1);
      $(".button2 .normal").hide()
      $(".button2 .active").show()
      $(".txt_group img").hide()
      $(".txt_voice").show()
      music.play()
  }




}()