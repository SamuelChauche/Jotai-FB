import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PostForm from '../../components/posts/PostForm'
import { addPost } from '../../store/postsReducer'

const CreatePost = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error } = useSelector((state) => state.posts)
    const { isAuthenticated } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated, navigate])

    const handleSubmit = async (postData) => {
        const result = await dispatch(addPost(postData))
        if (result.meta.requestStatus === 'fulfilled') {
            navigate('/posts')
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Create New Post</h2>
            {error && <div className="text-red-500 mb-4">{error.message}</div>}
            <PostForm onSubmit={handleSubmit} loading={loading} />
        </div>
    )
}

export default CreatePost