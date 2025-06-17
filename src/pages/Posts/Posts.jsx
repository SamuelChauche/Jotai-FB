import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../store/postsReducer'
import { atom, useAtom } from 'jotai'
import PostList from '../../components/posts/PostList'



const filterAtom = atom('')

const Posts = () => {
    const dispatch = useDispatch()
    const { posts, loading, error } = useSelector((state) => state.posts)
    const [filter, setFilter] = useAtom(filterAtom)

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])

    const filteredPosts = posts.filter((post) =>
        post.attributes.content.toLowerCase().includes(filter.toLowerCase())
    )

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Filter posts..."
                    className="w-full p-2 border rounded"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>
            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error.message}</div>}
            <PostList posts={filteredPosts} />
        </div>
    )
}

export default Posts