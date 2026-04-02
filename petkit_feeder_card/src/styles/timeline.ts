/** 时间线样式 */

import { css } from 'lit';

export const timelineStyles = css`
  /* 时间线条目（紧凑布局） */
  .timeline-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  
  .timeline-item {
    border: 1px solid var(--divider-color);
    border-radius: 6px;
    padding: 8px 10px;
    background: var(--card-background-color);
  }
  
  .timeline-item.manual {
    background: var(--secondary-background-color);
  }
  
  .item-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 0;
  }
  
  .time {
    font-weight: bold;
    font-size: 12px;
    color: var(--primary-color);
    flex-shrink: 0;
    width: 55px;
  }
  
  .name {
    font-size: 11px;
    color: var(--secondary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex: 1 1 auto;
    min-width: 14px;
  }
  
  .amount {
    font-weight: bold;
    font-size: 11px;
    color: var(--primary-text-color);
    flex-shrink: 0;
    width: 40px;
    text-align: center;
  }
  
  .status-icon {
    flex-shrink: 0;
  }
  
  .item-actions {
    flex-shrink: 0;
  }
  
  .time.editable, .name.editable, .amount.editable {
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.2s;
  }
  
  .time.editable:hover, .name.editable:hover, .amount.editable:hover {
    background-color: var(--primary-color, #03a9f4);
    color: white;
  }
  
  /* 编辑模式 */
  .timeline-item.editing {
    background-color: rgba(3, 169, 244, 0.1);
    border: 1px solid var(--primary-color, #03a9f4);
  }
  
  /* 状态图标 */
  .status-icon {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    transition: transform 0.2s ease;
  }
  
  .status-icon:hover {
    transform: scale(1.1);
  }
  
  .status-icon.done {
    /* 绿色对号 */
  }
  
  .status-icon.pending {
    /* 灰色对号，绿色圆环 */
  }
  
  .status-done {
    color: var(--success-color, #4caf50);
  }
  
  .status-pending {
    color: var(--warning-color, #ff9800);
  }
  
  .item-actions {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: flex-end;
  }
  
  /* 禁用状态的计划项 */
  .timeline-item.disabled {
    opacity: 0.5;
  }
  
  /* 已删除计划的记录项 */
  .timeline-item.plan-deleted {
    opacity: 0.4;
  }
  
  .timeline-item.plan-deleted .time,
  .timeline-item.plan-deleted .name,
  .timeline-item.plan-deleted .amount {
    color: var(--disabled-text-color, #9e9e9e);
  }
  
  /* 时间线列表底部（新增计划按钮） */
  .timeline-list-footer {
    margin-top: 6px;
    margin-bottom: 8px;
  }
`;