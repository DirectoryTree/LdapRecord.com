<?php

namespace App;

use Github\Client;

class Versions
{
    protected $page;

    protected $client;

    /**
     * The repositories to collect and their URLs.
     * 
     * @var array
     */
    protected $repositories = [
        'LdapRecord' => '/docs/v%s',
        'LdapRecord-Laravel' => '/docs/v%s/laravel',
    ];

    public function __construct($page)
    {
        $this->page = $page;
        $this->client = new Client();
    }

    /**
     * Get an array of major versions for the repository.
     * 
     * @return array
     */
    public function get()
    {
        $this->client->authenticate(
            $this->page->githubApiToken, null, Client::AUTH_HTTP_TOKEN
        );

        return $this->getLatestRelease();
    }

    /**
     * Get the latest release of the current repository.
     *
     * @return array
     */
    protected function getLatestRelease()
    {
        $map = [
            'core' => 'LdapRecord',
            'laravel' => 'LdapRecord-Laravel',
        ];

        $repository = $map[$this->page->getCurrentRepository()];

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