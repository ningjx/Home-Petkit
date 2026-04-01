/** 样式汇总 */

import { css } from 'lit';
import { baseStyles } from './base';
import { headerStyles } from './header';
import { buttonStyles } from './button';
import { timelineStyles } from './timeline';
import { formStyles } from './form';
import { summaryStyles } from './summary';
import { stateStyles } from './state';

/**
 * 合并所有样式
 */
export const combineStyles = () => css`
  ${baseStyles}
  ${headerStyles}
  ${buttonStyles}
  ${timelineStyles}
  ${formStyles}
  ${summaryStyles}
  ${stateStyles}
`;

// 导出各模块样式（供单独使用）
export { baseStyles } from './base';
export { headerStyles } from './header';
export { buttonStyles } from './button';
export { timelineStyles } from './timeline';
export { formStyles } from './form';
export { summaryStyles } from './summary';
export { stateStyles } from './state';