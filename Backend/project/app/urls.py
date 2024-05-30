from django.contrib import admin
from django.urls import path

from . import views

from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    path('register/', views.Register.as_view(),name='sample-view'),
    path('login/', views.LoginView.as_view(),name='sample-view'),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)