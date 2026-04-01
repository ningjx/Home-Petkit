/** 实体 ID 推断工具 */

import { PetkitSoloCardConfig } from '../types';

/**
 * 根据设备 ID 和实体类型推断实体 ID
 * @param config 卡片配置
 * @param entityType 实体类型（如 'feeding_schedule', 'feeding_history'）
 * @returns 完整的实体 ID
 */
export function getEntityId(config: PetkitSoloCardConfig, entityType: string): string {
  const deviceId = config.device_id;
  if (deviceId) {
    return `sensor.petkit_feeder_${deviceId}_${entityType}`;
  }
  return config.entity || '';
}

/**
 * 获取喂食计划实体 ID
 */
export function getPlanEntityId(config: PetkitSoloCardConfig): string {
  return config.entity || getEntityId(config, 'feeding_schedule');
}

/**
 * 获取喂食历史实体 ID
 */
export function getHistoryEntityId(config: PetkitSoloCardConfig): string {
  return config.history_entity || getEntityId(config, 'feeding_history');
}

/**
 * 获取设备名称实体 ID
 */
export function getDeviceNameEntityId(config: PetkitSoloCardConfig): string {
  return config.device_name_entity || getEntityId(config, 'device_name');
}