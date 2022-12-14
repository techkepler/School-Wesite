# Generated by Django 4.1 on 2022-09-01 14:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("infoApi", "0003_tinymceannouncementmodel"),
    ]

    operations = [
        migrations.CreateModel(
            name="NewsModel",
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
                ("title", models.CharField(max_length=300)),
                ("paragraph_one", models.TextField()),
                ("paragraph_two", models.TextField(blank=True)),
                ("paragraph_three", models.TextField(blank=True)),
                ("short_details", models.CharField(max_length=500)),
                ("category", models.CharField(max_length=100)),
                ("slug", models.CharField(max_length=100)),
                ("status", models.BooleanField(default=True)),
                ("date", models.DateField(auto_now_add=True)),
            ],
        ),
    ]
