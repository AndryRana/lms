from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    #teacher
    path('teacher/', views.TeacherList.as_view()),
    path('teacher/<int:pk>/', views.TeacherDetail.as_view()),
    path('teacher-login', views.teacher_login),
    #Category
    path('category/', views.CategoryList.as_view()),
    #Course
    path('course/', views.CourseList.as_view()),
    #Chapter
    path('chapter/', views.ChapterList.as_view()),
    #Specific Course Chapter
    path('course-chapters/<int:course_id>', views.CourseChapterList.as_view()),
    #Edit Chapter 
    path('chapter/<int:pk>', views.ChapterDetailList.as_view()),
    #Teacher Courses
    path('teacher-courses/<int:teacher_id>', views.TeacherCourseList.as_view()),
    #Course detail
    path('teacher-course-detail/<int:pk>', views.TeacherCourseDetail.as_view()),
    
    
]