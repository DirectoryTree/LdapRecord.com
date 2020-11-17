<?php

namespace App;

use Github\Client;

class Versions
{
    /**
     * The current page
     * 
     * @var object $page
     */
    protected $apiToken;
    
    /**
     * The GitHub client.
     * 
     * @var Client
     */
    protected $client;

    /**
     * The repositories to collect and their URLs.
     * 
     * @var array
     */
    protected $repositories = [
        'LdapRecord' => '/docs/core/v%s',
        'LdapRecord-Laravel' => '/docs/laravel/v%s',
    ];

    /**
     * Constructor.
     * 
     * @param string $apiToken
     * 
     * @return void
     */
    public function __construct($apiToken)
    {
        $this->apiToken = $apiToken;
        $this->client = new Client();
    }

    /**
     * Get an array of major versions for the repository.
     * 
     * @return array
     */
    public function get($repository)
    {
        $this->client->authenticate(
            $this->apiToken, null, Client::AUTH_HTTP_TOKEN
        );

        return $this->getLatestRelease($repository);
    }

    /**
     * Get the latest release of the current repository.
     *
     * @return array
     */
    protected function getLatestRelease($repository)
    {
        $map = [
            'core' => 'LdapRecord',
            'laravel' => 'LdapRecord-Laravel',
        ];

        $repository = $map[$repository];

        $releases = $this->client
            ->api('repo')
            ->releases()
            ->all('DirectoryTree', $repository);

        return collect($releases)->sortByDesc(function ($release) {
            return $release['tag_name'];
        })->groupBy(function ($release) {
            return $this->getMajorRelease($release['tag_name']);
        })->mapWithKeys(function ($versions, $majorVersion) use ($repository) {
            return [$majorVersion => [
                'name' => $versions->first()['tag_name'],
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