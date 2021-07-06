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

})


$(document).ready( tme.init );

tme.fnnav=function(){

    var liL = 0,
        subW = 0,
        padLeft = 0,
        liW = 0,
        subWArr=[];
    $(".pcNav li.nLi").each(function(){
        if($(this).find('.navSub ul').length){
            liL = $(this).position().left;
            liW = $(this).width();
            subW = $(this).find('.navSub ul').width();
            subWArr.push(subW);
            padLeft = 650;
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
    onW = $('.pcNav li.nLi.on').find("a").width();
    onL = $('.pcNav li.nLi.on').position().left;
    onMl = $('.pcNav li.nLi.on').find("a").css("marginLeft");

    navAnimate.clear();
    navAnimate.to(".header .pcNav .navLine",0.4,{opacity:1,left:onL,width:onW,marginLeft:onMl});



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
