# -*- coding: utf-8 -*-
import os
from lms.envs.production import *

####### Settings common to LMS and CMS
import json
import os

from xmodule.modulestore.modulestore_settings import update_module_store_settings

# Mongodb connection parameters: simply modify `mongodb_parameters` to affect all connections to MongoDb.
mongodb_parameters = {
    "db": "openedx",
    "host": "mongodb",
    "port": 27017,
    "user": None,
    "password": None,
    # Connection/Authentication
    "ssl": False,
    "authSource": "admin",
    "replicaSet": None,
    
}
DOC_STORE_CONFIG = mongodb_parameters
CONTENTSTORE = {
    "ENGINE": "xmodule.contentstore.mongo.MongoContentStore",
    "ADDITIONAL_OPTIONS": {},
    "DOC_STORE_CONFIG": DOC_STORE_CONFIG
}
# Load module store settings from config files
update_module_store_settings(MODULESTORE, doc_store_settings=DOC_STORE_CONFIG)
DATA_DIR = "/openedx/data/modulestore"

for store in MODULESTORE["default"]["OPTIONS"]["stores"]:
   store["OPTIONS"]["fs_root"] = DATA_DIR

# Behave like memcache when it comes to connection errors
DJANGO_REDIS_IGNORE_EXCEPTIONS = True

# Elasticsearch connection parameters
ELASTIC_SEARCH_CONFIG = [{
  
  "host": "elasticsearch",
  "port": 9200,
}]

# Common cache config
CACHES = {
    "default": {
        "KEY_PREFIX": "default",
        "VERSION": "1",
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://@redis:6379/1",
    },
    "general": {
        "KEY_PREFIX": "general",
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://@redis:6379/1",
    },
    "mongo_metadata_inheritance": {
        "KEY_PREFIX": "mongo_metadata_inheritance",
        "TIMEOUT": 300,
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://@redis:6379/1",
    },
    "configuration": {
        "KEY_PREFIX": "configuration",
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://@redis:6379/1",
    },
    "celery": {
        "KEY_PREFIX": "celery",
        "TIMEOUT": 7200,
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://@redis:6379/1",
    },
    "course_structure_cache": {
        "KEY_PREFIX": "course_structure",
        "TIMEOUT": 7200,
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": "redis://@redis:6379/1",
    },
}

# The default Django contrib site is the one associated to the LMS domain name. 1 is
# usually "example.com", so it's the next available integer.
SITE_ID = 2

# Contact addresses
CONTACT_MAILING_ADDRESS = "Community Theme - http://local.overhang.io"
DEFAULT_FROM_EMAIL = ENV_TOKENS.get("DEFAULT_FROM_EMAIL", ENV_TOKENS["CONTACT_EMAIL"])
DEFAULT_FEEDBACK_EMAIL = ENV_TOKENS.get("DEFAULT_FEEDBACK_EMAIL", ENV_TOKENS["CONTACT_EMAIL"])
SERVER_EMAIL = ENV_TOKENS.get("SERVER_EMAIL", ENV_TOKENS["CONTACT_EMAIL"])
TECH_SUPPORT_EMAIL = ENV_TOKENS.get("TECH_SUPPORT_EMAIL", ENV_TOKENS["CONTACT_EMAIL"])
CONTACT_EMAIL = ENV_TOKENS.get("CONTACT_EMAIL", ENV_TOKENS["CONTACT_EMAIL"])
BUGS_EMAIL = ENV_TOKENS.get("BUGS_EMAIL", ENV_TOKENS["CONTACT_EMAIL"])
UNIVERSITY_EMAIL = ENV_TOKENS.get("UNIVERSITY_EMAIL", ENV_TOKENS["CONTACT_EMAIL"])
PRESS_EMAIL = ENV_TOKENS.get("PRESS_EMAIL", ENV_TOKENS["CONTACT_EMAIL"])
PAYMENT_SUPPORT_EMAIL = ENV_TOKENS.get("PAYMENT_SUPPORT_EMAIL", ENV_TOKENS["CONTACT_EMAIL"])
BULK_EMAIL_DEFAULT_FROM_EMAIL = ENV_TOKENS.get("BULK_EMAIL_DEFAULT_FROM_EMAIL", ENV_TOKENS["CONTACT_EMAIL"])
API_ACCESS_MANAGER_EMAIL = ENV_TOKENS.get("API_ACCESS_MANAGER_EMAIL", ENV_TOKENS["CONTACT_EMAIL"])
API_ACCESS_FROM_EMAIL = ENV_TOKENS.get("API_ACCESS_FROM_EMAIL", ENV_TOKENS["CONTACT_EMAIL"])

