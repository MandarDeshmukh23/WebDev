from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Video
from .serializers import VideoSerializer, UserSerializer
from django.contrib.auth.models import User
from .models import Like, WatchLater, Subscription

# Register
@api_view(['POST'])
def register(request):
    data = request.data
    if User.objects.filter(username=data['username']).exists():
        return Response({'error': 'Username already exists'}, status=400)
    user = User.objects.create_user(username=data['username'], password=data['password'])
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

# Upload Video
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_video(request):
    data = request.data
    video = Video.objects.create(
        user=request.user,
        title=data['title'],
        description=data.get('description', ''),
        video_file=data['video_file']
    )
    serializer = VideoSerializer(video, many=False)
    return Response(serializer.data)

# List all videos
@api_view(['GET'])
def list_videos(request):
    query = request.GET.get('search', '')
    if query:
        videos = Video.objects.filter(title__icontains=query) | Video.objects.filter(description__icontains=query)
    else:
        videos = Video.objects.all()

    videos = videos.order_by('-uploaded_at')
    serializer = VideoSerializer(videos, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_video(request, id):
    try:
        video = Video.objects.get(id=id)
        serializer = VideoSerializer(video, many=False)
        like_count = Like.objects.filter(video=video).count()
        data = serializer.data
        data['likes'] = like_count
        return Response(data)
    except Video.DoesNotExist:
        return Response({"error": "Video not found"}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like_video(request, video_id):
    video = Video.objects.get(id=video_id)
    like, created = Like.objects.get_or_create(user=request.user, video=video)
    if not created:
        like.delete()
        return Response({'liked': False})
    return Response({'liked': True})


@api_view(['GET'])
def video_likes(request, id):
    try:
        video = Video.objects.get(id=id)
    except Video.DoesNotExist:
        return Response({'error': 'Video not found'}, status=404)
    
    likes = Like.objects.filter(video=video).select_related('user')
    usernames = [like.user.username for like in likes]
    return Response({'likes': usernames})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_liked_videos(request):
    likes = Like.objects.filter(user=request.user).select_related('video')
    liked_videos = [{
        'id': like.video.id,
        'title': like.video.title,
        'description': like.video.description,
        'uploaded_at': like.video.uploaded_at,
        'uploader': like.video.user.username,
        'video_file': like.video.video_file.url
    } for like in likes]
    return Response(liked_videos)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_watch_later(request, id):
    video = Video.objects.get(id=id)
    watch, created = WatchLater.objects.get_or_create(user=request.user, video=video)
    if not created:
        watch.delete()
        return Response({'watch_later': False})
    return Response({'watch_later': True})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_watch_later(request):
    videos = WatchLater.objects.filter(user=request.user).select_related('video')
    video_data = [{
        'id': v.video.id,
        'title': v.video.title,
        'description': v.video.description,
        'uploaded_at': v.video.uploaded_at,
        'uploader': v.video.user.username,
        'video_file': v.video.video_file.url
    } for v in videos]
    return Response(video_data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_subscription(request, username):
    try:
        target_user = User.objects.get(username=username)
        if request.user == target_user:
            return Response({'error': 'Cannot subscribe to yourself'}, status=400)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)

    subscription, created = Subscription.objects.get_or_create(
        subscriber=request.user,
        subscribed_to=target_user
    )
    if not created:
        subscription.delete()
        return Response({'subscribed': False})
    return Response({'subscribed': True})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_subscriptions(request):
    subs = Subscription.objects.filter(subscriber=request.user).select_related('subscribed_to')
    usernames = [sub.subscribed_to.username for sub in subs]
    return Response({'subscriptions': usernames})
