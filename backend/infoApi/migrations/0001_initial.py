# Generated by Django 4.1 on 2022-09-01 08:22

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="AnnouncementModel",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=100)),
                ("paragraph_one", models.TextField()),
                ("paragraph_two", models.TextField(blank=True)),
                ("paragraph_three", models.TextField(blank=True)),
                ("status", models.BooleanField(default=True)),
                ("date", models.DateField(auto_now_add=True)),
            ],
        ),
    ]
