# Generated by Django 4.2.1 on 2023-05-17 20:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("mainlms", "0022_quiz_quizquestions_coursequiz"),
    ]

    operations = [
        migrations.AddField(
            model_name="coursequiz",
            name="teacher",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="mainlms.teacher",
            ),
        ),
    ]