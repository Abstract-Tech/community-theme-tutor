# Guide i18n

## Xblock and the Platform strings

_The following guide applies to overriding translation and/or making new translations for both Xblocks and the platform_.

There are two main files to put the translations in, either `django.po` or `djanogjs.po`.To find out in which of the two files the original string is, you have to access the original files and check in which file the string you are looking to adapt already exists.

Tutor would compile the created files, once they are added in the correct location in _tutor project root_, [ref tutor i18 guide](https://docs.tutor.overhang.io/configuration.html#adding-custom-translations)

Let's make an example:

Imagine you want to adopt a German translation within the [SCORM Xblock](https://github.com/overhangio/openedx-scorm-xblock).

**Note: The SCORM Xblock does not have translations in any of the two “.po”-files mentioned before.**

Thus, to create the source strings you have to clone the repository, install the requirements and cd to it. Once there run:

```bash
  django-admin makemessages -l de_DE
```

**Note**: The code for German language is `de_DE`. It's important to match the language code with what the platform is using by default.

This would create `django.po` file, _there is no `djangojs.po`_ because it just happened that for this pkg/Xblock specifically there is no use for Javascript.

The following is a snapshot of the file content

```gettext
#: openedxscorm/scormxblock.py:90
msgid "Display name for this module"
msgstr ""

#: openedxscorm/scormxblock.py:95
msgid "Path to the index page in scorm file"
msgstr ""

#: openedxscorm/scormxblock.py:112
msgid "Weight"
msgstr ""

#: openedxscorm/scormxblock.py:113
msgid "Weight/Maximum grade"
msgstr ""

```

Then when translated it would look like the following:

```gettext
#: scormxblock.py:89
msgid "Display Name"
msgstr "Name anzeigen"

#: scormxblock.py:90
msgid "Display name for this module"
msgstr "Anzeigename für dieses Modul"

#: scormxblock.py:95
msgid "Path to the index page in scorm file"
msgstr "Pfad zur Indexseite in der Scorm-Datei"

#: scormxblock.py:112
msgid "Weight"
msgstr "Gewicht"

#: scormxblock.py:113
msgid "Weight/Maximum grade"
msgstr "Gewicht/Höchstnote"

```

Now that we have customized the translation, we just need to put this in the right place. In case we do not already have a `django.po` file in the _in tutor project root_ (e.g. community-theme-tutor/env/build/openedx/locale/de_DE/LC_MESSAGES/django.po), we create a new one. And in case a `django.po` file already exists, we just append the strings.

**Important Note**: In case a new file has been created, it must start with metadata about the file itself, **at least encoding type as shown below**:

```
msgid ""
msgstr ""
"Content-Type: text/plain; charset=UTF-8"
```

Thus taking our example above, if it's a new file the final result would be:

`cat community-theme-tutor/env/build/openedx/locale/de_DE/LC_MESSAGES/django.po`

```
msgid ""
msgstr ""
"Content-Type: text/plain; charset=UTF-8"
#: scormxblock.py:89
msgid "Display Name"
msgstr "Name anzeigen"

#: scormxblock.py:90
msgid "Display name for this module"
msgstr "Anzeigename für dieses Modul"

#: scormxblock.py:95
msgid "Path to the index page in scorm file"
msgstr "Pfad zur Indexseite in der Scorm-Datei"

#: scormxblock.py:112
msgid "Weight"
msgstr "Gewicht"

#: scormxblock.py:113
msgid "Weight/Maximum grade"
msgstr "Gewicht/Höchstnote"

```

Lastly, you need to rebuild the Open edX image, via `tutor images build openedx`. Once the image build finishes,  you have to restart the LMS/CMS containers again by `tutor local start -d`.

## Overriding MFE translation

The way translation is handled in the MFEs differs from how the platform handles translations (_which is Python gettext based_).

The translation framework in MFEs is based on `formatjs` (https://formatjs.io/docs).

Instead of `.po` file it's `.json` file, where each langauge has it's own file (per MFE), so to overirde a spesfic strings in all MFEs, we would have to override it in all translations files in all mfes, also sometimes for depencey pkgs, like header, footer..etc.

Instead of `.po` files, the translations lie in  `.json` files. Every language has its file (per MFE), so to override a specific string in all MFEs, we would have to override it in all translation files in all MFEs This also sometimes applies to decency pkgs, like header, footer..etc.


However, tutor-mfe does simplify make the process, [by injecting the overriding strings at build time in all MFEs](https://github.com/overhangio/tutor-mfe/blob/master/tutormfe/templates/mfe/build/mfe/i18n/i18n-merge.js).


### An example override strings for MFE

The translations of an MFE strings.

There can be up to 4 sources for a particular MFE to get its strings.

- MFE source code, this can be easily changed following [tutor-mfe official guide](https://github.com/overhangio/tutor-mfe#adding-custom-translations-to-your-mfes)
- Paragon
- Footer
- Header
 
Would it be possible to use tutor-mfe official gudide to handle all the cases? _It depends on the order the strings are imported_

1. For example in learning MFE, the order of the strings are, [paragon, appMessages, then footer/header](https://github.com/openedx/frontend-app-learning/blob/d2df9241c321dbd8d73b5209aedee03d638c2644/src/i18n/index.js#L40-L44)
```json
export default [
  paragonMessages,
  appMessages,
  footerMessages,
  headerMessages,
];
```

2. While for the account MFE the [appMessages are loaded last](https://github.com/openedx/frontend-app-account/blob/9b45aa3bc9415c6c9e89d7364e1772396a160135/src/i18n/index.js#L39-L44):
```json
export default [
  headerMessages,
  paragonMessages,
  footerMessages,
  appMessages,
];
``` 

So for the account MFE (1), using the current version [master(9b45aa)](https://github.com/openedx/frontend-app-account/tree/9b45aa3bc9415c6c9e89d7364e1772396a160135) we would be able to change any string _using tutor-mfe tool_, because the appMessages is loaded last, while for the learning MFE, we would be able only to change paragon messages, and for header/footer, it wouldn't be possible to **override their strings** **unless we forked** because our changes would be overridden by the original strings. _Unless it's not translated at all_.

Thus to be able to change the strings of header/footer, one way is to edit the i18n folder, which is in [heaader i18n/messages](https://github.com/openedx/frontend-component-header/tree/936c8714b7fcf8d40a25583f1f8d7bb112afb49e/src/i18n/messages) and [footer i18n/messages](https://github.com/openedx/frontend-component-footer/tree/master/src/i18n/messages).