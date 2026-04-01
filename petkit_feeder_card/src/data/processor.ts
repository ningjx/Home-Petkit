/** 数据处理统一入口 */

import { TimelineItem, TodaySummary } from '../types';
import { getTodayDate } from '../utils';
import { parseTodayPlans, parseTodayRecords } from './parser';
import { mergeTimeline, addPendingNewPlans, PendingChange } from './merger';
import { calculateSummary } from './summary';

export type { PendingChange };

/**
 * 处理今日数据
 * @param planAttrs 喂食计划实体属性
 * @param historyAttrs 喂食历史实体属性
 * @param pendingChanges 待提交变更（可选）
 * @returns 时间线和统计数据
 */
export function processTodayData(
  planAttrs: any,
  historyAttrs: any,
  pendingChanges?: Map<string, PendingChange>
): { timeline: TimelineItem[]; summary: TodaySummary } {
  const today = getTodayDate();
  const plans = parseTodayPlans(planAttrs);
  const records = parseTodayRecords(historyAttrs, today);
  let timeline = mergeTimeline(plans, records, pendingChanges);

  // 添加待提交的新计划
  timeline = addPendingNewPlans(timeline, pendingChanges);

  const summary = calculateSummary(historyAttrs, timeline);

  return { timeline, summary };
}