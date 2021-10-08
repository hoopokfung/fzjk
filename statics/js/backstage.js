
//后台管理系统的js
var elUsername = document.getElementById('username');
var elMsg = document.getElementById('feedback');

function setup() {
    var textInput;
    textInput = document.getElementById('username');
    textInput.focus();
}

window.addEventListener('load',setup,false);        // 加载页面完成后，focus输入框

function getTarget(e) {
    if (!e) {                           // if event object doesn't exist
        e = window.event;               // Use IE fallback
    }
    return e.target || e.srcElement;    // srcElement是IE老属性与target等同
}

function checkLength(e,minLength) {
    var el;
    el = getTarget(e);
    if (el.value.length == ''){
        el.value = "请输入账号";
    } else {
        if (el.value.length < minLength){
            el.className = 'warning';
            el.value = '账号长度不小于' + minLength + '个字符';
        }
    }
}

if (elUsername.addEventListener){
    elUsername.addEventListener('blur',function (e) {
            checkLength(e,5);
        }
        ,false);//false表示事件冒泡向父元素传播，true表示事件捕获由外向内触发
} else {
    elUsername.attachEvent('onblur', function () {  // attachEvent是IE老方法与addEventListener等同
        checkLength(5);
    });
}
