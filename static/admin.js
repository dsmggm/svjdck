

// 登陆函数
function admin_login() {
    // 获取按钮元素
    var adminname = document.getElementById('adminname').value;

    // 获取输入框的值
    var adminpasswd = document.getElementById('adminpasswd').value;

    // 检查输入是否为空
    if (adminname.trim() === '' || adminpasswd.trim() === '') {
        alert('请输入有效的账号和密码');
        return; // 如果账号或密码为空，则不执行后续操作
    }
    // 切换发送状态
    const element = document.getElementById('login_button');
    element.textContent = '登录中...';
    element.disabled = true;

    // 创建一个 JSON 对象
    var data = { adminname: adminname, adminpasswd: adminpasswd };
    
    // 发送 POST 请求
    fetch('/admin/login', {
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
                // 改变状态
                element.textContent = '登录';
                element.disabled = false;
                // 跳转set
                window.location.href = '/admin_set';
                // 获取配置信息
                // alert(data.msg);
            } else {
                // 如果响应状态码不是200，则认为请求失败
                console.error('Error:', response);
                // 改变按钮状态
                element.textContent = '登录';
                element.disabled = false;
                alert(data.msg);
            }
        });
    })
    .catch(error => {
        // 网络错误或其他错误
        console.error('网络错误或其他错误:', error);
        // 改变按钮状态
        element.textContent = '登录';
        element.disabled = false;
        alert('登录失败，可能网络错误。', error);
    });
}


// 登陆初始化
function init_admin() {
    fetch('/admin/init', {
        method: 'POST',
        credentials: 'include', // 允许发送 cookie
    })
    .then(response => {
        response.json().then(data => {
            if (response.status === 200) {
                // 请求成功时的处理逻辑
                console.log('Success:', data);
            } else if (response.status === 201) {  // 未登录
                console.log('Forbidden:', response);
            } else {
                console.error('Error:', response);
            }
        });
    })
    .catch(error => {
        // 捕获 fetch 请求中的错误
        console.error('Fetch Error:', error);
    });
}
document.addEventListener('DOMContentLoaded', init_admin);