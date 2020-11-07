<?php

namespace App\Listeners;

use Github\Client;
use TightenCo\Jigsaw\Jigsaw;

class GetLatestVersions
{
    /**
     * The GitHub client.
     * 
     * @var Client
     */
    protected $client;

    /**
     * The versions JSON file to create.
     * 
     * @var string
     */
    protected $metaFileName = 'versions.json';

    /**
     * The repositories to collect and their URLs.
     * 
     * @var array
     */
    protected $repositories = [
        'LdapRecord' => '/docs/v%s',
        'LdapRecord-Laravel' => '/docs/v%s/laravel',
    ];

    /**
     * Constructor.
     * 
     * @return void
     */
    public function __construct()
    {
        $this->client = new Client();
    }

    /**
     * Get the latest repository versions and create the versions file.
     * 
     * @var Jigsaw $jigsaw
     * 
     * @return void
     */
    public function handle(Jigsaw $jigsaw)
    {
        // We won't generate Github versions during local builds.
        // if ($jigsaw->getEnvironment() == 'local') {
        //     return;
        // }

        $this->client->authenticate($jigsaw->getConfig('githubApiToken'), null, Client::AUTH_HTTP_TOKEN);

        $versions = [];

        foreach ($this->repositories as $repository => $url) {
            $versions[$repository] = $this->getLatestRelease($jigsaw, $repository);
        }

        $metaFile = implode(DIRECTORY_SEPARATOR, [
            $jigsaw->getDestinationPath(),
            $this->metaFileName
        ]);

        if (file_exists($metaFile)) {
            unlink($metaFile);
        }

        file_put_contents($metaFile, json_encode($versions));
    }

    /**
     * Get the latest release of the given repository.
     *
     * @param Jigsaw $jigsaw
     * @param string $repository
     *
     * @return array[url,tag_name]
     */
    protected function getLatestRelease(Jigsaw $jigsaw, $repository)
    {
        $releases = $this->client
            ->api('repo')
            ->releases()
            ->all('DirectoryTree', $repository);

        return collect($releases)->sortByDesc(function ($release) {
            return $release['name'];
        })->groupBy(function ($release) {
            return $this->getMajorRelease($release['name']);
        })->mapWithKeys(function ($versions, $majorVersion) use ($repository) {
            return [$majorVersion = [
                'name' => $versions->first()['name'],
                'url' => sprintf($this->repositories[$repository], $majorVersion),
            ]];
        });
    }

    /**
     * Get the major release of the given tag.
     * 
     * @return string
     */
    protected function getMajorRelease($tagName)
    {
        return substr(ltrim(trim($tagName), 'v'), 0, 1);
    }
}
