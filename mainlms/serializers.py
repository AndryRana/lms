from rest_framework import serializers
from .models import Teacher, CourseCategory, Course, Chapter, Student, StudentCourseEnrollment, CourseRating, StudentFavoriteCourse, StudentAssignment

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model=Teacher
        fields=['id', 'full_name', 'email','password','qualification','mobile_no','profile_img','skills', 'teacher_courses', 'skill_list']
    
    def __init__(self, *args, **kwargs):
        super(TeacherSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1

class TeacherDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model=Teacher
        fields=['total_teacher_courses', 'total_teacher_chapters', 'total_teacher_students']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=CourseCategory
        fields=['id', 'title', 'description']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model=Course
        fields=['id','category', 'teacher', 'title', 'description','feature_img', 'techs', 'course_chapters', 'related_videos','tech_list','total_enrolled_students','course_rating']
    
    def __init__(self, *args, **kwargs):
        super(CourseSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model=Chapter
        fields=['id','course', 'title', 'description','video', 'remarks']
        
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Student
        fields=['id', 'full_name', 'email','password','username','interested_categories']
    
    def __init__(self, *args, **kwargs):
        super(StudentSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1
        
class StudentCourseEnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model=StudentCourseEnrollment
        fields=['id', 'course', 'student', 'enrolled_time']
        
    def __init__(self, *args, **kwargs):
        super(StudentCourseEnrollSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2
        
class StudentFavoriteCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model=StudentFavoriteCourse
        fields=['id', 'course', 'student', 'status']
        
    def __init__(self, *args, **kwargs):
        super(StudentFavoriteCourseSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2

class CourseRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model=CourseRating
        fields=['id', 'course', 'student', 'rating','reviews', 'review_time']
    
    def __init__(self, *args, **kwargs):
        super(CourseRatingSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1
            

class StudentAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model=StudentAssignment
        fields=['id','teacher','student', 'title', 'detail', 'add_time']
    
    def __init__(self, *args, **kwargs):
        super(StudentAssignmentSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2