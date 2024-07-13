from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, mobile_number_or_email, **extra_fields):
        print(mobile_number_or_email.isdigit())
        print('@' in mobile_number_or_email)
        if not mobile_number_or_email:
            raise ValueError('The Mobile Number or Email field must be set')
        user = self.model(mobile_number=mobile_number_or_email if mobile_number_or_email.isdigit() else None,
                          email=mobile_number_or_email if '@' in mobile_number_or_email else None, **extra_fields)
        # user = self.model(email='rahor@mgmlakm.com', **extra_fields)
        user.save(using=self._db)
        return user

    def get_user_by_mobile_or_email(self, mobile_or_email):
        if '@' in mobile_or_email:
            return self.get(email=mobile_or_email)
        return self.get(mobile_number=mobile_or_email)

class User(AbstractBaseUser):
    mobile_number = models.CharField(max_length=15, unique=True, null=True, blank=True)
    email = models.EmailField(max_length=255, unique=True, null=True, blank=True)

    objects = UserManager()

    USERNAME_FIELD = 'mobile_number'

class Item(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    starting_bid = models.DecimalField(max_digits=10, decimal_places=2)
    bid_increment = models.DecimalField(max_digits=10, decimal_places=2)
    auction_start = models.DateTimeField()
    auction_end = models.DateTimeField()
    image = models.ImageField(upload_to='media/', null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Bid(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
