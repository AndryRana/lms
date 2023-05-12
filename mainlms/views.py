from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import permissions
from .serializers import TeacherSerializer, CategorySerializer, CourseSerializer, ChapterSerializer, StudentSerializer, StudentCourseEnrollSerializer, CourseRatingSerializer, TeacherDashboardSerializer
from .models import Teacher, CourseCategory, Course, Chapter, Student, StudentCourseEnrollment, CourseRating

# class TeacherList(APIView):
#     def get(self, request):
#         teachers=models.Teacher.objects.all()
#         serializer = TeacherSerializer(teachers, many=True)
#         return Response(serializer.data)

class TeacherList(generics.ListCreateAPIView):
    queryset=Teacher.objects.all()
    serializer_class = TeacherSerializer
    # permission_classes = [permissions.IsAuthenticated]
    
class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=Teacher.objects.all()
    serializer_class = TeacherSerializer
    # permission_classes = [permissions.IsAuthenticated]
    
class TeacherDashboard(generics.RetrieveAPIView):
    queryset=Teacher.objects.all()
    serializer_class = TeacherDashboardSerializer

@csrf_exempt
def teacher_login(request):
    email=request.POST['email']
    password=request.POST['password']
    try:
        teacherData= Teacher.objects.get(email=email, password=password)
    except Teacher.DoesNotExist:
        teacherData=None
    if teacherData:
        return JsonResponse({'bool':True,'teacher_id':teacherData.id})
    else:
        return JsonResponse({'bool':False})
    
class CategoryList(generics.ListCreateAPIView):
    queryset=CourseCategory.objects.all()
    serializer_class = CategorySerializer
    # permission_classes = [permissions.IsAuthenticated]

#Course
class CourseList(generics.ListCreateAPIView):
    queryset=Course.objects.all()
    serializer_class = CourseSerializer
    
    def get_queryset(self):
        qs=super().get_queryset()
        if 'result' in self.request.GET:
            limit=int(self.request.GET['result'])
            qs=Course.objects.all().order_by('-id')[:limit]
            
        if 'category' in self.request.GET:
            category=self.request.GET['category']
            qs=Course.objects.filter(techs__icontains=category)
            
        if 'skill_name' in self.request.GET and 'teacher' in self.request.GET:
            skill_name=self.request.GET['skill_name']
            teacher=self.request.GET['teacher']
            teacher=Teacher.objects.filter(id=teacher).first()
            qs=Course.objects.filter(techs__icontains=skill_name, teacher=teacher)
        return qs

#Course detail       
class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class= CourseSerializer
             
#Specific teacher Course
class TeacherCourseList(generics.ListCreateAPIView):
    serializer_class = CourseSerializer
    
    def get_queryset(self):
        teacher_id=self.kwargs['teacher_id']
        teacher=Teacher.objects.get(pk=teacher_id)
        return Course.objects.filter(teacher=teacher)

#Specific teacher Course Detail
class TeacherCourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=Course.objects.all()
    serializer_class = CourseSerializer
    
#Chapter
class ChapterList(generics.ListCreateAPIView):
    queryset=Chapter.objects.all()
    serializer_class = ChapterSerializer

#Specific Course Chapter list
class CourseChapterList(generics.ListAPIView):
    serializer_class = ChapterSerializer
    
    def get_queryset(self):
        course_id=self.kwargs['course_id']
        course=Course.objects.get(pk=course_id)
        return Chapter.objects.filter(course=course)

#Specific Course Chapter list
class ChapterDetailList(generics.RetrieveUpdateDestroyAPIView):
    queryset=Chapter.objects.all()
    serializer_class = ChapterSerializer
    
    
#Student Data
class StudentList(generics.ListCreateAPIView):
    queryset=Student.objects.all()
    serializer_class = StudentSerializer
    
@csrf_exempt
def student_login(request):
    email=request.POST['email']
    password=request.POST['password']
    try:
        studentData= Student.objects.get(email=email, password=password)
    except Student.DoesNotExist:
        studentData=None
    if studentData:
        return JsonResponse({'bool':True,'student_id':studentData.id})
    else:
        return JsonResponse({'bool':False})
    

class StudentEnrollCourseList(generics.ListCreateAPIView):
    queryset=StudentCourseEnrollment.objects.all()
    serializer_class = StudentCourseEnrollSerializer
    
def fetch_enroll_status(request, student_id, course_id):
    student=Student.objects.filter(id=student_id).first()
    course=Course.objects.filter(id=course_id).first()
    enrollStatus=StudentCourseEnrollment.objects.filter(course=course,student=student).count()
    if enrollStatus:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})

class EnrolledStudentList(generics.ListAPIView):
    queryset=StudentCourseEnrollment.objects.all()
    serializer_class = StudentCourseEnrollSerializer
    
    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id=self.kwargs['course_id']
            course=Course.objects.get(pk=course_id)
            return StudentCourseEnrollment.objects.filter(course=course)
        elif 'teacher_id' in self.kwargs:
            teacher_id=self.kwargs['teacher_id']
            teacher=Teacher.objects.get(pk=teacher_id)
            return StudentCourseEnrollment.objects.filter(course__teacher=teacher).distinct('id')
            
    
class CourseRatingList(generics.ListCreateAPIView):
    queryset=CourseRating.objects.all()
    serializer_class = CourseRatingSerializer
    
def fetch_rating_status(request, student_id, course_id):
    student=Student.objects.filter(id=student_id).first()
    course=Course.objects.filter(id=course_id).first()
    ratingStatus=CourseRating.objects.filter(course=course,student=student).count()
    if ratingStatus:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})


@csrf_exempt
def teacher_change_password(request,teacher_id):
    password=request.POST['password']
    try:
        teacherData= Teacher.objects.get(id=teacher_id)
    except Teacher.DoesNotExist:
        teacherData=None
    if teacherData:
        Teacher.objects.filter(id=teacher_id).update(password=password)
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})