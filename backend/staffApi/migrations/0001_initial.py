# Generated by Django 4.1 on 2022-08-26 04:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="StaffDataCollection",
            fields=[
                (
                    "id",
                    models.CharField(max_length=20, primary_key=True, serialize=False),
                ),
                ("name", models.CharField(max_length=50)),
                ("email", models.EmailField(max_length=254, unique=True)),
                ("phone", models.CharField(max_length=10)),
                ("gender", models.CharField(max_length=15)),
                ("position", models.CharField(max_length=30)),
                ("address", models.CharField(max_length=50)),
                ("image", models.ImageField(blank=True, upload_to="image/Staffs/")),
            ],
        ),
        migrations.CreateModel(
            name="StaffAttendanceModel",
            fields=[
                (
                    "id",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        primary_key=True,
                        serialize=False,
                        to="staffApi.staffdatacollection",
                    ),
                ),
                ("name", models.CharField(max_length=50)),
                ("attend_day", models.CharField(max_length=5)),
                ("absent_day", models.CharField(max_length=5)),
                ("total_day", models.CharField(max_length=5)),
                ("date", models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name="StaffSalaryModel",
            fields=[
                (
                    "id",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        primary_key=True,
                        serialize=False,
                        to="staffApi.staffdatacollection",
                    ),
                ),
                ("name", models.CharField(max_length=50)),
                ("monthly_salary", models.CharField(max_length=10)),
                ("paid_salary", models.CharField(max_length=10)),
                ("unpaid_salary", models.CharField(max_length=10)),
                ("total_salary", models.CharField(max_length=10)),
                ("date", models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name="StaffSalaryPaymentModel",
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
                ("amount", models.CharField(max_length=20)),
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
