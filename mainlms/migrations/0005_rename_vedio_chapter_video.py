# Generated by Django 4.2.1 on 2023-05-04 17:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("mainlms", "0004_alter_student_options_chapter"),
    ]

    operations = [
        migrations.RenameField(
            model_name="chapter",
            old_name="vedio",
            new_name="video",
        ),
    ]