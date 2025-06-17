import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import { userPostsAtom } from '../store/atoms'
// import { getMe } from '../api/auth'
import { fetchUserPosts } from '../api/users'
import { loadUser } from '../store/authReducer' // Modifié ici

const Profile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)
    const [userPosts, setUserPosts] = useAtom(userPostsAtom)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Utilisez directement le thunk loadUser qui gère déjà la récupération des données
                await dispatch(loadUser()).unwrap();

                // Si vous avez besoin de posts spécifiques à l'utilisateur
                if (user?.id) {
                    const posts = await fetchUserPosts(user.id);
                    setUserPosts(posts);
                }
            } catch (err) {
                console.error("Failed to load profile data:", err);
                navigate('/login');
            }
        };

        fetchData();
    }, [dispatch, navigate, user?.id, setUserPosts]);

    if (!user) {
        return <div className="text-center py-8">Loading profile...</div>
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="p-6 bg-white rounded shadow mb-6">
                <h2 className="text-2xl font-bold mb-6">Profile</h2>
                <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
                    <div>
                        <h3 className="text-xl font-semibold">{user.username}</h3>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold">Account Information</h4>
                        <p>Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>

            <h3 className="text-xl font-semibold mb-4">Your Posts</h3>
            {userPosts.length > 0 ? (
                <PostsList posts={userPosts} />
            ) : (
                <p className="text-gray-500">You haven't posted anything yet.</p>
            )}
        </div>
    )
}

export default Profile