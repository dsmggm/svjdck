# -*- coding: utf-8 -*-

import main
from loguru import logger

logger.add("./data/log/jdck.log", 
            rotation="512 KB",  # 当文件达到1KB时轮转
            retention="30 days", # 保留10天的日志文件
            compression="zip",   # 压缩旧的日志文件
            enqueue=True,   # 使用队列来写入
            level="INFO")        



if __name__ == '__main__':
    try:
        logger.info("jdck启动")
        main.main()
    except Exception as e:
        logger.error(f"jdck程序异常退出，错误信息：{e}")
