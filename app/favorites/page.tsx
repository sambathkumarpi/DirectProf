import getCurrentUser from "../actions/getCurrentUser";
import getFavorites from "../actions/getFavorites";
import getSubjectById from "../actions/getSubjectById";
import getTeacherById from "../actions/getTeacherById";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import NotLoggedIn from "../components/NotLoggedIn";
import FavoritesView from "./FavoritesView";

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
        <FavoritesView
        favorites={favorites}
        currentUser={currentUser}
        subjects={subjects}
        teachers={teachers}
        />
    );
}

export default FavoritesPage;