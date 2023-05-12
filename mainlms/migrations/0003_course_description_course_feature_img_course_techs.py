# Generated by Django 4.2.1 on 2023-05-03 19:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("mainlms", "0002_alter_course_options_alter_coursecategory_options_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="course",
            name="description",
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name="course",
            name="feature_img",
            field=models.ImageField(null=True, upload_to="course_imgs/"),
        ),
        migrations.AddField(
            model_name="course",
            name="techs",
            field=models.TextField(null=True),
        ),
    ]