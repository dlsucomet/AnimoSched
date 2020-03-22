from django.contrib import admin
from django.urls import path, include                 
from rest_framework import routers                    
from rest_framework_jwt.views import refresh_jwt_token
from api import views                            

router = routers.DefaultRouter()                      
router.register(r'users', views.UserViewSet)
router.register(r'courses', views.CourseViewSet)     
router.register(r'degrees', views.DegreeViewSet)     
router.register(r'coursepriority', views.CoursePriorityViewSet)     
router.register(r'colleges', views.CollegeViewSet)     

urlpatterns = [
    path('init/', views.initialize),                
    path('api/', include(router.urls)),                
    path('api/auth/', include('rest_auth.urls')),                
    path('api/auth/registration/', include('rest_auth.registration.urls')),                
    path('api/refresh-token/', refresh_jwt_token),                
]