/** 编辑状态类型 */

/** 编辑字段类型 */
export type EditField = 'time' | 'name' | 'amount';

/** 编辑项数据 */
export interface EditingItem {
  itemId: string;
  field: EditField;
  time: string;
  name: string;
  amount: number;
}

/** 原始项数据 */
export interface OriginalItemData {
  time: string;
  name: string;
  amount: number;
}

/**
 * 编辑状态管理类
 */
export class EditState {
  private _editingItem: EditingItem | null = null;
  private _originalItemData: OriginalItemData | null = null;
  private _saveTimeout: number | null = null;

  /** 获取当前编辑项 */
  get editingItem(): EditingItem | null {
    return this._editingItem;
  }

  /** 获取原始数据 */
  get originalItemData(): OriginalItemData | null {
    return this._originalItemData;
  }

  /** 获取保存定时器 */
  get saveTimeout(): number | null {
    return this._saveTimeout;
  }

  /** 设置保存定时器 */
  set saveTimeout(value: number | null) {
    this._saveTimeout = value;
  }

  /** 是否正在编辑 */
  get isEditing(): boolean {
    return this._editingItem !== null;
  }

  /** 开始编辑 */
  startEdit(
    itemId: string,
    field: EditField,
    time: string,
    name: string,
    amount: number,
    originalTime: string,
    originalName: string,
    originalAmount: number
  ): void {
    this._editingItem = { itemId, field, time, name, amount };
    this._originalItemData = { time: originalTime, name: originalName, amount: originalAmount };
  }

  /** 更新编辑数据 */
  updateEditData(time?: string, name?: string, amount?: number): void {
    if (this._editingItem) {
      if (time !== undefined) this._editingItem.time = time;
      if (name !== undefined) this._editingItem.name = name;
      if (amount !== undefined) this._editingItem.amount = amount;
    }
  }

  /** 切换编辑字段 */
  switchField(field: EditField): void {
    if (this._editingItem) {
      this._editingItem.field = field;
    }
  }

  /** 取消编辑 */
  cancelEdit(): void {
    this._editingItem = null;
    this._originalItemData = null;
    if (this._saveTimeout !== null) {
      clearTimeout(this._saveTimeout);
      this._saveTimeout = null;
    }
  }

  /** 完成编辑 */
  completeEdit(): void {
    this._editingItem = null;
    this._originalItemData = null;
    if (this._saveTimeout !== null) {
      clearTimeout(this._saveTimeout);
      this._saveTimeout = null;
    }
  }

  /** 检查是否有变更 */
  hasChanges(): boolean {
    if (!this._editingItem || !this._originalItemData) return false;
    return (
      this._editingItem.time !== this._originalItemData.time ||
      this._editingItem.name !== this._originalItemData.name ||
      this._editingItem.amount !== this._originalItemData.amount
    );
  }
}