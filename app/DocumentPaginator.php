<?php

namespace App;

class DocumentPaginator
{
    protected $page;

    protected $navigation;

    protected $version;

    public function __construct($page)
    {
        $this->page = $page;
    }

    public function getNext()
    {
        return $this->getPageByOperator('next');
    }

    public function getPrevious()
    {
        return $this->getPageByOperator('previous');
    }

    /**
     * Get the page in the pages index.
     * 
     * @return array
     */
    protected function getPageByOperator($operator = 'next')
    {
        $pages = $this->getPages();

        $currentIndex = $pages->pluck('path')->search(
            trimPath($this->page->getPath())
        );

        $index = $operator == 'next'
            ? $currentIndex + 1
            : $currentIndex - 1;

        return $pages[$index] ?? null;
    }

    protected function getPages()
    {
        return $this->getNavigation()->map(function ($value, $key) {
            $links = is_iterable($value) ? $value['children']->toArray() : [$key => $value];
            
            return collect($links)->map(function ($path, $label) {
                return [
                    'path' => $path,
                    'label' => $label
                ];
            });
        })->flatten($depth = 1);
    }

    protected function getNavigation()
    {
        return $this->page->navigation
            ->{$this->page->getCurrentRepository()}
            ->{$this->page->getCurrentVersion()};
    }
}
