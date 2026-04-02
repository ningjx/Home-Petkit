/** 数据处理统一入口 */

import { TimelineItem, TodaySummary, WeeklyViewData, DayData } from '../types';
import { parseWeeklyPlans, parseDayRecords, getWeekDates } from './parser';
import { mergeTimeline, PendingChange } from './merger';
import { calculateSummary } from './summary';
import { WEEKDAY_NAMES } from '../utils/constants';

export type { PendingChange };

/**
 * 处理一周数据
 * @param planAttrs 喂食计划实体属性
 * @param historyAttrs 喂食记录实体属性
 * @returns 周视图数据
 */
export function processWeeklyData(
  planAttrs: any,
  historyAttrs: any
): WeeklyViewData {
  const weeklyPlans = parseWeeklyPlans(planAttrs);
  const weekDates = getWeekDates();
  const days = new Map<number, DayData>();

  for (let day = 1; day <= 7; day++) {
    const planData = weeklyPlans.get(day) || { suspended: 0, items: [] };
    const dateStr = weekDates[day - 1];
    const records = parseDayRecords(historyAttrs, dateStr);
    
    const timeline = mergeTimeline(planData.items, records);
    const summary = calculateSummary(historyAttrs, timeline);

    days.set(day, {
      day,
      weekdayName: WEEKDAY_NAMES[day],
      suspended: planData.suspended,
      timeline,
      summary,
    });
  }

  return {
    days,
    lastUpdated: Date.now(),
  };
}

/**
 * 处理单天数据（兼容旧接口）
 * @param planAttrs 喂食计划实体属性
 * @param historyAttrs 喂食记录实体属性
 * @param pendingChanges 待提交变更（可选）
 * @returns 时间线和统计数据
 */
export function processTodayData(
  planAttrs: any,
  historyAttrs: any,
  pendingChanges?: Map<string, PendingChange>
): { timeline: TimelineItem[]; summary: TodaySummary } {
  const weeklyData = processWeeklyData(planAttrs, historyAttrs);
  const today = new Date().getDay();
  const todayNum = today === 0 ? 7 : today;
  const dayData = weeklyData.days.get(todayNum);

  if (!dayData) {
    return {
      timeline: [],
      summary: {
        planAmount: 0,
        actualAmount: 0,
        manualAmount: 0,
        isOnline: false,
        totalCount: 0,
        completedCount: 0,
        pendingCount: 0,
      },
    };
  }

  let timeline = dayData.timeline;
  if (pendingChanges) {
    timeline = applyPendingChanges(timeline, pendingChanges);
  }

  return {
    timeline,
    summary: dayData.summary,
  };
}

/**
 * 应用待提交变更到时间线
 */
function applyPendingChanges(
  timeline: TimelineItem[],
  pendingChanges: Map<string, PendingChange>
): TimelineItem[] {
  const result = timeline.map(item => {
    const change = pendingChanges.get(item.itemId);
    if (!change) return item;

    return {
      ...item,
      time: change.time || item.time,
      name: change.name || item.name,
      plannedAmount: change.amount ?? item.plannedAmount,
      isEnabled: change.enabled !== undefined ? change.enabled : item.isEnabled,
    };
  }).filter(item => {
    const change = pendingChanges.get(item.itemId);
    return !change?.deleted;
  });

  // 添加新计划
  pendingChanges.forEach((change, itemId) => {
    if (change.isNew && !change.deleted) {
      const timeParts = change.time.split(':');
      const timeSeconds = parseInt(timeParts[0]) * 3600 + parseInt(timeParts[1]) * 60;
      
      result.push({
        id: itemId,
        itemId,
        time: change.time,
        timeSeconds,
        name: change.name,
        itemType: 'plan',
        plannedAmount: change.amount,
        isExecuted: false,
        isEnabled: change.enabled !== false,
        canDisable: true,
        canDelete: true,
      });
    }
  });

  return result.sort((a, b) => a.time.localeCompare(b.time));
}