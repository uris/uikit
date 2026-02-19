import React, { useMemo } from 'react';
import css from './Badge.module.css';

export interface BadgeProps {
	count?: number | string;
	hideNull?: boolean;
	variant?: 'light' | 'dark';
}

export const Badge = React.memo((props: BadgeProps) => {
	const { count, variant = 'dark', hideNull = true } = props;

	// memo display count
	const displayCount = useMemo(() => {
		if (count === undefined) return '0';
		if (typeof count === 'string') return count;
		return count > 99 ? '99+' : count.toString();
	}, [count]);

	// memo css vars
	const cssVars = useMemo(() => {
		return {
			'--badge-color':
				variant === 'light'
					? `var(--core-text-primary)`
					: `var(--core-text-light)`,
			'--badge-bg':
				variant === 'light'
					? `var(--core-badge-secondary)`
					: `var(--core-badge-primary)`,
		} as React.CSSProperties;
	}, [variant]);

	console.log({ count });

	if (count === undefined || count === '' || (hideNull && count === 0))
		return null;

	return (
		<div className={css.badge} style={cssVars}>
			{displayCount}
		</div>
	);
});
