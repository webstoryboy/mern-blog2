import moment from "moment";
import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Comment({ comment, onLike, onEdit }) {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);

    const { currentUser } = useSelector((state) => state.user);
    console.log(user);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`);
                const data = await res.json();
                if (res.ok) {
                    setUser(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        getUser();
    }, [comment]);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedContent(comment.content);
    };

    const handleSave = async () => {
        try {
            const res = await fetch(`/api/comment/editComment/${comment._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: editedContent,
                }),
            });
            if (res.ok) {
                setIsEditing(false);
                onEdit(comment, editedContent);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div>
            <div className="flex p-4 text-sm dark:border-gray-600">
                <div className="flex-shrink-0 mr-3">
                    <img className="w-10 h-10 bg-gray-200 rounded-full" src={user.profilePicture} alt={user.username} />
                </div>
                <div>
                    {user ? `@${user.username}` : "anonymouse user"}
                    <span className="ml-4 text-gray-400">{moment(comment.createdAt).fromNow()}</span>
                </div>

                {isEditing ? (
                    <>
                        <textarea
                            className="mb-2 bg-slate-200"
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                        />
                        <div>
                            <button onClick={handleSave}>저장</button>
                            <button onClick={() => setIsEditing(false)}>취소</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="ml-4">
                            <button
                                onClick={() => onLike(comment._id)}
                                className={`text-gray-400 hover:text-blue-500 ${
                                    currentUser && comment.likes.includes(currentUser._id) && "!text-blue-500"
                                }`}
                            >
                                <FaThumbsUp />
                            </button>
                            <p>
                                {comment.numberOfLikes > 0 &&
                                    comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? "like" : "likes")}
                            </p>
                            {currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                                <>
                                    <button onClick={handleEdit}>수정</button>
                                    <button onClick={() => onDelete(comment._id)}>삭제</button>
                                </>
                            )}
                        </div>
                        <div className="px-3 py-1 mb-5 bg-gray-100 rounded-3xl">{comment.content}</div>
                    </>
                )}
            </div>
        </div>
    );
}
