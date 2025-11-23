# 基本镜像
FROM python:3.11-slim-bullseye

# 设置工作目录
WORKDIR /jdck


RUN apt update && apt install --no-install-recommends -y \
  # 浏览器依赖
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
  # 字体
  locales \
  fonts-wqy-zenhei fonts-wqy-microhei \
  # 容器检查
  curl \
  && apt clean && rm -rf /var/lib/apt/lists/*

# python依赖
RUN pip install --break-system-packages --no-cache-dir \
  loguru \
  aiosqlite \
  aiohttp \
  aiofiles \
  cryptography \
  requests \
  Pillow \
  quart \
  opencv-python-headless>=4.6.0 \
  AntiCAP \
  playwright  \
  onnxruntime \
  numpy<2.0.0 \
  ultralytics~=8.3.96

# 安装浏览器
RUN playwright install chromium

# 设置时区
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
  && echo "Asia/Shanghai" > /etc/timezone \
  # 安装设置语言环境
  && echo "zh_CN.UTF-8 UTF-8" >> /etc/locale.gen \
  && locale-gen zh_CN.UTF-8 \
  && update-locale LANG=zh_CN.UTF-8

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