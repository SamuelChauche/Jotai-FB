import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { postsAtom } from '../../atoms/posts';
import PostItem from './PostItem';
import { api } from '../../services/api';

const UserPostList = ({ userId }) => {
    const [posts, setPosts] = useAtom(postsAtom);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await api.get(`/posts?filters[user][id]=${userId}&populate=*`);
                setPosts(response.data.data);
            } catch (error) {
                console.error('Error fetching user posts:', error);
            }
        };

        fetchUserPosts();
    }, [userId, setPosts]);

    return (
        <div className="user-post-list">
            {posts.map((post) => (
                <PostItem key={post.id} post={post} />
            ))}
        </div>
    );
};

export default UserPostList;