//菜单按钮
function Switch( number, JTs ){

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

  this.bindEvent()

}

Switch.prototype = {

  switchTab : function( index ){
console.log(index)
    //记录页面
    this.currentPanel = index
    this.currentIndex = index - 1 

    //indicator样式切换
    this.$allInner.hide()
    $("#point" + index).children(".inner").show() 

    //panel切换
    this.$allPanel.hide()
    $("#panel" + index ).show()


    if( this.callbacks.hasOwnProperty( index )){

      this.callbacks[ index ]()

    }
    else{

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

      this.$button.on("touchend",function( e ){

        var index = e.currentTarget.dataset['index']
        
        scope.switchTab( index )

      })

      //下一个
      this.$buttonNext.on("touchend",function(){

        if( scope.currentPanel == 4 ){

          return

        }
        var index = scope.currentPanel + 1
        scope.switchTab( index )

      })

      //上
      this.$buttonPrev.on("touchend",function(){

        if( scope.currentPanel == 1 ){

          return

        }
        var index = scope.currentPanel - 1
        scope.switchTab( index )
        
      })





  },

}
