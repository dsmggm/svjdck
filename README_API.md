# 账户登录API
后期会进行加密处理，API仅做为参考使用。  
API更新日期：20241104  
  
## 1、发送验证码

- **请求 URL**: `/sendcode`
- **请求方法**: `POST`
- **请求体**:
```json
{
  "username": "手机号"
}
```
- **响应**:
  - **状态码**: `200`
  - **响应体**:
```json
{
  "status": "code_success",
  "msg": "验证码发送成功"
}
```
- **响应**:
  - **状态码**: `500`
  - **响应体**:
```json
{
  "status": "auth_fail",
  "msg": "验证码发送失败"
}
```

## 2、提交验证码登录

- **请求 URL**: `/verifycode`
- **请求方法**: `POST`
- **请求体**:

```json
{
  "username": "手机号",
  "code": "验证码"
}
```

- **响应**:
  - **状态码**: `200`
  - **响应体**:
```json
{
  "status": "login_success",
  "msg": "登录成功",
  "password": "jd账户密码",
  "remarks": "备注",
  "uid": "UID"
}
```

- **响应**:
  - **状态码**: `200`
  - **响应体**:
```json
{
  "status": "code_error",
  "msg": "验证码错误"
}
```


## 3、提交登录信息

- **请求 URL**: `/submit_user_info`
- **请求方法**: `POST`
- **请求体**:

```json
{
  "username": "手机号",
  "remark": "备注",
  "password": "jd账户密码",
  "uid": "UID"
}
```

- **响应**:
  - **状态码**: `200`
  - **响应体**:
```json
{
  "status": "login_success",
  "msg": "提交成功"  
}
```

- **响应**:
  - **状态码**: `200`
  - **响应体**:
```json
{
  "status": "submit_error",
  "msg": "提交失败-不允许的提交"
}
```

## 4、获取WxPusher扫码关注二维码

- **请求 URL**: `/wxpusher_apptoken`
- **请求方法**: `POST`
- **请求体**:

```json
{
  "username": "手机号"
}
```

- **响应**:
  - **状态码**: `200`
  - **响应体**:
```json
{
  "data": {
    "shortUrl": "二维码src"
  }
}
```

- **响应**:
  - **状态码**: `201`
  - **响应体**:
```json
{
  "status": "error",
  "msg": "未配置apptoken"
}
```

- **响应**:
  - **状态码**: `500`
  - **响应体**:
```json
{
  "status": "error",
  "msg": "请求二维码失败"
}
```


# 后台管理API
后期会进行加密处理，API仅做为参考使用。  
API更新日期：20241104  
cookie有效期1800秒，每次请求都会刷新时间  

## 1、登录后台

- **请求 URL**: `/admin`
- **请求方法**: `POST`
- **请求头**:`Cookie: token`
- **请求体**:

```json
{
  "adminname": "后台账户",
  "adminpasswd": "后台密码"
}
```

- **响应**:
  - **状态码**: `200`
  - **响应头**: `token: token`
  - **响应体**:
```json
{
  "status": "login_success",
  "msg": "登录成功"
}
```

- **响应**:
  - **状态码**: `500`
  - **响应体**:
```json
{
  "status": "login_fail",
  "msg": "账号或密码错误"
}
```

- **响应**:
  - **状态码**: `500`
  - **响应体**:
```json
{
  "status": "login_fail",
  "msg": "配置文件错误,请确认配置文件,（报错内容）"
}
```

## 2、获取后台配置信息

- **请求 URL**: `/admin_set/init`
- **请求方法**: `POST`
- **请求头**:`Cookie: token`

- **响应**:
  - **状态码**: `200`
  - **响应体**:
```json
{
  "ver": "版本号",
  "crontab_time": "定时规则",
  "apptoken": "wxpusher_apptoken",
  "gg": "公告内容",
  "sendtext": "推送附加信息",
  "auth_date": "授权到期时间"
}
```

- **响应**:
  - **状态码**: `201`
  - **响应体**:
```json
{
  "msg": "No have token"
}
```

- **响应**:
  - **状态码**: `500`
  - **响应体**:
```json
{
  "status": "login_fail",
  "msg": "配置文件错误,请确认配置文件,（报错内容）"
}
```


## 3、保存配置信息

- **请求 URL**: `/admin_set/save`
- **请求方法**: `POST`
- **请求头**:`Cookie: token`
- **请求体**:
```json
{
  "crontab_time": "定时规则",
  "apptoken": "wxpusher_apptoken",
  "gg": "公告内容",
  "sendtext": "推送附加信息"
}
```

- **响应**:
  - **状态码**: `200`
  - **响应体**:
```json
{
  "msg": "Success"
}
```

- **响应**:
  - **状态码**: `201`
  - **响应体**:
```json
{
  "msg": "Invalid cookie or expired"
}

- **响应**:
  - **状态码**: `500`
  - **响应体**:
```json
{
  "msg": "Error,（报错内容）"
}
```


## 4、获取后台账号

- **请求 URL**: `/admin_users/list`
- **请求方法**: `POST`
- **请求头**:`Cookie: token`

- **响应**:
  - **状态码**: `200`
  - **响应体**:
```json
[
  [
    2,
    "手机号",
    "密码",
    "备注",
    "UID",
    "jd_pt_pin",
    "1启用，0禁用"
  ],
  ...
  [
    99,
    "手机号",
    "密码",
    "备注",
    "UID",
    "jd_pt_pin",
    "1启用，0禁用"
  ]
]
```

- **响应**:
  - **状态码**: `201`
  - **响应体**:
```json
{
  "msg": "Invalid cookie or expired"
}
```

## 5、更改账户信息

- **请求 URL**: `/admin_users/update`
- **请求方法**: `POST`
- **请求头**:`Cookie: token`
- **请求体**:
```json
{
  "passwd_value": "密码",
  "pt_pin": "jd_pt_pin",
  "remarks_value": "备注",
  "status": 1,
  "user_value": "账号",
  "uuid_value": "UID"
}
```

- **响应**:
  - **状态码**: `200`
  - **响应体**:
```json
{
  "msg": "success",
}
```

- **响应**:
  - **状态码**: `201`
  - **响应体**:
```json
{
  "msg": "Invalid cookie or expired"
}
```

- **响应**:
  - **状态码**: `500`
  - **响应体**:
```json
{
  "msg": "msg"
}
```

## 6、删除用户

- **请求 URL**: `/admin_users/delete`
- **请求方法**: `POST`
- **请求头**:`Cookie: token`
- **请求体**:
```json
{
  "passwd_value": "密码",
  "pt_pin": "jd_pt_pin",
  "remarks_value": "备注",
  "status": 1,
  "user_value": "账号",
  "uuid_value": "UID"
}
```

- **响应**:
  - **状态码**: `200`
  - **响应体**:
```json
{
  "msg": "success",
}
```

- **响应**:
  - **状态码**: `201`
  - **响应体**:
```json
{
  "msg": "Invalid cookie or expired"
}
```

- **响应**:
  - **状态码**: `500`
  - **响应体**:
```json
{
  "msg": "msg"
}
```