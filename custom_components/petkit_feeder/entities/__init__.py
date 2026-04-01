"""实体基类模块汇总"""

from .base import PetkitEntity
from .sensor import PetkitSensorEntity
from .binary_sensor import PetkitBinarySensorEntity
from .button import PetkitButtonEntity
from .switch import PetkitSwitchEntity
from .number import PetkitNumberEntity

__all__ = [
    "PetkitEntity",
    "PetkitSensorEntity",
    "PetkitBinarySensorEntity",
    "PetkitButtonEntity",
    "PetkitSwitchEntity",
    "PetkitNumberEntity",
]