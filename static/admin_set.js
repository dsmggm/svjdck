// 提交保存
function savesettings() {
    var crontab_time = document.getElementById('crontab_time').value;
    var apptoken = document.getElementById('apptoken').value;
    var gg = document.getElementById('gg').value;
    var sendtext = document.getElementById('sendtext').value;

    // 切换发送状态
    const element = document.getElementById('savesettings');
    element.textContent = '保存中...';
    element.disabled = true;

    // 创建一个 JSON 对象
    var data = { crontab_time: crontab_time, apptoken: apptoken, gg: gg, sendtext: sendtext };
    // 发送 POST 请求
    fetch('/admin_set/save', {
        method: 'POST',
        credentials: 'include', // 允许发送 cookie
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
                element.textContent = '保存';
                element.disabled = false;
            } else if (response.status === 201) {  // 未登录
                console.log('Forbidden:', response);
                window.location.href = '/admin';
            } else {
                // 如果响应状态码不是200，则认为请求失败
                console.error('Error:', response);
                // 改变按钮状态
                element.textContent = '保存';
                element.disabled = false;
                alert(data.msg);
            }
        });
    })
    .catch(error => {
        // 网络错误或其他错误
        console.error('网络错误或其他错误:', error);
        // 改变按钮状态
        element.textContent = '保存';
        element.disabled = false;
        alert('请求失败，可能网络错误，请重试或联系管理员。', error);
    });
}




// 获取相关信息
function init_set_value() {
    fetch('/admin_set/init', {
        method: 'POST',
        credentials: 'include', // 允许发送 cookie
    })
    .then(response => {
        response.json().then(data => {
            if (response.status === 200) {
                // 请求成功时的处理逻辑
                console.log('Success:', data);

                // 获取数据信息
                var crontab_time = data.crontab_time;
                var apptoken = data.apptoken;
                var gg = data.gg;
                var sendtext = data.sendtext;
                var ver = data.ver;
                var auth_date = data.auth_date;

                const element1 = document.getElementById('crontab_time');
                element1.value = crontab_time[0];
                const element2 = document.getElementById('apptoken');
                element2.value = apptoken[0];
                const element3 = document.getElementById('gg');
                element3.value = gg;
                const element4 = document.getElementById('sendtext');
                element4.textContent = sendtext[0];
                const element5 = document.getElementById('ver');
                element5.textContent = `当前版本：${ver}`;
                const element6 = document.getElementById('auth_date');
                element6.textContent = `授权到期日期：${auth_date}`;

            } else if (response.status === 201) {  // 未登录
                console.log('Forbidden:', response);
                window.location.href = '/admin';
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
document.addEventListener('DOMContentLoaded', init_set_value);