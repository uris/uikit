import { forwardRef, useImperativeHandle, useRef } from 'react';

export interface UIButtonBakProps {
  label?: string;
}

export interface UIButtonBakHandle {
  triggerClick: () => void;
}

const UIButtonBak = forwardRef<UIButtonBakHandle, UIButtonBakProps>(
  (props, buttonRef) => {
    const { label = undefined } = props;
    const ref = useRef<HTMLDivElement | null>(null);
    useImperativeHandle(buttonRef, () => ({
      triggerClick: () => console.log('hello'),
    }));

    return <div ref={ref}>{label}</div>;
  },
);

UIButtonBak.displayName = 'UIButtonBak';

export { UIButtonBak };
