//菜单按钮
function Switch( number, JTs, hidePanel ){

  this.currentIndex = 0//index
  this.currentPanel = this.currentIndex + 1//面板,默认在第一页

  this.$button = $(".point")//所有可操作的indicator
  this.$allInner = $(".inner")//所有indicator内部小圆点
  this.$allPanel = $(".panel")//所有panel
  this.$buttonNext = $("#next")//下一个
  this.$buttonPrev = $("#prev")//上一个
  this.number = number ? number : this.$allInner.length
  this.JTs = JTs
  this.callbacks = {}//镜头回调
    this.onLeaves = {}
    hidePanel = hidePanel ? hidePanel : [4,5]
    this.hidePanel = hidePanel//需要隐藏canvas的页面

  this.bindEvent()

}

Switch.prototype = {

  switchTab : function( index ){

    //记录页面
    this.currentPanel = index
    this.currentIndex = index - 1

    //indicator样式切换
    this.$allInner.hide()
    $("#point" + index).children(".inner").show() 

    //panel切换
    this.$allPanel.hide()
    $("#panel" + index ).show()

    if(this.callbacks.hasOwnProperty( index )){

        this.callbacks[ index ]()

    }
    var needShow = true//需要显示

      for( var i = 0, il = this.hidePanel.length; i < il; i ++ ){

            if( this.hidePanel[ i ] == index ){

                needShow = false

            }

      }

        if( needShow ){

            $("canvas").css({
                'opacity':1,
            })

        }


    //镜头切换
    if( this.JTs.length >= index ){

      this.JTs[ index-1 ]()

    }

  },

  next : function(){



  },

  prev : function(){

  },

  bindEvent : function(){

      var scope = this

      this.$button.on("mouseup",function( e ){

        var index = e.currentTarget.dataset['index']

          index = Number( index )

        scope.switchTab( index )

      })

      //下一个
      this.$buttonNext.on("mouseup",function(){

        if( scope.currentPanel == scope.number ){

          return

        }

        var nowIndex = scope.currentPanel
          if(scope.onLeaves.hasOwnProperty(nowIndex)){
              scope.onLeaves[ nowIndex ]()
          }


        var nextIndex = Number( scope.currentPanel ) + 1

        scope.switchTab( nextIndex )

      })

      //上
      this.$buttonPrev.on("mouseup",function(){

        if( scope.currentPanel == 1 ){

          return

        }
          var nowIndex = scope.currentPanel
          if(scope.onLeaves.hasOwnProperty(nowIndex)){
              scope.onLeaves[ nowIndex ]()
          }
        var nextIndex = Number ( scope.currentPanel ) - 1
        scope.switchTab( nextIndex )
        
      })





  },

}
