import { useAtom } from 'jotai'
import { userAtom } from '../../store/atoms'

const PostCard = ({ post }) => {
    const [currentUser] = useAtom(userAtom)

    return (
        <div className="bg-white p-4 rounded shadow">
            <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                <span className="font-semibold">
                    {post.attributes.user?.data?.attributes?.username || 'Anonymous'}
                </span>
                {currentUser?.id === post.attributes.user?.data?.id && (
                    <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        You
                    </span>
                )}
            </div>
            <p className="mb-2">{post.attributes.content}</p>
            <div className="text-sm text-gray-500">
                {new Date(post.attributes.createdAt).toLocaleString()}
            </div>
        </div>
    )
}

export default PostCard