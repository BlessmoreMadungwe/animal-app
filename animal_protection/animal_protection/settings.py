import os
from pathlib import Path
from datetime import timedelta
from importlib.util import find_spec
from urllib.parse import urlparse

try:
    import dj_database_url
except ImportError:
    dj_database_url = None

try:
    from dotenv import load_dotenv
except ImportError:
    def load_dotenv(*args, **kwargs):
        return False

try:
    from PIL import Image as PILImage
except ImportError:
    PILImage = None

# --- 1. BASE CONFIG ---
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(os.path.join(BASE_DIR, '.env'))

SECRET_KEY = os.environ.get("SECRET_KEY", "django-insecure-development-key")
DEBUG = os.environ.get("DEBUG", "False").lower() == "true"


def _split_csv_env(name, default=""):
    return [
        value.strip()
        for value in os.environ.get(name, default).split(",")
        if value.strip()
    ]


def _normalize_origin(value):
    candidate = value.strip().rstrip("/")
    if not candidate:
        return None

    if "://" not in candidate:
        return None

    parsed = urlparse(candidate)
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        return None

    return f"{parsed.scheme}://{parsed.netloc}"


def _host_from_origin(value):
    parsed = urlparse(value)
    return parsed.netloc if parsed.netloc else None


frontend_origin_candidates = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://animal-app-alpha.vercel.app",
    "https://animal-app-six.vercel.app",
]

for env_name in ("FRONTEND_URL", "APP_URL", "CORS_ALLOWED_ORIGINS"):
    frontend_origin_candidates.extend(_split_csv_env(env_name))

for env_name in ("VERCEL_URL", "VERCEL_BRANCH_URL", "VERCEL_PROJECT_PRODUCTION_URL"):
    env_value = os.environ.get(env_name, "").strip()
    if env_value:
        frontend_origin_candidates.append(f"https://{env_value.lstrip('https://')}")

normalized_frontend_origins = []
for candidate in frontend_origin_candidates:
    normalized = _normalize_origin(candidate)
    if normalized and normalized not in normalized_frontend_origins:
        normalized_frontend_origins.append(normalized)

allowed_hosts = set(_split_csv_env("ALLOWED_HOSTS", "localhost,127.0.0.1"))
for origin in normalized_frontend_origins:
    host = _host_from_origin(origin)
    if host:
        allowed_hosts.add(host)

for env_name in ("RAILWAY_PUBLIC_DOMAIN", "RAILWAY_STATIC_URL"):
    env_value = os.environ.get(env_name, "").strip()
    if env_value:
        allowed_hosts.add(env_value.replace("https://", "").replace("http://", "").rstrip("/"))

ALLOWED_HOSTS = sorted(host for host in allowed_hosts if host)

# --- 2. APPLICATION DEFINITION ---
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-party
    'rest_framework',
    'corsheaders',
    'rest_framework_simplejwt',

    # Local apps
    'api',
]

if find_spec("whitenoise") is not None:
    INSTALLED_APPS.append('whitenoise.runserver_nostatic')

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # MUST BE FIRST
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

if find_spec("whitenoise") is not None:
    MIDDLEWARE.insert(2, 'whitenoise.middleware.WhiteNoiseMiddleware')

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

ROOT_URLCONF = 'animal_protection.urls'
WSGI_APPLICATION = 'animal_protection.wsgi.application'

# --- 3. DATABASE ---
if dj_database_url is not None:
    database_url = os.environ.get('DATABASE_URL')
    DATABASES = {
        'default': dj_database_url.config(
            default=database_url or f"sqlite:///{BASE_DIR / 'db.sqlite3'}",
            conn_max_age=600,
            conn_health_checks=True,
        )
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }

if not DEBUG and DATABASES['default']['ENGINE'] != 'django.db.backends.sqlite3':
    DATABASES['default']['OPTIONS'] = {
        'sslmode': 'require',
    }

# --- 4. CORS & CSRF ---
CORS_ALLOWED_ORIGINS = normalized_frontend_origins

CSRF_TRUSTED_ORIGINS = CORS_ALLOWED_ORIGINS

CORS_ALLOWED_ORIGIN_REGEXES = [
    r"^https://.*\.vercel\.app$",
]

CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_HEADERS = [
    "accept",
    "authorization",
    "content-type",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
]

# --- 5. REST FRAMEWORK & JWT ---
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ),
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'AUTH_HEADER_TYPES': ('Bearer',),
}

# --- 6. STATIC & MEDIA ---
STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": (
            "whitenoise.storage.CompressedManifestStaticFilesStorage"
            if find_spec("whitenoise") is not None
            else "django.contrib.staticfiles.storage.StaticFilesStorage"
        ),
    },
}

if PILImage is None:
    SILENCED_SYSTEM_CHECKS = ['fields.E210']

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