# Get rid completely of coursewarehistoryextended, as we do not use the CSMH database
INSTALLED_APPS.remove("lms.djangoapps.coursewarehistoryextended")
DATABASE_ROUTERS.remove(
    "openedx.core.lib.django_courseware_routers.StudentModuleHistoryExtendedRouter"
)

# Set uploaded media file path
MEDIA_ROOT = "/openedx/media/"

# Video settings
VIDEO_IMAGE_SETTINGS["STORAGE_KWARGS"]["location"] = MEDIA_ROOT
VIDEO_TRANSCRIPTS_SETTINGS["STORAGE_KWARGS"]["location"] = MEDIA_ROOT

GRADES_DOWNLOAD = {
    "STORAGE_TYPE": "",
    "STORAGE_KWARGS": {
        "base_url": "/media/grades/",
        "location": "/openedx/media/grades",
    },
}

ORA2_FILEUPLOAD_BACKEND = "filesystem"
ORA2_FILEUPLOAD_ROOT = "/openedx/data/ora2"
ORA2_FILEUPLOAD_CACHE_NAME = "ora2-storage"

# Change syslog-based loggers which don't work inside docker containers
LOGGING["handlers"]["local"] = {
    "class": "logging.handlers.WatchedFileHandler",
    "filename": os.path.join(LOG_DIR, "all.log"),
    "formatter": "standard",
}
LOGGING["handlers"]["tracking"] = {
    "level": "DEBUG",
    "class": "logging.handlers.WatchedFileHandler",
    "filename": os.path.join(LOG_DIR, "tracking.log"),
    "formatter": "standard",
}
LOGGING["loggers"]["tracking"]["handlers"] = ["console", "local", "tracking"]
# Silence some loggers (note: we must attempt to get rid of these when upgrading from one release to the next)

import warnings
from django.utils.deprecation import RemovedInDjango40Warning, RemovedInDjango41Warning
warnings.filterwarnings("ignore", category=RemovedInDjango40Warning)
warnings.filterwarnings("ignore", category=RemovedInDjango41Warning)
warnings.filterwarnings("ignore", category=DeprecationWarning, module="lms.djangoapps.course_wiki.plugins.markdownedx.wiki_plugin")
warnings.filterwarnings("ignore", category=DeprecationWarning, module="wiki.plugins.links.wiki_plugin")

# Email
EMAIL_USE_SSL = False
# Forward all emails from edX's Automated Communication Engine (ACE) to django.
ACE_ENABLED_CHANNELS = ["django_email"]
ACE_CHANNEL_DEFAULT_EMAIL = "django_email"
ACE_CHANNEL_TRANSACTIONAL_EMAIL = "django_email"
EMAIL_FILE_PATH = "/tmp/openedx/emails"

# Language/locales
LOCALE_PATHS.append("/openedx/locale/contrib/locale")
LOCALE_PATHS.append("/openedx/locale/user/locale")
LANGUAGE_COOKIE_NAME = "openedx-language-preference"

# Allow the platform to include itself in an iframe
X_FRAME_OPTIONS = "SAMEORIGIN"


