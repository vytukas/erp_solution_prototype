"""erp_web URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
import django_rest.views as django_rest
from rest_framework.routers import DefaultRouter
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

router = DefaultRouter()
router.register(r'employee', django_rest.EmployeeView)
router.register(r'contract', django_rest.ContractView)
router.register(r'workpermit', django_rest.WorkPermitView)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/employee/(?P<pk>\d+)', django_rest.EmployeeDetailView.as_view()),
    url(r'^api/', include(router.urls)),
    url(r'api-token-auth/', obtain_jwt_token),
    url(r'api-token-refresh/', refresh_jwt_token),
]

urlpatterns += [
    url(r'^api-auth/', include('rest_framework.urls')),
]
