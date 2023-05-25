from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q, Subquery, OuterRef
from rest_framework.views import APIView
from django.core.mail import send_mail
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import permissions
from .serializers import TeacherSerializer, CategorySerializer, CourseSerializer, ChapterSerializer, StudentSerializer, StudentCourseEnrollSerializer, CourseRatingSerializer, TeacherDashboardSerializer, StudentFavoriteCourseSerializer, StudentAssignmentSerializer, StudentDashboardSerializer, NotificationSerializer,QuizSerializer, QuestionSerializer, CourseQuizSerializer, AttemptQuizSerializer, StudyMaterialSerializer
from .models import Teacher, CourseCategory, Course, Chapter, Student, StudentCourseEnrollment, CourseRating, StudentFavoriteCourse, StudentAssignment, Notification, Quiz, QuizQuestions, CourseQuiz, AttemptQuiz, StudyMaterial
from random import randint

# class TeacherList(APIView):
#     def get(self, request):
#         teachers=models.Teacher.objects.all()
#         serializer = TeacherSerializer(teachers, many=True)
#         return Response(serializer.data)


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 4
    page_size_query_param = 'page_size'
    max_page_size = 4


class TeacherList(generics.ListCreateAPIView):
    queryset=Teacher.objects.all()
    serializer_class = TeacherSerializer
    
    def get_queryset(self):
        if 'popular' in self.request.GET:
            sql="SELECT t.*,COUNT(c.id) as total_course  FROM mainlms_teacher as t INNER JOIN mainlms_course as c ON c.teacher_id=t.id GROUP BY t.id,t.full_name ORDER BY total_course DESC"
            return Teacher.objects.raw(sql)
    
    
class TeacherDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=Teacher.objects.all()
    serializer_class = TeacherSerializer
    
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
        if not teacherData.verify_status:
            return JsonResponse({'bool':False, 'msg': 'Account is not verified!!'})
        else:
            if teacherData.login_via_otp:
                #send OTP email
                otp_digit=randint(100000,999999)
                send_mail(
                    'Verify Account',
                    'Please verify your account',
                    'ranamiran75@gmail.com',
                    [teacherData.email],
                    fail_silently=False,
                    html_message=f'<p>Your OTP is</p><p>{otp_digit}</p>'
                )
                teacherData.otp_digit=otp_digit
                teacherData.save()
                return JsonResponse({'bool':True,'teacher_id':teacherData.id, 'login_via_otp': True})
            else:
                return JsonResponse({'bool':True,'teacher_id':teacherData.id, 'login_via_otp': False})
                    
            return JsonResponse({'bool':True,'teacher_id':teacherData.id})
    else:
        return JsonResponse({'bool':False,'msg': 'Invalid email or Password!!'})
    
@csrf_exempt    
def verify_teacher_via_otp(request,teacher_id):
    otp_digit=request.POST.get('otp_digit')
    verify=Teacher.objects.filter(id=teacher_id, otp_digit=otp_digit).first()
    if verify:
        Teacher.objects.filter(id=teacher_id, otp_digit=otp_digit).update(verify_status=True)
        return JsonResponse({'bool':True, 'teacher_id':verify.id})
    else:
        return JsonResponse({'bool':False,'msg':'Please enter valid 6 digit OTP'})
        

class CategoryList(generics.ListCreateAPIView):
    queryset=CourseCategory.objects.all()
    serializer_class = CategorySerializer
    




#Course
class CourseList(generics.ListCreateAPIView):
    queryset=Course.objects.all()
    serializer_class = CourseSerializer
    pagination_class = StandardResultsSetPagination
    
    def get_queryset(self):
        qs=super().get_queryset()
        if 'result' in self.request.GET:
            limit=int(self.request.GET['result'])
            qs=Course.objects.all().order_by('-id')[:limit]
            
        if 'category' in self.request.GET:
            category=self.request.GET['category']
            category=CourseCategory.objects.filter(id=category).first()
            qs=Course.objects.filter(category=category)
            
        if 'skill_name' in self.request.GET and 'teacher' in self.request.GET:
            skill_name=self.request.GET['skill_name']
            teacher=self.request.GET['teacher']
            teacher=Teacher.objects.filter(id=teacher).first()
            qs=Course.objects.filter(techs__icontains=skill_name, teacher=teacher)
            
        if 'searchstring' in self.kwargs:
            search=self.kwargs['searchstring']
            if search:
                qs=Course.objects.filter(Q(title__icontains=search)|Q(techs__icontains=search))
            
        elif 'studentId' in self.kwargs:
            student_id=self.kwargs['studentId']
            student=Student.objects.get(pk=student_id)
            # print(student.interested_categories)
            queries=[Q(techs__iendswith=value) for value in student.interested_categories]
            query= queries.pop()
            for item in queries:
                query |= item
            qs=Course.objects.filter(query)
            return qs
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

