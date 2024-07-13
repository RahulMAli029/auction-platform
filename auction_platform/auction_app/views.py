from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import User, Item, Bid
from .serializers import UserSerializer, ItemSerializer, BidSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        mobile_or_email = request.data.get('mobile_or_email')
        otp_entered = request.data.get('otp')
        try:
            # Check if the user exists by mobile number or email
            user = User.objects.get_user_by_mobile_or_email(mobile_or_email)
        except User.DoesNotExist:
            print('user not exist')
            # If the user does not exist, create a new user with the provided mobile number or email
            user = User.objects.create_user(
                mobile_or_email
            )
            print(user)

        # For simplicity, assuming OTP validation logic here (compare entered OTP with predefined)
        predefined_otp = "123456"
        if otp_entered == predefined_otp:
            # OTP validation successful, proceed to authenticate user
            # Implement your authentication logic here, such as creating a session or JWT token
            serializer = self.get_serializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)

class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    def create(self, request, *args, **kwargs):
        data = request.data
        user_id = data.get('user_id')
        
        if not user_id:
            return Response({'detail': 'User ID is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'detail': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
        
        item_data = {
            'title': data.get('title'),
            'description': data.get('description'),
            'starting_bid': data.get('starting_bid'),
            'bid_increment': data.get('bid_increment'),
            'auction_start': data.get('auction_start'),
            'auction_end': data.get('auction_end'),
            'user_id': data.get('user_id'),
            'image': request.data.get('image')  # Access uploaded image here
        }
        
        serializer = ItemSerializer(data=item_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BidViewSet(viewsets.ModelViewSet):
    queryset = Bid.objects.all()
    serializer_class = BidSerializer
