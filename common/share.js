function initWxShare(){

    var shareDatas = {
        title:"柏厨H6三维展厅",
        desc: "中国人的品质厨房",
        link: "http://h5.clevermonkey.cn/borcci/home/index.html",
        imgUrl: "http://h5.clevermonkey.cn/borcci/assets/common/share.jpg",
        success: function () {
            console.log('分享成功')
        },
        cancel: function () {
            console.log('取消分享')
        }
    };

    $.ajax({
        type: "post",
        url: "http://h5.clevermonkey.cn/api/zh/jssdk.php",
        dataType: 'json',
        data: {
            url: window.location.href
        },
        success: function (data) {

            wx.config({
                debug: false,
                appId: data.appid,
                timestamp: data.timestamp,
                nonceStr: data.noncestr,
                signature: data.signature,
                jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'hideMenuItems'
                ]
            })

            wx.ready(function () {
                wx.checkJsApi({
                    jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'hideMenuItems',
                        'updateAppMessageShareData',
                        'updateTimelineShareData',
                    ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                    success: function(res) {
                        console.log(res)
                        // 以键值对的形式返回，可用的api值true，不可用为false
                        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                    }
                });
                // wx.onMenuShareTimeline(shareDatas);
                // wx.onMenuShareAppMessage(shareDatas);
                wx.updateAppMessageShareData(shareDatas, function(res) {
                  console.log(res)
                });
                wx.updateTimelineShareData(shareDatas, function(res) {
                    console.log(res)
                });
                wx.hideMenuItems({
                    menuList: [
                        'menuItem:share:qq',
                        'menuItem:share:weiboApp',
                        'menuItem:favorite',
                        'menuItem:share:facebook',
                        'menuItem:copyUrl',
                        'menuItem:readMode',
                        'menuItem:openWithQQBrowser',
                        'menuItem:openWithSafari'
                    ]
                });
            })
            wx.error(function (res) {
                // alert(res)
            })
        },
        error: function (xhr, ajaxOptions, thrownError) {
            // alert("Http status: " + xhr.status + " " + xhr.statusText + "\najaxOptions: " + ajaxOptions + "\nthrownError:" + thrownError + "\n" + xhr.responseText);
        }
    })
}
initWxShare()

