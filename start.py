# -*- coding: utf-8 -*-

from loguru import logger
import subprocess, os

logger.add("./data/log/jdck.log", 
            rotation="512 KB",  # 当文件达到1KB时轮转
            retention="30 days", # 保留10天的日志文件
            compression="zip",   # 压缩旧的日志文件
            enqueue=True,   # 使用队列来写入
            level="INFO")        


def update():
    try:
        if os.path.exists('/update'):
            logger.debug(f"升级文件")
            subprocess.run('rm -rf /update/svjdck-main/start.py', check=True, shell=True)
            subprocess.run('cp -r /update/svjdck-main/* /jdck/', check=True, shell=True)
            subprocess.run('rm -rf /update', check=True, shell=True)
            return 'ok'
    except subprocess.CalledProcessError as e:
        logger.error(f"升级文件时出现异常: {e}")
        return e
    except Exception as e:
        logger.error(f"复制文件时发生错误: {e}")
        return e


if __name__ == '__main__':
    try:
        if update() == 'ok':
            logger.debug("jdck升级完成")
        logger.info("jdck启动")
        import main
        main.main()
    except Exception as e:
        logger.error(f"jdck程序异常退出，错误信息：{e}")