JWT_AUTH["JWT_ISSUER"] = "http://local.overhang.io/oauth2"
JWT_AUTH["JWT_AUDIENCE"] = "openedx"
JWT_AUTH["JWT_SECRET_KEY"] = "eHqeglW5j7T68yYtr3yL6XPz"
JWT_AUTH["JWT_PRIVATE_SIGNING_JWK"] = json.dumps(
    {
        "kid": "openedx",
        "kty": "RSA",
        "e": "AQAB",
        "d": "GuVW-XLLm0jWziC2Jywn5eKuZEmfuwN1Bx6t9rBFnCn1hCK6iaJHbF3NXqSF381UU3Qnuw6CG307DPSl980cHm198h-wM6I5m0oI_CduLq4a0SUQjSosa6EO9Mw3lU5NiCUluiVSG8tOBKSC_afPZ00gCS3K83pO_L1E-YcZ9_BUB8zdE6-6JOguIy8TE8nG9nrd6-56CYD2k7tZqyfHHCbtGkXUn8Y7HalnSSm7dzUX4HOst1ZExe7DOYt_5FqNVydeLHiouAsS0GmGS2-JPasvTkgcQXMAxebivDPaC9I7JcrP0luFf7RUHArZu_1NtgBPTqshg8phWVj9VI0jsQ",
        "n": "sK382wJ5KwASG0Fn2eCaSQr48VcOTOPt3V5noe_b6pJN7EPpzhHaKOHIcwE6Ux4YAObiOz8IjaAhp0cM28vBI3gUp6b39alV7lY5Zb5WIm0B4SvANycymKDvx34rurLEptLem18roh8CaSIvyHD2_wnafjmeSRyUdfB6HDGP294vnlRKwNjeEQ9WHSa4BoE4T7j9QOd_gQrHHaiXOEKbVfz-fif7t6jqUEBNShF3yPaWollJmLNwRPhQGMbFLDab0qC_loPwhsSeEIgDUM1oNCHZmJbvlK6uRRqiRKpKVr-Ggssh9I9qk2vnQT9-MGfvm5nb5MjfR5iKSIQiQ1s3yw",
        "p": "xdl6uY2DFCOCQLdVSf_CTLt3ai2cp938kYkdOSqCX5UnSONwkJQXJLxwyUg4Kp1QtNPa434Misq-zQtG8mWpyRCo55cU60WWEubN9nuiTQI0PuW1sk57032f8XiW2i20wi6wzQLxUkPl4EbF840sNB16UtuvL8IkAmxv_Ocif2c",
        "q": "5JumwVdozG0kChtJrq8nv0iZHZ5BiYL9PMxqlucsNA6eFK-qSrcKWbBdgptn1Z9pNh6ZKGROAf0rm9lxR7PtPmq9mJIZ60BvN_ykaMXlhDLS6P3-Irxw9oC8Nac2mlYgvbmLwiOr0XDaAhxSOCDNoADMwdaorMK3cIQkZZtz2f0",
    }
)
JWT_AUTH["JWT_PUBLIC_SIGNING_JWK_SET"] = json.dumps(
    {
        "keys": [
            {
                "kid": "openedx",
                "kty": "RSA",
                "e": "AQAB",
                "n": "sK382wJ5KwASG0Fn2eCaSQr48VcOTOPt3V5noe_b6pJN7EPpzhHaKOHIcwE6Ux4YAObiOz8IjaAhp0cM28vBI3gUp6b39alV7lY5Zb5WIm0B4SvANycymKDvx34rurLEptLem18roh8CaSIvyHD2_wnafjmeSRyUdfB6HDGP294vnlRKwNjeEQ9WHSa4BoE4T7j9QOd_gQrHHaiXOEKbVfz-fif7t6jqUEBNShF3yPaWollJmLNwRPhQGMbFLDab0qC_loPwhsSeEIgDUM1oNCHZmJbvlK6uRRqiRKpKVr-Ggssh9I9qk2vnQT9-MGfvm5nb5MjfR5iKSIQiQ1s3yw",
            }
        ]
    }
)
JWT_AUTH["JWT_ISSUERS"] = [
    {
        "ISSUER": "http://local.overhang.io/oauth2",
        "AUDIENCE": "openedx",
        "SECRET_KEY": "eHqeglW5j7T68yYtr3yL6XPz"
    }
]

# Enable/Disable some features globally
FEATURES["ENABLE_DISCUSSION_SERVICE"] = False
FEATURES["PREVENT_CONCURRENT_LOGINS"] = False
FEATURES["ENABLE_CORS_HEADERS"] = True

# CORS
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_ALLOW_ALL = False
CORS_ALLOW_INSECURE = True
CORS_ALLOW_HEADERS = corsheaders_default_headers + ('use-jwt-cookie',)

# Add your MFE and third-party app domains here
CORS_ORIGIN_WHITELIST = []

# Disable codejail support
# explicitely configuring python is necessary to prevent unsafe calls
import codejail.jail_code
codejail.jail_code.configure("python", "nonexistingpythonbinary", user=None)
# another configuration entry is required to override prod/dev settings
CODE_JAIL = {
    "python_bin": "nonexistingpythonbinary",
    "user": None,
}


######## End of settings common to LMS and CMS

######## Common LMS settings
LOGIN_REDIRECT_WHITELIST = ["studio.local.overhang.io"]

# Better layout of honor code/tos links during registration
REGISTRATION_EXTRA_FIELDS["terms_of_service"] = "required"
REGISTRATION_EXTRA_FIELDS["honor_code"] = "hidden"

# Fix media files paths
PROFILE_IMAGE_BACKEND["options"]["location"] = os.path.join(
    MEDIA_ROOT, "profile-images/"
)

COURSE_CATALOG_VISIBILITY_PERMISSION = "see_in_catalog"
COURSE_ABOUT_VISIBILITY_PERMISSION = "see_about_page"

# Allow insecure oauth2 for local interaction with local containers
OAUTH_ENFORCE_SECURE = False

# Email settings
DEFAULT_EMAIL_LOGO_URL = LMS_ROOT_URL + "/theming/asset/images/logo.png"
BULK_EMAIL_SEND_USING_EDX_ACE = True
FEATURES["ENABLE_FOOTER_MOBILE_APP_LINKS"] = False

# Branding
MOBILE_STORE_ACE_URLS = {}
SOCIAL_MEDIA_FOOTER_ACE_URLS = {}

