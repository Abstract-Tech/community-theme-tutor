from tutormfe.hooks import MFE_APPS
from tutor import hooks


@MFE_APPS.add()
def mfe_forks(mfes):
    mfes["authn"] = {
        "repository": "https://github.com/Abstract-Tech/community-theme-authn",
        "version": "community-theme.palm",
        "refs": "https://api.github.com/repos/abstract-tech/community-theme-authn/git/refs/heads",
        "port": 1999,
        "name": "authn",
    }
    mfes["account"] = {
        "repository": "https://github.com/Abstract-Tech/community-theme-account",
        "version": "community-theme.palm",
        "refs": "https://api.github.com/repos/abstract-tech/community-theme-account/git/refs/heads",
        "port": 1997,
        "name": "account",
    }
    mfes["communications"] = {
        "repository": "https://github.com/Abstract-Tech/community-theme-communications",
        "version": "community-theme.palm",
        "refs": "https://api.github.com/repos/abstract-tech/community-theme-communications/git/refs/heads",
        "port": 1984,
        "name": "communications",
    }
    mfes["course-authoring"] = {
        "repository": "https://github.com/Abstract-Tech/community-theme-course-authoring",
        "version": "community-theme.palm",
        "refs": "https://api.github.com/repos/abstract-tech/community-theme-course-authoring/git/refs/heads",
        "port": 2001,
        "name": "course_authoring",
    }
    mfes["discussions"] = {
        "repository": "https://github.com/Abstract-Tech/community-theme-discussions",
        "version": "community-theme.palm",
        "refs": "https://api.github.com/repos/abstract-tech/community-theme-discussions/git/refs/heads",
        "port": 2002,
        "name": "discussions",
    }
    mfes["gradebook"] = {
        "repository": "https://github.com/Abstract-Tech/community-theme-gradebook",
        "version": "community-theme.palm",
        "refs": "https://api.github.com/repos/abstract-tech/community-theme-gradebook/git/refs/heads",
        "port": 1994,
        "name": "gradebook",
    }
    mfes["learning"] = {
        "repository": "https://github.com/Abstract-Tech/community-theme-learning",
        "version": "community-theme.palm",
        "refs": "https://api.github.com/repos/abstract-tech/community-theme-learning/git/refs/heads",
        "port": 2000,
        "name": "learning",
    }
    mfes["ora-grading"] = {
        "repository": "https://github.com/Abstract-Tech/community-theme-ora-grading",
        "version": "community-theme.palm",
        "refs": "https://api.github.com/repos/abstract-tech/community-theme-ora-grading/git/refs/heads",
        "port": 1993,
        "name": "ora-grading",
    }
    mfes["profile"] = {
        "repository": "https://github.com/Abstract-Tech/community-theme-profile",
        "version": "community-theme.palm",
        "refs": "https://api.github.com/repos/abstract-tech/community-theme-profile/git/refs/heads",
        "port": 1995,
        "name": "profile",
    }
    mfes["home"] = {
        "repository": "https://github.com/Abstract-Tech/community-theme-home",
        "version": "community-theme.palm",
        "refs": "https://api.github.com/repos/abstract-tech/community-theme-home/git/refs/heads",
        "port": 3001,
        "name": "home",
    }
    mfes["course_about"] = {
        "repository": "https://github.com/Abstract-Tech/community-theme-course-about",
        "version": "community-theme.palm",
        "refs": "https://api.github.com/repos/abstract-tech/community-theme-course-about/git/refs/heads",
        "port": 3000,
        "name": "course_about",
    }
    # Note: The changes of the following might not take effect due to tutor order of loading plugins
    # This to change it you might need to edit the upstream pplugin at:
    # https://github.com/Abstract-Tech/openedx-tutor-plugins/blob/5556c1d5c55e1a0e95f36a9f0b89dbf21382f581/plugins/tutor-contrib-learner-dashboard-mfe/tutor_learner_dashboard_mfe/plugin.py#L20-L25
    mfes["learner-dashboard"] = {
        "repository": "https://github.com/Abstract-Tech/community-theme-learner-dashboard",
        "version": "community-theme.palm",
        "refs": "https://api.github.com/repos/abstract-tech/community-theme-learner-dashboard/git/refs/heads",
        "port":1996,
    }

    return mfes


hooks.Filters.ENV_PATCHES.add_items(
    [
        (
            "mfe-dockerfile-post-npm-install",
            """
RUN npm install '@edx/frontend-component-header@git+https://git@github.com/abstract-tech/community-theme-header.git#community-theme.palm' --registry=$NPM_REGISTRY
RUN npm install '@edx/frontend-component-footer@git+https://git@github.com/abstract-tech/community-theme-footer.git#community-theme.palm' --registry=$NPM_REGISTRY
RUN npm install '@edx/brand@git+https://git@github.com/abstract-tech/community-theme-brand.git#community-theme' --registry=$NPM_REGISTRY
            """,
        ),
    ]
)
