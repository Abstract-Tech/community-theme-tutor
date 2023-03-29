FROM docker.io/node:16.14-bullseye-slim AS base

RUN apt update \
  && apt install -y git \
    # required for cwebp-bin
    gcc libgl1 libxi6 make \
    # additionally required for gifsicle, mozjpeg, and optipng (on arm)
    autoconf libtool pkg-config zlib1g-dev \
    # additionally required for node-sass (on arm)
    python g++

RUN mkdir -p /openedx/app /openedx/env
WORKDIR /openedx/app
ENV PATH ./node_modules/.bin:${PATH}

######## i18n strings
FROM base AS i18n
COPY ./i18n /openedx/i18n
RUN chmod a+x /openedx/i18n/*.js
RUN echo "copying i18n data" \
  && mkdir -p /openedx/i18n/account \
  && mkdir -p /openedx/i18n/gradebook \
  && mkdir -p /openedx/i18n/home \
  && mkdir -p /openedx/i18n/learning \
  && mkdir -p /openedx/i18n/profile \
  && mkdir -p /openedx/i18n/authn \
  && mkdir -p /openedx/i18n/course-authoring \
  && mkdir -p /openedx/i18n/discussions \
  echo "done."

################ account MFE
######## account (src)
FROM base AS account-src
RUN git clone https://github.com/Abstract-Tech/community-theme-account --branch community-theme-master --depth 1 .
RUN stat /openedx/app/src/i18n/messages 2> /dev/null || (echo "missing messages folder" && mkdir -p /openedx/app/src/i18n/messages)

######## account (i18n)
FROM base AS account-i18n
COPY --from=account-src /openedx/app/src/i18n/messages /openedx/app/src/i18n/messages
COPY --from=i18n /openedx/i18n/account /openedx/i18n/account
COPY --from=i18n /openedx/i18n/i18n-merge.js /openedx/i18n/i18n-merge.js
RUN /openedx/i18n/i18n-merge.js /openedx/app/src/i18n/messages /openedx/i18n/account /openedx/app/src/i18n/messages

######## account (common)
FROM base AS account-common
COPY --from=account-src /openedx/app/package.json /openedx/app/package.json
COPY --from=account-src /openedx/app/package-lock.json /openedx/app/package-lock.json
ARG NPM_REGISTRY=https://registry.npmjs.org/

ENV CPPFLAGS=-DPNG_ARM_NEON_OPT=0
ENV PACT_SKIP_BINARY_INSTALL=true
RUN npm clean-install --no-audit --no-fund --registry=$NPM_REGISTRY \
  && rm -rf ~/.npm

COPY --from=account-src /openedx/app /openedx/app
COPY --from=account-i18n /openedx/app/src/i18n/messages /openedx/app/src/i18n/messages
EXPOSE 1997

# Configuration needed at build time
ENV APP_ID=account
ENV PUBLIC_PATH='/account/'
# We could in theory point the mfe_config API directly to the LMS. But for that we would
# have to code the LMS url into the mfe image, and this configuration is user-dependent.
# So we point to a relative url that will be a proxy for the LMS.
ENV MFE_CONFIG_API_URL=/api/mfe_config/v1
ARG ENABLE_NEW_RELIC=false

######## account (dev)
FROM account-common AS account-dev
ENV NODE_ENV=development
CMD ["/bin/bash", "-c", "npm run start --- --config ./webpack.dev-tutor.config.js"]

################ gradebook MFE
######## gradebook (src)
FROM base AS gradebook-src
RUN git clone https://github.com/Abstract-Tech/community-theme-gradebook --branch community-theme --depth 1 .
RUN stat /openedx/app/src/i18n/messages 2> /dev/null || (echo "missing messages folder" && mkdir -p /openedx/app/src/i18n/messages)

######## gradebook (i18n)
FROM base AS gradebook-i18n
COPY --from=gradebook-src /openedx/app/src/i18n/messages /openedx/app/src/i18n/messages
COPY --from=i18n /openedx/i18n/gradebook /openedx/i18n/gradebook
COPY --from=i18n /openedx/i18n/i18n-merge.js /openedx/i18n/i18n-merge.js
RUN /openedx/i18n/i18n-merge.js /openedx/app/src/i18n/messages /openedx/i18n/gradebook /openedx/app/src/i18n/messages

######## gradebook (common)
FROM base AS gradebook-common
COPY --from=gradebook-src /openedx/app/package.json /openedx/app/package.json
COPY --from=gradebook-src /openedx/app/package-lock.json /openedx/app/package-lock.json
ARG NPM_REGISTRY=https://registry.npmjs.org/

ENV CPPFLAGS=-DPNG_ARM_NEON_OPT=0
ENV PACT_SKIP_BINARY_INSTALL=true
RUN npm clean-install --no-audit --no-fund --registry=$NPM_REGISTRY \
  && rm -rf ~/.npm

COPY --from=gradebook-src /openedx/app /openedx/app
COPY --from=gradebook-i18n /openedx/app/src/i18n/messages /openedx/app/src/i18n/messages
EXPOSE 1994

# Configuration needed at build time
ENV APP_ID=gradebook
ENV PUBLIC_PATH='/gradebook/'
# We could in theory point the mfe_config API directly to the LMS. But for that we would
# have to code the LMS url into the mfe image, and this configuration is user-dependent.
# So we point to a relative url that will be a proxy for the LMS.
ENV MFE_CONFIG_API_URL=/api/mfe_config/v1
ARG ENABLE_NEW_RELIC=false

######## gradebook (dev)
FROM gradebook-common AS gradebook-dev
ENV NODE_ENV=development
CMD ["/bin/bash", "-c", "npm run start --- --config ./webpack.dev-tutor.config.js"]

################ home MFE
######## home (src)
FROM base AS home-src
RUN git clone https://github.com/Abstract-Tech/community-theme-home --branch community-theme --depth 1 .
RUN stat /openedx/app/src/i18n/messages 2> /dev/null || (echo "missing messages folder" && mkdir -p /openedx/app/src/i18n/messages)

######## home (i18n)
FROM base AS home-i18n
COPY --from=home-src /openedx/app/src/i18n/messages /openedx/app/src/i18n/messages
COPY --from=i18n /openedx/i18n/home /openedx/i18n/home
COPY --from=i18n /openedx/i18n/i18n-merge.js /openedx/i18n/i18n-merge.js
RUN /openedx/i18n/i18n-merge.js /openedx/app/src/i18n/messages /openedx/i18n/home /openedx/app/src/i18n/messages

######## home (common)
FROM base AS home-common
COPY --from=home-src /openedx/app/package.json /openedx/app/package.json
COPY --from=home-src /openedx/app/package-lock.json /openedx/app/package-lock.json
ARG NPM_REGISTRY=https://registry.npmjs.org/

ENV CPPFLAGS=-DPNG_ARM_NEON_OPT=0
ENV PACT_SKIP_BINARY_INSTALL=true
RUN npm clean-install --no-audit --no-fund --registry=$NPM_REGISTRY \
  && rm -rf ~/.npm

COPY --from=home-src /openedx/app /openedx/app
COPY --from=home-i18n /openedx/app/src/i18n/messages /openedx/app/src/i18n/messages
EXPOSE 3001

# Configuration needed at build time
ENV APP_ID=home
ENV PUBLIC_PATH='/home/'
# We could in theory point the mfe_config API directly to the LMS. But for that we would
# have to code the LMS url into the mfe image, and this configuration is user-dependent.
# So we point to a relative url that will be a proxy for the LMS.
ENV MFE_CONFIG_API_URL=/api/mfe_config/v1
ARG ENABLE_NEW_RELIC=false

######## home (dev)
FROM home-common AS home-dev
ENV NODE_ENV=development
CMD ["/bin/bash", "-c", "npm run start --- --config ./webpack.dev-tutor.config.js"]

################ learning MFE
######## learning (src)
FROM base AS learning-src
RUN git clone https://github.com/Abstract-Tech/community-theme-learning --branch community-theme --depth 1 .
RUN stat /openedx/app/src/i18n/messages 2> /dev/null || (echo "missing messages folder" && mkdir -p /openedx/app/src/i18n/messages)

######## learning (i18n)
FROM base AS learning-i18n
COPY --from=learning-src /openedx/app/src/i18n/messages /openedx/app/src/i18n/messages
COPY --from=i18n /openedx/i18n/learning /openedx/i18n/learning
COPY --from=i18n /openedx/i18n/i18n-merge.js /openedx/i18n/i18n-merge.js
RUN /openedx/i18n/i18n-merge.js /openedx/app/src/i18n/messages /openedx/i18n/learning /openedx/app/src/i18n/messages

######## learning (common)
FROM base AS learning-common
COPY --from=learning-src /openedx/app/package.json /openedx/app/package.json
COPY --from=learning-src /openedx/app/package-lock.json /openedx/app/package-lock.json
ARG NPM_REGISTRY=https://registry.npmjs.org/

ENV CPPFLAGS=-DPNG_ARM_NEON_OPT=0
ENV PACT_SKIP_BINARY_INSTALL=true
RUN npm clean-install --no-audit --no-fund --registry=$NPM_REGISTRY \
  && rm -rf ~/.npm

COPY --from=learning-src /openedx/app /openedx/app
COPY --from=learning-i18n /openedx/app/src/i18n/messages /openedx/app/src/i18n/messages
EXPOSE 2000

# Configuration needed at build time
ENV APP_ID=learning
ENV PUBLIC_PATH='/learning/'
# We could in theory point the mfe_config API directly to the LMS. But for that we would
# have to code the LMS url into the mfe image, and this configuration is user-dependent.
# So we point to a relative url that will be a proxy for the LMS.
ENV MFE_CONFIG_API_URL=/api/mfe_config/v1
ARG ENABLE_NEW_RELIC=false

######## learning (dev)
FROM learning-common AS learning-dev
ENV NODE_ENV=development
CMD ["/bin/bash", "-c", "npm run start --- --config ./webpack.dev-tutor.config.js"]

################ profile MFE
######## profile (src)
FROM base AS profile-src
RUN git clone https://github.com/Abstract-Tech/community-theme-profile --branch community-theme-master --depth 1 .
RUN stat /openedx/app/src/i18n/messages 2> /dev/null || (echo "missing messages folder" && mkdir -p /openedx/app/src/i18n/messages)

######## profile (i18n)
FROM base AS profile-i18n
COPY --from=profile-src /openedx/app/src/i18n/messages /openedx/app/src/i18n/messages
COPY --from=i18n /openedx/i18n/profile /openedx/i18n/profile
COPY --from=i18n /openedx/i18n/i18n-merge.js /openedx/i18n/i18n-merge.js
RUN /openedx/i18n/i18n-merge.js /openedx/app/src/i18n/messages /openedx/i18n/profile /openedx/app/src/i18n/messages

######## profile (common)
FROM base AS profile-common
COPY --from=profile-src /openedx/app/package.json /openedx/app/package.json
COPY --from=profile-src /openedx/app/package-lock.json /openedx/app/package-lock.json
ARG NPM_REGISTRY=https://registry.npmjs.org/

ENV CPPFLAGS=-DPNG_ARM_NEON_OPT=0
ENV PACT_SKIP_BINARY_INSTALL=true
RUN npm clean-install --no-audit --no-fund --registry=$NPM_REGISTRY \
  && rm -rf ~/.npm

COPY --from=profile-src /openedx/app /openedx/app
COPY --from=profile-i18n /openedx/app/src/i18n/messages /openedx/app/src/i18n/messages
EXPOSE 1995

# Configuration needed at build time
ENV APP_ID=profile
ENV PUBLIC_PATH='/profile/'
# We could in theory point the mfe_config API directly to the LMS. But for that we would
# have to code the LMS url into the mfe image, and this configuration is user-dependent.
# So we point to a relative url that will be a proxy for the LMS.
ENV MFE_CONFIG_API_URL=/api/mfe_config/v1
ARG ENABLE_NEW_RELIC=false

######## profile (dev)
FROM profile-common AS profile-dev
ENV NODE_ENV=development
CMD ["/bin/bash", "-c", "npm run start --- --config ./webpack.dev-tutor.config.js"]

################ authn MFE
######## authn (src)
FROM base AS authn-src
RUN git clone https://github.com/openedx/frontend-app-authn --branch open-release/olive.2 --depth 1 .
RUN stat /openedx/app/src/i18n/messages 2> /dev/null || (echo "missing messages folder" && mkdir -p /openedx/app/src/i18n/messages)

######## authn (i18n)
FROM base AS authn-i18n
COPY --from=authn-src /openedx/app/src/i18n/messages /openedx/app/src/i18n/messages
COPY --from=i18n /openedx/i18n/authn /openedx/i18n/authn
COPY --from=i18n /openedx/i18n/i18n-merge.js /openedx/i18n/i18n-merge.js
RUN /openedx/i18n/i18n-merge.js /openedx/app/src/i18n/messages /openedx/i18n/authn /openedx/app/src/i18n/messages

######## authn (common)
FROM base AS authn-common
COPY --from=authn-src /openedx/app/package.json /openedx/app/package.json
COPY --from=authn-src /openedx/app/package-lock.json /openedx/app/package-lock.json
ARG NPM_REGISTRY=https://registry.npmjs.org/

ENV CPPFLAGS=-DPNG_ARM_NEON_OPT=0
ENV PACT_SKIP_BINARY_INSTALL=true
RUN npm clean-install --no-audit --no-fund --registry=$NPM_REGISTRY \
  && rm -rf ~/.npm

COPY --from=authn-src /openedx/app /openedx/app
COPY --from=authn-i18n /openedx/app/src/i18n/messages /openedx/app/src/i18n/messages
EXPOSE 1999

# Configuration needed at build time
ENV APP_ID=authn
ENV PUBLIC_PATH='/authn/'
# We could in theory point the mfe_config API directly to the LMS. But for that we would
# have to code the LMS url into the mfe image, and this configuration is user-dependent.
# So we point to a relative url that will be a proxy for the LMS.
ENV MFE_CONFIG_API_URL=/api/mfe_config/v1
ARG ENABLE_NEW_RELIC=false

######## authn (dev)
FROM authn-common AS authn-dev
ENV NODE_ENV=development
CMD ["/bin/bash", "-c", "npm run start --- --config ./webpack.dev-tutor.config.js"]

################ course-authoring MFE
######## course-authoring (src)
FROM base AS course-authoring-src
RUN git clone https://github.com/openedx/frontend-app-course-authoring --branch open-release/olive.2 --depth 1 .
RUN stat /openedx/app/src/i18n/messages 2> /dev/null || (echo "missing messages folder" && mkdir -p /openedx/app/src/i18n/messages)

######## course-authoring (i18n)
FROM base AS course-authoring-i18n
COPY --from=course-authoring-src /openedx/app/src/i18n/messages /openedx/app/src/i18n/messages
COPY --from=i18n /openedx/i18n/course-authoring /openedx/i18n/course-authoring
COPY --from=i18n /openedx/i18n/i18n-merge.js /openedx/i18n/i18n-merge.js
RUN /openedx/i18n/i18n-merge.js /openedx/app/src/i18n/messages /openedx/i18n/course-authoring /openedx/app/src/i18n/messages

######## course-authoring (common)
FROM base AS course-authoring-common
COPY --from=course-authoring-src /openedx/app/package.json /openedx/app/package.json
COPY --from=course-authoring-src /openedx/app/package-lock.json /openedx/app/package-lock.json
ARG NPM_REGISTRY=https://registry.npmjs.org/

ENV CPPFLAGS=-DPNG_ARM_NEON_OPT=0
ENV PACT_SKIP_BINARY_INSTALL=true
RUN npm clean-install --no-audit --no-fund --registry=$NPM_REGISTRY \
  && rm -rf ~/.npm

COPY --from=course-authoring-src /openedx/app /openedx/app
COPY --from=course-authoring-i18n /openedx/app/src/i18n/messages /openedx/app/src/i18n/messages
EXPOSE 2001

# Configuration needed at build time
ENV APP_ID=course-authoring
ENV PUBLIC_PATH='/course-authoring/'
# We could in theory point the mfe_config API directly to the LMS. But for that we would
# have to code the LMS url into the mfe image, and this configuration is user-dependent.
# So we point to a relative url that will be a proxy for the LMS.
ENV MFE_CONFIG_API_URL=/api/mfe_config/v1
ARG ENABLE_NEW_RELIC=false

######## course-authoring (dev)
FROM course-authoring-common AS course-authoring-dev
ENV NODE_ENV=development
CMD ["/bin/bash", "-c", "npm run start --- --config ./webpack.dev-tutor.config.js"]

################ discussions MFE
######## discussions (src)
FROM base AS discussions-src
RUN git clone https://github.com/openedx/frontend-app-discussions --branch open-release/olive.2 --depth 1 .
RUN stat /openedx/app/src/i18n/messages 2> /dev/null || (echo "missing messages folder" && mkdir -p /openedx/app/src/i18n/messages)

######## discussions (i18n)
FROM base AS discussions-i18n
COPY --from=discussions-src /openedx/app/src/i18n/messages /openedx/app/src/i18n/messages
COPY --from=i18n /openedx/i18n/discussions /openedx/i18n/discussions
COPY --from=i18n /openedx/i18n/i18n-merge.js /openedx/i18n/i18n-merge.js
RUN /openedx/i18n/i18n-merge.js /openedx/app/src/i18n/messages /openedx/i18n/discussions /openedx/app/src/i18n/messages

######## discussions (common)
FROM base AS discussions-common
COPY --from=discussions-src /openedx/app/package.json /openedx/app/package.json
COPY --from=discussions-src /openedx/app/package-lock.json /openedx/app/package-lock.json
ARG NPM_REGISTRY=https://registry.npmjs.org/

ENV CPPFLAGS=-DPNG_ARM_NEON_OPT=0
ENV PACT_SKIP_BINARY_INSTALL=true
RUN npm clean-install --no-audit --no-fund --registry=$NPM_REGISTRY \
  && rm -rf ~/.npm

COPY --from=discussions-src /openedx/app /openedx/app
COPY --from=discussions-i18n /openedx/app/src/i18n/messages /openedx/app/src/i18n/messages
EXPOSE 2002

# Configuration needed at build time
ENV APP_ID=discussions
ENV PUBLIC_PATH='/discussions/'
# We could in theory point the mfe_config API directly to the LMS. But for that we would
# have to code the LMS url into the mfe image, and this configuration is user-dependent.
# So we point to a relative url that will be a proxy for the LMS.
ENV MFE_CONFIG_API_URL=/api/mfe_config/v1
ARG ENABLE_NEW_RELIC=false

######## discussions (dev)
FROM discussions-common AS discussions-dev
ENV NODE_ENV=development
CMD ["/bin/bash", "-c", "npm run start --- --config ./webpack.dev-tutor.config.js"]


# Production images are last to accelerate dev image building
######## account (production)
FROM account-common AS account-prod
ENV NODE_ENV=production
RUN npm run build

######## gradebook (production)
FROM gradebook-common AS gradebook-prod
ENV NODE_ENV=production
RUN npm run build

######## home (production)
FROM home-common AS home-prod
ENV NODE_ENV=production
RUN npm run build

######## learning (production)
FROM learning-common AS learning-prod
ENV NODE_ENV=production
RUN npm run build

######## profile (production)
FROM profile-common AS profile-prod
ENV NODE_ENV=production
RUN npm run build

######## authn (production)
FROM authn-common AS authn-prod
ENV NODE_ENV=production
RUN npm run build

######## course-authoring (production)
FROM course-authoring-common AS course-authoring-prod
ENV NODE_ENV=production
RUN npm run build

######## discussions (production)
FROM discussions-common AS discussions-prod
ENV NODE_ENV=production
RUN npm run build


####### final production image with all static assets
FROM docker.io/caddy:2.6.3 as production

RUN mkdir -p /openedx/dist

# Copy static assets

COPY --from=account-prod /openedx/app/dist /openedx/dist/account

COPY --from=gradebook-prod /openedx/app/dist /openedx/dist/gradebook

COPY --from=home-prod /openedx/app/dist /openedx/dist/home

COPY --from=learning-prod /openedx/app/dist /openedx/dist/learning

COPY --from=profile-prod /openedx/app/dist /openedx/dist/profile

COPY --from=authn-prod /openedx/app/dist /openedx/dist/authn

COPY --from=course-authoring-prod /openedx/app/dist /openedx/dist/course-authoring

COPY --from=discussions-prod /openedx/app/dist /openedx/dist/discussions
