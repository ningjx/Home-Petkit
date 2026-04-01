"""开关实体基类"""

from __future__ import annotations

from homeassistant.components.switch import SwitchEntity

from .base import PetkitEntity


class PetkitSwitchEntity(PetkitEntity, SwitchEntity):
    """PetKit 开关实体基类."""

    _attr_has_entity_name = True

    def __init__(
        self,
        coordinator,
        config_entry,
        translation_key: str | None = None,
    ) -> None:
        """初始化开关实体."""
        super().__init__(coordinator, config_entry)
        
        # 设置 unique_id
        key = translation_key or getattr(self, "translation_key", None)
        if key:
            self._attr_unique_id = f"{self._device_id}_{key}"
            # 直接设置 entity_id
            self.entity_id = f"switch.petkit_feeder_{self._device_id}_{key}"