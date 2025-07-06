import clsx from 'clsx';
import Link from 'next/link';

export function SponsorPlaceholder({
    href = "https://github.com/sponsors/stevebauman",
    className,
    faded = false,
    children = "Your Logo Here",
    subtitle = "Become a featured sponsor",
    target = "_blank",
    size = "large"
}) {
    const sizeStyles = {
        large: {
            container: 'px-12 py-8',
            text: 'text-lg font-medium',
            subtitle: 'mt-2 text-sm'
        },
        small: {
            container: 'p-6',
            text: 'text-sm font-medium',
            subtitle: 'mt-1 text-xs'
        }
    };

    const currentSize = sizeStyles[size];

    return (
        <Link
            href={href}
            target={target}
            className={clsx(
                'group inline-block rounded-lg border-2 border-dashed transition-colors',
                currentSize.container,
                faded
                    ? 'border-zinc-300/60 opacity-60 hover:border-purple-300/60 hover:bg-purple-50/30 hover:opacity-80 dark:border-zinc-600/60 dark:hover:border-purple-400/60 dark:hover:bg-purple-500/3'
                    : 'border-zinc-300 hover:border-purple-300 hover:bg-purple-50/50 dark:border-zinc-600 dark:hover:border-purple-400 dark:hover:bg-purple-500/5',
                className
            )}
        >
            <div className={clsx(
                currentSize.text,
                'text-zinc-600 group-hover:text-purple-600 dark:text-zinc-400 dark:group-hover:text-purple-400'
            )}>
                {children}
            </div>
            <div className={clsx(
                currentSize.subtitle,
                'text-zinc-500 dark:text-zinc-500'
            )}>
                {subtitle}
            </div>
        </Link>
    );
}
