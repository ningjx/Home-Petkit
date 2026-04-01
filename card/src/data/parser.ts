/** 数据解析模块 */

import { FeedingPlanItem, FeedingRecord } from '../types';
import { getTodayWeekday } from '../utils';

/**
 * 解析喂食计划
 * @param attrs 喂食计划实体属性
 * @returns 喂食计划列表
 */
export function parseTodayPlans(attrs: any): FeedingPlanItem[] {
  const weekday = getTodayWeekday();
  const schedule = attrs.schedule || {};
  const todayPlans = schedule[weekday] || [];

  return todayPlans.map((item: any, index: number) => {
    return {
      id: `${weekday}_${index}`,
      itemId: item.id,
      name: item.name || `${weekday}喂食`,
      time: item.time || '',
      amount: item.amount || 0,
      is_enabled: item.suspended !== 1,
      is_completed: false,
      enabled: item.suspended !== 1,
    };
  });
}

/**
 * 解析今日喂食记录
 * @param attrs 喂食历史实体属性
 * @param today 今日日期字符串
 * @returns 喂食记录列表
 */
export function parseTodayRecords(attrs: any, today: string): FeedingRecord[] {
  const history = attrs.history || {};
  const todayRecords = history[today] || [];

  return todayRecords.map((item: any) => {
    return {
      id: item.id,
      date: today,
      time: item.time || '',
      name: item.name || '',
      amount: item.amount || 0,
      real_amount: item.real_amount || item.amount || 0,
      status: item.status || 0,
      is_executed: item.is_executed !== false,
      is_completed: item.is_completed === true,
      completed_at: item.completed_at,
      src: item.src,
    };
  });
}