# Make it possible to hide courses by default from the studio
SEARCH_SKIP_SHOW_IN_CATALOG_FILTERING = False

# Caching
CACHES["staticfiles"] = {
    "KEY_PREFIX": "staticfiles_lms",
    "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
    "LOCATION": "staticfiles_lms",
}
CACHES["ora2-storage"] = {
    "KEY_PREFIX": "ora2-storage",
    "BACKEND": "django_redis.cache.RedisCache",
    "LOCATION": "redis://@redis:6379/1",
}

# Create folders if necessary
for folder in [DATA_DIR, LOG_DIR, MEDIA_ROOT, STATIC_ROOT_BASE, ORA2_FILEUPLOAD_ROOT]:
    if not os.path.exists(folder):
        os.makedirs(folder, exist_ok=True)

# MFE: enable API and set a low cache timeout for the settings. otherwise, weird
# configuration bugs occur. Also, the view is not costly at all, and it's also cached on
# the frontend. (5 minutes, hardcoded)
ENABLE_MFE_CONFIG_API = True
MFE_CONFIG_API_CACHE_TIMEOUT = 1

FEATURES['ENABLE_AUTHN_MICROFRONTEND'] = True


######## End of common LMS settings

ALLOWED_HOSTS = [
    ENV_TOKENS.get("LMS_BASE"),
    FEATURES["PREVIEW_LMS_BASE"],
    "lms",
]
CORS_ORIGIN_WHITELIST.append("http://local.overhang.io")


# When we cannot provide secure session/csrf cookies, we must disable samesite=none
SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False
SESSION_COOKIE_SAMESITE = "Lax"


# CMS authentication
IDA_LOGOUT_URI_LIST.append("http://studio.local.overhang.io/logout/")

# Required to display all courses on start page
SEARCH_SKIP_ENROLLMENT_START_DATE_FILTERING = True


ACCOUNT_MICROFRONTEND_URL = "http://apps.local.overhang.io/account"


WRITABLE_GRADEBOOK_URL = "http://apps.local.overhang.io/gradebook"


LEARNING_MICROFRONTEND_URL = "http://apps.local.overhang.io/learning"


PROFILE_MICROFRONTEND_URL = "http://apps.local.overhang.io/profile/u/"


DISCUSSIONS_MICROFRONTEND_URL = "http://apps.local.overhang.io/discussions"
DISCUSSIONS_MFE_FEEDBACK_URL = None



AUTHN_MICROFRONTEND_URL = "http://apps.local.overhang.io/authn"
AUTHN_MICROFRONTEND_DOMAIN  = "apps.local.overhang.io/authn"


LOGIN_REDIRECT_WHITELIST.append("apps.local.overhang.io")
CORS_ORIGIN_WHITELIST.append("http://apps.local.overhang.io")
CSRF_TRUSTED_ORIGINS.append("apps.local.overhang.io")

# Dynamic config API settings
# https://openedx.github.io/frontend-platform/module-Config.html
MFE_CONFIG = {
    "BASE_URL": "apps.local.overhang.io",
    "CSRF_TOKEN_API_PATH": "/csrf/api/v1/token",
    "ACCOUNT_PROFILE_URL": "http://apps.local.overhang.io/profile",
    "CREDENTIALS_BASE_URL": "",
    "DISCOVERY_API_BASE_URL": "",
    "FAVICON_URL": "http://local.overhang.io/favicon.ico",
    "LANGUAGE_PREFERENCE_COOKIE_NAME": "openedx-language-preference",
    "LMS_BASE_URL": "http://local.overhang.io",
    "LOGIN_URL": "http://local.overhang.io/login",
    "LOGO_URL": "http://local.overhang.io/theming/asset/images/logo.png",
    "LOGO_WHITE_URL": "http://local.overhang.io/theming/asset/images/logo.png",
    "LOGO_TRADEMARK_URL": "http://local.overhang.io/theming/asset/images/logo.png",
    "LOGOUT_URL": "http://local.overhang.io/logout",
    "MARKETING_SITE_BASE_URL": "http://local.overhang.io",
    "REFRESH_ACCESS_TOKEN_ENDPOINT": "http://local.overhang.io/login_refresh",
    "SITE_NAME": "Community Theme",
    "STUDIO_BASE_URL": "http://studio.local.overhang.io",
    "USER_INFO_COOKIE_NAME": "user-info",
    "ACCESS_TOKEN_COOKIE_NAME": "edx-jwt-cookie-header-payload",
    "LEARNING_BASE_URL": "http://apps.local.overhang.io/learning",
    "ENABLE_NEW_EDITOR_PAGES": True,
    "ENABLE_PROGRESS_GRAPH_SETTINGS": True,
    "DISABLE_ENTERPRISE_LOGIN": True,
}