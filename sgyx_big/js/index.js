~function(){

  //材质按钮
  var $buttonMat1 = $("#btn1")
  var $buttonMat2 = $("#btn2")
  var $buttonMat3 = $("#btn3")

  //灯光按钮
  var $buttonLight = $("#buttonLight")
  var $buttonVoice = $("#buttonVoice")

    //菜单按钮
  var router = new Router()

  //镜头切换
  var JTs = [
    function(){
      v3dApp.tweenCamera("PhysCamera007", "PhysCamera007.Target", 1);
    },
    function(){
      v3dApp.tweenCamera("PhysCamera002", "PhysCamera002.Target", 1);
    },
    function(){
      v3dApp.tweenCamera("PhysCamera003", "PhysCamera003.Target", 1);
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
      },//关
      function(){
        v3dApp.assignMat("TZ", "TZ_nyj_on");
      },//开
    ],
    1:[
      function(){
        v3dApp.assignMat("TZ", "TZ_yyh_off");
      },//关
      function(){
        v3dApp.assignMat("TZ", "TZ_yyh_on");
      },//开
    ],
    2:[
      function(){
        v3dApp.assignMat("TZ", "TZ_bsh_off");
      },//关
      function(){
        v3dApp.assignMat("TZ", "TZ_bsh_on");
      },//开
    ],
  }
  //切换按钮
  var s = new Switch(5,JTs)
  s.callbacks = {
    
    4:function(){
      $("canvas").css({
        'opacity':0
      })
    },
    5:function(){
      $("canvas").css({
        'opacity':0
      })
    },

  }

  
  var currentMatIndex = 0
  //材质切换
  $buttonMat1.on("touchend",function(){
    v3dApp.assignMat("GZ", "GZ_gtz_tex");
    v3dApp.assignMat("TZ", "TZ_nyj_off");
    currentMatIndex = 0
  })
  $buttonMat2.on("touchend",function(){
    v3dApp.assignMat("GZ", "GZ_szb_tex");
    v3dApp.assignMat("TZ", "TZ_yyh_off");
    currentMatIndex = 1
  })
  $buttonMat3.on("touchend",function(){
    v3dApp.assignMat("GZ", "GZ_ych_tex");
    v3dApp.assignMat("TZ", "TZ_bsh_off");
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
  }
  function openLight(){
      lightStatus = 1//开
      $(".button1 .normal").hide()
      $(".button1 .active").show()
      $(".txt_group img").hide()
      $(".txt_light").show()
  }
  function openVoice(){
    voiceStatus = 1//开
      $(".button2 .normal").hide()
      $(".button2 .active").show()
      $(".txt_group img").hide()
      $(".txt_voice").show()
  }




}()