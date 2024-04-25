from tutor import hooks

hooks.Filters.ENV_PATCHES.add_items([
    (
        "openedx-lms-common-settings",
      """
FEATURES["CUSTOM_CERTIFICATE_TEMPLATES_ENABLED"] = True
SOCIAL_SHARING_SETTINGS = {
    'CUSTOM_COURSE_URLS': True,
    'DASHBOARD_FACEBOOK': True,
    'CERTIFICATE_FACEBOOK': True,
    'CERTIFICATE_TWITTER': True,
    'DASHBOARD_TWITTER': True
}
"""
    ),
    (
        "openedx-cms-common-settings",
        """
FEATURES["CUSTOM_CERTIFICATE_TEMPLATES_ENABLED"] = True
SOCIAL_SHARING_SETTINGS = {
    'CUSTOM_COURSE_URLS': True,
    'DASHBOARD_FACEBOOK': True,
    'CERTIFICATE_FACEBOOK': True,
    'CERTIFICATE_TWITTER': True,
    'DASHBOARD_TWITTER': True
}
    """
    ),

])
