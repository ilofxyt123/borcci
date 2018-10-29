/**
 * Created by Z on 2017/6/21.
 */
( function() {

    var long,short

    var isHP = false
    var initSize = function() {

        var standard  = 640;

        var _width    = window.innerWidth;
        var _height   = window.innerHeight;

        //横屏的standard
        if( _width >= _height ){

            standard = 1136
            //pc不处理
            if( _width < 900 ){
                isHP = true
            }

            long = _width
            short = _height


        }
        //竖屏的standard
        else {

            long = _height
            short = _width

            standard = 640
            isHP = false



        }
        var size = ( _width / standard ) * 100;
        window.size = size
        document.documentElement.style.fontSize = size + 'px';

    };
    var detectHP = function(){

        if(isHP){
            document.getElementById('hp').style.display = 'block'
        }
        else{
            document.getElementById('hp').style.display = 'none'
        }

    }

    var setSize = function(){
        document.documentElement.style.fontSize = short + 'px';
    }


    initSize()
    window.detectHP = detectHP

    window.addEventListener( "resize", function(){

        //pc
        if( window.innerWidth > 900 ){
            initSize()
        }


    } )
    window.addEventListener("orientationchange",function () {

        //只处理移动端
        if( window.innerWidth < 900){
            isHP = !isHP
        }
        detectHP()

        
    })



} )();