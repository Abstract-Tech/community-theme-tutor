from tutormfe.hooks import MFE_APPS
from tutor import hooks
@MFE_APPS.add()
def _add_my_mfe(mfes):
    mfes['learning'] = {
          "repository": "https://github.com/Abstract-Tech/community-theme-learning",
            "version": "ghassan/community-theme.palm",
            "port":2000,
            "name":"learning"}
    return mfes


hooks.Filters.ENV_PATCHES.add_items(
    [
              (
            "mfe-dockerfile-post-npm-install-learning",
            """
RUN npm install '@edx/frontend-component-header@git+https://git@github.com/abstract-tech/community-theme-header.git#ghassan/community-theme.palm' --registry=$NPM_REGISTRY
RUN npm install '@edx/frontend-component-footer@git+https://git@github.com/abstract-tech/community-theme-footer.git#community-theme' --registry=$NPM_REGISTRY
RUN npm install '@edx/brand@git+https://git@github.com/abstract-tech/community-theme-brand.git#community-theme' --registry=$NPM_REGISTRY
    """
        ),
    ])