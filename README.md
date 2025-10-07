# 说明
禁止🚫大黄狗及其狗腿子访问，请自觉退出  
项目由py开发，之后通过github自动转义为so提高性能。  
apptoken用于青龙wxpusher一对一推送，例如6dylan库  
仅用于推送自动登录失败的通知  
仅支持新版青龙  
仅更新被禁用的ck  
默认使用http协议  
⚠ 自动登录需要稳定的网络环境  

登录页面：http://ip:4321  
后台管理连接：http://ip:4321/admin  
默认使用http，可在后台开启https  
（使用默认证书浏览器都会报网页不安全，使用https请看自定义SSL证书说明）  

开发插件[API](https://github.com/dsmggm/svjdck/blob/main/README_API.md)可以看这里  
无界Bncr对接插件[https://github.com/dsmggm/bncr](https://github.com/dsmggm/bncr)  

# docker部署
docker部署命令：  
<pre>
docker run -dit \
  -v ~/jdckdata/:/jdck/data \
  -p 4321:4321 \
  --name jdck \
  --hostname jdck \
  --restart unless-stopped \
  --log-opt max-size=10m --log-opt max-file=3 \
  dsmggm/autojdck:latest
</pre>

docker compose部署：  
<pre>
services:
  jdck:
    image: dsmggm/autojdck:latest   # 使用的镜像
    container_name: jdck           # 容器名称
    restart: unless-stopped                  # 重启策略
    ports:
      - "4321:4321"                   # 映射端口
    volumes:
      - jdckdata/:/jdck/data                # 数据卷挂载
    logging:
      options:
        max-size: "10m"              # 单个日志文件最大10MB
        max-file: "3"                # 最多保留3个日志文件
        compress: "true"             # 日志文件压缩
</pre>

# 配置文件
1、创建~/jdckdata/jdck.ini文件  
2、配置文件用于配置青龙面板的配置，如青龙面板地址、client_id、client_secret等。  
3、admin_name和admin_password用于配置后台管理登录账密。  
3、配置示例如下：  
<pre>
qlip=http://192.168.6.6:5700
client_id=Yi-s022222-
client_secret=TChA33_22333Ng-e
admin_name=super
admin_password=super
</pre>

# 认证
设备ID可在日志中查看或“jdckdata/device_id文件”  
添加Bot，备注svjdck  
  
授权码离线认证文件将授权码保存在data/auth文件中  
  
为了防止滥用，需要进行认证方可进行使用  
⚠⚠⚠`重建容器认证会失效`⚠⚠⚠  
  
![DsmggmBot](qq.png)
![DsmggmBot](DsmggmBot.png)

# 查看容器日志
查看容器最后200条日志
<pre>
docker logs -f --tail 200 jdck
</pre>

# UID回调
在WxPusher的应用设置中，回调地址是你的网址+/get_uid  
例如：https://jd.dsmggm.cn/get_uid  

# 自定义SSL证书
1. 默认使用http协议  
2. 将证书文件放入data/certs/certfile.crt  
3. 将证书密钥放入data/certs/keyfile.key  
4. 重启容器  
5. ssl证书可以申请[let's Encrypt](https://letsencrypt.osfipin.com/jump/share?code=RK4KXEV6)的免费证书，验证方式使用dns验证    
注：如果不配置证书，则使用内置证书，内置证书浏览器都会提示不安全  

# 更新历史
<pre>
## v20241019
- docker版本测试版本发布
## v20241030
- docker镜像发布
## v20241101
- 修复推送UID二维码关注问题
- 自动更新机制
## v20241104
- 公开API
## v20241106
- 公告内容文件位置更改，迁移到jdckdata内
- 优化滑块性能
- 解决过期推送失败的问题
## v20241107
- 优化性能
## v20241108
- 修复登陆页"发送验证码"显示间距问题
## v20241115
- 后台增加请求更新按钮
- 增加自带ssl证书，提高账号密码传输安全性
## v20241204
- 临时解决jd新验证方式
- 更新了授权验证方式
- 后台管理增加重启按钮
- 修复版本显示问题
- 更新了未知的bug
## v20241205
- 修复上一个版本未知bug
- 更新版本显示问题
## v20241207
- 修复已知bug
- 应对jd加强滑块验证问题
## v20241209
- 修复更新问题
- 重新放开http，默认端口54321
## v20250102
- 更新了版本号
- 更新了api文档的一处错误
## v20250103
- 修复了部分bug
## v20250104
- 增加滑块成功率  
## v20250107
- 修复自动登陆应对jd改页面导致的问题  
## v20250108
- 修复登陆应对jd改页面导致的问题  
## v20250117
- 重构大部分代码
- 优化进程线程性能
- 记录最后一次登录结果
- 返回ck给前端
- 更新数据库结构
- 缩小docker镜像体积
- 更新了api
- 更新web界面——（待完成）
- autman插件——（待完成）
- 无界插件——（待完成）
- 字体验证——（待完成）
## v20250118
- 调整docker容积
- 修改API文档中的错误
## v20250119
- 修复已知bug
## v20250120
- 修改web启动配置
## v20250122
- 尝试修复已知bug
## v20250123
- 尝试修复已知bug
## v20250125
- 修复已知bug
## v20250225
- 修复部分bug
- 修改api文档中的错误
## v20250326
- 修复京东验证码识别问题
## v20250524
- 更新docker容器创建命令，限制log大小
- 修复滑块验证问题
## v20250525
- 增加登录超时截图
## v20250601
- 修复已知bug
## v20250613
- 修复已知bug
## v20250702
- 增加封号账号类型
## v20250816
- 修复已知bug
## v20250817
- 修复已知bug
## v20250819
- 修复已知bug
## v20250823
- 修复已知bug
## v202509300
- 修复已知bug
## v20251002
- 修复已知bug
## v20251007
- 修复已知bug
</pre>


# 免责声明  
本脚本仅供学习参考，请在下载后24小时内删除，请勿用于非法用途。  
作者不对因使用该脚本造成的任何损失或法律问题负责。  
