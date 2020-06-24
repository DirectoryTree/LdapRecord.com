---
title: Searching API
description: A list of all available LdapRecord query builder methods.
extends: _layouts.documentation
section: content
---

# Available Search Methods (API)

<div class="api-method-list">
<p>
<a href="#addControl">addControl</a>
<a href="#addFilter">addFilter</a>
<a href="#addSelect">addSelect</a>
<a href="#andFilter">andFilter</a>
<a href="#cache">cache</a>
<a href="#clearFilters">clearFilters</a>
<a href="#delete">delete</a>
<a href="#deleteAttributes">deleteAttributes</a>
<a href="#dynamicWhere">dynamicWhere</a>
<a href="#escape">escape</a>
<a href="#find">find</a>
<a href="#findBy">findBy</a>
<a href="#findByOrFail">findByOrFail</a>
<a href="#findManyBy">findManyBy</a>
<a href="#findOrFail">findOrFail</a>
<a href="#first">first</a>
<a href="#firstOrFail">firstOrFail</a>
<a href="#get">get</a>
<a href="#getCache">getCache</a>
<a href="#getConnection">getConnection</a>
<a href="#getDn">getDn</a>
<a href="#getFilters">getFilters</a>
<a href="#getGrammar">getGrammar</a>
<a href="#getQuery">getQuery</a>
<a href="#getSelects">getSelects</a>
<a href="#getType">getType</a>
<a href="#getUnescapedQuery">getUnescapedQuery</a>
<a href="#hasControl">hasControl</a>
<a href="#hasSelects">hasSelects</a>
<a href="#in">in</a>
<a href="#insert">insert</a>
<a href="#insertAttributes">insertAttributes</a>
<a href="#isNested">isNested</a>
<a href="#isPaginated">isPaginated</a>
<a href="#limit">limit</a>
<a href="#listing">listing</a>
<a href="#model">model</a>
<a href="#nested">nested</a>
<a href="#newInstance">newInstance</a>
<a href="#newNestedInstance">newNestedInstance</a>
<a href="#notFilter">notFilter</a>
<a href="#orFilter">orFilter</a>
<a href="#orWhere">orWhere</a>
<a href="#orWhereApproximatelyEquals">orWhereApproximatelyEquals</a>
<a href="#orWhereContains">orWhereContains</a>
<a href="#orWhereEndsWith">orWhereEndsWith</a>
<a href="#orWhereEquals">orWhereEquals</a>
<a href="#orWhereHas">orWhereHas</a>
<a href="#orWhereNotContains">orWhereNotContains</a>
<a href="#orWhereNotEndsWith">orWhereNotEndsWith</a>
<a href="#orWhereNotEquals">orWhereNotEquals</a>
<a href="#orWhereNotHas">orWhereNotHas</a>
<a href="#orWhereNotStartsWith">orWhereNotStartsWith</a>
<a href="#orWhereRaw">orWhereRaw</a>
<a href="#orWhereStartsWith">orWhereStartsWith</a>
<a href="#paginate">paginate</a>
<a href="#query">query</a>
<a href="#rawFilter">rawFilter</a>
<a href="#read">read</a>
<a href="#recursive">recursive</a>
<a href="#rename">rename</a>
<a href="#select">select</a>
<a href="#setCache">setCache</a>
<a href="#setConnection">setConnection</a>
<a href="#setDn">setDn</a>
<a href="#setGrammar">setGrammar</a>
<a href="#update">update</a>
<a href="#updateAttributes">updateAttributes</a>
<a href="#where">where</a>
<a href="#whereApproximatelyEquals">whereApproximatelyEquals</a>
<a href="#whereBetween">whereBetween</a>
<a href="#whereContains">whereContains</a>
<a href="#whereDeleted">whereDeleted</a>
<a href="#whereEndsWith">whereEndsWith</a>
<a href="#whereEquals">whereEquals</a>
<a href="#whereHas">whereHas</a>
<a href="#whereIn">whereIn</a>
<a href="#whereNotContains">whereNotContains</a>
<a href="#whereNotEndsWith">whereNotEndsWith</a>
<a href="#whereNotEquals">whereNotEquals</a>
<a href="#whereNotHas">whereNotHas</a>
<a href="#whereNotStartsWith">whereNotStartsWith</a>
<a href="#whereRaw">whereRaw</a>
<a href="#whereStartsWith">whereStartsWith</a>
<a href="#withDeleted">withDeleted</a>
</p>
</div>

