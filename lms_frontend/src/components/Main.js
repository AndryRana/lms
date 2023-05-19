import Header from './Header';
import Home from './Home';
import CourseDetail from './CourseDetail';
import Search from './Search';
import TeacherDetail from './TeacherDetail';

//  Users
import Login from './User/Login';
import Logout from './User/StudentLogout';
import Register from './User/Register';
import Dashboard from './User/Dashboard';
import FavoriteCourses from './User/FavoriteCourses';
import RecommendedCourses from './User/RecommendedCourses';
import ProfileSetting from './User/ProfileSetting';
import ChangePassword from './User/ChangePassword';
import MyCourses from './User/MyCourses';
import StudentAssignments from './User/StudentAssignments';

// Teachers
import TeacherDashboard from './Teacher/TeacherDashboard';
import TeacherLogin from './Teacher/TeacherLogin';
import TeacherLogout from './Teacher/TeacherLogout';
import TeacherRegister from './Teacher/TeacherRegister';
import TeacherCourses from './Teacher/TeacherCourses';
import EnrolledStudents from './Teacher/EnrolledStudents';
import AddCourse from './Teacher/AddCourse';
import EditCourse from './Teacher/EditCourse';
import AddChapter from './Teacher/AddChapter';
import CourseChapters from './Teacher/CourseChapters';
import EditChapter from './Teacher/EditChapter';
import TeacherProfileSetting from './Teacher/TeacherProfileSetting';
import TeacherUsers from './Teacher/TeacherUsers';
import AddAssignment from './Teacher/AddAssignment';
import ShowAssignment from './Teacher/ShowAssignment';
import TeacherChangePassword from './Teacher/TeacherChangePassword';

//  Teacher Dashboard Quiz
import AddQuiz from './Teacher/AddQuiz';
import AllQuiz from './Teacher/AllQuiz';
import EditQuiz from './Teacher/EditQuiz';
import QuizQuestions from './Teacher/QuizQuestions';
import AddQuizQuestion from './Teacher/AddQuizQuestion';
import AssignQuiz from './Teacher/AssignQuiz';

// Course Study Materials
import StudyMaterials from './Teacher/StudyMaterials';
import AddStudyMaterial from './Teacher/AddStudyMaterial';

//  Student Dashboard Quiz
import CourseQuizList from './User/CourseQuizList';
import TakeQuiz from './User/TakeQuiz';

// List Pages
import AllCourses from './AllCourses';
import PopularCourses from './PopularCourses';
import PopularTeachers from './PopularTeachers';
import CategoryCourses from './CategoryCourses';
import TeacherSkillCourses from './TeacherSkillCourses';

import About from './About';
import Footer from './Footer';

import {Routes as Switch,Route} from 'react-router-dom';

function Main(){
  return (
    <div className="App">
        <Header />
        <Switch>
            <Route path="/" element={<Home />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/detail/:course_id" element={<CourseDetail />}/>
            <Route path="/search/:searchstring" element={<Search />}/>
            <Route path="/user-login" element={<Login />}/>
            <Route path="/user-logout" element={<Logout />}/>
            <Route path="/user-register" element={<Register />}/>
            <Route path="/user-dashboard" element={<Dashboard />}/>
            <Route path="/my-courses" element={<MyCourses />}/>
            <Route path="/favorite-courses" element={<FavoriteCourses />}/>
            <Route path="/recommended-courses" element={<RecommendedCourses />}/>
            <Route path="/profile-setting" element={<ProfileSetting />}/>
            <Route path="/change-password" element={<ChangePassword />}/>
            <Route path="/teacher-login" element={<TeacherLogin />}/>
            <Route path="/teacher-logout" element={<TeacherLogout />}/>
            <Route path="/teacher-register" element={<TeacherRegister />}/>
            <Route path="/teacher-dashboard" element={<TeacherDashboard />}/>
            <Route path="/teacher-courses" element={<TeacherCourses />}/>
            <Route path="/enrolled-students/:course_id" element={<EnrolledStudents />}/>
            <Route path="/add-course" element={<AddCourse />}/>
            <Route path="/edit-course/:course_id" element={<EditCourse />}/>
            <Route path="/add-chapter/:course_id" element={<AddChapter />}/>
            <Route path="/add-assignment/:teacher_id/:student_id" element={<AddAssignment />}/>
            <Route path="/show-assignment/:teacher_id/:student_id" element={<ShowAssignment />}/>
            <Route path="/my-assignments/" element={<StudentAssignments />}/>

            <Route path="/add-quiz/" element={<AddQuiz />}/>
            <Route path="/quiz/" element={<AllQuiz />}/>
            <Route path="/edit-quiz/:quiz_id" element={<EditQuiz />}/>
            <Route path="/all-questions/:quiz_id" element={<QuizQuestions />}/>
            <Route path="/add-quiz-question/:quiz_id" element={<AddQuizQuestion />}/>
            <Route path="/assign-quiz/:course_id" element={<AssignQuiz />}/>
            
            <Route path="/course-quiz/:course_id" element={<CourseQuizList />}/>
            <Route path="/take-quiz/:quiz_id" element={<TakeQuiz />}/>
            
            <Route path="/study-material/:course_id" element={<StudyMaterials />}/>
            <Route path="/add-study/:course_id" element={<AddStudyMaterial />}/>

            <Route path="/teacher-profile-setting" element={<TeacherProfileSetting />}/>
            <Route path="/teacher-users" element={<TeacherUsers />}/>
            <Route path="/teacher-change-password" element={<TeacherChangePassword />}/>
            <Route path="/teacher-detail/:teacher_id" element={<TeacherDetail />}/>
            <Route path="/all-courses" element={<AllCourses />}/>
            <Route path="/all-chapters/:course_id" element={<CourseChapters />}/>
            <Route path="/edit-chapter/:chapter_id" element={<EditChapter />}/>
            <Route path="/popular-courses" element={<PopularCourses />}/>
            <Route path="/popular-teachers" element={<PopularTeachers />}/>
            <Route path="/category/:category_slug" element={<CategoryCourses />}/>
            <Route path="/teacher-skill-courses/:skill_name/:teacher_id" element={<TeacherSkillCourses />}/>
        </Switch>
        <Footer />
    </div>
  );
}

export default Main;
