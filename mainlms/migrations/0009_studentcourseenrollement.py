# Generated by Django 4.2.1 on 2023-05-09 16:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("mainlms", "0008_rename_qualification_student_username_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="StudentCourseEnrollement",
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
                ("enrolled_time", models.DateTimeField(auto_now_add=True)),
                (
                    "course",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="enrolled_courses",
                        to="mainlms.course",
                    ),
                ),
                (
                    "student",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="enrolled_student",
                        to="mainlms.student",
                    ),
                ),
            ],
            options={
                "verbose_name_plural": "6. Enrolled Courses",
            },
        ),
    ]