class StudentDashboard(generics.RetrieveAPIView):
    queryset=Student.objects.all()
    serializer_class = StudentDashboardSerializer


class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
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
        if not studentData.verify_status:
            return JsonResponse({'bool':False, 'msg': 'Account is not verified!!'})
        else:   
            if studentData.login_via_otp:
                #send OTP email
                otp_digit=randint(100000,999999)
                send_mail(
                    'Verify Account',
                    'Please verify your account',
                    'ranamiran75@gmail.com',
                    [studentData.email],
                    fail_silently=False,
                    html_message=f'<p>Your OTP is</p><p>{otp_digit}</p>'
                )
                studentData.otp_digit=otp_digit
                studentData.save()
                return JsonResponse({'bool':True,'student_id':studentData.id, 'login_via_otp': True})
            else:
                return JsonResponse({'bool':True,'student_id':studentData.id, 'login_via_otp': False})
                    
            return JsonResponse({'bool':True,'student_id':studentData.id})
    else:
        return JsonResponse({'bool':False,'msg': 'Invalid email or Password!!'})
 
@csrf_exempt    
def verify_student_via_otp(request,student_id):
    otp_digit=request.POST.get('otp_digit')
    verify=Student.objects.filter(id=student_id, otp_digit=otp_digit).first()
    if verify:
        Student.objects.filter(id=student_id, otp_digit=otp_digit).update(verify_status=True)
        return JsonResponse({'bool':True, 'student_id':verify.id})
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

class StudentFavoriteCourseList(generics.ListCreateAPIView):
    queryset=StudentFavoriteCourse.objects.all()
    serializer_class = StudentFavoriteCourseSerializer
    
    def get_queryset(self):
        if 'student_id' in self.kwargs:
            student_id=self.kwargs['student_id']
            student=Student.objects.get(pk=student_id)
            return StudentFavoriteCourse.objects.filter(student=student).distinct('id')
        
def fetch_enroll_status(request, student_id, course_id):
    student=Student.objects.filter(id=student_id).first()
    course=Course.objects.filter(id=course_id).first()
    enrollStatus=StudentCourseEnrollment.objects.filter(course=course,student=student).count()
    if enrollStatus:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})

def fetch_favorite_status(request, student_id, course_id):
    student=Student.objects.filter(id=student_id).first()
    course=Course.objects.filter(id=course_id).first()
    favoriteStatus=StudentFavoriteCourse.objects.filter(course=course,student=student).first()
    if favoriteStatus and favoriteStatus.status == True:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})

def remove_favorite_course(request, course_id, student_id):
    student=Student.objects.filter(id=student_id).first()
    course=Course.objects.filter(id=course_id).first()
    favoriteStatus=StudentFavoriteCourse.objects.filter(course=course,student=student).delete()
    if favoriteStatus:
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
        elif 'student_id' in self.kwargs:
            student_id=self.kwargs['student_id']
            student=Student.objects.get(pk=student_id)
            return StudentCourseEnrollment.objects.filter(student=student).distinct('id')
            
    
class CourseRatingList(generics.ListCreateAPIView):
    queryset=CourseRating.objects.all()
    serializer_class = CourseRatingSerializer
    
    def get_queryset(self):
        if 'popular' in self.request.GET:
            sql="SELECT cr.*,c.*  FROM mainlms_courserating as cr INNER JOIN mainlms_course as c ON cr.course_id=c.id GROUP BY cr.id, cr.rating, cr.course_id, c.id, c.title ORDER BY AVG(cr.rating) desc LIMIT 4"
            return CourseRating.objects.raw(sql)
        if 'all' in self.request.GET:
            sql="SELECT cr.*,c.* FROM mainlms_courserating as cr INNER JOIN mainlms_course as c ON cr.course_id=c.id GROUP BY cr.id, cr.rating, cr.course_id, c.id, c.title ORDER BY AVG(cr.rating) desc"
            return CourseRating.objects.raw(sql)
        return CourseRating.objects.filter(course__isnull=False).order_by('-rating')
    
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
    
class AssignmentList(generics.ListCreateAPIView):
    queryset=StudentAssignment.objects.all()
    serializer_class = StudentAssignmentSerializer
    
    def get_queryset(self):
        student_id=self.kwargs['student_id']
        teacher_id=self.kwargs['teacher_id']
        student=Student.objects.get(pk=student_id)
        teacher=Teacher.objects.get(pk=teacher_id)
        return StudentAssignment.objects.filter(student=student, teacher=teacher)
    
