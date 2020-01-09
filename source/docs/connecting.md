---
title: Connecting
description: Connecting to LDAP servers using LdapRecord
extends: _layouts.documentation
section: content
---

# Connections

- [Introduction](#introduction)
- [Binding Users](#binding)
- [The Container](#container)

## Introduction {#introduction}

Once you've defined your configuration, you must then create
a connection and insert your configuration into it:

```php
use LdapRecord\Connection;

$connection = Connection([
     'hosts' => ['192.168.1.1'],
     'port' => 389,
     'username' => 'user',
     'password' => 'secret',
]);
```

Once you have your connection, call `connect()` to bind to your LDAP server:

```php
try {
    $connection->connect();

    echo "Successfully connected!";
} catch (\LdapRecord\Auth\BindException $e) {
    $error = $e->getDetailedError();

    echo $error->getErrorCode();
    echo $error->getErrorMessage();
    echo $error->getDiagnosticMessage();
}
```

If you'd like to connect / bind anonymously to your LDAP
server, simply set your `username` and `password`
configuration parameters to `null`:

```php
use LdapRecord\Connection;

$connection = Connection([
     'hosts' => ['192.168.1.1'],
     'port' => 389,
     'username' => null,
     'password' => null,
]);

$connection->connect();
```

## Binding {#binding}

Using the connection instance, you can execute a bind request
to perform LDAP authentication to see if a username and 
password is valid.

```php
if ($connection->auth()->attempt('username', 'secret'))
{
    echo "Username and password are correct!";
}
```

After calling the above, the user you have configured
in your configuration will be **rebound** to your
LDAP server. This is to ensure you can continue
to execute LDAP operations underneath this
user during the same request.

If you would like to run all further LDAP operations
underneath the authenticated user, pass in `true` in
the third parameter in the `attempt()` method:

```php
if ($connection->auth()->attempt('username', 'secret', $bindAsUser = true))
{
    echo "Username and password are correct!";

    // Run further LDAP operations under this user.
}
```

## Container {#container}

You must add your LDAP connections into the container if you would
like to use LdapRecord models. Models pull the connection that
they use from this container by their name.

> Ensure you connect to your LDAP server with each
> `Connection` you add into the container, otherwise
> you will not receive any results from queries.

#### Adding Connections

```php
use LdapRecord\Container;                         
use LdapRecord\Connection;

$connection = new Connection(['...']);

$connection->connect();

Container::addConnection($connection);
```

Each connection you add can have it's own name. This is
required for connecting to multiple LDAP servers at
one time. To set the name of a connection in the
container, pass it into the second parameter:

```php
Container::addConnection($connection, 'domain-b');
```

Without passing in a name, the name of the connection is
set to `default`. Passing in multiple connections
without providing a name will overwrite the
previously added connection, so be sure to
identify them differently if needed:

```php
use LdapRecord\Container;
use LdapRecord\Connection;

$connectionAlpha = new Connection(['...']);
$connectionBravo = new Connection(['...']);

Container::addConnection($connectionAlpha);

// This will overwrite $connectionAlpha:
Container::addConnection($connectionBravo);
```

If you do not define a `$connection` property inside of your
LdapRecord models, they will use your default connection.

#### Getting Connections

To get the default connection, call the `getDefaultConnection` method:

```php
$connection = Container::getDefaultConnection();
```

To get a differently named connection, call the `getConnection` method:

```php
$connection = Container::getConnection('domain-b');
```

To set the name of the default connection, call the
`setDefaultConnection` method prior to adding a connection:

```php
Container::setDefaultConnection('domain-a');

Container::addConnection(new Connection(['...']));

// Returns the `domain-a` connection.
$connection = Container::getDefaultConnection();
```

To determine the existence of a connection, you can
call the `exists()` method on the container instance:

```php
if (Container::getInstance()->exists('domain-b')) {
    // The 'domain-b' connection exists!
}
```