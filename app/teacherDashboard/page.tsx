import getCoursesByTeacher from '../actions/getCoursesByTeacher';
import getCurrentTeacher from '../actions/getCurrentTeacher';
import getSubjectById from '../actions/getSubjectById';
import Container from '../components/Container';
import EmptyState from '../components/EmptyState';
import TeacherDashboardTable from './TeacherDashboard';


export default async function TeacherDashboard() {
    const currentTeacher = await getCurrentTeacher();
    if (!currentTeacher) {
        return <EmptyState
            title='You are not connected as a teacher'
            subtitle='Please login with your teacher account to access this page' />;
    }
    const courses = await getCoursesByTeacher({ teacherId: currentTeacher.id });
    let subjects = []
    for(let i = 0; i < courses.length; i++) {
        subjects[i] = (await getSubjectById({ subjectId: courses[i].subjectId })).name;
    }
    return (
        <Container>
            <h1 className="text-2xl font-semibold text-center pt-16">
                Teacher Dashboard
            </h1>
            <hr className="my-4 pb-5" />
            {courses.length === 0 ? (
                <EmptyState
                    title='You have no courses yet'
                    subtitle='Create your first course by clicking on the button below'
                    showReset />
            ) : (
                <TeacherDashboardTable courses={courses} subjects={subjects} />
            )}
        </Container>
    );
}
