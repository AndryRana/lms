from django.contrib import admin
from . import models

class TeacherAdmin(admin.ModelAdmin):
    list_display= ['id', 'full_name','email', 'skills','verify_status', 'otp_digit']
admin.site.register(models.Teacher,TeacherAdmin)
admin.site.register(models.CourseCategory)
admin.site.register(models.Course)
admin.site.register(models.Chapter)
admin.site.register(models.Student)
admin.site.register(models.StudentCourseEnrollment)
admin.site.register(models.CourseRating)
admin.site.register(models.StudentFavoriteCourse)
admin.site.register(models.StudentAssignment)

class NotificationAdmin(admin.ModelAdmin):
    list_display= ['id', 'notif_subject','notif_for', 'notif_read_status']
admin.site.register(models.Notification,NotificationAdmin)

class QuizAdmin(admin.ModelAdmin):
    list_display= ['id', 'teacher','title', 'detail']
admin.site.register(models.Quiz,QuizAdmin )


class QuizQuestionsAdmin(admin.ModelAdmin):
    list_display= ['id', 'quiz','questions']
admin.site.register(models.QuizQuestions, QuizQuestionsAdmin)


class CourseQuizAdmin(admin.ModelAdmin):
    list_display= ['id', 'teacher','course', 'quiz']
admin.site.register(models.CourseQuiz, CourseQuizAdmin)


class AttemptQuizAdmin(admin.ModelAdmin):
    list_display= ['id', 'student', 'quiz', 'question']
admin.site.register(models.AttemptQuiz, AttemptQuizAdmin)

class StudyMaterialAdmin(admin.ModelAdmin):
    list_display= ['id', 'course','title', 'description']
admin.site.register(models.StudyMaterial, StudyMaterialAdmin)