import Link from 'next/link';
import {
    ArrowRightIcon,
    CircleStackIcon,
    MagnifyingGlassIcon,
    ShieldCheckIcon,
    Square3Stack3DIcon,
    UsersIcon,
    ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';

const icons = {
    search: MagnifyingGlassIcon,
    models: Square3Stack3DIcon,
    users: UsersIcon,
    authentication: ShieldCheckIcon,
    database: CircleStackIcon,
    import: ArrowDownTrayIcon,
};

export function PackageLanding({ children }) {
    return (
        <div className="not-prose mx-auto! max-w-6xl! text-zinc-600 dark:text-zinc-400 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-zinc-900 dark:[&_h2]:text-white">
            {children}
        </div>
    );
}

export function PackageHero({ children }) {
    return (
        <div className="grid items-center gap-8 border-b border-zinc-900/10 pt-4 pb-12 xl:grid-cols-2 xl:gap-10 dark:border-white/10 [&_h1]:mb-5 [&_h1]:text-4xl [&_h1]:font-semibold [&_h1]:tracking-tight [&_h1]:text-zinc-900 sm:[&_h1]:text-5xl dark:[&_h1]:text-white [&_p]:text-base [&_p]:leading-7 [&>div]:min-w-0">
            {children}
        </div>
    );
}

export function PackageCards({ items }) {
    return (
        <div className="mt-6 grid gap-4 md:grid-cols-3">
            {items.map(({ title, description, href, icon }) => {
                let Icon = icons[icon];

                return (
                    <Link
                        key={href}
                        href={href}
                        className="group rounded-2xl border border-zinc-200 p-6 transition hover:border-purple-300 hover:bg-purple-50/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-500 dark:border-zinc-800 dark:hover:border-purple-500/50 dark:hover:bg-purple-500/5"
                    >
                        <Icon
                            aria-hidden="true"
                            className="mb-5 h-6 w-6 text-purple-600 dark:text-purple-400"
                        />
                        <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
                            {title}
                        </h3>
                        <p className="mt-2 text-sm leading-6">{description}</p>
                        <ArrowRightIcon
                            aria-hidden="true"
                            className="mt-5 h-5 w-5 text-zinc-400 transition group-hover:translate-x-1 group-hover:text-purple-600 dark:group-hover:text-purple-400"
                        />
                    </Link>
                );
            })}
        </div>
    );
}

export function PackageSteps({ items }) {
    return (
        <ol className="mt-6 grid gap-6 rounded-2xl bg-zinc-50 p-6 md:grid-cols-3 dark:bg-white/3">
            {items.map(({ title, description, href }, index) => (
                <li key={href}>
                    <Link
                        href={href}
                        className="group flex items-start gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-500"
                    >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-purple-200 text-xs font-semibold text-purple-700 dark:border-purple-400/25 dark:text-purple-400">
                            {index + 1}
                        </span>
                        <div>
                            <h3 className="text-sm leading-7 font-semibold text-zinc-900 group-hover:text-purple-600 dark:text-white dark:group-hover:text-purple-400">
                                {title}
                            </h3>
                            <p className="mt-1 text-sm leading-6">
                                {description}
                            </p>
                        </div>
                    </Link>
                </li>
            ))}
        </ol>
    );
}
