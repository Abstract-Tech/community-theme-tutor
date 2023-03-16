from tutor import hooks

hooks.Filters.ENV_PATCHES.add_item(
    (
        "caddyfile-lms",
        """
    route / {
        reverse_proxy "mfe:8002" {
            rewrite /home/{uri}
            header_up X-Forwarded-Port 80
        }
    }

    route /home/* {
        reverse_proxy "mfe:8002" {
            header_up X-Forwarded-Port 80
        }
    }
"""
    )
)
