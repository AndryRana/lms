function TeacherLogout(){
    const teacherLoginStatus =localStorage.removeItem('teacherLoginStatus')
       window.location.href='/teacher-login';
    return (
        <div></div>
    );
}

export default TeacherLogout;