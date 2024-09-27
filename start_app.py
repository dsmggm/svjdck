import app
from loguru import logger

logger.add("./data/log/log_file.log", 
            rotation="100 MB",  # 当文件达到100MB时轮转
            retention="30 days", # 保留10天的日志文件
            compression="zip",   # 压缩旧的日志文件
            enqueue=True)        # 使

logger.info("web服务启动")

try:
    app.main()
except Exception as e:
    logger.error(f'web服务异常：{e}')

