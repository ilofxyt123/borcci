//菜单按钮
function Router(){

    this._menuClose = true//菜单开关状态

    this.$menu = $("#menu")//菜单按钮jq
    this.$logo = $("#logo")//logo jq

    this.$page1 = $("#page1")//首页jq
    this.$pageMenu = $("#pageMenu")//菜单页面jq
    this.$pageSecond = $("#pageSecond")//时光印象二级导航jq

    this.$menu1 = $("#menu1")
    this.$menu2 = $("#menu2")
    this.$menu3 = $("#menu3")
    this.$menu4 = $("#menu4")

    this.$small = $("#small")
    this.$big= $("#big")



    this._record = [ this.$page1 ]//记录当前页面,默认在首页

    this.bindEvent()

}

Router.prototype = {

    _openMenu : function(){

        this._menuClose = false
        this.$pageMenu.show()
        this.$logo.hide()

    },

    _closeMenu : function(){

        this._menuClose = true
        this.$pageMenu.hide()
        this.$logo.show()

    },

    openPageSecond : function(){

        this.$pageSecond.show()
        this._record[0] = this.$pageSecond

    },

    to : function( index ){

        var scope = this

        switch( index ){

            case 1:
                scope.closePage1()
                scope._closeMenu()
                scope.openPageSecond()
                scope.$logo.hide()
                break;
            case 2:
                window.location.href = ""
                break;
            case 3:
                window.location.href = ""
                break;
            case 4:
                window.location.href = ""
                break;
        }

    },

    closePageSecond : function(){

        this.$pageSecond.hide()

    },

    openPage1 : function(){

        this.$page1.show()
        this._record[0] = this.$page1

    },

    closePage1 : function(){

        this.$page1.hide()

    },

    bindEvent : function(){

        var scope = this

        //菜单按钮
        this.$menu.on("touchend",function(){

            if( scope._menuClose ){

                scope._openMenu()
                scope._record[0].hide()

            }
            else{

                scope._closeMenu()
                scope._record[0].show()

            }

        })


        //导航栏按钮
        //时光印象
        this.$menu1.on("touchend",function(){

            scope.to( 1 )

        })

        //忆江南
        this.$menu2.on("touchend",function(){

            scope.to( 2 )

        })


        //晚堂香
        this.$menu3.on("touchend",function(){

            scope.to( 3 )

        })


        //中国禅
        this.$menu4.on("touchend",function(){

            scope.to( 4 )

        })

        this.$small.on("touchend",function(){

            window.location.href = '../sgyx_small/index.html'

        })

        this.$big.on("touchend",function(){

            window.location.href = '../sgyx_big/index.html'

        })





    },

}
