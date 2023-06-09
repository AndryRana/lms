# Generated by Django 4.2.1 on 2023-05-14 16:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("mainlms", "0013_alter_teacher_password"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="courserating",
            options={"verbose_name_plural": "8. Course Rating"},
        ),
        migrations.CreateModel(
            name="StudentFavoriteCourse",
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
                ("status", models.BooleanField(default=True)),
                (
                    "course",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="mainlms.course"
                    ),
                ),
                (
                    "student",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="mainlms.student",
                    ),
                ),
            ],
            options={
                "verbose_name_plural": "7. Student Favorite Courses",
            },
        ),
    ]
