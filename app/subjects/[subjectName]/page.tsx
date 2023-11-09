import getCoursesBySubject from "@/app/actions/getCoursesBySubject";
import getCurrentTeacher from "@/app/actions/getCurrentTeacher";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import CourseCard from "@/app/components/cards/CourseCard";

interface IParams {
  subjectName?: string;
}

const SubjectPage = async ({ params } : { params: IParams }) => {
    const currentUser = await getCurrentUser();
    const currentTeacher = await getCurrentTeacher();
    let courses;
    try{
      courses = await getCoursesBySubject(params);
    }catch(e){
      return (
        <EmptyState
        title="Subject not found"
        subtitle="Please check the URL or try again later"
        />
      )
    }
    if (courses.length === 0) {
      return (
        <Container>
          <h1 className="text-2xl font-semibold text-center pt-16">
            {params.subjectName?.replace(/_/g, " ")}
          </h1>
          <hr className="my-4" />
          {/* <Heading title={params.subjectName?.replace(/_/g, " ") || "This course does not exists"} />  */}
          <EmptyState
          title="No courses found"
          subtitle="There is no course for this subject yet."
          />
        </Container>        
      );
    }
    return (
        <Container>
          <h1 className="text-2xl font-semibold text-center pt-16">
            {params.subjectName?.replace(/_/g, " ")}
          </h1>
          <hr className="my-4" />
          <div className="
          pt-3
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
          justify-items-center
          ">
            {courses.map((course) => {
              return (
                <CourseCard
                currentUser={currentUser}
                currentTeacher={currentTeacher}
                key={course.id}
                data={course}
                />
              )}
            )}
          </div>
        </Container>
        )
    
}

export default SubjectPage;