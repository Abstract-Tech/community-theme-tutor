# Guide i18n

## Xblock and the Platform strings

_The following guide applies to overrideing translation and making tranlsation for both Xblocks and the platform_.

There are two main files to put the translations in, either `django.po` or `djanogjs.po`. To know which is which, check the orignal file upstreams, see in which file it alreadys exists.

Tutor would compile the created files, once they exists in the correct location, [ref tutor i18 guide](https://docs.tutor.overhang.io/configuration.html#adding-custom-translations)

Let's take the example of creating German translation for the [SCORM Xblock](https://github.com/overhangio/openedx-scorm-xblock) which by default doesn't have translation `.po` file for the German langauge.

Thus to create the source strings clone the repo, install the requirments and cd to it and then run:

```bash
  django-admin makemessages -l de_DE
```

Note the code for German langauge is `de_DE`, is what the platform is using for the German langauge, it could have been different, it's important to match with what the platform is using, when not sure asks.

This would create `django.po` file _there is not `djangojs.po` because it just happend that for this pkg/Xblock there is no use for Javascript.

A snapshot of the file content

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

Then when traslated it would look like:

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

Now that we have the translation, we just need to put them in the right place, in case we already have `django.po` file in `community-theme-tutor/env/build/openedx/locale/de_DE/LC_MESSAGES/django.po` we create new one, in case file already exists, _we just append the strings_.

**Important Note**: In case a new file has been created, it should alawys before the starting of the translations, _it should include a meta data_, the minmum metadata required is:

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

Lastly, the only needed step, is to rebuild the openedx image, via `tutor images build openedx` and then start it again `tutor local start -d`.

## Overriding MFE translation

The way translation is handeld in the mfes differ from the platform (_which is Python gettext based_).

The MFEs translation framework is based on `formatjs` (https://formatjs.io/docs). 

Instead of `.po` file it's `.json` file, where each langauge has it's own file (per MFE), so to overirde a spesfic strings in all MFEs, we would have to override it in all translations files in all mfes, also sometimes for depencey pkgs, like header, footer..etc.

However tutor does make the process, by injectiing the overrding strings at build time in all MFEs, [look how it's implmented](https://github.com/overhangio/tutor-mfe/blob/master/tutormfe/templates/mfe/build/mfe/i18n/i18n-merge.js)

### An example override strings for MFE

The translations of an MFE strings.

There can be up to 4 sources for a paritucalr MFE to get it's strings.

- MFE source code, this can be easiily changeed following tutor-mfe [official tutor guide](https://github.com/overhangio/tutor-mfe#adding-custom-translations-to-your-mfes)
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

So for the account MFE (1), using the current version [master(9b45aa)](https://github.com/openedx/frontend-app-account/tree/9b45aa3bc9415c6c9e89d7364e1772396a160135) we would be able to change any string _using tutor-mfe tool_, bceause the appMessages is loaded last, while for the learning MFE, we would be able only to change paragon messages, and for heade/footer it wouldn't be possible to **override their strings**, **unless we forked** because our changes would be overriden by the original strings. _Unless it's not translated at all_.

Thus to be able to change the strings of header/footer, one way is to edit the i18n folder, which is in [heaader i18n/messages](https://github.com/openedx/frontend-component-header/tree/936c8714b7fcf8d40a25583f1f8d7bb112afb49e/src/i18n/messages) and [footer i18n/messages](https://github.com/openedx/frontend-component-footer/tree/master/src/i18n/messages).