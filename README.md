# 说明
禁止🚫大黄狗及其狗腿子访问，请自觉退出  
项目由py开发，之后通过github自动转义为so提高性能。  
apptoken用于青龙wxpusher一对一推送，例如6dylan库  
仅用于推送自动登录失败的通知  
仅支持新版青龙  
仅更新被禁用的ck  
访问页面请使用https协议  

登录页面：https://ip:4321  
后台管理连接：https://ip:4321/admin  

开发插件[API](https://github.com/dsmggm/svjdck/blob/main/README_API.md)可以看这里  
# docker部署
docker部署命令：  
<pre>
docker run -dit \
  -v ~/jdckdata/:/jdck/data \
  -p 4321:4321 \
  -p 54321:54321 \
  --name jdck \
  --hostname jdck \
  --restart always \
  dsmggm/autojdck:latest
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
设备ID文件位于jdckdata/device_id  
赞赏码添加Bot，备注svjdck  
发送'svjdck授权'  
  
为了防止滥用，需要进行认证方可进行使用  
⚠⚠⚠`重建容器认证会失效`⚠⚠⚠  
  
![DsmggmBot](qq.png)
![DsmggmBot](DsmggmBot.png)
<pre>
echo "****" > ~/jdckdata/auth && docker restart jdck
</pre>

# 查看容器日志
查看容器最后200条日志
<pre>
docker logs -f --tail 200 jdck
</pre>

# UID回调
在WxPusher的应用设置中，回调地址是你的网址+/get_uid  
例如：https://jd.dsmggm.cn/get_uid  

# 自定义SSL证书
1. 默认强制使用https协议  
2. 将证书文件放入data/certs/certfile.crt  
3. 将证书密钥放入data/certs/keyfile.key  

4. 重启容器  
5. 如果有需要可以到[let's Encrypt](https://letsencrypt.org/zh-cn/getting-started/)免费获取证书  
注：如果不配置证书，则使用内置证书，内置证书会提示不安全  

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
</pre>

# 打赏  
如果你觉得作者很棒，你可以打赏他  
如果你觉得他很菜，你可以扫码支持他  
![给点钱花花](get_me_some_money.jpg)  

# 免责声明  
本脚本仅供学习参考，请在下载后24小时内删除，请勿用于非法用途。  
作者不对因使用该脚本造成的任何损失或法律问题负责。  

# 待完成
1. 无界对接插件
2. autman对接插件