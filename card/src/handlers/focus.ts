/** 焦点处理 */

/**
 * 检查元素是否是编辑输入框
 */
export function isEditInput(element: Element | null): boolean {
  if (!element) return false;
  return (
    element.classList.contains('edit-time') ||
    element.classList.contains('edit-name') ||
    element.classList.contains('edit-amount')
  );
}

/**
 * 处理卡片失焦
 */
export function handleFocusOut(
  event: FocusEvent,
  containerElement: Element,
  onSavePending: () => void,
  delay: number = 100
): number | null {
  const relatedTarget = event.relatedTarget as Element;

  // 如果焦点还在卡片内，不处理
  if (relatedTarget && containerElement.contains(relatedTarget)) {
    return null;
  }

  // 如果焦点移到编辑输入框，不处理
  if (isEditInput(relatedTarget)) {
    return null;
  }

  // 延迟保存
  return window.setTimeout(onSavePending, delay);
}

/**
 * 检查是否应该跳过保存
 */
export function shouldSkipSave(): boolean {
  const activeEl = document.activeElement;
  return isEditInput(activeEl);
}