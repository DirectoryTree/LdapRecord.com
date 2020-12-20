<?php

namespace App;

class Versions
{
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
        return require(__DIR__."/../versions.php");
    }
}
