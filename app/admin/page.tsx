import Container from '../components/Container';
import EmptyState from '../components/EmptyState';

export default function AdminPage() {
    return (
        <Container>
            <h1 className="text-2xl font-semibold text-center pt-16">
                Subjects
            </h1>
            <hr className="my-4" />
            <EmptyState
            title='Not available yet'
            subtitle='Come back later'
            returnMenu
            />
        </Container>
    );
};
