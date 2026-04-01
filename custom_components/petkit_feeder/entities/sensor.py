"""传感器实体基类"""

from __future__ import annotations

from homeassistant.components.sensor import SensorEntity

from .base import PetkitEntity


class PetkitSensorEntity(PetkitEntity, SensorEntity):
    """PetKit 传感器实体基类."""

    _attr_has_entity_name = True

    def __init__(
        self,
        coordinator,
        config_entry,
    ) -> None:
        """初始化传感器实体."""
        super().__init__(coordinator, config_entry)
        
        # 设置 unique_id
        translation_key = getattr(self, "translation_key", None)
        if translation_key:
            self._attr_unique_id = f"{self._device_id}_{translation_key}"
            # 直接设置 entity_id
            self.entity_id = f"sensor.petkit_feeder_{self._device_id}_{translation_key}"