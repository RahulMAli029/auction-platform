# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ItemViewSet, BidViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'items', ItemViewSet)
router.register(r'bids', BidViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/items/<int:pk>/highest_bid/', ItemViewSet.as_view({'get': 'highest_bid'}), name='fetch_highest_bid'),
]
