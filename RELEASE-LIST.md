
# Release Checklist

This assumes that you have a working Neatline development environment going.
Specifically, this means:

* Omeka is in the parent directory two levels up (`../..`).

* You have [npm](https://www.npmjs.org/), [Bower](http://bower.io/),
  [Grunt](http://gruntjs.com/), [Composer](https://getcomposer.org/), and all
  the other stuff installed, configured, and ready to go.

* You have [Transifex Client](http://docs.transifex.com/developer/client/)
  installed and configured.

Once all of that is in place, we're ready to go.

## Create a new release

- `VERSION=1.1.0`

- `git flow release start $VERSION`

- Bump the `version` in the `package.json` and `plugin.ini` files to the new
  version.

- Run `grunt`. This generates the dist files and runs tests.

- Run `grunt package`. Behind the scenes, this task:

  - Minifies the static payloads and copies them into the distribution directories.
  - Generates a `.zip` archive under the `pkg` directory.

- `git flow release finish $VERSION`

- Hallway test the zip.

- `git push --all`

- `git push --tags`

- Upload the zip to http://omeka.org/add-ons/plugins/.

