import { useEffect, useMemo } from 'react';

import UiIcon from '../Icon/UiIcon';

// --

interface Props {
  alignRight?: boolean;
  hideHeader?: boolean;
  children: React.ReactNode;
  isOpen: boolean;
  title?: React.ReactNode;
  customPadding?: string;
  onClose: () => void;
}

export default function UiModal({
  alignRight,
  hideHeader,
  children,
  isOpen,
  title,
  customPadding,
  onClose,
}: Props) {
  const cardStyle = useMemo(() => {
    if (alignRight)
      return 'fixed top-0 right-0 bottom-0 z-50 h-screen bg-[#fff]';

    return 'fixed z-50 right-0 bottom-0 sm:top-1/2 sm:-translate-y-1/2  left-0  sm:w-fit h-fit mx-auto bg-white rounded-t-[20px] sm:rounded-xl';
  }, [alignRight]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  if (!isOpen) return <></>;

  return (
    <div className="prevent-zoom">
      <div
        className="prevent-zoom fixed w-full h-full inset-0 p-96 flex items-center justify-center z-50 bg-[#12121280]"
        onClick={onClose}
      />
      <div
        style={{
          padding: customPadding,
        }}
        className={`modal prevent-zoom overflow-hidden  border border-lines-100 shadow-auth-card-shadow box-border ${cardStyle} ${!customPadding && 'p-4'}`}
      >
        {!hideHeader && (
          <header
            className={`sticky top-0 left-0 w-full z-50 bg-white flex justify-between items-center py-[3px] ${
              !alignRight && 'rounded-t-2xl'
            }`}
          >
            <h2 className="flex-1 text-secondary-700 text-xl font-semibold">
              {title}
            </h2>

            <button
              onClick={onClose}
              className="shrink-0 w-6 h-6 rounded-full flex justify-center items-center stroke-black bg-stroke-200"
            >
              <UiIcon icon="X" size="20" />
            </button>
          </header>
        )}

        <div>{children}</div>
      </div>
    </div>
  );
}
