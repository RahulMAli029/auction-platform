from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ItemViewSet, BidViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'items', ItemViewSet)
router.register(r'bids', BidViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
