'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion, useIsPresent } from 'framer-motion';

import { Tag } from '@/components/Tag';
import { remToPx } from '@/lib/remToPx';
import { Button } from '@/components/Button';
import { CloseButton } from '@headlessui/react';
import { getNavigation } from '@/lib/navigation';
import { useSectionStore } from '@/components/SectionProvider';
import { useIsInsideMobileNavigation } from '@/components/MobileNavigation';
import {
    VersionSelector,
    parsePackageAndVersion,
} from '@/components/VersionSelector';

function useInitialValue(value, condition = true) {
    let initialValue = useRef(value).current;

    return condition ? initialValue : value;
}

function TopLevelNavItem({ href, children }) {
    return (
        <li className="md:hidden">
            <CloseButton
                as={Link}
                href={href}
                className="block py-1 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
                {children}
            </CloseButton>
        </li>
    );
}

function NavLink({
    href,
    children,
    tag,
    active = false,
    isAnchorLink = false,
}) {
    return (
        <CloseButton
            as={Link}
            href={href}
            aria-current={active ? 'page' : undefined}
            className={clsx(
                'flex justify-between gap-2 py-1 pr-3 text-sm transition',
                isAnchorLink ? 'pl-7' : 'pl-4',
                active
                    ? 'text-zinc-900 dark:text-white'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white',
            )}
        >
            <span className="truncate">{children}</span>
            {tag && (
                <Tag variant="small" color="zinc">
                    {tag}
                </Tag>
            )}
        </CloseButton>
    );
}

function VisibleSectionHighlight({ group, pathname }) {
    let [sections, visibleSections] = useInitialValue(
        [
            useSectionStore((s) => s.sections),
            useSectionStore((s) => s.visibleSections),
        ],
        useIsInsideMobileNavigation(),
    );

    let isPresent = useIsPresent();
    let firstVisibleSectionIndex = Math.max(
        0,
        [{ id: '_top' }, ...sections].findIndex(
            (section) => section.id === visibleSections[0],
        ),
    );
    let itemHeight = remToPx(2);
    let height = isPresent
        ? Math.max(1, visibleSections.length) * itemHeight
        : itemHeight;
    let top =
        group.links.findIndex((link) => link.href === pathname) * itemHeight +
        firstVisibleSectionIndex * itemHeight;

    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2 } }}
            exit={{ opacity: 0 }}
            className="absolute inset-x-0 top-0 bg-zinc-800/2.5 will-change-transform dark:bg-white/2.5"
            style={{ borderRadius: 8, height, top }}
        />
    );
}

function ActivePageMarker({ group, pathname }) {
    let itemHeight = remToPx(2);
    let offset = remToPx(0.25);
    let activePageIndex = group.links.findIndex(
        (link) => link.href === pathname,
    );
    let top = offset + activePageIndex * itemHeight;

    return (
        <motion.div
            layout
            className="absolute left-2 h-6 w-px bg-purple-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2 } }}
            exit={{ opacity: 0 }}
            style={{ top }}
        />
    );
}

