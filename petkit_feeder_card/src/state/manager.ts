/** 状态管理器 - 统一管理所有状态 */

import { EditState } from './edit-state';
import { PendingChangesManager } from './pending-changes';

/**
 * 状态管理器
 * 统一管理编辑状态和待提交变更
 */
export class StateManager {
  private _editState: EditState = new EditState();
  private _pendingChanges: PendingChangesManager = new PendingChangesManager();

  /** 获取编辑状态 */
  get editState(): EditState {
    return this._editState;
  }

  /** 获取待提交变更 */
  get pendingChanges(): PendingChangesManager {
    return this._pendingChanges;
  }

  /** 是否正在编辑 */
  get isEditing(): boolean {
    return this._editState.isEditing;
  }

  /** 重置所有状态 */
  reset(): void {
    this._editState.cancelEdit();
    this._pendingChanges.clear();
  }
}

// 导出子模块
export { EditState } from './edit-state';
export { PendingChangesManager } from './pending-changes';
export type { EditingItem, OriginalItemData, EditField } from './edit-state';