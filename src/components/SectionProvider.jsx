'use client';

import { createStore, useStore } from 'zustand';
import {
    createContext,
    useContext,
    useEffect,
    useLayoutEffect,
    useState,
} from 'react';

import { remToPx } from '@/lib/remToPx';

function createSectionStore(sections) {
    return createStore()((set) => ({
        sections,
        visibleSections: [],
        setVisibleSections: (visibleSections) =>
            set((state) =>
                state.visibleSections.join() === visibleSections.join()
                    ? {}
                    : { visibleSections },
            ),
        registerHeading: ({ id, ref, offsetRem, level }) =>
            set((state) => {
                return {
                    sections: state.sections.map((section) => {
                        if (section.id === id) {
                            return {
                                ...section,
                                headingRef: ref,
                                offsetRem,
                                level,
                            };
                        }
                        return section;
                    }),
                };
            }),
    }));
}

function useVisibleSections(sectionStore) {
    let setVisibleSections = useStore(
        sectionStore,
        (s) => s.setVisibleSections,
    );
    let sections = useStore(sectionStore, (s) => s.sections);

    useEffect(() => {
        function checkVisibleSections() {
            let { innerHeight, scrollY } = window;
            let newVisibleSections = [];

            for (
                let sectionIndex = 0;
                sectionIndex < sections.length;
                sectionIndex++
            ) {
                let { id, headingRef, offsetRem = 0 } = sections[sectionIndex];

                if (!headingRef?.current) {
                    continue;
                }

                let offset = remToPx(offsetRem);
                let top =
                    headingRef.current.getBoundingClientRect().top + scrollY;

                if (sectionIndex === 0 && top - offset > scrollY) {
                    newVisibleSections.push('_top');
                }

                let nextSection = sections[sectionIndex + 1];
                let bottom =
                    (nextSection?.headingRef?.current?.getBoundingClientRect()
                        .top ?? Infinity) +
                    scrollY -
                    remToPx(nextSection?.offsetRem ?? 0);

                if (
                    (top > scrollY && top < scrollY + innerHeight) ||
                    (bottom > scrollY && bottom < scrollY + innerHeight) ||
                    (top <= scrollY && bottom >= scrollY + innerHeight)
                ) {
                    newVisibleSections.push(id);
                }
            }

            setVisibleSections(newVisibleSections);
        }

        let raf = window.requestAnimationFrame(() => checkVisibleSections());
        window.addEventListener('scroll', checkVisibleSections, {
            passive: true,
        });
        window.addEventListener('resize', checkVisibleSections);

        return () => {
            window.cancelAnimationFrame(raf);
            window.removeEventListener('scroll', checkVisibleSections);
            window.removeEventListener('resize', checkVisibleSections);
        };
    }, [setVisibleSections, sections]);
}

const SectionStoreContext = createContext(null);

const useIsomorphicLayoutEffect =
    typeof window === 'undefined' ? useEffect : useLayoutEffect;

export function SectionProvider({ sections, children }) {
    let [sectionStore] = useState(() => createSectionStore(sections));

    useVisibleSections(sectionStore);

    useIsomorphicLayoutEffect(() => {
        sectionStore.setState({ sections });
    }, [sectionStore, sections]);

    return (
        <SectionStoreContext.Provider value={sectionStore}>
            {children}
        </SectionStoreContext.Provider>
    );
}

export function useSectionStore(selector) {
    let store = useContext(SectionStoreContext);
    return useStore(store, selector);
}