function NavigationGroup({ group, className }) {
    // If this is the mobile navigation then we always render the initial
    // state, so that the state does not change during the close animation.
    // The state will still update when we re-open (re-render) the navigation.
    let isInsideMobileNavigation = useIsInsideMobileNavigation();
    let [pathname, sections] = useInitialValue(
        [usePathname(), useSectionStore((s) => s.sections)],
        isInsideMobileNavigation,
    );

    let isActiveGroup =
        group.links.findIndex((link) => link.href === pathname) !== -1;

    return (
        <li className={clsx('relative mt-6', className)}>
            <motion.h2
                layout="position"
                className="text-xs font-semibold text-zinc-900 dark:text-white"
            >
                {group.title}
            </motion.h2>

            <div className="relative mt-3 pl-2">
                <AnimatePresence initial={!isInsideMobileNavigation}>
                    {isActiveGroup && (
                        <VisibleSectionHighlight
                            group={group}
                            pathname={pathname}
                        />
                    )}
                </AnimatePresence>

                <motion.div
                    layout
                    className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"
                />

                <AnimatePresence initial={false}>
                    {isActiveGroup && (
                        <ActivePageMarker group={group} pathname={pathname} />
                    )}
                </AnimatePresence>

                <ul role="list" className="border-l border-transparent">
                    {group.links.map((link) => (
                        <motion.li
                            key={link.href}
                            layout="position"
                            className="relative"
                        >
                            <NavLink
                                href={link.href}
                                active={link.href === pathname}
                            >
                                {link.title}
                            </NavLink>

                            <AnimatePresence mode="popLayout" initial={false}>
                                {link.href === pathname &&
                                    sections.length > 0 && (
                                        <motion.ul
                                            role="list"
                                            initial={{ opacity: 0 }}
                                            animate={{
                                                opacity: 1,
                                                transition: { delay: 0.1 },
                                            }}
                                            exit={{
                                                opacity: 0,
                                                transition: { duration: 0.15 },
                                            }}
                                        >
                                            {sections.map((section) => (
                                                <li key={section.id}>
                                                    <NavLink
                                                        href={`${link.href}#${section.id}`}
                                                        tag={section.tag}
                                                        isAnchorLink
                                                    >
                                                        {section.title}
                                                    </NavLink>
                                                </li>
                                            ))}
                                        </motion.ul>
                                    )}
                            </AnimatePresence>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </li>
    );
}

// Package selector component
function PackageSelector({ currentPackage, onPackageChange }) {
    const packages = [
        { id: 'core', name: 'Core' },
        { id: 'laravel', name: 'Laravel' },
    ];

    return (
        <div className="mb-4">
            <div className="mb-2 text-xs font-semibold text-zinc-900 dark:text-white">
                Package
            </div>

            <div
                role="tablist"
                aria-orientation="horizontal"
                className="grid w-full grid-cols-2 items-center justify-center rounded-lg bg-zinc-100 p-1 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
            >
                {packages.map((pkg) => (
                    <button
                        key={pkg.id}
                        role="tab"
                        type="button"
                        aria-selected={currentPackage === pkg.id}
                        data-state={
                            currentPackage === pkg.id ? 'active' : 'inactive'
                        }
                        onClick={() => onPackageChange(pkg.id)}
                        className={clsx(
                            'ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center rounded-md px-3 py-1 text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
                            currentPackage === pkg.id
                                ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-900 dark:text-zinc-100'
                                : 'hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50',
                        )}
                    >
                        <span className="truncate">{pkg.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export function Navigation(props) {
    const router = useRouter();
    const pathname = usePathname();

    // Parse current package and version from URL
    const { package: currentPackage, version: currentVersion } =
        parsePackageAndVersion(pathname);

    // Check if we're on a docs page (core or laravel package pages) or home page
    const isDocsPage =
        pathname.startsWith('/docs/core/') ||
        pathname.startsWith('/docs/laravel/');
    const isHomePage = pathname === '/';

    // Get navigation for current package and version, or home navigation
    const navigation = getNavigation(
        currentPackage,
        currentVersion,
        isHomePage,
    );

    const handlePackageChange = (newPackage) => {
        // Navigate to the new package with the same version
        router.push(`/docs/${newPackage}/${currentVersion}`);
    };

    return (
        <nav {...props}>
            <ul role="list">
                <TopLevelNavItem href="/">Home</TopLevelNavItem>
                <TopLevelNavItem href="/docs/core/v3">
                    Core Docs
                </TopLevelNavItem>
                <TopLevelNavItem href="/docs/laravel/v3">
                    Laravel Docs
                </TopLevelNavItem>
                {isDocsPage && (
                    <li className="md:hidden">
                        <PackageSelector
                            currentPackage={currentPackage}
                            onPackageChange={handlePackageChange}
                        />
                        <div className="mb-4">
                            <div className="mb-2 text-xs font-semibold text-zinc-900 dark:text-white">
                                Version
                            </div>

                            <VersionSelector />
                        </div>
                    </li>
                )}

                {(isDocsPage || isHomePage) &&
                    navigation.map((group, groupIndex) => (
                        <NavigationGroup
                            key={group.title}
                            group={group}
                            className={groupIndex === 0 ? 'md:mt-0' : ''}
                        />
                    ))}

                <li className="sticky bottom-0 z-10 mt-6 min-[416px]:hidden">
                    <Button
                        href="https://github.com/DirectoryTree/LdapRecord"
                        variant="filled"
                        className="w-full"
                    >
                        GitHub
                    </Button>
                </li>
            </ul>
        </nav>
    );
}
