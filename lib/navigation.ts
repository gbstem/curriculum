/**
 * Wraps window.location.reload to make it easily mockable in tests.
 */
export function reloadPage(): void {
  if (typeof window !== 'undefined') {
    window.location.reload();
  }
}

/**
 * Wraps window.location.href assignment to make page navigation easily mockable in tests.
 */
export function navigateTo(url: string): void {
  if (typeof window !== 'undefined') {
    window.location.href = url;
  }
}
