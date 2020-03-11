from django.contrib import admin
from django.urls import path, include                 
from rest_framework import routers                    
from api import views                            

router = routers.DefaultRouter()                      
router.register(r'users', views.UserViewSet)
router.register(r'courses', views.CourseViewSet)     
router.register(r'colleges', views.CollegeViewSet)     

urlpatterns = [
    path('api/', include(router.urls)),                
    path('rest-auth/', include('rest_auth.urls')),                
    path('rest-auth/registration/', include('rest_auth.registration.urls')),                
]