class MyAssignmentList(generics.ListCreateAPIView):
    queryset=StudentAssignment.objects.all()
    serializer_class = StudentAssignmentSerializer
    
    def get_queryset(self):
        student_id=self.kwargs['student_id']
        student=Student.objects.get(pk=student_id)
        #Update Notifications status
        Notification.objects.filter(student=student, notif_for='student',notif_subject='assignment').update(notif_read_status=True)
        return StudentAssignment.objects.filter(student=student)
    
class UpdateAssignment(generics.RetrieveUpdateDestroyAPIView):
    queryset=StudentAssignment.objects.all()
    serializer_class = StudentAssignmentSerializer
    
@csrf_exempt
def student_change_password(request,student_id):
    password=request.POST['password']
    try:
        studentData= Student.objects.get(id=student_id)
    except student.DoesNotExist:
        studentData=None
    if studentData:
        Student.objects.filter(id=student_id).update(password=password)
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})
    
class NotificationList(generics.ListCreateAPIView):
    queryset=Notification.objects.all()
    serializer_class = NotificationSerializer
    
    def get_queryset(self):
        student_id=self.kwargs['student_id']
        student=Student.objects.get(pk=student_id)
        return Notification.objects.filter(student=student,notif_for='student',notif_subject='assignment',notif_read_status=False)
    
    
class QuizList(generics.ListCreateAPIView):
    queryset = Quiz.objects.all()
    serializer_class= QuizSerializer
    
    
class TeacherQuizList(generics.ListCreateAPIView):
    serializer_class = QuizSerializer
    
    def get_queryset(self):
        teacher_id=self.kwargs['teacher_id']
        teacher=Teacher.objects.get(pk=teacher_id)
        return Quiz.objects.filter(teacher=teacher)


class TeacherQuizDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=Quiz.objects.all()
    serializer_class = QuizSerializer
    
class QuizDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset=Quiz.objects.all()
    serializer_class = QuizSerializer
    
    
class QuizQuestionList(generics.ListCreateAPIView):
    serializer_class = QuestionSerializer
    
    def get_queryset(self):
        quiz_id=self.kwargs['quiz_id']
        quiz=Quiz.objects.get(pk=quiz_id)
        if 'limit' in self.kwargs:
            return QuizQuestions.objects.filter(quiz=quiz).order_by('id')[:1]
        elif 'question_id' in self.kwargs:
            current_question=self.kwargs['question_id']
            return QuizQuestions.objects.filter(quiz=quiz,id__gt=current_question).order_by('id')[:1]
        else:
            return QuizQuestions.objects.filter(quiz=quiz)
    
class CourseQuizList(generics.ListCreateAPIView):
    queryset=CourseQuiz.objects.all()
    serializer_class = CourseQuizSerializer
    
    def get_queryset(self):
        if 'course_id' in self.kwargs:
            course_id=self.kwargs['course_id']
            course=Course.objects.get(pk=course_id)
            return CourseQuiz.objects.filter(course=course)
    
def fetch_quiz_assign_status(request, quiz_id, course_id):
    quiz=Quiz.objects.filter(id=quiz_id).first()
    course=Course.objects.filter(id=course_id).first()
    assignStatus=CourseQuiz.objects.filter(course=course,quiz=quiz).count()
    if assignStatus:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})
    
class AttemptQuizList(generics.ListCreateAPIView):
    queryset=AttemptQuiz.objects.all()
    serializer_class = AttemptQuizSerializer
    #In the updated code, we first filter the AttemptQuiz objects based on the quiz_id 
    # and use OuterRef to reference the student_id of each attempt.
    # Then, we order the attempts by the created_at field in descending order 
    # and limit the result to only the latest attempt for each student using [:1].
    #Finally, we filter the AttemptQuiz queryset again using Subquery to include 
    # only the attempts that have their id in the subquery result.
    #By using this approach, you will get a list of the latest attempts 
    # for each student who has completed the quiz, avoiding the duplication issue you encountered before.
    def get_queryset(self):
        if 'quiz_id' in self.kwargs:
            quiz_id=self.kwargs['quiz_id']
            quiz=Quiz.objects.get(pk=quiz_id)
            #return AttemptQuiz.objects.raw(f'SELECT  * FROM mainlms_attemptquiz WHERE quiz_id={int(quiz_id)} GROUP by student_id')
            #return AttemptQuiz.objects.filter(quiz=quiz)
            latest_attempts = AttemptQuiz.objects.filter(
                quiz_id=quiz_id,
                student_id=OuterRef('student_id')
            ).order_by('-add_time')[:1]
            
            return AttemptQuiz.objects.filter(
                id__in=Subquery(latest_attempts.values('id'))
            )
       
        
