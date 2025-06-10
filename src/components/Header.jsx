import clsx from 'clsx';
import Link from 'next/link';
import { forwardRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import { Logo } from '@/components/Logo';
import { CloseButton } from '@headlessui/react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { MobileSearch, Search } from '@/components/Search';
import {
    MobileNavigation,
    useMobileNavigationStore,
    useIsInsideMobileNavigation,
} from '@/components/MobileNavigation';

function TopLevelNavItem({ href, children }) {
    return (
        <li>
            <Link
                href={href}
                className="text-sm/5 text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
                {children}
            </Link>
        </li>
    );
}

export const Header = forwardRef(function Header({ className, ...props }, ref) {
    let { isOpen: mobileNavIsOpen } = useMobileNavigationStore();

    let isInsideMobileNavigation = useIsInsideMobileNavigation();

    let { scrollY } = useScroll();

    let bgOpacityLight = useTransform(scrollY, [0, 72], ['50%', '90%']);
    let bgOpacityDark = useTransform(scrollY, [0, 72], ['20%', '80%']);

    return (
        <motion.div
            {...props}
            ref={ref}
            className={clsx(
                className,
                'fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 px-4 transition sm:px-6 lg:left-72 lg:z-30 lg:px-8 xl:left-80',
                !isInsideMobileNavigation &&
                    'backdrop-blur-xs lg:left-72 xl:left-80 dark:backdrop-blur-sm',
                isInsideMobileNavigation
                    ? 'bg-white dark:bg-zinc-900'
                    : 'bg-white/(--bg-opacity-light) dark:bg-zinc-900/(--bg-opacity-dark)',
            )}
            style={{
                '--bg-opacity-light': bgOpacityLight,
                '--bg-opacity-dark': bgOpacityDark,
            }}
        >
            <div
                className={clsx(
                    'absolute inset-x-0 top-full h-px transition',
                    (isInsideMobileNavigation || !mobileNavIsOpen) &&
                        'bg-zinc-900/7.5 dark:bg-white/7.5',
                )}
            />

            <Search />

            <div className="flex items-center gap-5 lg:hidden">
                <MobileNavigation />

                <CloseButton as={Link} href="/" aria-label="Home">
                    <Logo className="h-8 dark:fill-white" />
                </CloseButton>
            </div>

            <div className="flex items-center gap-5">
                <div className="flex gap-4">
                    <MobileSearch />

                    <ThemeToggle />
                </div>
            </div>
        </motion.div>
    );
});
