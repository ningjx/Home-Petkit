"""常量定义."""

# 集成域名
DOMAIN = "petkit_solo"

# 默认名称
DEFAULT_NAME = "PetKit SOLO"

# 低粮阈值（百分比）
LOW_FOOD_THRESHOLD = 20

# 按钮标识
BUTTON_REFRESH = "refresh"

# 刷新模式
CONF_REFRESH_MODE = "refresh_mode"
CONF_REFRESH_INTERVAL = "refresh_interval"
REFRESH_MODE_AUTO = "auto"
REFRESH_MODE_MANUAL = "manual"

# 更新间隔（秒）
UPDATE_INTERVAL = 300  # 5 分钟
DEFAULT_REFRESH_INTERVAL = 300
MIN_UPDATE_INTERVAL = 60  # 最小 1 分钟
MAX_UPDATE_INTERVAL = 3600  # 最大 1 小时

# 地区与时区映射（用于 HA 系统时区未设置时的备选）
REGION_TIMEZONE_MAP = {
    "CN": "Asia/Shanghai",      # 中国大陆
    "US": "America/New_York",   # 美国东部
    "EU": "Europe/Berlin",      # 欧洲中部
    "JP": "Asia/Tokyo",         # 日本
    "AU": "Australia/Sydney",   # 澳洲东部
}
DEFAULT_TIMEZONE = "Asia/Shanghai"