def fetch_quiz_result(request, quiz_id, student_id):
    quiz=Quiz.objects.filter(id=quiz_id).first()
    student=Student.objects.filter(id=student_id).first()
    total_questions=QuizQuestions.objects.filter(quiz=quiz).count()
    total_attempted_questions=AttemptQuiz.objects.filter(quiz=quiz, student=student).values('student').count()
    attempted_questions=AttemptQuiz.objects.filter(quiz=quiz, student=student)
    
    total_correct_ans=0
    for attempt in attempted_questions:
        if attempt.right_ans == attempt.question.right_ans:
            total_correct_ans+=1
    return JsonResponse({'total_questions':total_questions,'total_attempted_questions':total_attempted_questions, 'total_correct_ans':total_correct_ans})
        
        
def fetch_quiz_attempt_status(request, quiz_id, student_id):
    quiz=Quiz.objects.filter(id=quiz_id).first()
    student=Student.objects.filter(id=student_id).first()
    attemptStatus=AttemptQuiz.objects.filter(student=student,question__quiz=quiz).count()
    # print(AttemptQuiz.objects.filter(student=student,question__quiz=quiz).query)
    if attemptStatus>0:
        return JsonResponse({'bool':True})
    else:
        return JsonResponse({'bool':False})
    
    
    
class StudyMaterialList(generics.ListCreateAPIView):
    serializer_class = StudyMaterialSerializer
    
    def get_queryset(self):
        course_id=self.kwargs['course_id']
        course=Course.objects.get(pk=course_id)
        return StudyMaterial.objects.filter(course=course)
    
class StudyMaterialDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = StudyMaterial.objects.all()
    serializer_class= StudyMaterialSerializer
    
def update_view(request,course_id):
    queryset=Course.objects.filter(pk=course_id).first()
    queryset.course_views+=1
    queryset.save()
    return JsonResponse({'views':queryset.course_views})

@csrf_exempt
def teacher_forgot_password(request):
    email=request.POST.get('email')
    verify=Teacher.objects.filter(email=email).first()
    if verify:
        otp_digit=randint(100000,999999)
        link=f"http://localhost:3000/teacher-change-password/{verify.id}/"
        #send OTP email
        send_mail(
            'Verify Account',
            'Please verify your account',
            'ranamiran75@gmail.com',
            [verify.email],
            fail_silently=False,
            html_message=f'<p>Your Link is</p><p>{link}</p>'
        )
        Teacher.objects.filter(email=email).update(otp_digit=otp_digit)
        return JsonResponse({'bool':True, 'msg':'Please check your email!'})
    else:
        return JsonResponse({'bool':False,'msg':'Invalid email!'})

@csrf_exempt
def teacher_change_forgot_password(request,teacher_id):
    password=request.POST.get('password')
    verify=Teacher.objects.filter(id=teacher_id).first()
    if verify:
        Teacher.objects.filter(id=teacher_id).update(password=password)
        return JsonResponse({'bool':True, 'msg':'Password has been changed!'})
    else:
        return JsonResponse({'bool':False,'msg':'Oops... Some error occured!'})

@csrf_exempt
def user_forgot_password(request):
    email=request.POST.get('email')
    verify=Student.objects.filter(email=email).first()
    if verify:
        otp_digit=randint(100000,999999)
        link=f"http://localhost:3000/user-change-password/{verify.id}/"
        #send OTP email
        send_mail(
            'Verify Account',
            'Please verify your account',
            'ranamiran75@gmail.com',
            [verify.email],
            fail_silently=False,
            html_message=f'<p>Your Link is</p><p>{link}</p>'
        )
        Teacher.objects.filter(email=email).update(otp_digit=otp_digit)
        return JsonResponse({'bool':True, 'msg':'Please check your email!'})
    else:
        return JsonResponse({'bool':False,'msg':'Invalid email!'})

@csrf_exempt
def user_change_forgot_password(request,student_id):
    password=request.POST.get('password')
    verify=Student.objects.filter(id=student_id).first()
    if verify:
        Student.objects.filter(id=student_id).update(password=password)
        return JsonResponse({'bool':True, 'msg':'Password has been changed!'})
    else:
        return JsonResponse({'bool':False,'msg':'Oops... Some error occured!'})