# Installation and local development

If you are using direnv, activate the virtualenv with:

    direnv allow

Otherwise create and activate a Python virtualenv with your favourite library.
Then setup requirements and prime the databases (required just the first time)  with:

```
git submodule update --init
pip install -U -r requirements.txt
tutor config save
tutor dev do init
```

Start/stop services with:

```
tutor dev start
tutor dev stop
```

Example services endpoints for the development environment:

* http://localhost:8000 or http://local.overhang.io:8000 (LMS)
* http://localhost:8001 or http://local.overhang.io:8001 (CMS)
* http://localhost:1994/gradebook/ or http://apps.local.overhang.io:1994/gradebook/ (Gradebook MFE)
* http://localhost:1995/profile/ or http://apps.local.overhang.io:1995/profile/ (Profile MFE)
* http://localhost:1997/account/ or http://apps.local.overhang.io:1997/account/ (Account MFE)
* http://localhost:2000/learning/ or http://apps.local.overhang.io:2000/learning/ (Learning MFE)
* http://localhost:3000/about/ or http://apps.local.overhang.io:3000/course_about/ (Course About MFE)
* http://localhost:3001/home/ or http://apps.local.overhang.io:3001/home/ (Home MFE)

Example services endpoints for the production like environment:

* http://local.overhang.io (Home MFE)
* http://local.overhang.io/courses (LMS)
* http://studio.local.overhang.io (CMS)
* http://apps.local.overhang.io/profile/u/abstract (Profile MFE)
* http://apps.local.overhang.io/gradebook/course-v1:Test+101+01 (Gradebook MFE)
* http://apps.local.overhang.io/account (Account MFE)
* http://apps.local.overhang.io/learning/course/course-v1:Test+101+01 (Learning MFE)
* http://local.overhang.io/courses/course-v1:Test+101+01/about (Course About MFE)

## Add admin user

```
tutor dev do createuser --staff --superuser admin admin@example.com
```

## Building customized MFEs dev images

In order to build dev images of custom MFE run:

    tutor images build mfe -d "-t=docker.io/overhangio/openedx-{{name}}-dev:15.0.5" --target {{name}}-dev

## Building and runnning the Home MFE in development mode

Build the dev image:

    tutor images build mfe -d "-t=docker.io/overhangio/openedx-home-dev:15.0.5" --target home-dev

Then you should be able to run:

    mfe_dev home

And browse the MFE at http://apps.local.overhang.io:3001/home/

</details>

## Running an MFE in development mode

To run an MFE in development mode, you would need to clone it and to mount it's directory

 Assuming you need to modify `frontend-app-account`.

1. Clone it _if it's not already_ 
2. `npm install` _make sure you are on the correct node version `node --version` it shall match `cat .nvmrc`_
3. `tutor mounts add "./mfe/frontend-app-account"`. 

### How do I override specific npm pks?

The following is an example of overriding a header

1. Clone it _if it's not already_
2. `npm install` _make sure you are on the correct node version `node --version` it shall match `cat .nvmrc`_
3. Mount the pkg to the container `tutor  mounts add "account:./mfe/frontend-component-header:/openedx/frontend-component-header"` scheme: `service:host_path:containter_path`
3. mounts the `module.config.js` file, assuming it's `mfe/`, `tutor mounts add account:./mfe/module.config.js:/openedx/app/module.config.js`
5. then run `npm install` _Note: in step 2 we run it inside header, now inside account mfe_
6. Simliar to adding the header we can also add other pkgs, like footer, brand, paragon...etc.

## Building and runnning MFEs in production mode

If you want to test the MFEs in a production like environment (e.g. the platform root page will be replaced by the Home MFE application) you can do so by running:

    tutor images build mfe
    tutor local start mfe caddy

## Features to implement

1. Register MFE images to build on dev instance to eliminate the need to build them by hand. Reference: https://github.com/overhangio/tutor-ecommerce/blob/87aedf98c9e8214c4e05958a812946ba90135de4/tutorecommerce/plugin.py#L161
2. MFE image building cache invalidation (after Palm). Reference: https://github.com/overhangio/tutor-mfe/commit/584d1e092ee6693e20b66d450b14c83666a5a5e3

