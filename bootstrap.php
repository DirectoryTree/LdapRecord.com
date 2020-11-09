<?php

use App\VersionsCache;
use TightenCo\Jigsaw\Jigsaw;
use App\Listeners\BuildSiteMap;

/** @var $container \Illuminate\Container\Container */
/** @var $events \TightenCo\Jigsaw\Events\EventBus */

/**
 * You can run custom code at different stages of the build process by
 * listening to the 'beforeBuild', 'afterCollections', and 'afterBuild' events.
 *
 * For example:
 *
 * $events->beforeBuild(function (Jigsaw $jigsaw) {
 *     // Your code here
 * });
 */

$events->beforeBuild(function (Jigsaw $jigsaw) {
    foreach (['core', 'laravel'] as $repo) {
        (new VersionsCache($jigsaw))->store($repo);
    }
});

$events->afterBuild(BuildSiteMap::class);
