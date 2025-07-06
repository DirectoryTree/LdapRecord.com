'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { useSectionStore } from '@/components/SectionProvider';
import { SponsorPlaceholder } from '@/components/SponsorPlaceholder';

function TableOfContentsLink({ section, isActive }) {
    const isH3 = section.level === 3;

    return (
        <li className={clsx(isH3)}>
            <Link
                href={`#${section.id}`}
                className={clsx(
                    'block pl-4 transition-colors truncate duration-200',
                    isActive
                        ? 'border-purple-500 text-purple-600 dark:border-purple-400 dark:text-purple-400'
                        : 'border-transparent text-zinc-500 hover:border-zinc-300 hover:text-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-300'
                )}
            >
                <span className={clsx(
                    'leading-6',
                    isH3 ? 'text-xs font-normal ml-4' : 'text-sm font-medium'
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
            className="hidden lg:sticky lg:top-0 lg:block lg:h-[calc(100vh-5rem)] lg:flex-none py-4 pl-8 2xl:py-16"
        >
            <div className="flex h-full w-56 flex-col">
                <nav aria-labelledby="on-this-page-title" className="overflow-y-auto">
                    <h2
                        id="on-this-page-title"
                        className="font-display ml-4 text-sm font-medium text-zinc-900 dark:text-white"
                    >
                        On this page
                    </h2>

                    <ol role="list" className="space-y-2 my-4 text-sm">
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

                <div className="border-t border-zinc-900/10 pt-4 dark:border-white/10">
                    <h3 className="font-display text-sm font-medium text-zinc-900 dark:text-white">
                        Featured Sponsors
                    </h3>

                    <div className="mt-4">
                        <SponsorPlaceholder
                            size="small"
                            target="_blank"
                            className="block text-center w-full"
                            subtitle="Sponsor this project"
                            href="https://github.com/sponsors/stevebauman"
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
