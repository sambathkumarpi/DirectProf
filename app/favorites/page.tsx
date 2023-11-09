import getCurrentUser from "../actions/getCurrentUser";
import getFavorites from "../actions/getFavorites";
import getSubjectById from "../actions/getSubjectById";
import getTeacherById from "../actions/getTeacherById";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import Heading from "../components/Heading";
import NotLoggedIn from "../components/NotLoggedIn";
import CourseCard from "../components/cards/CourseCard";
import TeacherDashboardTable from "../teacherDashboard/TeacherDashboard";
import FavoritesTable from "./FavoritesTable";

const FavoritesPage = async () => {
    const favorites = await getFavorites();
    const currentUser = await getCurrentUser();
    let subjects = []
    let teachers = []
    for(let i = 0; i < favorites.length; i++) {
        subjects[i] = (await getSubjectById({ subjectId: favorites[i].subjectId })).name;
        teachers[i] = (await getTeacherById({ teacherId: favorites[i].teacherId })).name;
    }


    if(!currentUser) return (<NotLoggedIn />);
    
    if(favorites.length === 0){
        return (
            <div className="p-20">
                <EmptyState
                title="No favorites yet"
                subtitle="You can add your favorite subjects by clicking the heart icon on the subject card."
                noHeight
                />
            </div>
        );
    }

    return (
        <Container>
            <div className="p-6"></div>
            <Heading title="My Favorites" />
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
            {favorites.map((favorite) => (
                    <CourseCard
                    data={favorite}
                    currentUser={currentUser}
                    />
                ))}
            
            </div>
            <hr className="my-4" />
            <FavoritesTable
            currentUser={currentUser}
            courses={favorites}
            teachers={teachers}
            subjects={subjects}
            />

        </Container>
    );
}

export default FavoritesPage;