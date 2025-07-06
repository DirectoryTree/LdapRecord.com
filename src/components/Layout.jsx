'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';

import { Logo } from '@/components/Logo';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { SectionProvider } from '@/components/SectionProvider';
import { TableOfContents } from '@/components/TableOfContents';
import {
    VersionSelector,
    parsePackageAndVersion,
} from '@/components/VersionSelector';

// Package selector component for desktop
function DesktopPackageSelector({ currentPackage, onPackageChange }) {
    const packages = [
        { id: 'core', name: 'Core' },
        { id: 'laravel', name: 'Laravel' },
    ];

    return (
        <div className="mb-4 hidden lg:block">
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

export function Layout({ children, allSections }) {
    let router = useRouter();
    let pathname = usePathname();

    // Parse current package and version from URL
    const { package: currentPackage, version: currentVersion } =
        parsePackageAndVersion(pathname);

    // Check if we're on a docs page (core or laravel package pages) or home page
    const isDocsPage =
        pathname.startsWith('/docs/core/') ||
        pathname.startsWith('/docs/laravel/');
    const isHomePage = pathname === '/';

    const handlePackageChange = (newPackage) => {
        // Navigate to the new package with the same version
        router.push(`/docs/${newPackage}/${currentVersion}`);
    };

    return (
        <SectionProvider sections={allSections[pathname] ?? []}>
            <div className="h-full lg:ml-72 xl:ml-80">
                <motion.header
                    layoutScroll
                    className="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex"
                >
                    <div className="contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pt-4 lg:pb-8 xl:w-80 lg:dark:border-white/10">
                        <div className="hidden lg:flex lg:items-center lg:justify-between">
                            <Link href="/" aria-label="Home">
                                <Logo className="h-10 dark:fill-white" />
                            </Link>
                        </div>

                        {!isHomePage && <Header />}

                        {isDocsPage && (
                            <div className="hidden lg:mt-6 lg:block">
                                <DesktopPackageSelector
                                    currentPackage={currentPackage}
                                    onPackageChange={handlePackageChange}
                                />

                                <div className="mb-4">
                                    <div className="mb-2 text-xs font-semibold text-zinc-900 dark:text-white">
                                        Version
                                    </div>

                                    <VersionSelector />
                                </div>
                            </div>
                        )}

                        <Navigation className="hidden lg:mt-4 lg:block" />
                    </div>
                </motion.header>

                <div className={`relative flex h-full flex-col px-4 sm:px-6 lg:px-8 ${isHomePage ? 'pt-0' : 'pt-14'}`}>
                    <div className="mx-auto flex w-full max-w-8xl flex-auto justify-center 2xl:px-12">
                        <div className="min-w-0 max-w-2xl flex-auto py-4 2xl:py-16 lg:max-w-none lg:pr-0 2xl:px-16">
                            <main className="flex-auto">{children}</main>
                            <Footer />
                        </div>
                        {isDocsPage && <TableOfContents />}
                    </div>
                </div>
            </div>
        </SectionProvider>
    );
}
