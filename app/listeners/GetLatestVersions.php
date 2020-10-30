<?php

namespace App\Listeners;

use Github\Client;
use TightenCo\Jigsaw\Jigsaw;

class GetLatestVersions
{
    protected $client;

    protected $metaFileName = 'versions.json';

    protected $repositories = [
        'LdapRecord',
        'LdapRecord-Laravel',
    ];

    public function __construct()
    {
        $this->client = new Client();
    }

    public function handle(Jigsaw $jigsaw)
    {
        // We won't generate Github versions during local builds.
        if ($jigsaw->getEnvironment() == 'local') {
            return;
        }

        $this->client->authenticate($jigsaw->getConfig('githubApiToken'), null, Client::AUTH_HTTP_TOKEN);

        $versions = [];

        foreach ($this->repositories as $repository) {
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
        return $this->client
            ->api('repo')
            ->releases()
            ->latest('DirectoryTree', $repository);
    }
}
