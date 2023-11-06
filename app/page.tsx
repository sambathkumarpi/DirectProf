import getCurrentUser from "./actions/getCurrentUser";
import getSubjects from "./actions/getSubjects";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import SubjectCard from "./components/cards/SubjectCard";

export default async function Home() {
  const subject = await getSubjects();
  const currentUser = await getCurrentUser();

  if(subject.length === 0) {
      return <EmptyState showReset />
  }

  return (
    <Container>
      <h1 className="text-2xl font-semibold text-center pt-16">
        Subjects
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
        {subject.map((subject) => {
          return (
            <SubjectCard
            currentUser={currentUser}
            key={subject.id}
            data={subject}
            />
          )}
        )}
      </div>
    </Container>
    )
}
