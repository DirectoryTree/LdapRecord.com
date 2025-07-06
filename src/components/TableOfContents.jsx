'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { useSectionStore } from '@/components/SectionProvider';

function TableOfContentsLink({ section, isActive }) {
    const isH3 = section.level === 3;

    return (
        <li className={clsx(isH3 && 'ml-4')}>
            <Link
                href={`#${section.id}`}
                className={clsx(
                    'block border-l pl-4 -ml-px transition-colors duration-200',
                    isActive
                        ? 'border-purple-500 text-purple-600 dark:border-purple-400 dark:text-purple-400'
                        : 'border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-300'
                )}
            >
                <span className={clsx(
                    'leading-6',
                    isH3 ? 'text-xs font-normal' : 'text-sm font-medium'
                )}>
                    {section.title}
                </span>
            </Link>
        </li>
    );
}

export function TableOfContents() {
    let sections = useSectionStore((s) => s.sections);
    let visibleSections = useSectionStore((s) => s.visibleSections);

    // Show both h2 and h3 sections and filter out any undefined sections
    let tocSections = sections.filter((section) =>
        section &&
        section.id &&
        section.title &&
        !section.tag &&
        (section.level === 2 || section.level === 3)
    );

    if (tocSections.length === 0) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="hidden xl:sticky xl:top-[4.75rem] xl:block xl:h-[calc(100vh-4.75rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pl-8"
        >
            <nav aria-labelledby="on-this-page-title" className="w-56">
                <h2
                    id="on-this-page-title"
                    className="font-display text-sm font-medium text-zinc-900 dark:text-white"
                >
                    On this page
                </h2>
                <ol role="list" className="mt-4 space-y-2 text-sm">
                    {tocSections.map((section, index) => {
                        const prevSection = tocSections[index - 1];
                        const isFirstH3AfterH2 = section.level === 3 && prevSection?.level === 2;

                        return (
                            <div key={section.id} className={clsx(isFirstH3AfterH2 && 'mt-3')}>
                                <TableOfContentsLink
                                    section={section}
                                    isActive={visibleSections.includes(section.id)}
                                />
                            </div>
                        );
                    })}
                </ol>
            </nav>
        </motion.div>
    );
}
