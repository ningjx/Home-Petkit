"""按钮实体 - 刷新按钮、手动出粮按钮."""

from __future__ import annotations

import logging
from homeassistant.components.button import ButtonEntity
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import DOMAIN, BUTTON_REFRESH, DEFAULT_NAME
from .coordinator import PetkitDataUpdateCoordinator

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(
    hass: HomeAssistant,
    config_entry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """设置按钮实体."""
    coordinator: PetkitDataUpdateCoordinator = hass.data[DOMAIN][config_entry.entry_id]
    
    entities = [
        PetkitRefreshButton(coordinator, config_entry),
        PetkitManualFeedButton(coordinator, config_entry),
    ]
    
    async_add_entities(entities)


class PetkitRefreshButton(CoordinatorEntity, ButtonEntity):
    """小佩喂食器刷新按钮."""

    _attr_has_entity_name = True
    _attr_translation_key = "refresh"

    def __init__(
        self,
        coordinator: PetkitDataUpdateCoordinator,
        config_entry,
    ) -> None:
        """初始化刷新按钮."""
        super().__init__(coordinator)
        self._config_entry = config_entry
        
        self._device_id = getattr(coordinator, '_device_id', 'unknown')
        
        self._attr_unique_id = f"{self._device_id}_{BUTTON_REFRESH}"
        
        # 直接设置 entity_id
        self.entity_id = f"button.petkit_feeder_{self._device_id}_{BUTTON_REFRESH}"
        
        self._attr_name = "刷新数据"
        self._attr_icon = "mdi:refresh"
        
        _LOGGER.debug(
            "[PetkitFeeder] Button initialized: entity_id=%s, unique_id=%s, device_id=%s",
            self.entity_id,
            self._attr_unique_id,
            self._device_id,
        )

    async def async_press(self) -> None:
        """按下按钮时刷新数据."""
        await self.coordinator.async_request_refresh()

    def _get_device(self):
        """获取设备数据."""
        if not self.coordinator.data:
            return None
        return self.coordinator.data.get("device_info")

    @property
    def device_info(self):
        """返回设备信息."""
        device = self._get_device()
        model = "Unknown"
        device_name = DEFAULT_NAME
        
        if device:
            # 获取设备型号
            if hasattr(device, "device_nfo") and device.device_nfo:
                model = device.device_nfo.modele_name or "Unknown"
            # 获取设备名称
            if hasattr(device, "name") and device.name:
                device_name = device.name
        
        return {
            "identifiers": {(DOMAIN, self._device_id)},
            "name": device_name,
            "manufacturer": "Petkit",
            "model": model,
        }


class PetkitManualFeedButton(CoordinatorEntity, ButtonEntity):
    """手动出粮按钮."""

    _attr_has_entity_name = True
    _attr_translation_key = "manual_feed"

    def __init__(
        self,
        coordinator: PetkitDataUpdateCoordinator,
        config_entry,
    ) -> None:
        """初始化手动出粮按钮."""
        super().__init__(coordinator)
        self._config_entry = config_entry
        
        self._device_id = getattr(coordinator, '_device_id', 'unknown')
        
        self._attr_unique_id = f"{self._device_id}_manual_feed"
        
        # 直接设置 entity_id
        self.entity_id = f"button.petkit_feeder_{self._device_id}_manual_feed"
        
        self._attr_name = "手动出粮"
        self._attr_icon = "mdi:food-drumstick"
        
        _LOGGER.debug(
            "[PetkitFeeder] Button initialized: entity_id=%s, unique_id=%s, device_id=%s",
            self.entity_id,
            self._attr_unique_id,
            self._device_id,
        )

    async def async_press(self) -> None:
        """按下按钮时手动出粮."""
        _LOGGER.info("触发手动出粮")
        await self.coordinator.manual_feed()

    def _get_device(self):
        """获取设备数据."""
        if not self.coordinator.data:
            return None
        return self.coordinator.data.get("device_info")

    @property
    def device_info(self):
        """返回设备信息."""
        device = self._get_device()
        model = "Unknown"
        device_name = DEFAULT_NAME
        
        if device:
            # 获取设备型号
            if hasattr(device, "device_nfo") and device.device_nfo:
                model = device.device_nfo.modele_name or "Unknown"
            # 获取设备名称
            if hasattr(device, "name") and device.name:
                device_name = device.name
        
        return {
            "identifiers": {(DOMAIN, self._device_id)},
            "name": device_name,
            "manufacturer": "Petkit",
            "model": model,
        }
