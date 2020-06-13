# Generated by Django 3.0.7 on 2020-06-12 23:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0004_auto_20200612_2240'),
    ]

    operations = [
        migrations.CreateModel(
            name='Session',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time_of_day', models.DateField(auto_now=True)),
                ('sites_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='projects.Site')),
            ],
        ),
    ]