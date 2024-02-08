from tutor import hooks


hooks.Filters.CLI_DO_INIT_TASKS.add_item(
    (
        "mysql",
        """
echo "++++++ initialising Wordpress plugin..."
echo "++++++ Creating MySQL database if it doesn't exist"
mysql -u root -p$MYSQL_ROOT_PASSWORD -e "CREATE DATABASE IF NOT EXISTS wordpress;"
echo "++++++ done!"
"""
    )
)

hooks.Filters.ENV_PATCHES.add_items(
    (
        "openedx-development-settings",
        """
CORS_ORIGIN_WHITELIST.append("https://wp2.community.abzt.de")
"""
    ),
    (
        "openedx-production-settingss",
        """
CORS_ORIGIN_WHITELIST.append("https://wp2.community.abzt.de")
"""
    ),
    (
        "local-docker-compose-prod-services",
        """
wordpress2:
  image: wordpress
  environment:
    WORDPRESS_DB_HOST: mysql
    WORDPRESS_DB_USER: root
    WORDPRESS_DB_PASSWORD: ${MYSQL_ROOT_PASSWORD}
    WORDPRESS_DB_NAME: wordpress
  volumes:
    - ../../data/wordpress:/var/www/html
    - ../../wordpress/uploads.ini:/usr/local/etc/php/conf.d/uploads.ini
"""
    ),
    (
        "caddyfile",
        """
wp.community.abzt.de {
  reverse_proxy wordpress2
}
"""
    ),
)
