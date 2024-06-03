from django.contrib import admin
from django.urls import path

from . import views

from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    path('register/', views.Register.as_view(),name='register'),
    path('login/', views.LoginView.as_view(),name='login'),
    path('profile/', views.Profile.as_view(),name='profile'),
    path('update/', views.UpdateProfile.as_view(),name='update'),
    path('adminpage/', views.AdminHome.as_view(),name='adminpage'),
    path('logout/', views.LogoutView.as_view(),name='logout'),
    path('edit/', views.AdminEdit.as_view(),name='edit'),
    path('delete/', views.AdminDelete.as_view(),name='delete'),
    path('search/', views.AdminSearch.as_view(),name='search'),
    # path('create/', views.CreateUser.as_view(),name='create'),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)