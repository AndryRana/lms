from rest_framework import serializers
from django.core.mail import send_mail
from .models import Teacher, CourseCategory, Course, Chapter, Student, StudentCourseEnrollment, CourseRating, StudentFavoriteCourse, StudentAssignment, Notification, Quiz, QuizQuestions,CourseQuiz, AttemptQuiz, StudyMaterial

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model=Teacher
        fields=['id', 'full_name', 'email','password','qualification','mobile_no','profile_img','skills','otp_digit','teacher_courses', 'skill_list', 'total_teacher_courses']
    
    def __init__(self, *args, **kwargs):
        super(TeacherSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2

    def create(self,validate_data):
        email=self.validated_data['email']
        otp_digit=self.validated_data['otp_digit']
        instance= super(TeacherSerializer,self).create(validate_data)
        send_mail(
            'Verify Account',
            'Please verify your account',
            'ranamiran75@gmail.com',
            [email],
            fail_silently=False,
            html_message=f'<p>Your OTP is</p><p>{otp_digit}</p>'
            )
        return instance
    
class TeacherDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model=Teacher
        fields=['total_teacher_courses', 'total_teacher_chapters', 'total_teacher_students']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=CourseCategory
        fields=['id', 'title', 'description','total_courses']

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model=Course
        fields=['id','category', 'teacher', 'title', 'description','feature_img', 'techs', 'course_views', 'course_chapters', 'related_videos','tech_list','total_enrolled_students','course_rating']
    
    def __init__(self, *args, **kwargs):
        super(CourseSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model=Chapter
        fields=['id','course', 'title', 'description','video', 'remarks']
        
    def __init__(self, *args, **kwargs):
        super(ChapterSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1
        
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Student
        fields=['id', 'full_name', 'email','password','username','interested_categories', 'profile_img']
    
    def __init__(self, *args, **kwargs):
        super(StudentSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1

class StudentDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model=Student
        fields=['enrolled_courses', 'favorite_courses', 'complete_assignments','pending_assignments']
        
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
            self.Meta.depth = 2
            

class StudentAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model=StudentAssignment
        fields=['id','teacher','student', 'title', 'detail','student_status', 'add_time']
    
    def __init__(self, *args, **kwargs):
        super(StudentAssignmentSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model=Notification
        fields=['teacher','student', 'notif_subject', 'notif_for']
    
    def __init__(self, *args, **kwargs):
        super(NotificationSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2
            

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model=Quiz
        fields=['id', 'teacher', 'title', 'detail','add_time', 'assign_status']
    
    def __init__(self, *args, **kwargs):
        super(QuizSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model=QuizQuestions
        fields=['id','quiz','questions', 'ans1', 'ans2','ans3', 'ans4','right_ans']
        
    def __init__(self, *args, **kwargs):
        super(QuestionSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2
            
class CourseQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model=CourseQuiz
        fields=['id','teacher', 'course', 'quiz', 'add_time']
        
    def __init__(self, *args, **kwargs):
        super(CourseQuizSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2
        
            
class AttemptQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model=AttemptQuiz
        fields=['id','student','quiz', 'question','right_ans', 'add_time']
        
    def __init__(self, *args, **kwargs):
        super(AttemptQuizSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2
        
class StudyMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model=StudyMaterial
        fields=['id','course', 'title', 'description','upload', 'remarks']
        
    def __init__(self, *args, **kwargs):
        super(StudyMaterialSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1
        
        