
//后台管理系统的js

function  myFunction(){

}
function checkUsername() {
    var elMsg = document.getElementById("feedback");
    if (this.value.length == ''){
        this.value = "请输入账号";
    } else {
        if (this.value.length < 5){
            this.value = '账号字符数必须大于5';
        }
    }
}
var elUsername = document.getElementById('username');
elUsername.addEventListener('blur', checkUsername,false);//false表示事件冒泡向父元素传播，true表示事件捕获由外向内触发
