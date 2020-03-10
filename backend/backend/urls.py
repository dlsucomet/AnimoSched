from django.contrib import admin
from django.urls import path, include                 
from rest_framework import routers                    
from api import views                            

router = routers.DefaultRouter()                      
router.register(r'users', views.UserView, 'api')     

urlpatterns = [
    path('api/', include(router.urls)),                
]