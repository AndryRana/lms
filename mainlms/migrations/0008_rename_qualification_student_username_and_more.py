# Generated by Django 4.2.1 on 2023-05-08 16:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("mainlms", "0007_teacher_detail_alter_chapter_course_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="student",
            old_name="qualification",
            new_name="username",
        ),
        migrations.RemoveField(
            model_name="student",
            name="address",
        ),
        migrations.RemoveField(
            model_name="student",
            name="mobile_no",
        ),
    ]
