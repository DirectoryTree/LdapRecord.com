<?php

namespace App;

use Illuminate\Support\Str;

class Router
{
    protected $routes = [];

    protected $compiledRoutes = [];

    protected static $instance;

    public static function instance()
    {
        if (! static::$instance) {
            static::$instance = new static;
        }

        return static::$instance;
    }

    public static function __callStatic($method, $params)
    {
        return static::instance()->{$method}($params);
    }

    public function register($route, $url)
    {
        $this->routes[$route] = $url;
    }

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
            if ($this->isUrlParameter($piece)) {
                $paramName = str_replace('{', '', str_replace('}', '', $piece));

                // Attempt to retrieve the parameter by
                // name, then by index, then return
                // the uri by default.
                $piece = $params[$paramName] ?? $params[$paramCount] ?? $piece;

                $paramCount++;
            }

            $uris[] = $piece;
        }
        
        return $this->compiledRoutes[$routeId] = implode('/', $uris);
    }

    protected function routeIsCompiled($routeId)
    {
        return array_key_exists($routeId, $this->compiledRoutes);
    }

    protected function makeCompiledRouteId($route, array $params = [])
    {
        return implode('.', array_merge([$route], $params));
    }

    protected function isUrlParameter($piece)
    {
        return Str::startsWith($piece, '{') && Str::endsWith($piece, '}');
    }
}
