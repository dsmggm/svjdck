import init
import asyncio
from loguru import logger

logger.add("./data/log/log_file.log", 
            rotation="1 MB",  # 当文件达到1MB时轮转
            retention="30 days", # 保留10天的日志文件
            compression="zip",   # 压缩旧的日志文件
            enqueue=True)        # 使


if __name__ == '__main__':
    logger.info("自动登录服务启动")
    try:
        asyncio.run(init.init_main())
    except Exception as e:
        logger.error(e)
        logger.info("自动登录服务异常退出")
