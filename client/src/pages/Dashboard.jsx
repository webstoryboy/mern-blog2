import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";

export default function Dashboard() {
    return (
        <div className="flex mx-auto max-w-7xl">
            <div className="min-h-screen border-r w-60">
                <DashSidebar />
            </div>
            <div className="w-full">
                <DashProfile />
            </div>
        </div>
    );
}
