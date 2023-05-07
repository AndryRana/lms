from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import permissions
from .serializers import TeacherSerializer, CategorySerializer, CourseSerializer, ChapterSerializer
from .models import Teacher, CourseCategory, Course, Chapter

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
            return qs
            
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