## Method Listing

#### `addControl` {#addControl}

Add a server control to be executed with the LDAP search query:

```php
$query = $connection->query();

$query->addControl(
    $oid = '1.2.840.113556.1.4.417', $isCritical = true, $value = null
);

// array:1 [▼
//  "1.2.840.113556.1.4.417" => array:3 [▼
//    "oid" => "1.2.840.113556.1.4.417"
//    "isCritical" => true
//    "value" => null
//  ]
// ]
var_dump($query->controls);
```

#### `addFilter` {#addFilter}

#### `addSelect` {#addSelect}
#### `andFilter` {#addFilter}
#### `cache` {#cache}
#### `clearFilters` {#clearFilters}
#### `delete` {#delete}
#### `deleteAttributes` {#deleteAttributes}
#### `dynamicWhere` {#dynamicWhere}
#### `escape` {#escape}
#### `find` {#find}
#### `findBy` {#findBy}
#### `findByOrFail` {#findByOrFail}
#### `findManyBy` {#findManyBy}
#### `findOrFail` {#findOrFail}
#### `first` {#first}
#### `firstOrFail` {#firstOrFail}
#### `get` {#get}
#### `getCache` {#getCache}
#### `getConnection` {#getConnection}
#### `getDn` {#getDn}
#### `getFilters` {#getFilters}
#### `getGrammar` {#getGrammar}
#### `getQuery` {#getQuery}
#### `getSelects` {#getSelects}
#### `getType` {#getType}
#### `getUnescapedQuery` {#getUnescapedQuery}
#### `hasControl` {#hasControl}
#### `hasSelects` {#hasSelects}
#### `in` {#in}
#### `insert` {#insert}
#### `insertAttributes` {#insertAttributes}
#### `isNested` {#isNested}
#### `isPaginated` {#isPaginated}
#### `limit` {#limit}
#### `listing` {#listing}
#### `model` {#model}
#### `nested` {#nested}
#### `newInstance` {#newInstance}
#### `newNestedInstance` {#newNestedInstance}
#### `notFilter` {#notFilter}
#### `orFilter` {#orFilter}
#### `orWhere` {#orWhere}
#### `orWhereApproximatelyEquals` {#orWhereApproximatelyEqual}
#### `orWhereContains` {#orWhereContains}
#### `orWhereEndsWith` {#orWhereEndsWith}
#### `orWhereEquals` {#orWhereEquals}
#### `orWhereHas` {#orWhereHas}
#### `orWhereNotContains` {#orWhereNotContains}
#### `orWhereNotEndsWith` {#orWhereNotEndsWith}
#### `orWhereNotEquals` {#orWhereNotEquals}
#### `orWhereNotHas` {#orWhereNotHas}
#### `orWhereNotStartsWith` {#orWhereNotStartsWith}
#### `orWhereRaw` {#orWhereRaw}
#### `orWhereStartsWith` {#orWhereStartsWith}
#### `paginate` {#paginate}
#### `query` {#query}
#### `rawFilter` {#rawFilter}
#### `read` {#read}
#### `recursive` {#recursive}
#### `rename` {#rename}
#### `select` {#select}
#### `setCache` {#setCache}
#### `setConnection` {#setConnection}
#### `setDn` {#setDn}
#### `setGrammar` {#setGrammar}
#### `update` {#update}
#### `updateAttributes` {#updateAttributes}
#### `where` {#where}
#### `whereApproximatelyEquals` {#whereApproximatelyEquals}
#### `whereBetween` {#whereBetween}
#### `whereContains` {#whereContains}
#### `whereDeleted` {#whereDeleted}
#### `whereEndsWith` {#whereEndsWith}
#### `whereEquals` {#whereEquals}
#### `whereHas` {#whereHas}
#### `whereIn` {#whereIn}
#### `whereNotContains` {#whereNotContains}
#### `whereNotEndsWith` {#whereNotEndsWith}
#### `whereNotEquals` {#whereNotEquals}
#### `whereNotHas` {#whereNotHas}
#### `whereNotStartsWith` {#whereNotStartsWith}
#### `whereRaw` {#whereRaw}
#### `whereStartsWith` {#whereStartsWith}
#### `withDeleted` {#withDeleted}
