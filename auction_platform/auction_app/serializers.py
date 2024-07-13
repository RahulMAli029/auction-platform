from rest_framework import serializers
from .models import User, Item, Bid

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'mobile_number', 'email']

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'title', 'description', 'starting_bid', 'bid_increment', 'auction_start', 'auction_end', 'image', 'user_id']
    def create(self, validated_data):
        image = self.context['request'].data.get('image')
        item = Item.objects.create(
            title=validated_data['title'],
            description=validated_data['description'],
            starting_bid=validated_data['starting_bid'],
            bid_increment=validated_data['bid_increment'],
            auction_start=validated_data['auction_start'],
            auction_end=validated_data['auction_end'],
            image=image,  # Save the image here
            user=validated_data['user']
        )
        return item    

class BidSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bid
        fields =  ['id', 'amount', 'created_at', 'item_id', 'user_id']
