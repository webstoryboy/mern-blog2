import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComments";

export default function Dashboard() {
    const location = useLocation();
    const [tab, setTab] = useState("");

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get("tab");
        // console.log(tabFromUrl);
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

    return (
        <div className="flex mx-auto max-w-7xl">
            <div className="min-h-screen border-r w-60">
                <DashSidebar />
            </div>
            <div className="w-full">
                {tab === "profile" && <DashProfile />}
                {tab === "posts" && <DashPosts />}
                {tab === "users" && <DashUsers />}
                {tab === "comments" && <DashComments />}
            </div>
        </div>
    );
}
