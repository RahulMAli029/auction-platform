from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
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

    @action(detail=True, methods=['get'])
    def highest_bid(self, request, pk=None):
        try:
            item = Item.objects.get(id=pk)
        except Item.DoesNotExist:
            return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

        highest_bid = Bid.objects.filter(item=item).order_by('-amount').first()
        if highest_bid:
            return Response({"amount": highest_bid.amount}, status=status.HTTP_200_OK)
        else:
            return Response({"amount": None}, status=status.HTTP_200_OK)


class BidViewSet(viewsets.ModelViewSet):
    queryset = Bid.objects.all()
    serializer_class = BidSerializer
    
    def create(self, request, *args, **kwargs):
        item_id = request.data.get('item')
        amount = request.data.get('amount')
        user_id = request.data.get('user')

        try:
            item = Item.objects.get(id=item_id)
        except Item.DoesNotExist:
            return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'detail': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)

        highest_bid = Bid.objects.filter(item=item).order_by('-amount').first()
        minimum_bid = item.starting_bid if not highest_bid else highest_bid.amount + item.bid_increment

        if amount < minimum_bid:
            return Response({"error": f"Bid must be at least {minimum_bid}"}, status=status.HTTP_400_BAD_REQUEST)

        bid = Bid.objects.create(item=item, user=user, amount=amount)
        return Response({"message": "Bid placed successfully"}, status=status.HTTP_201_CREATED)
