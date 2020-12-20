<?php

namespace App;

use Illuminate\Support\Str;

class Router
{
    /**
     * The registered routes.
     * 
     * @var array
     */
    protected $routes = [];

    /**
     * The compiled route cache.
     * 
     * @var array
     */
    protected $compiledRoutes = [];

    /**
     * The current router instance.
     * 
     * @var static
     */
    protected static $instance;

    /**
     * Get the router instance.
     * 
     * @return static
     */
    public static function instance()
    {
        if (! static::$instance) {
            static::$instance = new static;
        }

        return static::$instance;
    }

    /**
     * Handle dynamic static method calls onto the current instance.
     * 
     * @param string $method
     * @param array  $params
     * 
     * @return mixed
     */
    public static function __callStatic($method, $params)
    {
        return static::instance()->{$method}($params);
    }

    /**
     * Register a route.
     * 
     * @param string $route
     * @param string $url
     * 
     * @return void
     */
    public function register($route, $url)
    {
        $this->routes[$route] = $url;
    }

    /**
     * Get the URL for the route.
     * 
     * @param string $route
     * @param array  $params
     * 
     * @return string
     */
    public function get($route, array $params = [])
    {
        if (! $url = $this->routes[$route]) {
            throw new \Exception("Route [$route] has not been registered.");
        }

        $routeId = $this->makeCompiledRouteId($route, $params);

        if ($this->routeIsCompiled($routeId)) {
            return $this->compiledRoutes[$routeId];
        }

        $uris = [];

        $paramCount = 0;

        foreach (explode('/', $url) as $piece) {
            if (! $this->isUrlParameter($piece)) {
                $uris[] = $piece;
                
                continue;
            }

            $paramName = str_replace('{', '', str_replace('}', '', $piece));

            // Attempt to retrieve the parameter by
            // name, then by index, then return
            // the uri by default.
            $piece = $params[$paramName] ?? $params[$paramCount] ?? $piece;

            $paramCount++;

            $uris[] = $piece;
        }
        
        return $this->compiledRoutes[$routeId] = implode('/', $uris);
    }

    /**
     * Determine if the route has already been compiled.
     * 
     * @param string $routeId
     * 
     * @return bool
     */
    protected function routeIsCompiled($routeId)
    {
        return array_key_exists($routeId, $this->compiledRoutes);
    }

    /**
     * Determine if the route has already been compiled.
     * 
     * @param string $routeId
     * 
     * @return bool
     */
    protected function makeCompiledRouteId($route, array $params = [])
    {
        return implode('.', array_merge([$route], $params));
    }

    /**
     * Determine if the section of a route is a paramter.
     * 
     * @param string $piece
     * 
     * @return bool
     */
    protected function isUrlParameter($piece)
    {
        return Str::startsWith($piece, '{') && Str::endsWith($piece, '}');
    }
}
