import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
    const [formData, setFormData] = useState({});
    // const [errorMessage, setErrorMessage] = useState(null);
    // const [loading, setLoading] = useState(false);
    const { loading, error: errorMessage } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        // console.log(e.target.value);
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    // console.log(formData);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            // return setErrorMessage("모든 영역을 채워주세요!");
            return dispatch(signInFailure("모든 영역을 채워주세요!"));
        }

        try {
            // setLoading(true);
            // setErrorMessage(null);
            dispatch(signInStart());

            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (data.success === false) {
                // return setErrorMessage(data.message);
                dispatch(signInFailure(data.message));
            }
            // setLoading(false);

            if (res.ok) {
                dispatch(signInSuccess(data));
                navigate("/");
            }
        } catch (error) {
            // setErrorMessage(error.message);
            // setLoading(false);
            dispatch(signInFailure(errorMessage));
        }
    };

    return (
        <div className="min-h-screen mt-20">
            <div className="max-w-md mx-auto">
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <div className="flex items-center mb-2">
                        <label className="w-32" htmlFor="email">
                            이메일
                        </label>
                        <input
                            type="email"
                            placeholder="name@mail.com"
                            id="email"
                            className="w-full p-3 border"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center">
                        <label className="w-32" htmlFor="password">
                            패스워드
                        </label>
                        <input
                            type="password"
                            placeholder="password"
                            id="password"
                            className="w-full p-3 border"
                            onChange={handleChange}
                        />
                    </div>
                    {errorMessage && <div className="mt-5 text-red-500">{errorMessage}</div>}

                    <button type="submit" className="p-3 mt-3 border bg-slate-200" disabled={loading}>
                        {loading ? (
                            <>
                                <span className="pl-3">Loading...</span>
                            </>
                        ) : (
                            "로그인"
                        )}
                    </button>
                    <OAuth />
                </form>

                <div className="flex justify-center mt-10">
                    <span className="mr-2">계정이 없나요? </span>
                    <Link to="/sign-up" className="text-violet-500">
                        회원가입하기
                    </Link>
                </div>
            </div>
        </div>
    );
}
