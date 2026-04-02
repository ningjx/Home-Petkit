/** 数据解析模块 */

import { FeedingPlanItem, FeedingRecord } from '../types';
import { WEEKDAY_NAMES } from '../utils/constants';

/**
 * 解析一周喂食计划
 * @param attrs 喂食计划实体属性
 * @returns Map<周几数字, 喂食计划列表>
 */
export function parseWeeklyPlans(attrs: any): Map<number, { suspended: number; items: FeedingPlanItem[] }> {
  const result = new Map<number, { suspended: number; items: FeedingPlanItem[] }>();
  const schedule = attrs.schedule || {};

  for (let day = 1; day <= 7; day++) {
    const weekdayName = WEEKDAY_NAMES[day];
    const dayData = schedule[weekdayName] || {};
    const items = dayData.items || [];
    const suspended = dayData.suspended ?? 0;

    const feedingItems: FeedingPlanItem[] = items.map((item: any, index: number) => ({
      id: `${day}_${index}`,
      itemId: item.id,
      name: item.name || `${weekdayName}喂食`,
      time: item.time || '',
      amount: item.amount || 0,
      is_enabled: suspended !== 1,
      is_completed: false,
      enabled: suspended !== 1,
    }));

    result.set(day, { suspended, items: feedingItems });
  }

  return result;
}

/**
 * 解析指定日期的喂食记录
 * @param attrs 喂食记录实体属性
 * @param date 日期字符串 (YYYY-MM-DD)
 * @returns 喂食记录列表
 */
export function parseDayRecords(attrs: any, date: string): FeedingRecord[] {
  const records = attrs.records || {};
  const dayData = records[date] || {};
  const items = dayData.items || [];

  return items.map((item: any) => {
    const state = item.state || {};
    return {
      id: item.id,
      date: date,
      time: item.time || '',
      name: item.name || '',
      amount: item.amount || 0,
      real_amount: state.real_amount || item.amount || 0,
      status: item.status || 0,
      is_executed: item.is_executed !== false,
      is_completed: state.completed_at !== null && state.completed_at !== undefined,
      completed_at: state.completed_at,
      src: item.src,
    };
  });
}

/**
 * 获取本周日期列表（周一到周日）
 * @returns 日期字符串数组 ['YYYY-MM-DD', ...]
 */
export function getWeekDates(): string[] {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  
  const dates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + mondayOffset + i);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    dates.push(`${year}-${month}-${day}`);
  }
  
  return dates;
}

/**
 * 根据日期获取周几数字
 * @param dateStr 日期字符串 YYYY-MM-DD
 * @returns 1-7
 */
export function getWeekdayFromDate(dateStr: string): number {
  const parts = dateStr.split('-');
  const date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
  const day = date.getDay();
  return day === 0 ? 7 : day;
}