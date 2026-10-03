import clsx from 'clsx';
import Image from 'next/image';

export function AutomatticSponsor({ className }) {
    return (
        <a
            href="https://github.com/Automattic"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
                'block rounded-lg border border-zinc-200 transition-colors hover:border-purple-300 dark:border-zinc-700 dark:hover:border-purple-400',
                className
            )}
        >
            <Image
                src="/sponsors/automattic-color.png"
                alt="Automattic"
                width={1297}
                height={432}
                className="h-auto w-full dark:hidden"
            />
            <Image
                src="/sponsors/automattic-white.png"
                alt="Automattic"
                width={1297}
                height={432}
                className="hidden h-auto w-full dark:block"
            />
        </a>
    );
}
