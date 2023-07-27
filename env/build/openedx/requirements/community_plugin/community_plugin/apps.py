# coding: utf-8
from django.apps import AppConfig
from openedx.core.djangoapps.plugins.constants import PluginSettings
from openedx.core.djangoapps.plugins.constants import PluginURLs
from openedx.core.djangoapps.plugins.constants import ProjectType
from openedx.core.djangoapps.plugins.constants import SettingsType


class CommunityPluginConfig(AppConfig):
    name = "community_plugin"
    verbose_name = "Community Openedx Plugin"

    # Class attribute that configures and enables this app as a Plugin App.
    plugin_app = {
        PluginURLs.CONFIG: {
            ProjectType.LMS: {
                PluginURLs.NAMESPACE: "community_plugin",
                PluginURLs.REGEX: "^",
                PluginURLs.RELATIVE_PATH: "urls",
            }
        },
        # Configuration setting for Plugin Settings for this app.
        PluginSettings.CONFIG: {
            # Configure the Plugin Settings for each Project Type, as needed.
            ProjectType.LMS: {
                # Configure each Settings Type, as needed.
                SettingsType.PRODUCTION: {
                    # The python path (relative to this app) to the settings module for the relevant Project Type and Settings Type.
                    # Optional; Defaults to u'settings'.
                    PluginSettings.RELATIVE_PATH: "settings"
                }
            }
        },
    }
