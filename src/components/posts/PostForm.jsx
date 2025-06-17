import { useState } from 'react'
import { useAtom } from 'jotai'
import { userAtom } from '../../store/atoms'

const PostForm = ({ onSubmit, loading }) => {
    const [content, setContent] = useState('')
    const [currentUser] = useAtom(userAtom)

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({ content, user: currentUser.id })
        setContent('')
    }

    return (
        <div className="bg-white p-4 rounded shadow mb-6">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="What's on your mind?"
                        rows="3"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                >
                    {loading ? 'Posting...' : 'Post'}
                </button>
            </form>
        </div>
    )
}

export default PostForm