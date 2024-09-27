
// 发送验证码
function sendcode() {
    // 获取按钮元素
    var button = document.getElementById('sendcode_button');

    // 获取输入框的值
    var username = document.getElementById('username').value;
    
    // 检查输入是否为空
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(username.trim())) {
        alert('请输入正确的手机号！');
        return; // 如果输入为空，则不执行后续操作
    }

    // 切换发送状态
    const element = document.getElementById('sendcode_button');
    element.textContent = '发送中...';
    element.disabled = true;

    // 创建一个 JSON 对象
    var data = { username: username };
    
    // 发送 POST 请求
    fetch('/sendcode', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        response.json().then(data => {
            if (response.status === 200) {
                // 请求成功时的处理逻辑
                console.log('Success:', data);
                const element = document.getElementById('sendcode_button');
                let countdown = 58;
                const interval = setInterval(() => {
                    countdown--;
                    if (countdown > 0) {
                        // 更新按钮文本显示倒计时
                        button.textContent = `${countdown}s`;
                    } else {
                        // 清除定时器
                        clearInterval(interval);
                        // 设置按钮为启用状态
                        button.disabled = false;
                        // 更新按钮文本内容
                        button.textContent = '发送验证码';
                    }
                }, 1000); // 每秒执行一次
                alert(data.msg);
            } else {
                // 如果响应状态码不是200，则认为请求失败
                console.error('Error:', response);
                // 改变按钮状态
                element.textContent = '发送验证码';
                element.disabled = false;
                alert(data.msg);
            }
        });
    })
    .catch(error => {
        // 网络错误或其他错误
        console.error('网络错误或其他错误:', error);
        // 改变按钮状态
        element.textContent = '发送验证码';
        element.disabled = false;
        alert('验证码请求失败，可能网络错误，请重试或联系管理员。', error);
    });
}


// 发送验证码登录
function verifycode() {
    //获取输入框的值
    var username = document.getElementById('username').value;
    var code = document.getElementById('code').value;
    var data = { username: username, code: code };

    // 内容不为空
    if (username == '' || code == '') {
        alert('账号验证码不能为空');
        return; // 如果输入为空，则不执行后续操作
    }
    // 判断 code 是否是6位数字
    if (!/^\d{6}$/.test(code)) {
        alert('验证码必须是6位数字');
        return; // 如果验证码不符合要求，则不执行后续操作
    }

    // 切换提交状态
    const element = document.getElementById('login_button');
    element.textContent = '登录中...';
    element.disabled = true;

    // 发送 POST 请求
    fetch('/verifycode', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        
    })
    .then(response => {
        response.json().then(data => {
            if (response.status === 200) {
                if (data.status === 'code_error') {
                    alert(data.msg);
                } else if (data.status === 'login_success') {
                    // 请求成功时的处理逻辑
                    console.log('Success:', data);
                    // 删除登录界面，显示二维码
                    document.getElementById('login_form').style.display = 'none';
                    document.getElementById('qrcode_form').style.display = 'flex';
                    // 提交按钮变换逻辑
                    const element = document.getElementById('submit_info');
                    element.textContent = '提交信息';
                    element.disabled = false;
                    //   处理登录后表格信息
                    alert(data.msg);
                    
                    // 获取用户id
                    var password = data.password;
                    // 获取用户权限
                    var remarks = data.remarks;
                    // 获取用户头像
                    var uid = data.uid;
                    
                    // 填入默认信息
                    document.getElementById('jd_username').value = username ? username : '';
                    document.getElementById('password').value = password ? password : '';
                    document.getElementById('remark').value = remarks ? remarks : '';
                    document.getElementById('uid').value = uid ? uid : '';
                    
                    // 请求二维码显示
                    postqrcode(username);
              }
            } else {
              // 切换提交状态
              const element = document.getElementById('login_button');
              element.textContent = '登录';
              element.disabled = false;
              // 如果响应状态码不是200，则认为请求失败
              console.error('Error:', response);
              alert(data.msg);

            }
        });
})
.catch(error => {
    // 网络错误或其他错误
    console.error('登录请求失败，可能网络错误，请重试或联系管理员。', error);
    alert('登录请求失败，可能网络错误，请重试或联系管理员。', error);
    // 切换提交状态
    const element = document.getElementById('login_button');
    element.textContent = '登录';
    element.disabled = false;
});
}


// 提交参数
function submitinfo() {
    // 获取输入框的值
    var username = document.getElementById('jd_username').value;
    var password = document.getElementById('password').value;
    var remark = document.getElementById('remark').value;
    var uid = document.getElementById('uid').value;
    
    // 检查输入是否为空
    if (username == '' || password == '' || remark == '') {
        alert('账号&密码&备注-不能为空');
        return; // 如果输入为空，则不执行后续操作
    }

    // 创建一个 JSON 对象
    var data = { username: username, password: password, remark: remark, uid: uid };
    
    // 切换提交状态
    const element = document.getElementById('submit_info');
    element.textContent = '提交中...';
    element.disabled = true;

    // 发送 POST 请求
    fetch('/submit_user_info', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        response.json().then(data => {
            if (response.status === 200) {
                // 请求成功时的处理逻辑
                console.log('Success:', data);
                document.getElementById('info_form').style.display = 'none';
                alert(data.msg);
            } else {
                // 如果响应状态码不是200，则认为请求失败
                console.error('Error:', response);

                // 改变按钮状态
                element.textContent = '提交信息';
                element.disabled = false;
                alert(data.msg);
            }
        });
    })
    .catch(error => {
        // 网络错误或其他错误
        console.error('网络错误或其他错误:', error);
        alert('验证码请求失败，可能网络错误，请重试或联系管理员。', error);
        // 改变按钮状态
        element.textContent = '提交信息';
        element.disabled = false;
    });
}

// 请求二维码
function postqrcode(username) {
    fetch('https://wxpusher.zjiecode.com/api/fun/create/qrcode', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "appToken": "AT_0P8P8Vsuf66vujIFNMFHSRwvZChKUfRC",
            "extra": username
        })
    })
    .then(response => {
        response.json().then(data => {
            if (response.status === 200) {
                // 请求成功时的处理逻辑
                console.log('Success:', data);
                document.getElementById('qrcode').src = (data.data.shortUrl);
            } else {
                // 如果响应状态码不是200，则认为请求失败
                console.error('Error:', response);
                alert('UID二维码请求出错，请联系管理员处理');
            }
        });
    })
    .catch(error => {
        // 网络错误或其他错误
        console.error('网络错误或其他错误:', error);
        alert('UID二维码请求出错，请联系管理员处理');
    });
}


// 初始化公告
function init_gg() {
    fetch('/init_gg', {
        method: 'POST',
    })
    .then(response => {
        response.json().then(data => {
            if (response.status === 200) {
                // 请求成功时的处理逻辑
                console.log('Success:', data);
                const ggElement = document.getElementById('gg_gg');
                ggElement.textContent = data.gg || '暂无公告';
            } else {
                // 如果响应状态码不是200，则认为请求失败
                console.error('公告获取失败，非200:', response);
            }
        });
    })
    .catch(error => {
        // 网络错误或其他错误
        console.error('获取公告网络错误或其他错误:', error);
    });
};
document.addEventListener('DOMContentLoaded', init_gg);
