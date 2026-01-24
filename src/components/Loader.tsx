type LoaderColor = 'green' | 'blue' | 'red' | 'emerald' | 'purple';
type LoaderSize = 'sm' | 'md' | 'lg';

interface LoaderProps {
	color?: LoaderColor;
	size?: LoaderSize;
	label?: string;
}

const COLOR_MAP: Record<LoaderColor, { border: string; text: string }> = {
	green: { border: 'border-green-500', text: 'text-green-600' },
	blue: { border: 'border-blue-500', text: 'text-blue-600' },
	red: { border: 'border-red-500', text: 'text-red-600' },
	emerald: { border: 'border-emerald-500', text: 'text-emerald-600' },
	purple: { border: 'border-purple-500', text: 'text-purple-600' },
};

const SIZE_MAP: Record<LoaderSize, string> = {
	sm: 'w-6 h-6 border-2',
	md: 'w-10 h-10 border-4',
	lg: 'w-16 h-16 border-4',
};

const Loader = ({
	color = 'green',
	size = 'md',
	label = 'Loading...',
}: LoaderProps) => {
	const { border, text } = COLOR_MAP[color];

	return (
		<div
			className="flex flex-col items-center justify-center"
			role="status"
			aria-live="polite"
		>
			<div
				className={`rounded-full border-dashed animate-spin ${border} ${SIZE_MAP[size]}`}
			/>
			{label && <p className={`mt-3 text-sm font-medium ${text}`}>{label}</p>}
			<span className="sr-only">{label}</span>
		</div>
	);
};

export { Loader };
