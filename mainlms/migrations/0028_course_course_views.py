# Generated by Django 4.2.1 on 2023-05-21 14:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("mainlms", "0027_studymaterial"),
    ]

    operations = [
        migrations.AddField(
            model_name="course",
            name="course_views",
            field=models.BigIntegerField(default=0),
        ),
    ]
