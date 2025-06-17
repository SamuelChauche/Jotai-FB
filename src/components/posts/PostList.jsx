import PostCard from './PostCard'

const PostsList = ({ posts }) => {
    return (
        <div className="space-y-4">
            {posts.length === 0 ? (
                <div className="text-center py-4">No posts found</div>
            ) : (
                posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))
            )}
        </div>
    )
}

export default PostsList