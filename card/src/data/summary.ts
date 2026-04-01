/** 统计计算模块 */

import { TimelineItem, TodaySummary } from '../types';

/**
 * 从属性和历史数据计算今日统计
 * @param historyAttrs 喂食历史实体属性
 * @param timeline 时间线数据
 * @returns 今日统计
 */
export function calculateSummary(historyAttrs: any, timeline: TimelineItem[]): TodaySummary {
  const planAmount = historyAttrs.today_plan_amount || 0;
  const actualAmount = historyAttrs.today_real_amount || 0;
  const totalCount = historyAttrs.today_count || timeline.length;
  const completedCount = historyAttrs.today_completed_count || timeline.filter(item => item.isExecuted).length;
  const pendingCount = totalCount - completedCount;

  const isOnline = timeline.length > 0;

  const executedItems = timeline.filter(item => item.isExecuted && item.completedAt);
  const lastFeedingItem = executedItems.length > 0
    ? executedItems.reduce((latest, current) =>
        current.completedAt! > latest.completedAt! ? current : latest
      )
    : undefined;

  const manualAmount = timeline
    .filter(item => item.itemType === 'manual' && item.isExecuted)
    .reduce((sum, item) => sum + (item.actualAmount || 0), 0);

  return {
    planAmount,
    actualAmount,
    manualAmount,
    isOnline,
    lastFeedingTime: lastFeedingItem?.completedAt,
    lastFeedingAmount: lastFeedingItem?.actualAmount,
    totalCount,
    completedCount,
    pendingCount,
  };
}