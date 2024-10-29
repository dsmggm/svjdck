# 说明
没到这个时候

# 安装(未完成)
<pre>
docker run -dit \
  -v ~/jdckdata/:/jdck/data \
  -p 4321:4321 \
  --name jdck \
  --hostname jdck \
  --restart always \
  dsmggm/autojdck:latest
</pre>

# 配置文件
1、映射出来的data目录下位于用户目录下的jdckdata/jdck.ini
2、配置文件用于配置青龙面板的配置，如青龙面板地址、client_id、client_secret等。
3、admin_name和admin_password用于配置后台管理登录账密。
3、配置示例如下：
<pre>
qlip=http://192.168.6.6:5700/
client_id=Yi-s022222-
client_secret=TChA33_22333Ng-e
admin_name=super
admin_password=super
</pre>

# 认证
认证文件位于jdckdata/auth
将下方****替换为认证码即可，之后运行即可
为了防止滥用，需要进行认证方可进行使用
<pre>
echo "****" > ~/jdckdata/auth && docker restart jdck
</pre>

# UID回调
在WXpusher的应用设置中，回调地址是你的网址+/get_uid
例如：https://jd.dsmggm.cn/get_uid

# 更新历史
<pre>
## v20241019
- docker版本测试版本发布
</pre>

# 打赏  
如果你觉得作者很棒，你可以打赏他  
如果你觉得他很菜，你可以扫码支持他  
![给点钱花花](get_me_some_money.jpg)  

# 免责声明  
本脚本仅供学习参考，请在下载后24小时内删除，请勿用于非法用途。  
作者不对因使用该脚本造成的任何损失或法律问题负责。  

# 待优化
1、后台重启按钮  
2、认证  
3、更新 