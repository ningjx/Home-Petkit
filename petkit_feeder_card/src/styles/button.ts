/** 按钮样式 */

import { css } from 'lit';

export const buttonStyles = css`
  /* 统一的图标按钮样式 */
  .icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: 50%;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }
  
  .icon-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: currentColor;
    opacity: 0;
    transition: opacity 0.2s;
  }
  
  .icon-btn:hover::before {
    opacity: 0.1;
  }
  
  .icon-btn:active {
    transform: scale(0.92);
  }
  
  .icon-btn:focus {
    outline: 2px solid var(--primary-color, #03a9f4);
    outline-offset: 2px;
  }
  
  .btn-svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  /* 刷新按钮 - 旋转动画 */
  .refresh-btn {
    color: var(--primary-text-color, #212121);
  }
  
  .refresh-btn:hover::before {
    opacity: 0;
  }
  
  .refresh-btn:hover .btn-svg {
    transform: rotate(180deg);
  }
  
  /* 手动喂食按钮 - 主要操作，突出显示 */
  .feed-btn {
    width: 36px;
    height: 36px;
    background: var(--primary-color, #03a9f4);
    color: white;
    box-shadow: 0 0 0 1px rgba(3, 169, 244, 0.1), 0 0 8px 2px rgba(3, 169, 244, 0.3);
  }
  
  .feed-btn::before {
    background: white;
  }
  
  .feed-btn:hover {
    box-shadow: 0 0 0 1px rgba(3, 169, 244, 0.15), 0 0 12px 3px rgba(3, 169, 244, 0.4);
  }
  
  .feed-btn:active {
    transform: scale(0.95);
  }
  
  .feed-btn .btn-svg {
    width: 20px;
    height: 20px;
  }
  
  .feed-btn:hover .btn-svg {
    transform: scale(1.1);
  }
  
  /* 编辑按钮 */
  .edit-btn {
    padding: 4px 8px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    font-weight: bold;
  }
  
  .edit-btn.save {
    background-color: var(--success-color, #4caf50);
    color: white;
  }
  
  .edit-btn.cancel {
    background-color: #ccc;
    color: #333;
  }
  
  .edit-btn:hover {
    opacity: 0.8;
  }
  
  /* 新增计划按钮 */
  .add-plan-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 24px;
    padding: 0;
    border: 1px dashed var(--divider-color);
    background: transparent;
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.2s ease;
  }
  
  .add-plan-btn:hover {
    border-color: var(--primary-color, #03a9f4);
    background: rgba(3, 169, 244, 0.05);
  }
  
  .add-plan-btn:hover .add-plus,
  .add-plan-btn:hover .add-plus::after {
    background: var(--primary-color, #03a9f4);
  }
  
  .add-plan-btn:active {
    transform: scale(0.98);
  }
  
  .add-plus {
    position: relative;
    width: 16px;
    height: 2px;
    background: var(--secondary-text-color, #757575);
    border-radius: 2px;
    transition: background 0.2s ease;
  }
  
  .add-plus::after {
    content: '';
    position: absolute;
    top: -7px;
    left: 7px;
    width: 2px;
    height: 16px;
    background: var(--secondary-text-color, #757575);
    border-radius: 2px;
    transition: background 0.2s ease;
  }
  
  /* 删除图标按钮 */
  .icon-delete-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: 50%;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: visible;
  }
  
  .icon-delete-btn::before {
    content: '';
    position: absolute;
    inset: -6px;
    background: var(--error-color, #f44336);
    opacity: 0;
    transition: opacity 0.2s;
    border-radius: 50%;
    z-index: -1;
  }
  
  .icon-delete-btn:hover::before {
    opacity: 0.15;
  }
  
  .icon-delete-btn:active {
    transform: scale(0.9);
  }
  
  .delete-icon {
    width: 16px;
    height: 16px;
    fill: var(--secondary-text-color, #757575);
    transition: transform 0.2s ease;
  }
  
  .icon-delete-btn:hover .delete-icon {
    fill: var(--error-color, #f44336);
    transform: scale(1.1);
  }
  
  /* 禁用状态的按钮 */
  .icon-delete-btn.disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
  
  .icon-delete-btn.disabled:hover::before {
    opacity: 0;
  }
  
  .icon-delete-btn.disabled:hover .delete-icon {
    fill: var(--secondary-text-color, #757575);
    transform: none;
  }
  
  /* 开关样式 */
  .toggle-switch {
    position: relative;
    width: 28px;
    height: 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }
  
  .toggle-switch:hover {
    transform: scale(1.1);
  }
  
  .toggle-switch.on {
    background: var(--primary-color, #03a9f4);
  }
  
  .toggle-switch.off {
    background: var(--disabled-color, #bdbdbd);
  }
  
  .toggle-switch.disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
  
  .toggle-switch.disabled:hover {
    transform: none;
  }
  
  .toggle-thumb {
    position: absolute;
    top: 2px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .toggle-switch.on .toggle-thumb {
    transform: translateX(14px);
  }
  
  .toggle-switch.off .toggle-thumb {
    transform: translateX(2px);
  }
  
  .toggle-switch:hover .toggle-thumb {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  }
  
  .toggle-switch:active .toggle-thumb {
    width: 16px;
  }
  
  .toggle-switch.on:active .toggle-thumb {
    transform: translateX(10px);
  }
  
  .toggle-switch.off:active .toggle-thumb {
    transform: translateX(0px);
  }
  
  .action-btn {
    --mdc-typography-button-font-size: 11px;
    --mdc-button-horizontal-padding: 6px;
    --mdc-button-vertical-padding: 3px;
    min-width: auto;
  }
  
  .action-btn.danger {
    --mdc-theme-primary: var(--error-color, #f44336);
  }
`;