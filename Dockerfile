# 基本镜像
FROM python:3.11-slim-bullseye
# 设置工作目录
WORKDIR /jdck

# 修改软件源码
# RUN echo "deb http://mirrors.huaweicloud.com/debian/ bookworm main non-free non-free-firmware contrib" > /etc/apt/sources.list && \
# echo "deb-src http://mirrors.huaweicloud.com/debian/ bookworm main non-free non-free-firmware contrib" >> /etc/apt/sources.list && \
# echo "deb http://mirrors.huaweicloud.com/debian-security/ bookworm-security main" >> /etc/apt/sources.list && \
# echo "deb-src http://mirrors.huaweicloud.com/debian-security/ bookworm-security main" >> /etc/apt/sources.list && \
# echo "deb http://mirrors.huaweicloud.com/debian/ bookworm-updates main non-free non-free-firmware contrib" >> /etc/apt/sources.list && \
# echo "deb-src http://mirrors.huaweicloud.com/debian/ bookworm-updates main non-free non-free-firmware contrib" >> /etc/apt/sources.list && \
# echo "deb http://mirrors.huaweicloud.com/debian/ bookworm-backports main non-free non-free-firmware contrib" >> /etc/apt/sources.list && \
# echo "deb-src http://mirrors.huaweicloud.com/debian/ bookworm-backports main non-free non-free-firmware contrib" >> /etc/apt/sources.list

RUN apt update

# 设置pip的镜像源
# RUN pip config set global.extra-index-url "http://mirrors.aliyun.com/pypi/simple/ https://pypi.tuna.tsinghua.edu.cn/simple/"

# 安装python依赖包
RUN pip install --break-system-packages \
  Pillow \
  aiohttp \
  aiofiles \
  cryptography \
  quart \
  aiosqlite \
  loguru \
  playwright \
  requests \
  opencv-python-headless \
  apscheduler

# 下载浏览器
RUN playwright install chromium
# 浏览器依赖
RUN apt install -y \
  libglib2.0-0 \
  libnss3 \
  libnspr4 \
  libdbus-1-3 \
  libatk1.0-0 \
  libatk-bridge2.0-0 \
  libcups2 \
  libdrm2 \
  libxcb1 \
  libxkbcommon0 \
  libatspi2.0-0 \
  libx11-6 \
  libxcomposite1 \
  libxdamage1 \
  libxext6 \
  libxfixes3 \
  libxrandr2 \
  libgbm1 \
  libpango-1.0-0 \
  libcairo2 \
  libasound2


RUN apt install -y git 
RUN git config --global http.postBuffer 524288000
# RUN git clone --depth=1 https://github.yanjf.xyz/https://github.com/dsmggm/svjdck.git /jdck
RUN git clone --depth=1 https://github.com/dsmggm/svjdck.git /jdck


# 设置时区
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo "Asia/Shanghai" > /etc/timezone

# 执行权限
RUN chmod +x *.sh

# 容器健康监测
# HEALTHCHECK --interval=10s --timeout=2s --retries=20 \
#   CMD curl -sf --noproxy '*' http://127.0.0.1:4321 || exit 1

# 挂载点
VOLUME /jdck/data
# 监听端口
EXPOSE 4321
# 启动命令
ENTRYPOINT ["/jdck/start.sh"]

