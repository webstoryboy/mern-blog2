import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function DashUsers() {
    const { currentUser } = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`/api/user/getusers`);
                const data = await res.json();
                console.log(data);

                if (res.ok) {
                    setUsers(data.users);
                    if (data.users.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchUsers();
    }, [currentUser._id]);

    const handleShowMore = async () => {
        const startIndex = users.length;

        try {
            const res = await fetch(`/api/user/getusers?&startIndex=${startIndex}`);
            const data = await res.json();

            if (res.ok) {
                setUsers((prev) => [...prev, ...data.users]);
                if (data.users.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleDeleteUser = async () => {
        try {
            const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
                method: "DELETE",
            });
            const data = await res.json();

            if (res.ok) {
                setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
                setShowModal(false);
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="relative pl-5">
            {currentUser.isAdmin && users.length > 0 ? (
                <>
                    <table className="w-full">
                        <caption className="mb-5 text-3xl mt-7">Blog Users</caption>
                        <thead>
                            <tr>
                                <th className="p-2 bg-gray-300 border">data Created</th>
                                <th className="p-2 bg-gray-300 border">User image</th>
                                <th className="p-2 bg-gray-300 border">username</th>
                                <th className="p-2 bg-gray-300 border">useremail</th>
                                <th className="p-2 bg-gray-300 border">Amdin</th>
                                <th className="p-2 bg-gray-300 border">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index} className="transition-all hover:bg-gray-200">
                                    <td className="p-2 border">{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td className="p-2 border">
                                        <img
                                            src={user.profilePicture}
                                            alt={user.username}
                                            className="object-cover w-10 h-10 mx-auto"
                                        />
                                    </td>
                                    <td className="p-2 border">{user.username}</td>
                                    <td className="p-2 border">{user.email}</td>
                                    <td className="p-2 text-center border">
                                        {user.isAdmin ? (
                                            <FaCheck className="text-green-500" />
                                        ) : (
                                            <FaTimes className="text-red-500" />
                                        )}
                                    </td>
                                    <td className="p-2 text-center border">
                                        <span
                                            className="text-red-500 cursor-pointer hover:underline"
                                            onClick={() => {
                                                setShowModal(true);
                                                setUserIdToDelete(user._id);
                                            }}
                                        >
                                            delete
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {showMore && (
                        <button
                            onClick={handleShowMore}
                            className="w-full p-3 mt-5 text-sm text-teal-800 transition-all border hover:bg-gray-300"
                        >
                            더 보기
                        </button>
                    )}
                </>
            ) : (
                <p>아직 회원이 없습니다.!</p>
            )}

            {showModal && (
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-35">
                    <div className="absolute w-1/3 p-10 transform -translate-x-1/2 -translate-y-1/2 bg-white top-1/2 left-1/2">
                        <h3 className="mb-3">게시글을 정말 삭제하겠습니까?</h3>
                        <button className="px-4 mr-1 text-white bg-red-500" onClick={handleDeleteUser}>
                            Yes
                        </button>
                        <button className="px-4 text-white bg-gray-500" onClick={() => setShowModal(false)}>
                            No
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
