from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    #teacher
    path('teacher/', views.TeacherList.as_view()),
    path('teacher/dashboard/<int:pk>/', views.TeacherDashboard.as_view()),
    path('teacher/<int:pk>/', views.TeacherDetail.as_view()),
    path('teacher/change-password/<int:teacher_id>/', views.teacher_change_password),
    path('teacher-login', views.teacher_login),
    #Category
    path('category/', views.CategoryList.as_view()),
    #Course
    path('course/', views.CourseList.as_view()),
    #Course detail
    path('course/<int:pk>/', views.CourseDetailView.as_view()),
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
    #Student
    path('student/', views.StudentList.as_view()),
    path('student-login', views.student_login),
    path('student-enroll-course/', views.StudentEnrollCourseList.as_view()),
    path('fetch-enroll-status/<int:student_id>/<int:course_id>', views.fetch_enroll_status),
    path('fetch-all-enroll-students/<int:teacher_id>', views.EnrolledStudentList.as_view()),
    path('fetch-enroll-students/<int:course_id>', views.EnrolledStudentList.as_view()),
    path('fetch-enroll-courses/<int:student_id>', views.EnrolledStudentList.as_view()),
    path('student-add-favorite-course/', views.StudentFavoriteCourseList.as_view()),
    path('student-remove-favorite-course/<int:course_id>/<int:student_id>', views.remove_favorite_course),
    path('fetch-favorite-status/<int:student_id>/<int:course_id>', views.fetch_favorite_status),
    path('fetch-recommended-courses/<int:studentId>/', views.CourseList.as_view()),
    path('course-rating/', views.CourseRatingList.as_view()),
    path('fetch-rating-status/<int:student_id>/<int:course_id>', views.fetch_rating_status),
    path('fetch-favorite-courses/<int:student_id>', views.StudentFavoriteCourseList.as_view()),
    path('student-assignment/<int:teacher_id>/<int:student_id>', views.AssignmentList.as_view()),
    path('my-assignments/<int:student_id>', views.MyAssignmentList.as_view()),
    
    
]