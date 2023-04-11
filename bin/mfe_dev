#!/usr/bin/env bash

set -e

if [ $# -eq 0 ]
  then
    echo "Please provide a MFE name. Available MFE:"
    echo
    for mfe in $(ls mfe | grep frontend-app- )
    do
        echo ${mfe/#"frontend-app-"}
    done
    exit 1
fi

MFE_DIRECTORY="./mfe/frontend-app-$1"

if [ ! -d "$MFE_DIRECTORY" ]; then
  echo "$MFE_DIRECTORY does not exist."
  exit 1
fi

(cd $MFE_DIRECTORY; exec npm install;)

exec tutor dev start \
  --mount=./mfe/frontend-app-$1 \
  --mount=$1:./mfe/frontend-component-header:/openedx/frontend-component-header \
  --mount=$1:./mfe/frontend-component-footer:/openedx/frontend-component-footer \
  --mount=$1:./mfe/brand-openedx:/openedx/brand-openedx \
  --mount=$1:./mfe/module.config.js:/openedx/app/module.config.js \
  $1
