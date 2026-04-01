"""时区处理工具函数"""

from ..const import REGION_TIMEZONE_MAP, DEFAULT_TIMEZONE


def get_timezone_for_region(region: str) -> str:
    """根据地区获取时区字符串.
    
    Args:
        region: 地区代码（如 "CN", "US", "EU"）
        
    Returns:
        时区字符串（如 "Asia/Shanghai"）
    """
    return REGION_TIMEZONE_MAP.get(region, DEFAULT_TIMEZONE)


def get_timezone_offset(timezone_str: str) -> float:
    """计算时区偏移量.
    
    Args:
        timezone_str: 时区字符串（如 "Asia/Shanghai"）
        
    Returns:
        UTC 偏移量（如 8.0 表示 UTC+8）
    """
    from datetime import datetime, timezone
    import zoneinfo
    
    try:
        tz = zoneinfo.ZoneInfo(timezone_str)
        now = datetime.now(tz)
        offset = now.utcoffset()
        if offset:
            return offset.total_seconds() / 3600
    except Exception:
        pass
    
    return 8.0  # 默认 UTC+8