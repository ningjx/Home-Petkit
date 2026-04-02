/** 基础样式 */

import { css } from 'lit';

export const baseStyles = css`
  :host {
    display: block;
  }
  
  ha-card {
    padding: 10px;
  }
  
  /* 区块 */
  .section {
    margin-bottom: 8px;
  }

  /* 周天切换栏 */
  .weekday-tabs {
    display: flex;
    gap: 4px;
    padding: 8px 0;
    margin-bottom: 8px;
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
  }

  .weekday-tab {
    flex: 1;
    padding: 6px 4px;
    border: none;
    border-radius: 4px;
    background: transparent;
    color: var(--secondary-text-color, #757575);
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .weekday-tab:hover {
    background: var(--card-background-color, #f5f5f5);
  }

  .weekday-tab.active {
    background: var(--primary-color, #03a9f4);
    color: white;
    font-weight: 500;
  }

  .weekday-tab.today {
    text-decoration: underline;
  }

  .weekday-tab.active.today {
    text-decoration: none;
  }
`;