"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.http import JsonResponse
import os

def _base_url():
    """Construct the dynamic base URL using the CODESPACE_NAME environment variable.
    We do not hard-code the value; if the variable is absent we fallback to localhost.
    Format desired: https://$CODESPACE_NAME-8000.app.github.dev
    """
    codespace = os.getenv("CODESPACE_NAME")
    if codespace:
        return f"https://{codespace}-8000.app.github.dev"
    return "http://localhost:8000"

def activities_view(_request):
    return JsonResponse({
        "endpoint": "activities",
        "base_url": _base_url(),
        "full_url": f"{_base_url()}/api/activities/",
        "data": [],  # placeholder list
    })

def root_api_view(_request):
    return JsonResponse({
        "available_endpoints": {
            "activities": f"{_base_url()}/api/activities/",
        },
        "base_url": _base_url(),
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', root_api_view, name='api-root'),
    path('api/activities/', activities_view, name='api-activities'),
]
