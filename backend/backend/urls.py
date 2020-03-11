from django.contrib import admin
from django.urls import path, include                 
from rest_framework import routers                    
from api import views                            

router = routers.DefaultRouter()                      
# router.register(r'register', views.CustomRegisterView)     
router.register(r'users', views.UserViewSet)
router.register(r'courses', views.CourseViewSet)     
router.register(r'colleges', views.CollegeViewSet)     

urlpatterns = [
    path('api/', include(router.urls)),                
]