import Link from 'next/link';
import { PropsWithChildren, useEffect } from 'react';
import NProgress from 'nprogress';
import '@/utils/lib/nprogress/nprogress.css';

export const Linkn: React.FC<PropsWithChildren<{ href: string }>> = ({
  href,
  children,
}: {
  href?: any;
  children?: any;
}) => {
  useEffect(() => {
    return () => {
      NProgress.done();
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldStartAnimation(e)) {
      NProgress.start();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (shouldStartAnimation(e)) {
      NProgress.start();
    }
  };

  const shouldStartAnimation = (
    e:
      | React.MouseEvent<HTMLAnchorElement>
      | React.KeyboardEvent<HTMLAnchorElement>,
  ): boolean => {
    // Check if it's a left mouse click without any keyboard modifiers
    if (
      (e as React.MouseEvent<HTMLAnchorElement>).button === 0 &&
      !(e as React.MouseEvent<HTMLAnchorElement>).ctrlKey &&
      !(e as React.MouseEvent<HTMLAnchorElement>).shiftKey &&
      !(e as React.MouseEvent<HTMLAnchorElement>).metaKey
    ) {
      // Get the current pathname from window.location
      const currentPathname = window.location.pathname;

      // Check if the link's href is the same as the current pathname
      if (href === currentPathname) {
        return false; // Don't start the animation for same route links
      }

      return true;
    }

    // Check for middle mouse button click
    if ((e as React.MouseEvent<HTMLAnchorElement>).button === 1) {
      return false;
    }

    // Check for right mouse button click
    if ((e as React.MouseEvent<HTMLAnchorElement>).button === 2) {
      return false;
    }

    // Check if it's an accessibility event (e.g., screen reader activation)
    if (
      e.type === 'click' &&
      (e as React.MouseEvent<HTMLAnchorElement>).detail === 0
    ) {
      return true;
    }

    return false;
  };

  return (
    <Link href={href} legacyBehavior>
      <a
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0} // Ensure the link is keyboard focusable
      >
        {children}
      </a>
    </Link>
  );
};
