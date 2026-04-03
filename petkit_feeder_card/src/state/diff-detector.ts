/** 差异检测器 */

import { TimelineItem } from '../types';

/** 时间线差异 */
export interface TimelineDiff {
  added: TimelineItem[];
  modified: TimelineItem[];
  deleted: string[];  // itemId 列表
}

/**
 * 检测两条时间线的差异
 * @param origin 原始时间线
 * @param cache 缓存时间线
 * @returns 差异对象，无差异返回 null
 */
export function detectDayChanges(
  origin: TimelineItem[],
  cache: TimelineItem[]
): TimelineDiff | null {
  const originMap = new Map<string, TimelineItem>();
  const cacheMap = new Map<string, TimelineItem>();

  // 只处理 plan 类型
  origin.filter(item => item.itemType === 'plan').forEach(item => {
    originMap.set(item.itemId, item);
  });

  cache.filter(item => item.itemType === 'plan').forEach(item => {
    cacheMap.set(item.itemId, item);
  });

  const diff: TimelineDiff = {
    added: [],
    modified: [],
    deleted: [],
  };

  // 检测新增和修改
  cacheMap.forEach((cacheItem, itemId) => {
    const originItem = originMap.get(itemId);
    if (!originItem) {
      // 新增
      diff.added.push(cacheItem);
    } else if (hasItemChanged(originItem, cacheItem)) {
      // 修改
      diff.modified.push(cacheItem);
    }
  });

  // 检测删除
  originMap.forEach((_, itemId) => {
    if (!cacheMap.has(itemId)) {
      diff.deleted.push(itemId);
    }
  });

  // 无差异返回 null
  if (diff.added.length === 0 && diff.modified.length === 0 && diff.deleted.length === 0) {
    return null;
  }

  return diff;
}

/**
 * 检查单个计划项是否有变化
 */
function hasItemChanged(origin: TimelineItem, cache: TimelineItem): boolean {
  return (
    origin.time !== cache.time ||
    origin.name !== cache.name ||
    origin.plannedAmount !== cache.plannedAmount ||
    origin.isEnabled !== cache.isEnabled
  );
}

/**
 * 比较两个时间线是否完全相同
 */
export function isTimelineEqual(
  origin: TimelineItem[],
  cache: TimelineItem[]
): boolean {
  if (origin.length !== cache.length) return false;

  const originSorted = [...origin].sort((a, b) => a.itemId.localeCompare(b.itemId));
  const cacheSorted = [...cache].sort((a, b) => a.itemId.localeCompare(b.itemId));

  for (let i = 0; i < originSorted.length; i++) {
    if (hasItemChanged(originSorted[i], cacheSorted[i])) {
      return false;
    }
  }

  return true;
}