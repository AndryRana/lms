from rest_framework import serializers
from .models import Teacher, CourseCategory, Course, Chapter

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model=Teacher
        fields=['id', 'full_name','email','password','qualification','mobile_no','skills']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=CourseCategory
        fields=['id', 'title', 'description']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model=Course
        fields=['id','category', 'teacher', 'title', 'description','feature_img', 'techs']

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model=Chapter
        fields=['id','course', 'title', 'description','video', 'remarks']