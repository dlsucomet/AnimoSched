from django.contrib import admin
from django.urls import path, include                 
from rest_framework import routers                    
from api import views                            

router = routers.DefaultRouter()                      
# router.register(r'register', views.CustomRegisterView)     
router.register(r'preferences', views.PreferenceView)     

urlpatterns = [
    path('api/', include(router.urls)),                
]