import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        // console.log(e.target.value);
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    // console.log(formData);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.username || !formData.email || !formData.password) {
            return setErrorMessage("모든 영역을 채워주세요!");
        }

        try {
            setLoading(true);
            setErrorMessage(null);

            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (data.success === false) {
                return setErrorMessage(data.message);
            }
            setLoading(false);

            if (res.ok) {
                alert("회원가입이 완료되었습니다!");
                navigate("/sign-in");
            }
        } catch (error) {
            setErrorMessage(error.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen mt-20">
            <div className="max-w-md mx-auto">
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <div className="flex items-center mb-2">
                        <label className="w-32" htmlFor="username">
                            이름
                        </label>
                        <input
                            type="text"
                            placeholder="username"
                            id="username"
                            className="w-full p-3 border"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center mb-2">
                        <label className="w-32" htmlFor="email">
                            이메일
                        </label>
                        <input
                            type="email"
                            placeholder="email"
                            id="email"
                            className="w-full p-3 border"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center mb-2">
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
                            "회원가입하기"
                        )}
                    </button>
                    <OAuth />
                </form>

                <div className="flex justify-center mt-10">
                    <span className="mr-2">계정이 있나요? </span>
                    <Link to="/sign-in" className="text-blue-500">
                        로그인하기
                    </Link>
                </div>
            </div>
        </div>
    );
}
