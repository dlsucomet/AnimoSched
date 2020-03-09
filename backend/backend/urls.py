from django.contrib import admin
from django.urls import path, include                 
from rest_framework import routers                    
from api import views                            
from core.views import index

router = routers.DefaultRouter()                      
router.register(r'apis', views.TodoView, 'api')     

urlpatterns = [
    path('', index, name='index'),
    path('admin/', admin.site.urls), 
    path('api/', include(router.urls)),                
]