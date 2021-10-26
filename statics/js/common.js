var tme={};
tme.init=$(function(){

    var browser = (function(){
        var ua = window.navigator.userAgent.toLowerCase(), sys = null, s;
        if(s = ua.match(/rv:([\d.]+)\) like gecko/)){sys = {type:'ie',version:s[1]};}
        else if(s = ua.match(/msie ([\d.]+)/)){sys = {type:'ie',version:s[1]};}
        else if(s = ua.match(/firefox\/([\d.]+)/)){sys = {type:'firefox',version:s[1]};}
        else if(s = ua.match(/chrome\/([\d.]+)/)){sys = {type:'chrome',version:s[1]};}
        else if(s = ua.match(/opera.([\d.]+)/)){sys = {type:'opera',version:s[1]};}
        else if(s = ua.match(/version\/([\d.]+).*safari/)){sys = {type:'safari',version:s[1]};}
        else if(s = ua.match(/ucbrowser\/([\d.]+)/)){sys = {type:'uc',version:s[1]};}
        else if(s = ua.match(/micromessenger\/([\d.]+)/)){sys = {type:'wx',version:s[1]};}
        else{sys = {type:'unknown',version:'unknown'};}
        sys.isMobile = !!ua.match(/AppleWebKit.*Mobile.*!/) || !!ua.match(/(iPhone|iPod|Android|ios|iPad)/i);
        return sys;
    })();

    /*检测IE*/
    if(browser.type =="ie" && browser.version < 8){
        location.href="http://www.jltech.cn/upgradeBrowser/";
    }

    /*判断谷歌27*/
    if(browser.type == 'chrome' && browser.version <= 27){
        $('.font_scale8, .font_scale10').addClass('font_adjust');
    }


    tme.fnnav();
    tme.fnSelect();

    $('#menu').mmenu();
})


$(document).ready(tme.init);

// $(document).ready(function () {
//     $('[data-toggle="tooltip"]').tooltip();
// })

$(function () {
    $('[data-toggle="tooltip"]').tooltip({
        html:true,
        delay:200,
        trigger:'hover'
    });
})

tme.fnSelect=function(){
    $(".fTop .select").each(function(){
        var s=$(this);
        var z=parseInt(s.css("z-index"));
        var dt=$(this).children("dt");
        var dd=$(this).children("dd");
        var _show=function(){dd.slideDown(200);dt.addClass("cur");s.css("z-index",z+1);};   //展开效果
        var _hide=function(){dd.slideUp(200);dt.removeClass("cur");s.css("z-index",z);};    //关闭效果
        dt.click(function(){dd.is(":hidden")?_show():_hide();});
        dd.find("a").click(function(){dt.html($(this).html());_hide();});     //选择效果（如需要传值，可自定义参数，在此处返回对应的“value”值 ）
        $("body").click(function(i){ !$(i.target).parents(".select").first().is(s) ? _hide():"";});
    })
}


tme.fnnav=function(){

    var liL = 0,        // li的长度
        subW = 0,       // navSub的宽度
        padLeft = 0,    // 左侧内边距
        liW = 0,        // li的宽度
        subWArr=[];
    $(".pcNav li.nLi").each(function(){
        if($(this).find('.navSub ul').length){
            liL = $(this).position().left;
            liW = $(this).width();
            subW = $(this).find('.navSub ul').width();
            subWArr.push(subW);
            padLeft = liL - (subW - liW)/2;
            $(this).find('.navSub ul').css({'paddingLeft': padLeft +'px'});
        }
    });

    $('.pcNav li.nLi .navSub').css({'display': 'none'}).removeClass('hide');


    function fnnav(el){
        $(el).css({"opacity":"1","height":"auto"});
    }

    $(".pcNav ul .nLi").hover(function(){
        $(this).find(".navSub").stop().slideDown(300,function(){
            fnnav(this);
        })
    },function(){
        $(this).find(".navSub").stop().fadeOut(300,function(){
            fnnav(this);
        })
    });
    $(".pcNav ul .nLi .navSub").hover(function(){
        fnnav(this);
    })

    var navAnimate = new TimelineMax();
    var onW= 0,
        onL = 0,
        onMl = 0,
        w= 0,
        l = 0,
        ml =0,
        timer=null;


    $(window).resize(function(){
        clearTimeout(timer);
        timer = setTimeout(function(){
            onW = $('.pcNav li.nLi.on').find("a").width();
            onL = $('.pcNav li.nLi.on').position().left;
            onMl = $('.pcNav li.nLi.on').find("a").css("marginLeft");

            navAnimate.clear();
            navAnimate.to(".header .pcNav .navLine",0.4,{opacity:1,left:onL,width:onW,marginLeft:onMl});
            var i=0;
            $(".pcNav li.nLi").each(function(){
                var _this = $(this);
                if($(this).find('.navSub ul').length){
                    liL = $(_this).position().left;
                    liW = $(_this).width();
                    subW = subWArr[i];
                    i++;
                    padLeft = liL - (subW - liW)/2;
                    $(_this).find('.navSub ul').css({'paddingLeft': padLeft +'px'});
                }
            });

        },250);

    })


    $(".pcNav li.nLi").bind("mouseenter",function(){
        if(!$(this).hasClass('on')){
            w = $(this).find("a").width();
            l = $(this).position().left;
            ml=$(this).find("a").css("marginLeft");
            navAnimate.clear();
            navAnimate.to(".header .pcNav .navLine",0.4,{opacity:1,left:l,width:w,marginLeft:ml});
        }
    });

    $(".pcNav li.nLi").bind("mouseleave",function(){
        navAnimate.clear();
        navAnimate.to(".header .pcNav .navLine",0.4,{opacity:1,left:onL,width:onW,marginLeft:onMl});
    });


}



// 加入收藏和设为首页用法
// <a href="javascript:void(0)" onclick="shoucang(document.title,window.location)">加入收藏</a>
// <a href="javascript:void(0)" onclick="SetHome(this,window.location)">设为首页</a>

// 设置为主页

function SetHome(obj,vrl){
    try{
        obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl);
    }
    catch(e){
        if(window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            }
            catch (e) {
                alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
            }
            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
            prefs.setCharPref('browser.startup.homepage',vrl);
        }else{
            alert("您的浏览器不支持，请按照下面步骤操作：1.打开浏览器设置。2.点击设置网页。3.输入："+vrl+"点击确定。");
        }
    }
}

function shoucang(sTitle,sURL)
{
    try
    {
        window.external.addFavorite(sURL, sTitle);
    }
    catch (e)
    {
        try
        {
            window.sidebar.addPanel(sTitle, sURL, "");
        }
        catch (e)
        {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}



