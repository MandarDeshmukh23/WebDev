from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('register/', views.register),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('upload/', views.upload_video),
    path('videos/', views.list_videos),
    path('video/<int:id>/', views.get_video),
    path('video/<int:video_id>/like/', views.like_video),
    path('video/<int:id>/likes/', views.video_likes),
    path('user/liked/', views.user_liked_videos),
    path('video/<int:id>/watchlater/', views.toggle_watch_later),
    path('user/watchlater/', views.get_watch_later),
    path('subscribe/<str:username>/', views.toggle_subscription),
    path('user/subscriptions/', views.get_subscriptions),
]
