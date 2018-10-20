// ~function(){

  //材质按钮
  var $buttonMat1 = $("#btn1")
  var $buttonMat2 = $("#btn2")
  var $buttonMat3 = $("#btn3")
  var $buttonMat4 = $("#btn4")
  var $buttonMat5 = $("#btn5")
  var $buttonMat6 = $("#btn6")

  //panel2
  var $panel2_btn1 = $("#panel2_btn1")
  var $panel2_btn2 = $("#panel2_btn2")
  var $panel2_btn3 = $("#panel2_btn3")

  //panel3
  var $panel3_btn1 = $("#panel3_btn1")
  var $panel3_btn2 = $("#panel3_btn2")

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
      v3dApp.tweenCamera("PhysCamera003", "PhysCamera005.Target", 1);
    },
    function(){
      v3dApp.tweenCamera("PhysCamera004", "PhysCamera004.Target", 1);
    },
    function(){
      v3dApp.tweenCamera("PhysCamera006", "PhysCamera006.Target", 1);
    },
  ]

  //panel2按钮切换
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
  //panel2按钮切换

  //切换panel
  var s = new Switch(5,JTs)
  s.callbacks = {
    1:function(){

    },
    2:function(){


    },
    3:function(){


    },
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
    v3dApp.assignMat("GuiZi_Z", "GuiZi_Z_chabai");
    v3dApp.assignMat("GuiZi_Znei", "GuiZi_Znei_chabai");
    v3dApp.assignMat("DiX", "DiX_chabai");
    currentMatIndex = 0
  })
  $buttonMat2.on("touchend",function(){
    v3dApp.assignMat("GuiZi_Z", "GuiZi_Z_wahui");
    v3dApp.assignMat("GuiZi_Znei", "GuiZi_Znei_wahui");
    v3dApp.assignMat("DiX", "DiX_wahui");
    currentMatIndex = 1
  })
  $buttonMat3.on("touchend",function(){
    v3dApp.assignMat("GuiZi_Z", "GuiZi_Z_zise");
    v3dApp.assignMat("GuiZi_Znei", "GuiZi_Znei_zise");
    v3dApp.assignMat("DiX", "DiX_zise");
    currentMatIndex = 2
  })
  $buttonMat4.on("touchend",function(){
    v3dApp.assignMat("GuiZi_Y", "GuiZi_Y_putiz");
    v3dApp.assignMat("GuiZi_Ynei", "GuiZi_Ynei_putiz");
    v3dApp.assignMat("DiD", "DiD_putiz");
    currentMatIndex = 3
  })
  $buttonMat5.on("touchend",function(){
    v3dApp.assignMat("GuiZi_Y", "GuiZi_Y_guiyujin");
    v3dApp.assignMat("GuiZi_Ynei", "GuiZi_Ynei_guiyujin");
    v3dApp.assignMat("DiD", "DiD_guiyujin");
    currentMatIndex = 4
  })
  $buttonMat6.on("touchend",function(){
    v3dApp.assignMat("GuiZi_Y", "GuiZi_Y_jiahuah");
    v3dApp.assignMat("GuiZi_Ynei", "GuiZi_Ynei_jianghuah");
    v3dApp.assignMat("DiD", "DiD_jianghuah");
    currentMatIndex = 5
  })

  function BBB( options ){

    this.$el = $( "#" + options.buttonID )
    this.$el_active = this.$el.children(".active")
    this.$el_normal = this.$el.children(".normal")
    this.$txt = $( "#" + options.txtID )
    this.group = options.group//互斥的组
    this.index//按钮在当前组内的index

    this.isActive = false//状态

    this.onTouch = options.onTouch

    this.bindEvent()
    this.init()

  }

  BBB.prototype = {

    //注册GROUP
    init : function(){

      if ( BBB.GROUP.hasOwnProperty( this.group ) == false ){

          BBB.GROUP[ this.group ] = []

      }

      this.index = BBB.GROUP[ this.group ].length
      BBB.GROUP[ this.group ].push( this )

    },

    bindEvent : function(){

      var instance = this

      this.$el.on("touchend",function( e ){

        if( instance.isActive ){

          return

        }

        else{

            instance._open()
            instance.onTouch( e )

            //先把另一个按钮关了
            if( BBB.NOWGROUP != '' ){

              BBB.GROUP[ BBB.NOWGROUP ][ BBB.ActiveIndex ].close()

            }


            //记录当前按钮的group
            BBB.NOWGROUP = instance.group
            //记录当前按钮的Index
            BBB.ActiveIndex = instance.index

        }

      })

    },

    _open : function(){

      this.isActive = true
      this.$el_active.show()
      this.$el_normal.hide()
      this.$txt.show()

    },
      
    //需要实例后期调用
    close : function(){

      this.isActive = false
      this.$el_active.hide()
      this.$el_normal.show()
      this.$txt.hide()

    }

  }

  BBB.NOWGROUP = '';//当前组名
  BBB.ActiveIndex = '';//当前组激活的按钮
  BBB.GROUP = {}//分组的所有按钮


//门镜头1
  var button1 = new BBB({

      buttonID:'panel2_btn1',
      txtID:'panel2_txt1',
      group:'panel2',
      onTouch:function(){

          v3dApp.tweenCamera("PhysCamera007", "PhysCamera007.Target", 1);

      },

  })

  //桌子镜头3
  var button2 = new BBB({

      buttonID:'panel2_btn2',
      txtID:'panel2_txt2',
      group:'panel2',
      onTouch:function(){

          v3dApp.tweenCamera("PhysCamera003", "PhysCamera003.Target", 1);

      },

  })

//吊柜镜头6
  var button3 = new BBB({

      buttonID:'panel2_btn3',
      txtID:'panel2_txt3',
      group:'panel2',
      onTouch:function(){

        v3dApp.tweenCamera("PhysCamera006", "PhysCamera006.Target", 1);

      },

  })

  var button4 = new BBB({

      buttonID:'panel3_btn1',
      txtID:'panel3_txt1',
      group:'panel3',
      onTouch:function(){

        v3dApp.tweenCamera("PhysCamera004", "PhysCamera004.Target", 1);

      },

  })

//酒柜镜头5
  var button5 = new BBB({

      buttonID:'panel3_btn2',
      txtID:'panel3_txt2',
      group:'panel3',
      onTouch:function( e ){

        v3dApp.tweenCamera("PhysCamera005", "PhysCamera005.Target", 1);

      },

  })

// }()