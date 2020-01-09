---
title: Quickstart
description: Get up and running fast with LdapRecord.
extends: _layouts.documentation
section: content
---

# Quick Start

Install LdapRecord using [composer](https://getcomposer.org/):

```bash
composer require directorytree/ldaprecord
```

Use LdapRecord:

```php
use LdapRecord\Container;
use LdapRecord\Connection;
use LdapRecord\Models\Entry;

// Create a new connection:
$connection = new Connection([
    'hosts' => ['192.168.1.1'],
    'port' => 389,
    'username' => 'user',
    'password' => 'secret',
    'base_dn' => 'dc=local,dc=com',
]);

// Connect to your server:
$connection->connect();

// Add the connection into the container:
Container::addConnection($connection);

// Get all objects:
$objects = Entry::get();

// Get a single object:
$object = Entry::find('cn=John Doe,dc=local,dc=com');

// Getting attributes:
foreach ($object->memberof as $group) {
    echo $group;
}

// Modifying attributes:
$object->company = 'My Company';

$object->save();
```