//公共处理函数库
var Func = {
    //顶部提示
    showAlert:function(msg,type){
        $(".wx-tooltip").remove();
        var className;
        var alert = $('.wx-tooltip')[0];
        if (type == undefined) {
            className = 'wx-tooltip danger';
        } else {
            className = 'wx-tooltip' + ' ' + type;
        }
        if (alert == undefined) {
            $('body').append('<div class="wx-tooltip" id="alert"><p class="wx-tooltip-content"></p><span class="iconfont icon-close"></span></div>');
            alert = $('.wx-tooltip')[0];
            if ($(".fri-content-nav").length > 0) {
                $(".wx-tooltip").css("top", "50px")
            }
        }
        var $alert = $(alert);
        $alert.removeClass().addClass(className);
        $alert.children('.wx-tooltip-content').html(msg);
        $alert.removeClass('tooltip-fadeOutUp').show().addClass('tooltip-fadeInDown animated');
        $alert.children('.iconfont').bind('click', function (event) {
            $alert.removeClass('tooltip-fadeInDown').addClass('tooltip-fadeOutUp animated');
            setTimeout(function () {
                $alert.hide();
            }, 500)
        });
        setTimeout(function () {
            $alert.removeClass('tooltip-fadeInDown').addClass('tooltip-fadeOutUp animated');
            setTimeout(function () {
                $alert.hide();
            }, 500)
        }, 2000);
    },
    //输入认证
    validate:function(input){
        var rule = $(input).data("rule");
        var value = $(input).val().replace(/\s/g, '');
        var tips = $(input).data("tip");
        var tipText = $("[data-validate='"+$(input).attr("id")+"']");
        var rules = {
            "require": {
                validate: function (value) {
                    var isValid = /^\S/.test(value);
                    if (isValid) {
                        tipText.hide();
                        $(input).parent().removeClass("has-error");
                        return true;
                    } else {
                        $(input).focus().parent().addClass("has-error");
                        !!tipText[0] && tipText.text(!!tips ? tips : "输入不能为空");
                        tipText.show();
                        return false;
                    }
                }
            },
            "phone":{
                validate:function(value){
                    var isValid = /^1\d{10}$/.test(value);
                    if(isValid){
                        tipText.hide();
                        $(input).parent().removeClass("has-error");
                        return true;
                    }else{
                        $(input).focus().parent().addClass("has-error");
                        !!tipText[0] && tipText.text(!!tips ? tips : "请输入正确的手机号");
                        tipText.show();
                        return false;

                    }
                }
            },
            'password': {
                validate: function (value) {
                    var isValid = (/^[\w~!@#$%^&*?]{8,20}$/).test(value);
                    if(isValid){
                        tipText.hide();
                        $(input).parent().removeClass("has-error");
                        return true;
                    }else{
                        $(input).focus().parent().addClass("has-error");
                        !!tipText[0] && tipText.text(!!tips ? tips : "密码长度须在8-20之间，只能包含字母、数字和特殊字符");
                        tipText.show();
                        return false;
                    }
                }
            }
        }
        return rules[rule].validate(value);
    },
    //判断是否来自微信
    isFromWeixin:function(){
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    },
    //如果不传参时返回Url中的所有参数
    getUrlParam:function(){
        var result = {};
        var search = [];
        var search = location.search.slice(1).split("&");
        var secArray=[]
        for(var i =0;i<search.length;i++){
            secArray = search[i].split("=");
            if(secArray[0]!=''){
                result[secArray[0]] = secArray[1];
            }
        }
        if(arguments[0]!=undefined){
            return  result[arguments[0]];
        }else{
            return result;
        }
    },
    //重置Url参数，并将Url返回
    setUrlparam:function(key,value){
        var urlParam = getUrlParam();
        if(typeof key =="object"){
            for(var item in key){
                isLoad = (urlParam[item] != key[item]);
                urlParam[item] = key[item];
            }
        }else{
            isLoad = (urlParam[key] != value);
            urlParam[key] = value;
        };
        var search = "?";
        for(var item in urlParam){
            if(urlParam[item] === undefined){
                search+=item+"&";
            }else{
                search+=item+"="+urlParam[item]+"&";
            }
        }
        search = search.slice(0,search.length-1);
        var returnUrl=''
        if(location.href.indexOf("?")>-1){
            returnUrl = location.href.slice(0, location.href.indexOf("?")) + search;
        }else{
            returnUrl = location.href +search;
        }
        return returnUrl;
    },
    checkInputList:function(btn){
        var baseInputList = $(btn).data("base").split(",");
        var check = true;
        //前端验证输入
        baseInputList.forEach(function(id){
            check = check && Func.validate($("#"+id)[0])
        });
        return check
    },
    formatMobile:function(phone){
        if(phone.length == 11){
            return phone.substr(0,3)+"*****"+phone.substr(7)
        }
        return phone;
    }
};
(function ($) {
    var _w = $(window).height();
    var panelOnePosition = $("#header").height()+$("#banner").height()
    var panelOneAnimated = false;
    console.log(panelOnePosition)
    var Controller = function(){
        this.$DrawBtnGroup = $(".js-draw-btn");
        this.phone = "";
        this.$PhoneGroup = $("input[data-rule='phone']");
        this.$panelOne = $("#panel-01");
    }
    Controller.prototype.init = function(){
        var me = this;
        this.bindEvent();
        window.onscroll = function(e){
            var scrolltop=document.documentElement.scrollTop||document.body.scrollTop;
            if(scrolltop>panelOnePosition && !panelOneAnimated){
                me.$panelOne.find(".need-animate").show().addClass("animated");
            }
        }
        $(".download-wrap .icon-close").bind("click",function(){
            $(".download-wrap").removeClass().addClass("download-wrap flipOutX animated");
            setTimeout(function () {
                $(".download-wrap").remove();
            },800)
        })
    }
    Controller.prototype.bindEvent = function () {
        this.$DrawBtnGroup.bind("click",function(){
            if(Func.checkInputList(this)){ //如果前端验证通过

            }
        });

    }
    new Controller().init();
})(Zepto)