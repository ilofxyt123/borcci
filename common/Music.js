// TypeScript file
function Music( option ){

    var config = {
        AudioID:'',buttonClass:'',buttonAnimateClass:''
    }
    $.extend( config, option )

    this.audio = document.getElementById( config.AudioID )
    this.$button = $( config.buttonClass )
    this.buttonAnimateClass = config.buttonAnimateClass

    this.audio//音乐dom实例
    this.isPlay = false//播放标志
    this.$button//按钮jQ实例
    this.buttonAnimateClass = ''

    //微信端处理
    this.haveInit = false//是否初始化

    this.init()//初始化
    this.bindEvent()//绑定按钮事件
}
Music.prototype = {

    //微信端初始化
    init : function(){

        var scope = this
        if( Music.isWeiXin ){

            if( "WeixinJSBridgeReady" in window ){

                document.addEventListener("WeixinJSBridgeReady",function(){

                    scope.audio.load()
                    scope.haveInit = true

                },false)

            }
            else{



            }

        }

        else{

            //微信之外的环境

        }

    },

    play : function(){

        var scope = this

        if( Music.isWeiXin ){

            if( window['WeixinJSBridge'] ){

                //错过了JSBridge事件，需要调用其他接口播放音频
                WeixinJSBridge.invoke("getNetworkType", {},function(){
                    scope.audio.play()
                    scope.$button.addClass( scope.buttonAnimateClass )
                    scope.isPlay = true
                })

            }
            else{

                var c = setInterval(function(){

                    if( window['WeixinJSBridge'] ){

                        WeixinJSBridge.invoke("getNetworkType", {},function() {
                            scope.audio.play()
                            scope.$button.addClass( scope.buttonAnimateClass )
                            scope.isPlay = true
                        })

                        clearInterval( c )
                    }

                },50)

            }


        }
        else{

            try{
                PALifeOpen.getDeviceID(function(){

                    scope.audio.play()
                    scope.$button.addClass( scope.buttonAnimateClass )
                    scope.isPlay = true

                },function( err ) {

                })
            }
            catch( e ){

                scope.audio.play()
                scope.$button.addClass( scope.buttonAnimateClass )
                scope.isPlay = true

            }

        }

    },
    replay : function(){

        this.audio.currentTime = 0
        this.play()

    },

    pause : function(){

        this.audio.pause()
        this.$button.removeClass( this.buttonAnimateClass )
        this.isPlay = false

    },

    bindEvent : function(){

        this.$button.on("mouseup",function() {

            if( this.isPlay ){
                this.pause()
            }
            else{
                this.play()
            }

        })

    }

}
Music.isWeiXin = (function(){

    var ua = navigator.userAgent
    var result = ua.match(/MicroMessenger/i)
    return result

})()