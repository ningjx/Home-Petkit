/** 待提交变更管理 */

import { PendingChange } from '../data';

/**
 * 待提交变更管理类
 */
export class PendingChangesManager {
  private _changes: Map<string, PendingChange> = new Map();

  /** 获取所有变更 */
  get changes(): Map<string, PendingChange> {
    return this._changes;
  }

  /** 获取指定项的变更 */
  get(itemId: string): PendingChange | undefined {
    return this._changes.get(itemId);
  }

  /** 设置变更 */
  set(itemId: string, change: PendingChange): void {
    this._changes.set(itemId, change);
  }

  /** 删除变更 */
  delete(itemId: string): boolean {
    return this._changes.delete(itemId);
  }

  /** 是否有变更 */
  has(itemId: string): boolean {
    return this._changes.has(itemId);
  }

  /** 清空所有变更 */
  clear(): void {
    this._changes.clear();
  }

  /** 获取变更数量 */
  get size(): number {
    return this._changes.size;
  }

  /** 遍历变更 */
  forEach(callback: (change: PendingChange, itemId: string) => void): void {
    this._changes.forEach(callback);
  }

  /** 添加新计划 */
  addNewPlan(itemId: string, time: string, name: string, amount: number): void {
    this._changes.set(itemId, {
      time,
      name,
      amount,
      isNew: true,
      enabled: true,
    });
  }

  /** 更新计划 */
  updatePlan(itemId: string, time: string, name: string, amount: number): void {
    const existing = this._changes.get(itemId);
    if (existing) {
      existing.time = time;
      existing.name = name;
      existing.amount = amount;
    } else {
      this._changes.set(itemId, { time, name, amount });
    }
  }

  /** 禁用/启用计划 */
  togglePlan(itemId: string, enabled: boolean): void {
    const existing = this._changes.get(itemId);
    if (existing) {
      existing.enabled = enabled;
    } else {
      this._changes.set(itemId, { time: '', name: '', amount: 0, enabled });
    }
  }

  /** 标记删除 */
  markDeleted(itemId: string): void {
    const existing = this._changes.get(itemId);
    if (existing) {
      existing.deleted = true;
    } else {
      this._changes.set(itemId, { time: '', name: '', amount: 0, deleted: true });
    }
  }

  /** 检查是否是新计划 */
  isNew(itemId: string): boolean {
    const change = this._changes.get(itemId);
    return change?.isNew === true;
  }

  /** 检查是否已删除 */
  isDeleted(itemId: string): boolean {
    const change = this._changes.get(itemId);
    return change?.deleted === true;
  }
}