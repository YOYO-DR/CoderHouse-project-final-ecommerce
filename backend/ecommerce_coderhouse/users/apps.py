import contextlib

from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class UsersConfig(AppConfig):
    name = "ecommerce_coderhouse.users"
    verbose_name = _("Users")

    def ready(self):
        with contextlib.suppress(ImportError):
            import ecommerce_coderhouse.users.signals  # noqa: F401, PLC0415
