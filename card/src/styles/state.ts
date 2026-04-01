/** 状态样式（空状态、错误状态） */

import { css } from 'lit';

export const stateStyles = css`
  /* 空状态 */
  .empty-state {
    text-align: center;
    padding: 16px 0;
    color: var(--secondary-text-color);
  }
  
  .empty-state ha-icon {
    --mdc-icon-size: 32px;
    margin-bottom: 8px;
    opacity: 0.5;
  }
  
  .empty-state p {
    margin: 0;
    font-size: 12px;
  }
  
  /* 错误状态 */
  .error-state {
    text-align: center;
    padding: 16px 0;
    color: var(--error-color, #f44336);
  }
  
  .error-state ha-icon {
    --mdc-icon-size: 32px;
    margin-bottom: 8px;
  }
  
  .error-state p {
    margin: 0;
    font-size: 12px;
  }
`;