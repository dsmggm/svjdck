# 基本镜像
FROM python:3.11-slim-bullseye

# 设置工作目录
WORKDIR /jdck

# 安装语言依赖
RUN apt update && apt install -y \
  # 安装语言依赖
  locales \
  # 安装浏览器依赖
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
  libasound2 \
  # 容器检测软件curl
  curl \
  # python依赖
  && pip install --break-system-packages \
  loguru \
  aiosqlite \
  aiohttp \
  aiofiles \
  cryptography \
  requests \
  Pillow \
  quart \
  opencv-python-headless \
  playwright \
  # 安装浏览器
  && playwright install chromium \
  # 设置语言环境
  && echo "zh_CN.UTF-8 UTF-8" >> /etc/locale.gen \
  && locale-gen zh_CN.UTF-8 \
  && update-locale LANG=zh_CN.UTF-8 \
  # 安装字体
  && apt install fonts-wqy-zenhei fonts-wqy-microhei \
  # 清理
  && apt clean \
  && rm -rf /var/lib/apt/lists/*

# 复制当前文件到工作目录
COPY . .

# 容器健康监测
HEALTHCHECK --interval=30s --timeout=3s --retries=5 \
CMD curl -sf --insecure "https://127.0.0.1:4321/health" || curl -sf "http://127.0.0.1:4321/health" || exit 1

# 挂载点
VOLUME /jdck/data

# 监听端口
EXPOSE 4321

# 启动命令
ENTRYPOINT [ "python", "/jdck/start.py" ]