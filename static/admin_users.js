// 提交保存
function users_list(data) {
    // 从DOM中获取指定ID为'data-table'的表格，并查找其<tbody>部分
    const tbody = document.getElementById('data-table').querySelector('tbody');

    // 遍历传入的数据数组。data是一个二维数组，每个子数组代表一行用户数据
    data.forEach((row, index) => {
        // 创建一个新的表格行<tr>元素
        const tr = document.createElement('tr');

        // 创建新的ID单元格<td>元素
        const idCell = document.createElement('td');
        idCell.textContent = index + 1; // 通过索引为每行赋予唯一的ID，ID从1开始（而不是0）
        tr.appendChild(idCell); // 将ID单元格加入到当前行中

        // 从数据行的第二个元素开始循环，跳过已有的ID
        for (let i = 1; i < row.length - 1; i++) {
            // 创建新的数据单元格<td>元素
            const td = document.createElement('td');
            td.textContent = row[i]; // 将当前单元格的文本内容设置为数据行的相应元素
            tr.appendChild(td); // 将数据单元格加入到当前行中
        }

        // 处理状态列，创建新的状态单元格<td>元素
        const statusCell = document.createElement('td');
        // 根据最后一个元素确定用户的状态，"1"表示启用，其他表示禁用
        statusCell.textContent = row[row.length - 1] === "1" ? "正常" : "禁用"; // 显示相应的状态文本
        // 添加样式
        statusCell.className = row[row.length - 1] === "1" ? "enabled" : "disabled";
        tr.appendChild(statusCell); // 将状态单元格加入到当前行中

        // 添加操作列，创建新的操作单元格<td>元素
        const actionCell = document.createElement('td');

        // 创建“修改”按钮
        const editButton = document.createElement('button');
        editButton.textContent = '编辑'; // 设置按钮文本为“修改”
        editButton.className = 'edit-button'; // 给按钮添加一个CSS类名，方便样式调整
        // 设置按钮点击事件，点击时弹出修改提示框，显示当前用户的账号(假设row[1]是账号)
        console.log(row.slice(1, 7));
        editButton.onclick = () => edit_user_info(row.slice(1, 7)); // 传递 row 数组的第 1 到第 6 个元素

        // 创建“删除”按钮
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '删除'; // 设置按钮文本为“删除”
        deleteButton.className = 'del-button'; // 给按钮添加一个CSS类名
        // 设置按钮点击事件，点击时弹出删除提示框，显示当前用户的账号
        deleteButton.onclick = () => delete_user(row[1]); // 示例操作：弹出提示框显示被删除的账号

        // 将“修改”按钮和“删除”按钮加入到操作单元格中
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);
        // 将操作单元格加入到当前行中
        tr.appendChild(actionCell);

        // 将当前行加入到表格的<tbody>部分中，使其显示在表格中
        tbody.appendChild(tr);
    });
}

