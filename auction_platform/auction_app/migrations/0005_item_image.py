# Generated by Django 5.0.7 on 2024-07-13 09:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auction_app', '0004_user_email_alter_user_mobile_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
    ]
