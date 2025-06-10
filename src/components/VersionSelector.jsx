'use client';

import clsx from 'clsx';
import { Fragment } from 'react';
import { create } from 'zustand';
import { usePathname, useRouter } from 'next/navigation';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
    Transition,
} from '@headlessui/react';

// Package and version configuration
const packages = {
    core: {
        name: 'LdapRecord Core',
        versions: [
            { id: 'v3', name: 'v3.0', description: 'Latest' },
            { id: 'v2', name: 'v2.0', description: 'Legacy' },
            { id: 'v1', name: 'v1.0', description: 'Legacy' },
        ],
    },
    laravel: {
        name: 'LdapRecord Laravel',
        versions: [
            { id: 'v3', name: 'v3.0', description: 'Latest' },
            { id: 'v2', name: 'v2.0', description: 'Legacy' },
            { id: 'v1', name: 'v1.0', description: 'Legacy' },
        ],
    },
};

// Utility functions to parse current package and version from URL
export function parsePackageAndVersion(pathname) {
    // Match URLs like /core/v3, /laravel/v2, etc.
    const match = pathname.split('/').filter(Boolean);

    if (['core', 'laravel'].includes(match[1]) && match[2]?.startsWith('v')) {
        return {
            package: match[1],
            version: match[2],
        };
    }

    // Default to core v3 for non-docs pages (like home page)
    return {
        package: 'core',
        version: 'v3',
    };
}

export const useVersionStore = create((set) => ({
    currentPackage: 'core',
    currentVersion: 'v3',
    setPackageAndVersion: (pkg, version) =>
        set({ currentPackage: pkg, currentVersion: version }),
}));

export function VersionSelector({ className }) {
    const router = useRouter();
    const pathname = usePathname();
    const { currentPackage, currentVersion, setPackageAndVersion } =
        useVersionStore();

    // Parse current package and version from URL
    const { package: urlPackage, version: urlVersion } =
        parsePackageAndVersion(pathname);

    // Get available versions for current package
    const currentPackageData = packages[urlPackage] || packages.core;
    const availableVersions = currentPackageData.versions;
    const selectedVersion =
        availableVersions.find((v) => v.id === urlVersion) ||
        availableVersions[0];

    const handleVersionChange = (version) => {
        // Navigate to the new version while preserving the current page path
        const pathParts = pathname.split('/');

        if (
            (pathParts[1] === 'core' || pathParts[1] === 'laravel') &&
            pathParts[2] &&
            pathParts[2].startsWith('v')
        ) {
            // Replace the version in the URL
            pathParts[2] = version.id;

            const newPath = pathParts.join('/');

            router.push(newPath);
        } else {
            // Default navigation to package overview
            router.push(`/docs/${urlPackage}/${version.id}`);
        }

        setPackageAndVersion(urlPackage, version.id);
    };

    return (
        <Listbox value={selectedVersion} onChange={handleVersionChange}>
            <div className={clsx('relative', className)}>
                <ListboxButton className="relative w-full cursor-pointer rounded-lg bg-white py-0.5 pr-10 pl-3 text-left shadow-sm ring-1 ring-zinc-900/10 focus:ring-2 focus:ring-purple-500 focus:outline-none sm:text-sm dark:bg-zinc-800 dark:ring-white/10 dark:focus:ring-purple-400">
                    <span className="flex items-center">
                        <span className="block truncate font-medium text-zinc-900 dark:text-white">
                            {selectedVersion.name}
                        </span>

                        <span className="ml-2 block truncate text-zinc-500 dark:text-zinc-400">
                            {selectedVersion.description}
                        </span>
                    </span>

                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                            className="h-5 w-5 text-zinc-400 dark:text-zinc-500"
                            aria-hidden="true"
                        />
                    </span>
                </ListboxButton>

                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm dark:bg-zinc-800 dark:ring-white/5">
                        {availableVersions.map((version) => (
                            <ListboxOption
                                key={version.id}
                                className={({ active }) =>
                                    clsx(
                                        'relative cursor-pointer py-2 pr-9 pl-3 select-none',
                                        active
                                            ? 'bg-purple-600 text-white'
                                            : 'text-zinc-900 dark:text-white',
                                    )
                                }
                                value={version}
                            >
                                {({ selected, active }) => (
                                    <>
                                        <div className="flex items-center">
                                            <span
                                                className={clsx(
                                                    'block truncate font-medium',
                                                    selected
                                                        ? 'font-semibold'
                                                        : 'font-normal',
                                                )}
                                            >
                                                {version.name}
                                            </span>
                                            <span
                                                className={clsx(
                                                    'ml-2 block truncate',
                                                    active
                                                        ? 'text-purple-200'
                                                        : 'text-zinc-500 dark:text-zinc-400',
                                                )}
                                            >
                                                {version.description}
                                            </span>
                                        </div>
                                        {selected ? (
                                            <span
                                                className={clsx(
                                                    'absolute inset-y-0 right-0 flex items-center pr-4',
                                                    active
                                                        ? 'text-white'
                                                        : 'text-purple-600 dark:text-purple-400',
                                                )}
                                            >
                                                <CheckIcon
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </Transition>
            </div>
        </Listbox>
    );
}
