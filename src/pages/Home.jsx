import { useAtom } from 'jotai';
import { isAuthenticatedAtom } from '../atoms/authAtom';
import CreatePost from '../components/posts/CreatePost';
import PostList from '../components/posts/PostList';

const Home = () => {
    const [isAuthenticated] = useAtom(isAuthenticatedAtom);

    return (
        <div className="home-page">
            <h1 className="page-title">Fil d'actualité</h1>

            {isAuthenticated && <CreatePost />}

            <PostList />
        </div>
    );
};

export default Home;