function delete_user(username) {
    const modal = document.getElementById('edit-modal');
    modal.style.display = 'flex';
    modal.classList.add('del-modal');
    modal.innerHTML = '';

    const buttons = document.createElement('div');
    buttons.classList.add('buttons');

    const confirm_button = document.createElement('button');
    confirm_button.textContent = '确认';
    confirm_button.classList.add('button');
    confirm_button.onclick = function () {

    const data = { username: username }
    fetch('/admin_users/delete', {
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
                modal.style.display = 'none';
                // 刷新
                window.location.reload();
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
};
    const cancel_button = document.createElement('button');
    cancel_button.textContent = '取消';
    cancel_button.classList.add('button');
    cancel_button.onclick = () => {
        modal.style.display = 'none';
    };
    buttons.appendChild(cancel_button);
    buttons.appendChild(confirm_button);

// 将创建的元素添加到 modal 中
modal.appendChild(buttons);
}



function edit_user_info(row) {
    // 获取 ID 为 edit-modal 的 div
    const modal = document.getElementById('edit-modal');
    // 取消隐藏
    modal.style.display = 'flex';
    modal.classList.add('edit-modal');
    // 清空 modal 内容，以防多次调用时内容叠加
    modal.innerHTML = '';

        // 创建包含文本框的元素
        const container = document.createElement('div');
        container.classList.add('edit-modal-content');


            // 用户名输入框
            const div_user = document.createElement('div');
            div_user.classList.add('div_user');
        
                const user_text = document.createElement('label');
                user_text.textContent = '账号：';


                const user_input = document.createElement('input');
                user_input.type = 'text';
                user_input.id = 'user_input';
                user_input.classList.add('user_input');
                user_input.value = row[0];

            div_user.appendChild(user_text);
            div_user.appendChild(user_input);
            

            // 密码输入框
            const div_passwd = document.createElement('div');
            div_passwd.classList.add('div_passwd');
        
                const passwd_text = document.createElement('label');
                passwd_text.textContent = '密码：';


                const passwd_input = document.createElement('input');
                passwd_input.type = 'text';
                passwd_input.id = 'passwd_input';
                passwd_input.classList.add('passwd_input');
                passwd_input.value = row[1];

            div_passwd.appendChild(passwd_text);
            div_passwd.appendChild(passwd_input);
            

            // 备注输入框
            const div_remarks = document.createElement('div');
            div_remarks.classList.add('div_remarks');
        
                const remarks_text = document.createElement('label');
                remarks_text.textContent = '备注：';


                const remarks_input = document.createElement('input');
                remarks_input.type = 'text';
                remarks_input.id = 'remarks_input';
                remarks_input.classList.add('remarks_input');
                remarks_input.value = row[2];

            div_remarks.appendChild(remarks_text);
            div_remarks.appendChild(remarks_input);
            
            


            // uuid输入框
            const div_uuid = document.createElement('div');
            div_uuid.classList.add('div_uuid');
        
                const uuid_text = document.createElement('label');
                uuid_text.textContent = 'uuid：';


                const uuid_input = document.createElement('input');
                uuid_input.type = 'text';
                uuid_input.id = 'uuid_input';
                uuid_input.classList.add('uuid_input');
                uuid_input.value = row[3];

            div_uuid.appendChild(uuid_text);
            div_uuid.appendChild(uuid_input);

            
            
            // 创建一个选项框
            const checkboxLabel = document.createElement('label');
            checkboxLabel.appendChild(document.createTextNode("账号状态：")); // 添加标签文本

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            let checkbox_value = (row[5] === "1"); // 如果 row[6] 的值为 "1"，则 checkbox_value 为 true；否则为 false
            console.log(row);
            checkbox.checked = checkbox_value
            checkboxLabel.appendChild(checkbox); // 把复选框添加到标签中

            // 确认取消按钮
            const buttons = document.createElement('div');
            buttons.classList.add('buttons');

            const confirm_button = document.createElement('button');
            confirm_button.textContent = '确认';
            confirm_button.classList.add('button');
            confirm_button.onclick = () => {
                // 获取输入框的值
                const user_value = document.getElementById('user_input').value;
                const passwd_value = document.getElementById('passwd_input').value;
                const remarks_value = document.getElementById('remarks_input').value;
                const uuid_value = document.getElementById('uuid_input').value;
                const enabled_value = checkbox.checked;
                let status = enabled_value ? 1 : 0;
                var data = { user_value: user_value, passwd_value: passwd_value, remarks_value: remarks_value, uuid_value: uuid_value, pt_pin: row[4], status: status };
                fetch('/admin_users/update', {
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
                            modal.style.display = 'none';
                            // 刷新
                            window.location.reload();
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

            const cancel_button = document.createElement('button');
            cancel_button.textContent = '取消';
            cancel_button.classList.add('button');
            cancel_button.onclick = () => {
                modal.style.display = 'none';
            };
            buttons.appendChild(cancel_button);
            buttons.appendChild(confirm_button);

        container.appendChild(div_user);
        container.appendChild(div_passwd);
        container.appendChild(div_remarks);
        container.appendChild(div_uuid);
        container.appendChild(checkboxLabel); // 将复选框标签添加到 container 中
        container.appendChild(buttons);
        


    // 将创建的元素添加到 modal 中
    modal.appendChild(container);
}


// 获取全部用户列表
function init_users_list() {
    fetch('/admin_users/list', {
        method: 'POST',
        credentials: 'include', // 允许发送 cookie
    })
    .then(response => {
        response.json().then(data => {
            if (response.status === 200) {
                // 请求成功时的处理逻辑
                console.log('Success:', data);
                users_list(data);
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
document.addEventListener('DOMContentLoaded', init_users_list);