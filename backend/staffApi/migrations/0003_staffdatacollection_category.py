# Generated by Django 4.1 on 2022-09-22 06:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("staffApi", "0002_staffabsentmodel"),
    ]

    operations = [
        migrations.AddField(
            model_name="staffdatacollection",
            name="category",
            field=models.CharField(blank=True, default="Administrative", max_length=50),
        ),
    ]
