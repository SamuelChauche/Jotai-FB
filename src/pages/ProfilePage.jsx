import { useParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/authAtom';
import { useEffect, useState } from 'react';
import { api } from '../services/api';
import PostList from '../components/posts/PostList';

const ProfilePage = () => {
    const { userId } = useParams();
    const [currentUser] = useAtom(userAtom);
    const [profileUser, setProfileUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // Fetch user data
                const userResponse = await api.get(`/users/${userId}?populate=*`);
                setProfileUser(userResponse.data);

                // Fetch user's posts
                const postsResponse = await api.get(`/posts?filters[user][id]=${userId}&populate=*`);
                setPosts(postsResponse.data.data);

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setIsLoading(false);
            }
        };

        fetchProfileData();
    }, [userId]);

    if (isLoading) {
        return <div className="profile-page loading">Chargement...</div>;
    }

    if (!profileUser) {
        return <div className="profile-page error">Utilisateur non trouvé</div>;
    }

    return (
        <div className="profile-page">
            <div className="profile-header">
                <div className="profile-avatar">
                    {profileUser.username.charAt(0).toUpperCase()}
                </div>
                <div className="profile-info">
                    <h1 className="profile-username">{profileUser.username}</h1>
                    <p className="profile-email">{profileUser.email}</p>
                    {currentUser?.id === parseInt(userId) && (
                        <button className="edit-profile-button">Modifier le profil</button>
                    )}
                </div>
            </div>

            <div className="profile-stats">
                <div className="stat-item">
                    <span className="stat-count">{posts.length}</span>
                    <span className="stat-label">Publications</span>
                </div>
            </div>

            <div className="profile-posts">
                <h2 className="posts-title">Publications</h2>
                <PostList posts={posts} />
            </div>
        </div>
    );
};

export default ProfilePage;