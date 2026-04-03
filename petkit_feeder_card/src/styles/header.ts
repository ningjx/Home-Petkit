/** 头部样式 */

import { css } from 'lit';

export const headerStyles = css`
  /* 头部 */
  .header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    padding-bottom: 6px;
    border-bottom: 1px solid var(--divider-color);
  }
  
  .header-title {
    font-size: 16px;
    font-weight: bold;
  }
  
  .header-date {
    font-size: 14px;
    font-weight: 600;
    color: var(--secondary-text-color);
    flex: 1;
    text-align: center;
  }
  
  .header-actions {
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;