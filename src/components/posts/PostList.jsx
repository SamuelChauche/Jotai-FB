import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { postsAtom } from '../../atoms/postsAtom';
import PostItem from './PostItem';
import { fetchPosts } from '../../services/postsAPI';

const PostList = () => {
    const [posts, setPosts] = useAtom(postsAtom);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const postsData = await fetchPosts();
                setPosts(postsData);
            } catch (error) {
                console.error('Failed to load posts:', error);
            }
        };

        loadPosts();
    }, [setPosts]);

    return (
        <div className="post-list">
            {posts.map((post) => (
                <PostItem key={post.created_at} post={post} />
            ))}
        </div>
    );
};

export default PostList;