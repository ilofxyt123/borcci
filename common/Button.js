~function( a ){

    function Button( options ){

        this.$el = $( "#" + options.buttonID )
        this.$el_active = this.$el.children(".active")
        this.$el_normal = this.$el.children(".normal")
        this.$txt = $( "#" + options.txtID )
        this.group = options.group//互斥的组
        this.index//按钮在当前组内的index

        this.isActive = false//状态

        this.onTouch = options.onTouch
        this.onClose = options.onClose

        this.bindEvent()
        this.init()

    }

    Button.prototype = {

        //注册GROUP
        init : function(){

            if ( Button.GROUP.hasOwnProperty( this.group ) == false ){

                Button.GROUP[ this.group ] = []

            }

            this.index = Button.GROUP[ this.group ].length
            Button.GROUP[ this.group ].push( this )

        },

        bindEvent : function(){

            var instance = this

            this.$el.on("mouseup",function(){

                if( instance.isActive ){

                    instance.close()

                }

                else{

                    instance.open()

                }

            })

        },

        open : function(){

            this.isActive = true
            this.$el_active.show()
            this.$el_normal.hide()
            this.$txt.show()

            //先把另一个按钮关了
            if( Button.NOWGROUP != '' ){

                Button.GROUP[ Button.NOWGROUP ][ Button.ActiveIndex ].close()

            }

            //记录当前按钮的group
            Button.NOWGROUP = this.group
            //记录当前按钮的Index
            Button.ActiveIndex = this.index

            this.onTouch()

        },

        //需要实例后期调用
        close : function(){

            this.isActive = false
            this.$el_active.hide()
            this.$el_normal.show()
            this.$txt.hide()

            Button.NOWGROUP = ''
            Button.ActiveIndex = ''

            this.onClose()

        }

    }

    Button.NOWGROUP = '';//当前组名
    Button.ActiveIndex = '';//当前组激活的按钮
    Button.GROUP = {}//分组的所有按钮

    a.Button = Button

}( window )