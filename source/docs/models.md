---
title: Models
description: Creating and using models in LdapRecord
extends: _layouts.documentation
section: content
---

# Models: Getting Started

- [Introduction](#introduction)
 - [Defining Models](#defining-models)
 - [Predefined Models](#predefined-models)
 - [Connections](#connections)
 - [Default Attribute Values](#default-attribute-values)
- [Retrieving Models](#retrieving-models)
 - [Collections](#collections)
- [Retrieving Single Models](#retrieving-single-models)
- [Creating & Updating Models](#creating-amp-updating-models)
 - [Creating](#creating)
 - [Updating](#updating)
- [Attributes](#attributes)
 - [Methods](#methods)
 - [Array Conversion](#array-conversion)
 - [Checking Existence](#determining-attribute-existence)
 - [Casing & Hyphens](#casing-amp-hyphens)
- [Deleting Models](#deleting-models)
- [Comparing Models](#comparing-models)
- [Events](#events)
- [Serialization](#serialization)

## Introduction

The LdapRecord ORM provides a beautiful and simple ActiveRecord implementation for working with your LDAP server.
Each "Model" represents a type of LDAP object that resides in your directory.

Models allow you query your directory as well as create, update, and delete records.

Before getting started, ensure you've added at least one connection to the [container](/docs/{{version}}/connections#container).

By default, there are models included with LdapRecord for popular LDAP directories (namely ActiveDirectory &
OpenLDAP) so you can get up and running as fast as possible. More on this [below](#predefined-models).

### Defining Models

To get started, you must create a new class that represents the LDAP object you would like to query.

For example, let's create a model that represents ActiveDirectory users:

```php
<?php

use LdapRecord\Models\Model;

class User extends Model
{
    public static $objectClasses = [
        'top',
        'person',
        'organizationalperson',
        'user',
    ];
}
```

As you can see above, we must add a public static property that contains the object classes of the LDAP record.

These object classes are used to locate the proper objects in your LDAP directory.

> If you do not provide any object classes, global directory searches will be performed when retrieving models.

### Predefined Models

LdapRecord comes with many predefined models that allow you to get started right away.

Here is a list:

| Model                                                        | Type            |
|--------------------------------------------------------------|-----------------|
| `LdapRecord\Models\Entry`                                    | None            |
| `LdapRecord\Models\ActiveDirectory\User`                     | ActiveDirectory |
| `LdapRecord\Models\ActiveDirectory\Group`                    | ActiveDirectory |
| `LdapRecord\Models\ActiveDirectory\Computer`                 | ActiveDirectory |
| `LdapRecord\Models\ActiveDirectory\Contact`                  | ActiveDirectory |
| `LdapRecord\Models\ActiveDirectory\Container`                | ActiveDirectory |
| `LdapRecord\Models\ActiveDirectory\Entry`                    | ActiveDirectory |
| `LdapRecord\Models\ActiveDirectory\OrganizationalUnit`       | ActiveDirectory |
| `LdapRecord\Models\ActiveDirectory\Printer`                  | ActiveDirectory |
| `LdapRecord\Models\ActiveDirectory\ForeignSecurityPrincipal` | ActiveDirectory |
| `LdapRecord\Models\OpenLdap\Entry`                           | OpenLDAP        |
| `LdapRecord\Models\OpenLdap\User`                            | OpenLDAP        |
| `LdapRecord\Models\OpenLdap\Group`                           | OpenLDAP        |
| `LdapRecord\Models\OpenLdap\OrganizationalUnit`              | OpenLDAP        |

You may extend these built-in models and add your own methods & functionality.

> Don't see a model for the LDAP server you're using? Create a pull request!

### Connections

By default, all models you create will try to use your `default` LDAP connection that resides in the connection
[container](/docs/{{version}}/connections#container). To set your model to use an alternate connection,
define a `$connection` property equal to the name of your other connection.

```php
<?php

use LdapRecord\Models\Model;

class User extends Model
{
    public static $objectClasses = [
        'top',
        'person',
        'organizationalperson',
        'user',
    ];

    protected $connection = 'domain-b';
}
```

### Default Attribute Values

If you would like to define the default values for some of your model's attributes,
you may define an `$attributes` property on your model:

> Due to LDAP's multi-valued nature, each attribute value you define **must** be
> an array, regardless if it is single-valued or or multi-valued.

```php
<?php

use LdapRecord\Models\Model;

class User extends Model
{
    protected $attributes = [
        'company' => ['Acme'],
        'description' => ['User Account'],
        'manager' => ['cn=John Doe,dc=acme,dc=org']
    ];
}
```

You can notice from the above that this provides some useful templating functionality when creating models.

## Retrieving Models

Once you've created an LdapRecord model you're ready to start retrieving data from your directory.
If you've used an Laravel's [Eloquent ORM](https://laravel.com/docs/eloquent), you'll feel right at home.

You can think of a model as a powerful query builder allowing you to query your directory for objects
fluently and easily.

```php
<?php

$users = User::get();

foreach ($users as $user) {
    $user->getFirstAttribute('cn');
}
```

#### Adding Constraints

Each model serves as a query builder for the object classes you've defined inside.
You can add constraints to your queries and then call `get()` to retrieve the
results.

```php
<?php

$users = User::whereStartsWith('cn', 'John')
        ->whereEndsWith('sn', 'Doe')
        ->limit(10)
        ->get();
```

> Since models are query builders, it's a good idea to review the
> [query builder](/docs/{{version}}/searching) methods so you can utilize
> them to their full potential.

#### Model Constraints

Models come with some built in constraint methods that you may find useful.

>  The below constraints will only retrieve the models that are equal
> to the type you have retrieved. For example, retrieving the descendants
> of an organizational unit will only return organizational units that
> are direct descendants.
>
> If you would like to avoid this, use the default `LdapRecord\Models\Entry`
> model, which provides no `objectclass` constraints on queries.

##### Ancestors

To retrieve the direct ancestors of a model, call the `ancestors()` constraint on a retrieved model:

```php
$user = User::find('cn=John Doe,ou=Users,dc=acme,dc=org');

$ancestors = $user->ancestors()->get();
```

The above example will execute a `listing` on your LDAP directory in
the distinguished name `dc=acme,dc=org`. This effectively pulls
the ancestors of the model.

##### Siblings

To retrieve the siblings of a model, call the `siblings()` constraint on a retrieved model:

```php
$user = User::find('cn=John Doe,ou=Users,dc=acme,dc=org');

$siblings = $user->siblings()->get();
```

The above example will execute a `listing` on your LDAP directory in
the distinguished name `ou=Users,dc=acme,dc=org`. This effectively
pulls the siblings of the model. The current model will also be
included in the resulting collection.

##### Descendants

To retrieve the descendants of a model, call the `descendants()` constraint on a retrieved model:

```php
$ou = OrganizationalUnit::find('ou=Users,dc=acme,dc=org');

$descendants = $ou->descendants()->get();
```

The above example will execute a `listing` on your LDAP directory in
the distinguished name `ou=Users,dc=acme,dc=org`. This effectively
pulls the descendants of the model.

#### Refreshing Models

To re-retrieve a new model from your directory, call the `fresh()` method.
Doing so will not affect the existing instance you already have:

```php
<?php

$user = User::where('cn', '=', 'jdoe')->first();

$freshUser = $user->fresh();
```

If you would like to re-retrieve the existing model, call the `synchronize()` method.
This will re-retrieve the models attributes from the directory:

```php
<?php

$user = User::where('cn', '=', 'jdoe')->first();

$user->synchronize();
```

### Collections

When you query your models, returned results will be contained inside of a
`LdapRecord\Query\Collection`. The `Collection` class directly extends
Laravel's collection. Be sure to check out its [documentation](https://laravel.com/docs/collections)
for all of the available helpful methods.

```php
<?php

$users = User::get();

$usersWithEmail = $users->filter(function (User $user) {
    return $user->hasAttribute('mail');
});
```

## Retrieving Single Models

If you would like to retrieve a single model from your directory, you can utilize
a variety of methods. Here is a list and usage of each:

- `first()`
- `find($distinguishedName)`
- `findBy($attributeName, $attributeValue)`
- `findByAnr($attributeValue)`
- `findByGuid($objectGuid)`

```php
<?php

// Retrieve the first model of a global LDAP search...
$user = User::first();

// Retrieve a model by its distinguished name...
$user = User::find('cn=John Doe,dc=acme,dc=org');

// Retrieve the first model that matches the attribute...
$user = User::findBy('cn', 'John Doe');

// Retrieve the first model that matches an array of ANR attributes...
$user = User::findByAnr('John Doe');

// Retrieve a model by its object guid...
$user = User::findByGuid('bf9679e7-0de6-11d0-a285-00aa003049e2');
```

#### Not Found Exceptions

Occasionally you may want to throw an exception if a specific record you're looking
for cannot be found on your directory. You can substitute the above methods
with `OrFail()` variants. Here is a list and usage of each:

- `firstOrFail()`
- `findOrFail($distinguishedName)`
- `findByOrFail($attributeName, $attributeValue)`
- `findByAnrOrFail($attributeValue)`
- `findByGuidOrFail($objectGuid)`

```php
<?php

try {
    // Retrieve the first model of a global LDAP search or fail...
    $user = User::firstOrFail();

    // Retrieve a model by its distinguished name or fail...
    $user = User::findOrFail('cn=John Doe,dc=acme,dc=org');
    
    // Retrieve the first model that matches the attribute or fail...
    $user = User::findByOrFail('cn', 'John Doe');
    
    // Retrieve the first model that matches an array of ANR attributes or fail...
    $user = User::findByAnrOrFail('John Doe');
    
    // Retrieve a model by its object guid or fail...
    $user = User::findByGuidOrFail('bf9679e7-0de6-11d0-a285-00aa003049e2');
} catch (\LdapRecord\Models\ModelNotFoundException $e) {
    // One of the models could not be located...
}
```

## Creating & Updating Models

### Creating

To create a new record in your directory, create a new model instance and call the `save()` method.
Upon calling `save()`, if no distinguished name (dn) is set on a new model, one will be generated
based on your configured `base_dn` that you have set inside your connections configuration:

```php
<?php

$user = new User();

$user->cn = 'John Doe';

$user->save();
```

You may also set the base DN of where you would like the object to be created inside
by using the `inside()` method, rather than your `base_dn` from your configuration:

```php
<?php

$user = new User(['cn' => 'John Doe']);

$user->inside('ou=Users,dc=acme,dc=org')->save();
```

The above example will save the user inside the `Users` OU.

> Depending on your directory, some attributes are required to be set for it
> to be created successfully. LdapRecord will not validate this for you and you will
> receive an exception if this occurs.
> 
> For example, users must have a common name (cn) and organizational units must have an ou.
>
> In addition to the above, you cannot set attributes that do not exist in your directory's
> LDAP schema, as well as set attributes that the bound LDAP user does not have permission
> to modify.

#### Setting A Distinguished Name

To set the models distinguished name, call the `setDn()` method on your model and populate it
with any organization unit or container that you would like it to be created inside:

```php
<?php

$user = new User();

$user->cn = 'John Doe';

$user->setDn('cn=John Doe,ou=Users,dc=acme,dc=org')->save();
```

### Updating

Updating models is as easy as creating them. When you have a model returned from a query,
set its attributes as you would for creating and call the `save()` method:

```php
<?php

$user = User::first();

$user->company = 'My Company';
$user->samaccountname = 'jdoe';
$user->department = 'Accounting';
$user->displayname = 'Johnathan Doe';

$user->save();
```

## Attributes

### Methods

There are several built-in methods on models you may like to utilize:

`getAttributes()`

The `getAttributes` method returns all of the values on the model:

```php
$user = User::first();

$attributes = $user->getAttributes();

foreach ($attributes as $name => $value) {
    //
}
```

`getAttribute()`

The `getAttribute` method returns all of the values inside the given key. This will return an `array` if the attribute exists:

```php
$group = Group::first();

$members = $group->getAttribute('member');

if ($members) {
    foreach ($members as $member) {
        echo $member;
    }
}
```

`getFirstAttribute()`

The `getFirstAttribute` method returns the first value of the given key. This will always return `null` or `string`:

```php
$group = Group::first();

$firstMember = $group->getFirstAttribute('member');
```

`hasAttribute()`

The `hasAttribute` method determines whether the model contains the key in the models attributes:

```php
$user = User::first();

if ($user->hasAttribute('company')) {
    //
}
```

`countAttributes()`

The `countAttributes` method returns the number of attributes the model contains:

```php
$user = User::first();

echo $user->countAttributes();
```

### Array Conversion

Attributes you retrieve from an LdapRecord model will **always**
return and array. This is due to LDAP's multi-valued nature.

For example, if you would like to retrieve the users `mail`
attribute, you must request the first key from it:

```php
$user = User::find('cn=John Doe,dc=acme,dc=org');

// Get the users email address.
echo $user->mail[0];
```

However, the above will cause an exception if the attribute does not exist.

To work around this, we can use the `getFirstAttribute()` method:

```php
$user = User::find('cn=John Doe,dc=acme,dc=org');

// Get the users email address.
echo $user->getFirstAttribute('mail');
```

When setting attributes on models, they will automatically
be converted to an array for you if you do not provide one.

```php
$user = User::find('cn=John Doe,dc=acme,dc=org');

// Both approaches will set the attribute identically:
$user->mail = 'jdoe@acme.org';
$user->mail = ['jdoe@acme.org'];
```

Similarly, you can use the `setFirstAttribute()` method to
set the attributes first value in its array, even if
it does not currently exist on the model:

```php
$user = User::find('cn=John Doe,dc=acme,dc=org');

// Set the users email address.
$user->setFirstAttribute('mail', 'jdoe@acme.org');
```

### Determining Attribute Existence

To check if a model has an attribute, you can use the `hasAttribute()` method:

```php
if ($user->hasAttribute('mail')) {
    // This user has an email address.
}
```

As with all other attribute methods, this check is **case-insensitive**.
You may pass any type of casing of the attribute you are looking for:

```php
// Both will return 'true':
$user->hasAttribute('samaccountname');
$user->hasAttribute('sAMAccountname');
```

### Casing & Hyphens

#### Attribute Casing

LdapRecord automatically normalizes all attribute keys to lowercase. This
means when setting or getting model attributes, you can use alternate
casing and the same attribute will be set or retrieved.

This is extremely handy so you do not have to look up the casing of
each attribute every time you want to set or retrieve one. This
also means you can use your own attribute convention:

```php
$user = new User();

// Each will set the same attribute:
$user->samaccountname = 'John Doe';
$user->sAMAccountName = 'John Doe';
$user->samAccountName = 'John Doe';
```

#### Attribute Hyphens

Since LDAP does not support underscores in LDAP attributes but does
support using hyphens, anytime you would like to set an attribute
that contains a hypen, set it using an underscore instead.
LdapRecord will automatically convert the underscore
to a hyphen dynamically:

```php
$user = new User();

$user->some_attribute = 'Value';

// Returns 'Value'
echo $user->some_attribute[0];
echo $user->getAttribute('some-attribute')[0];
```

Similarly, when retrieving attributes that contain a hyphen, use
an underscore instead:

```php
$user = User::find('cn=John Doe,dc=acme,dc=org');

// Both will act identically:
echo $user->apple_user_homeurl[0];
echo $user->getAttribute('apple-user-homeurl')[0];
```

## Deleting Models

To delete a record from your directory, call the `delete()` method on a model you have retrieved:

```php
<?php

$user = User::first();

$user->delete();
```

> The account you have configured to bind to your LDAP server must have permission to delete the record
> you have retrieved. If it does not, you will receive an exception upon deletion.

#### Deleting Models By Distinguished Name

In the example above, we are retrieving the record from the directory prior to deletion. However,
if you'd like to simply delete a model by its distinguished name, call the `destroy()` method.
The *number* of deleted models will be returned from this method:

```php
<?php

$deleted = User::destroy('cn=John Doe,dc=acme,dc=org');

$deleted = User::destroy(['cn=John Doe,dc=acme,dc=org', 'cn=Jane Doe,dc=acme,dc=org']);

$deleted = User::destroy(new Collection(['cn=John Doe,dc=acme,dc=org', 'cn=Jane Doe,dc=acme,dc=org']));
```

> You may also pass in `true` into the second parameter to recursively delete
> leaf entries if a record is located by the distinguished name you have given.

#### Recursive Deleting

Sometimes you will be working with containers or organizational units that contain nested records
inside of them. Calling `delete()` on these records will generate an exception without first
deleting the records inside. If you would like to delete all records contained inside of
another model, pass in `true` in the first parameter of the `delete()` method:

```php
<?php

$ou = OrganizationalUnit::find('ou=Users,dc=acme,dc=org');

$ou->delete($recursive = true);
```

## Comparing Models

If you ever need to compare to models to see if they are the same, call the the `is()` method.
This method will determine if the models have the same distinguished name and connection:

```php
if ($user->is($anotherUser)) {
    //
}
```

To see if a model is contained inside an organizational unit or another type of
container, call the `isDescendantOf()` method:

```php
$ou = OrganizationalUnit::find('ou=User Accounts,dc=acme,dc=org');
$user = User::find('cn=John Doe,ou=User Accounts,dc=acme,dc=org');

if ($user->isDescendantOf($ou)) {
    // This user is contained inside this organizational unit!
}
```

You may also want to know whether a model is a direct ancestor of another. To
do so, call the `isAncestorOf()` method:

```php
$user = User::find('cn=John Doe,ou=User Accounts,dc=acme,dc=org');
$ou = OrganizationalUnit::find('ou=User Accounts,dc=acme,dc=org');

if ($ou->isAncestorOf($user)) {
    // This OU is a direct ancestor of this user!
}
```

> Calling `isDescendantOf()` or `isAncestorOf()` does not check recursively.
> If a user is contained in a nested container of the one you are checking, this
> method will return `false`.

```php
$ou = OrganizationalUnit::find('ou=User Accounts,dc=acme,dc=org');
$user = User::find('cn=John Doe,ou=Accounting,ou=User Accounts,dc=acme,dc=org');

// This will return false, as the user is not a direct descendant
// of the 'User Accounts' organizational unit.
if ($user->isDescendantOf($ou)) {
    // 
}
```

## Events

LdapRecord models fire several different [event](/docs/{{version}}/events) during the creation,
updating and deletion. Here is a list of all the events you can listen for:

| Event                              |
|------------------------------------|
| `LdapRecord\Models\Events\Creating`|
| `LdapRecord\Models\Events\Created` |
| `LdapRecord\Models\Events\Updating`|
| `LdapRecord\Models\Events\Updated` |
| `LdapRecord\Models\Events\Saving`  |
| `LdapRecord\Models\Events\Saved`   |
| `LdapRecord\Models\Events\Deleting`|
| `LdapRecord\Models\Events\Deleted` |

To listen for these events, call the `getEventDispatcher()` on the `LdapRecord\Container`
to retrieve the dispatcher, then call `listen()` on the returned dispatcher:

```php
<?php

$dispatcher = \LdapRecord\Container::getEventDispatcher();

$dispatcher->listen(\LdapRecord\Models\Events\Creating::class, function ($event) {
    $model = $event->getModel();
});
```

> You will want to setup any listeners prior to making changes to models,
> otherwise your listener will not be executed due to them not existing yet.

## Serialization

All model instances can be converted to an array for JSON serialization. To serialize
a model instance, simply pass the model into `json_encode()`. This calls
`jsonSerialize()` on the model to retrieve is serializable data:

```php
<?php

$user = User::first();

echo json_encode($user);
```

#### Converting Attributes to JSON

Depending on the type of LDAP directory and model you are working with, you may need
to convert some attributes to a string before it can be properly serialized.
For example, if you your model is from ActiveDirectory, you will need to
convert the `objectguid` property to a string since it is in binary,
otherwise `json_encode()` will throw an exception.

This can be done by adding a `convertAttributesForJson()` method to your model: 

> By default, the `objectguid` and `objectsid` attributes are
> converted for you when using the built-in ActiveDirectory models.

```php
<?php

use LdapRecord\Models\Model;

class User extends Model
{
    protected function convertAttributesForJson(array $attributes = [])
    {
        if ($this->hasAttribute('objectguid')) {
            // If the model has a GUID set, we need to convert it due to it being in
            // binary. Otherwise we will receive a JSON serialization exception.
            return array_replace($attributes, [
                'objectguid' => [$this->getConvertedGuid()],
            ]);
        }

        return $attributes;
    }
}
```