# Generated by Django 4.1 on 2022-08-27 16:27

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="StudentDataCollection",
            fields=[
                (
                    "id",
                    models.CharField(max_length=20, primary_key=True, serialize=False),
                ),
                ("name", models.CharField(max_length=50)),
                ("email", models.EmailField(max_length=254, unique=True)),
                ("phone", models.CharField(max_length=10)),
                ("gender", models.CharField(max_length=15)),
                ("grade", models.CharField(max_length=30)),
                ("address", models.CharField(max_length=50)),
            ],
        ),
    ]