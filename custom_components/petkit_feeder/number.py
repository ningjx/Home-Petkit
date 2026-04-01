"""数字输入实体 - 出粮克数."""

from __future__ import annotations

import logging
from homeassistant.components.number import NumberEntity
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import DOMAIN, DEFAULT_NAME
from .coordinator import PetkitDataUpdateCoordinator

_LOGGER = logging.getLogger(__name__)

# 默认出粮量
DEFAULT_FEED_AMOUNT = 10
# 最小出粮量
MIN_FEED_AMOUNT = 1
# 最大出粮量
MAX_FEED_AMOUNT = 100


async def async_setup_entry(
    hass: HomeAssistant,
    config_entry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """设置数字输入实体."""
    coordinator: PetkitDataUpdateCoordinator = hass.data[DOMAIN][config_entry.entry_id]
    
    entities = [
        PetkitFeedAmountNumber(coordinator, config_entry),
    ]
    
    async_add_entities(entities)


class PetkitFeedAmountNumber(CoordinatorEntity, NumberEntity):
    """出粮克数数字输入."""

    _attr_has_entity_name = True
    _attr_translation_key = "feed_amount"
    _attr_native_min_value = MIN_FEED_AMOUNT
    _attr_native_max_value = MAX_FEED_AMOUNT
    _attr_native_step = 1
    _attr_native_unit_of_measurement = "g"
    _attr_icon = "mdi:weight-gram"

    def __init__(
        self,
        coordinator: PetkitDataUpdateCoordinator,
        config_entry,
    ) -> None:
        """初始化数字输入."""
        super().__init__(coordinator)
        self._config_entry = config_entry
        
        self._device_id = getattr(coordinator, '_device_id', 'unknown')
        
        self._attr_unique_id = f"{self._device_id}_feed_amount"
        
        # 直接设置 entity_id
        self.entity_id = f"number.petkit_feeder_{self._device_id}_feed_amount"
        
        self._attr_name = "出粮克数"
        
        _LOGGER.debug(
            "[PetkitFeeder] Number initialized: entity_id=%s, unique_id=%s, device_id=%s",
            self.entity_id,
            self._attr_unique_id,
            self._device_id,
        )

    @property
    def native_value(self) -> float:
        """返回当前设置的出粮量."""
        return self.coordinator.get_feed_amount()

    async def async_set_native_value(self, value: float) -> None:
        """设置新的出粮量."""
        amount = int(value)
        self.coordinator.set_feed_amount(amount)
        _LOGGER.debug("设置出粮量: %dg", amount)

    @property
    def device_info(self):
        """返回设备信息."""
        device = self.coordinator.data.get("device_info") if self.coordinator.data else None
        model = "Unknown"
        if device and hasattr(device, "device_nfo") and device.device_nfo:
            model = device.device_nfo.modele_name or "Unknown"
        
        return {
            "identifiers": {(DOMAIN, self._device_id)},
            "name": DEFAULT_NAME,
            "manufacturer": "Petkit",
            "model": model,
        }