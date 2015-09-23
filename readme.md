[![NPM version](http://img.shields.io/npm/v/generator-polymer.svg?style=flat)](http://npmjs.org/generator-polymer)[![NPM downloads](http://img.shields.io/npm/dm/generator-polymer.svg?style=flat)](http://npmjs.org/generator-polymer)[![Build Status](http://img.shields.io/travis/yeoman/generator-polymer/master.svg?style=flat)](https://travis-ci.org/yeoman/generator-polymer)[![Dependency Status](http://img.shields.io/david/yeoman/generator-polymer.svg?style=flat)](https://david-dm.org/yeoman/generator-polymer)

Yeoman generator for Polymer projects with ES2015 built in
----------------------------------------------------------

<img src="http://i.imgur.com/dsFChIk.png"/>

Introduction
------------

[Polymer](http://www.polymer-project.org/) is a library of polyfills and sugar which enable the use of Web Components in modern browsers. The project allows developers to build apps using the platform of tomorrow and inform the W3C of places where in-flight specifications can be further improved.

`generator-polymer` provides Polymer scaffolding using [Yeoman](http://yeoman.io) (a scaffolding tool for the web), letting you easily create and customize Polymer (custom) elements via the command-line and import them using HTML Imports. This saves you time writing boilerplate code so you can start writing up the logic to your components straight away.

Features
--------

-	A Polymer app scaffold built with [Polymer Starter Kit](https://developers.google.com/web/tools/polymer-starter-kit/)
-	Sub-generator to create Polymer elements for your app
-	Quick deploy to GitHub pages
-	All the goodness of [seed-element](https://github.com/polymerelements/seed-element) (docs & landing page for your element)
-	[web-component-tester](https://github.com/Polymer/web-component-tester) support

In addition, this generator leverages [polymer-starter-kit-plus](https://github.com/StartPolymer/polymer-starter-kit-plus) to provide ES2015 support "out of the box" along with many other bonus features!

See this [README](https://github.com/StartPolymer/polymer-starter-kit-plus/blob/master/README.md) for more details.

Extras:

-	Element generator uses ES2015 classes
-	[Stylus](https://learnboost.github.io/stylus/) support
-	[Reactive Extensions](https://github.com/Reactive-Extensions/RxJS) using Rx lite and Rx DOM bindings
-	Themes in `/themes` can be styled using Stylus (CSS pre-processor)

Why [Reactive Extensions](https://github.com/Reactive-Extensions/RxJS)? See this [Netflix video presentation](https://www.youtube.com/watch?v=XRYN2xt11Ek) on Async Javascript, iterating and mapping/filtering collections, events etc. So much easier with RxJS :)

TODO
----

-	Add better Cycle.js integration

See [Cycle.js with Web components demo](https://github.com/staltz/mvi-wc-poc) to answer [this VDom issue](https://github.com/Matt-Esch/virtual-dom/issues/111)

Cycle.js integration
--------------------

`npm i --save @cycle/core @cycle/dom`

```js
import Cycle from '@cycle/core';
import CycleDOM from '@cycle/dom';
```

For use in a real app, see [custom-elements](http://cycle.js.org/custom-elements.html) on how to use a Model-View-Intent application structure.

Issues
------

This generator clones [Polymer Starter Kit](https://github.com/kristianmandrup/polymer-starter-kit-plus) and [seed-element](https://github.com/polymerelements/seed-element). If you're having issues with the template files generated for those projects, please raise them on those repos as they are the canonical source.

Installation
------------

Install the generator`npm install -g generator-polymer-plus`

Make a new directory and cd into it`mkdir -p my-project && cd $_`

Scaffold a new Polymer project:`yo polymer-plus`

Generators
----------

Available generators:

-	[polymer (aka polymer-plus:app)](#app)
-	[polymer-plus:element](#element-alias-el)
-	[polymer-plus:seed](#seed)
-	[polymer-plus:gh](#gh)

**Note: Generators are to be run from the root of your app**

### App

Sets up a new Polymer app, generating all the boilerplate you need to get started.

Example:

```bash
yo polymer-plus
```

### Element (alias: El)

Generates a polymer element in `app/elements` and optionally appends an import to `app/elements/elements.html`.

Example:

```bash
yo polymer-plus:element my-element

# or use the alias

yo polymer-plus:el my-element
```

**Note: You must pass in an element name, and the name must contain a dash "-"**

One can also include element dependencies to be imported. For instance, if you're creating a `fancy-menu` element which needs to import `paper-button` and `paper-checkbox` as dependencies, you can generate the file like so:

```bash
yo polymer-plus:el fancy-menu paper-button paper-checkbox
```

#### Options

```
--docs, include iron-component-page docs with your element and demo.html
--path, override default directory structure, ex: --path foo/bar will put your element in app/elements/foo/bar
```

### Seed

Generates a reusable polymer element based on the [seed-element workflow](https://github.com/polymerelements/seed-element). **This should only be used if you're creating a standalone element repo that you intend to share with others via bower.** If you're just building a Polymer app, stick to the [Element](#element-alias-el) generator.

To preview your new element you'll want to use the [polyserve](https://github.com/PolymerLabs/polyserve) tool.

Example:

```bash
mkdir -p my-foo && cd $_
yo polymer-plus:seed my-foo
polyserve
```

### Gh

Generates a Github pages branch for your [seed-element](#seed).

**This requires that you have [SSH keys setup on GitHub](https://help.github.com/articles/generating-ssh-keys/)**.

If your documentation or demo pages have dependencies declared as devDependencies in `bower.json`, they will be included in your GitHub pages branch.

Example:

```bash
cd my-foo
yo polymer-plus:gh
```

If, for some reason, you don't want the devDependencies, use the `--nodevdeps` option.

Testing
-------

The project generated by `yo polymer` contains support for [web-component-tester](https://github.com/Polymer/web-component-tester). The following commands are included:

Run local tests (in terminal):

```bash
gulp test:local
```

Run remote tests with [SauceLabs](https://saucelabs.com/):

```bash
gulp test:remote
```

See the [web-component-tester readme](https://github.com/Polymer/web-component-tester#configuration) for configuration options.

Gotchas
-------

### The `elements.html` file

The `app` generator will produce an `elements.html` file where you can place your imports. This file will be [vulcanized](https://www.polymer-project.org/articles/concatenating-web-components.html) when you run the default `gulp` task. **You'll want to make sure that elements.html is the only import in your index.html file, otherwise there's a good chance you'll accidentally load Polymer twice and break the app**.

Contribute
----------

See the [contributing docs](https://github.com/yeoman/yeoman/blob/master/contributing.md)

When submitting an issue, please follow the [guidelines](https://github.com/yeoman/yeoman/blob/master/contributing.md#issue-submission). Especially important is to make sure Yeoman is up-to-date, and providing the command or commands that cause the issue.

License
-------

[BSD license](http://opensource.org/licenses/bsd-license.php)
