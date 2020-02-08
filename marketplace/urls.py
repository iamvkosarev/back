from django.urls import path
from .views import *

app_name = 'projects'
urlpatterns = [
    path('main', MainView.as_view(), name='main')
]