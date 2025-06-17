import { useState } from 'react';
import { useSetAtom, useAtomValue } from 'jotai';
import { postsAtom } from '../../atoms/postsAtom';
import { createPost } from '../../services/postsAPI';
import { userAtom } from '../../atoms/authAtom';

const CreatePost = () => {
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const setPosts = useSetAtom(postsAtom);
    const user = useAtomValue(userAtom);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) {
            setError('Le contenu ne peut pas être vide');
            return;
        }

        try {
            const post = await createPost(content, user.id);
            setPosts((prev) => [post, ...prev]);
            setContent('');
            setError('');
        } catch (err) {
            console.log(err)
            setError('Erreur lors de la création du post');
        }
    };

    return (
        <div className="create-post">
            <form onSubmit={handleSubmit} className="post-form">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Quoi de neuf ?"
                    className="post-input"
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="submit-button">Publier</button>
            </form>
        </div>
    );
};

export default CreatePost;