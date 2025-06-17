import { useAtom } from 'jotai';
import { userAtom } from '../../atoms/authAtom';
import { likePost } from '../../services/postsAPI';

const PostItem = ({ post }) => {
    const [currentUser] = useAtom(userAtom);
    const isLiked = post.attributes.likes?.data.some(
        (user) => user.id === currentUser?.id
    );

    const handleLike = async () => {
        if (!currentUser) return;
        try {
            await likePost(post.id);
            // Mettre à jour l'état global serait géré dans PostList
        } catch (error) {
            console.error('Like error:', error);
        }
    };

    return (
        <div className="post-card">
            <div className="post-header">
                {console.log(post)}
                <span className="post-username">{post.attributes.author?.data?.attributes?.username || 'Utilisateur inconnu'}</span>
            </div>

            <div className="post-content">
                {post.attributes.text}
            </div>

            <div className="post-actions">
                <button
                    onClick={handleLike}
                    className={`like-button ${isLiked ? 'liked' : ''}`}
                >
                    {isLiked ? 'Unlike' : 'Like'} ({post.attributes.likes?.data.length || 0})
                </button>
            </div>
        </div>
    );
};

export default PostItem;