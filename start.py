# -*- coding: utf-8 -*-

from loguru import logger
import subprocess, os

logger.add("./data/log/jdck.log", 
            rotation="5 MB",  # 当文件达到1KB时轮转
            retention="30 days", # 保留10天的日志文件
            compression="zip",   # 压缩旧的日志文件
            enqueue=True,   # 使用队列来写入
            level="INFO")        


def update():
    try:
        subprocess.run('rm -rf /update/svjdck-main/start.py', check=True, shell=True)
        subprocess.run('cp -r /update/svjdck-main/* /jdck/', check=True, shell=True)
        subprocess.run('rm -rf /update', check=True, shell=True)
        logger.debug(f"升级文件完成")
    except Exception as e:
        pass


if __name__ == '__main__':
    try:
        update()
        logger.info("jdck启动")
        import main
        main.main()
    except Exception as e:
        logger.error(f"jdck程序异常退出，错误信息：{e}")
