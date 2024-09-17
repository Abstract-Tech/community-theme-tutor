from tutor import hooks


hooks.Filters.ENV_PATCHES.add_items(
    [
        (
            "caddyfile",
            """
microsite.{{ MFE_HOST }}{$default_site_port} preview.microsite.{{ MFE_HOST }}{$default_site_port} {
    @favicon_matcher {
        path_regexp ^/favicon.ico$
    }
    rewrite @favicon_matcher /theming/asset/images/favicon.ico

    # Limit profile image upload size
    handle_path /api/profile_images/*/*/upload {
        request_body {
            max_size 1MB
        }
    }

    import proxy "lms:8000"

    route /courses/*/about {
        reverse_proxy "mfe:8002" {
            rewrite /course_about/{uri}
            header_up X-Forwarded-Port 80
        }
    }

    route /course_about/* {
        reverse_proxy "mfe:8002" {
            header_up X-Forwarded-Port 80
        }
    }
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
    header * {
      Content-Security-Policy "frame-ancestors microsite.{{ MFE_HOST }} *.microsite.{{ MFE_HOST }};"
    }

    handle_path /* {
        request_body {
            max_size 4MB
        }
    }
}

apps.microsite.{{ MFE_HOST }}{$default_site_port} {
    respond / 204
    request_body {
        max_size 2MB
    }
    import proxy "mfe:8002"
}
            """,
        ),
        (
            "openedx-lms-production-settings",
            """
LOGIN_REDIRECT_WHITELIST.append("apps.microsite.{{ LMS_HOST }}")
CORS_ORIGIN_WHITELIST.append("http://apps.microsite.{{ LMS_HOST }}")
CSRF_TRUSTED_ORIGINS.append("apps.microsite.{{ LMS_HOST }}")

LOGIN_REDIRECT_WHITELIST.append("microsite.{{ LMS_HOST }}")
CORS_ORIGIN_WHITELIST.append("http://microsite.{{ LMS_HOST }}")
CSRF_TRUSTED_ORIGINS.append("microsite.{{ LMS_HOST }}")

ALLOWED_HOSTS.append("microsite.{{ LMS_HOST }}")
            """,
        ),
        (
            "mfe-dockerfile-post-npm-install-learning-themed",
            """
ADD https://api.github.com/repos/abstract-tech/community-theme-brand-themed/git/refs/heads/community-theme /tmp/gitref-brand
RUN npm install '@edx/brand@git+https://git@github.com/abstract-tech/community-theme-brand-themed.git#community-theme' --registry=$NPM_REGISTRY
            """,
        ),
        (
            "local-docker-compose-caddy-aliases",
            """
- microsite.{{ LMS_HOST }}
            """,
        ),
    ]
)
