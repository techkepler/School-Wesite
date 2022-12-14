# Generated by Django 4.1 on 2022-08-23 08:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="TeacherDataCollection",
            fields=[
                (
                    "id",
                    models.CharField(max_length=20, primary_key=True, serialize=False),
                ),
                ("name", models.CharField(max_length=50)),
                ("email", models.EmailField(max_length=254, unique=True)),
                ("phone", models.CharField(max_length=10)),
                ("gender", models.CharField(max_length=15)),
                ("subject", models.CharField(max_length=50)),
                ("faculty", models.CharField(max_length=30)),
                ("address", models.CharField(max_length=50)),
                ("image", models.ImageField(blank=True, upload_to="image/teachers/")),
            ],
        ),
        migrations.CreateModel(
            name="TeacherAttendanceModel",
            fields=[
                (
                    "id",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        primary_key=True,
                        serialize=False,
                        to="teacherApi.teacherdatacollection",
                    ),
                ),
                ("name", models.CharField(max_length=50)),
                ("attend_day", models.CharField(max_length=5)),
                ("absent_day", models.CharField(max_length=5)),
                ("total_day", models.CharField(max_length=5)),
                ("date", models.DateField()),
            ],
        ),
    ]
