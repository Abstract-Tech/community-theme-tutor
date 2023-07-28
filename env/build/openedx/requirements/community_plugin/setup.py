from os import path
from setuptools import find_packages
from setuptools import setup


here = path.abspath(path.dirname(__file__))

# Get the long description from the README file
with open(path.join(here, "README.md")) as f:
    long_description = f.read()


setup(
    name="community_plugin",
    version="0.1",
    description="Community integration for Open edX as a Plugin",
    long_description=long_description,
    long_description_content_type="text/markdown",
    packages=find_packages("."),
    include_package_data=True,
    install_requires=[],
    entry_points={
        "lms.djangoapp": [
            "community_plugin = community_plugin.apps:CommunityPluginConfig"
        ],
        "cms.djangoapp": [
            "community_plugin = community_plugin.apps:CommunityPluginConfig"
        ],
    },
)
