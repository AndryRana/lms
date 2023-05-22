# Generated by Django 4.2.1 on 2023-05-22 16:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("mainlms", "0028_course_course_views"),
    ]

    operations = [
        migrations.AddField(
            model_name="student",
            name="otp_digit",
            field=models.CharField(max_length=10, null=True),
        ),
        migrations.AddField(
            model_name="student",
            name="verify_status",
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name="teacher",
            name="otp_digit",
            field=models.CharField(max_length=10, null=True),
        ),
        migrations.AddField(
            model_name="teacher",
            name="verify_status",
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name="course",
            name="category",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="category_courses",
                to="mainlms.coursecategory",
            ),
        ),
    ]
