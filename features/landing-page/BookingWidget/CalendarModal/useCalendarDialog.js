import { useEffect, useRef } from 'react';

export default function useCalendarDialog() {
  const dialogRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const body = document.body;
    const root = document.documentElement;
    const opener = document.activeElement;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    const bodyPadding =
      parseFloat(window.getComputedStyle(body).paddingRight) || 0;

    const previousOverflow = root.style.overflow;
    const previousScrollBehavior = root.style.scrollBehavior;

    const previousBody = Object.fromEntries(
      ['position', 'top', 'left', 'width', 'overflow', 'paddingRight'].map(
        (property) => [property, body.style[property]],
      ),
    );

    // Freeze the page behind the dialog, including on mobile browsers.
    root.style.overflow = 'hidden';

    Object.assign(body.style, {
      position: 'fixed',
      top: `-${scrollY}px`,
      left: `-${scrollX}px`,
      width: '100%',
      overflow: 'hidden',
      paddingRight: `${bodyPadding + scrollbarWidth}px`,
    });

    // The browser's top layer is above the header and hero stacking contexts.
    dialog.showModal();
    titleRef.current?.focus({ preventScroll: true });

    return () => {
      if (dialog.open) {
        dialog.close();
      }

      Object.assign(body.style, previousBody);

      root.style.overflow = previousOverflow;
      root.style.scrollBehavior = 'auto';

      window.scrollTo(scrollX, scrollY);

      root.style.scrollBehavior = previousScrollBehavior;

      if (opener instanceof HTMLElement && opener.isConnected) {
        opener.focus({ preventScroll: true });
      }
    };
  }, []);

  return { dialogRef, titleRef };
}
