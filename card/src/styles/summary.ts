/** 统计样式 */

import { css } from 'lit';

export const summaryStyles = css`
  /* 统计行 */
  .summary-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    padding: 6px 8px;
    border: 1px solid var(--divider-color);
    border-radius: 6px;
    background: var(--card-background-color);
  }
  
  .summary-item {
    display: flex;
    flex-direction: column;
    gap: 1px;
    text-align: center;
  }
  
  .summary-item:not(:last-child) {
    border-right: 1px solid var(--divider-color);
  }
  
  .summary-label {
    font-size: 9px;
    color: var(--secondary-text-color);
  }
  
  .summary-value {
    font-size: 12px;
    font-weight: bold;
    color: var(--primary-text-color);
  }
`;