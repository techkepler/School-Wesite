# Generated by Django 4.1 on 2022-08-27 08:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("staffApi", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="StaffAbsentModel",
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
                ("name", models.CharField(max_length=50)),
                ("date", models.DateField()),
                (
                    "staff_details",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="staffApi.staffdatacollection",
                    ),
                ),
            ],
        ),
    ]
