<?php

namespace App;

use TightenCo\Jigsaw\Jigsaw;

class VersionsCache
{
    /**
     * The Jigsaw instance.
     * 
     * @var Jigsaw
     */
    protected $jigsaw;

    /**
     * The file to store the cache.
     * 
     * @var string
     */
    protected static $file = 'versions.json';

    /**
     * Constructor.
     * 
     * @param Jigsaw $jigsaw
     * 
     * @return void
     */
    public function __construct(Jigsaw $jigsaw)
    {
        $this->jigsaw = $jigsaw;

        if (file_exists(static::$file)) {
            unlink(static::$file);
        }
        
        file_put_contents(static::$file, '');
    }

    /**
     * Get and store the repositories versions in the cache
     * 
     * @return void
     */
    public function store($repository)
    {
        $versions = (
            new Versions($this->jigsaw->getConfig('githubApiToken'))
        )->get($repository);

        $json = json_encode(array_merge(
            static::all(), [$repository => $versions]
        ));

        file_put_contents(static::$file, $json);
    }

    /**
     * Get the cached repositories versions.
     * 
     * @return array
     */
    public static function get($repository)
    {
        return static::all()[$repository] ?? [];
    }

    /**
     * Get all of the cached repositories versions.
     * 
     * @return array
     */
    public static function all()
    {
        return json_decode(file_get_contents(static::$file), $assoc = true) ?? [];
    }
}
