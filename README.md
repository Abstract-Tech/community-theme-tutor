# Installation and local development

If you are using direnv, activate the virtualenv with:

    direnv allow

Otherwise create and activate a Python virtualenv with your favourite library.
Then setup requirements and prime the databases (required just the first time)  with:

```
git submodule update --init
pip install -r requirements.txt
tutor config save
tutor dev do init
```

Start/stop services with:

```
tutor dev start
tutor dev stop
```

## Add admin user

```
tutor dev do createuser --staff --superuser admin admin@example.com
```

## MFE development

Read the [Tutor docs](https://github.com/overhangio/tutor-mfe#mfe-development) on MFE development.

TL;DR

Start the services in development mode. Be careful when using `tutor dev start` as it will start all services, requiring a lot of resources (it nearly crashed my system). Specifying individual services might be needed.

In this example we'll start development of the Profile MFE. In order to render it properly it needs to be access throught the LMS with an authenticated user, thus we are starting only the `lms` and `authn` MFE services.

```
tutor dev start lms authn
```

Then to start the MFE mounting our local fork:

```
cd mfe/frontend-app-profile
npm install
tutor dev start --mount=. profile
```

It's important that MFE directories names start with the `frontend-app` magic words, otherwise this won't work.

The MFE application will be accessible at `http://apps.local.overhang.io:{{ PORT }}/{{ NAME }}/`. The `PORT` and `NAME` parameters for the specific MFE can be found in `config.yml`.
(e.g. http://apps.local.overhang.io:1995/profile/)


## Building customized MFEs dev images

In order to build dev images of custom MFE run:

    tutor images build mfe -d "-t=docker.io/overhangio/openedx-{{name}}-dev:15.0.5" --target {{name}}-dev

## Building and runnning the Home MFE

Build the dev image:

    tutor images build mfe -d "-t=docker.io/overhangio/openedx-home-dev:15.0.5" --target home-dev

Then you should be able to run:

    cd mfe/frontend-app-home
    npm install
    tutor dev start --mount=. home

And browse the MFE at http://apps.local.overhang.io:3001/home/
