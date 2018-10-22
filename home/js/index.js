~function(){

    var $home_btn1 = $("#btn1")
    var $home_btn2 = $("#btn2")
    var $home_btn3 = $("#btn3")
    var $home_btn4 = $("#btn4")

   var router = new Router()

    //首页按钮
    //时光印象
    $home_btn1.on("mouseup",function(){

        router.to( 1 )

    })

    //忆江南
    $home_btn2.on("mouseup",function(){

        router.to( 2 )

    })


    //晚堂香
    $home_btn3.on("mouseup",function(){

        router.to( 3 )

    })


    //中国禅
    $home_btn4.on("mouseup",function(){

        router.to( 4 )

    })

}()