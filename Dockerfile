#基本镜像
FROM alpine:latest
#修改软件园
RUN sed -i "s@https://dl-cdn.alpinelinux.org/@https://mirrors.huaweicloud.com/@g" /etc/apk/repositories
RUN apk update

#安装软件包
RUN apk add --no-cache bash
RUN apk add --no-cache python3
RUN apk add --no-cache py3-pip
#RUN apk add --no-cache cron
RUN apk add --no-cache py3-opencv
RUN apk add --no-cache chromium
RUN apk add --no-cache xfce4

#设置pip的镜像源
RUN pip config set global.extra-index-url "http://mirrors.aliyun.com/pypi/simple/ https://pypi.tuna.tsinghua.edu.cn/simple/"

#安装python依赖包
RUN pip install --break-system-packages pyppeteer
RUN pip install --break-system-packages Pillow
RUN pip install --break-system-packages asyncio
RUN pip install --break-system-packages aiohttp

#复制文件到容器内
COPY ./autojdck.py /root/autojdck.py

#定时任务

#保持容器不退出
CMD ["tail", "-f", "/dev/null"]