import InputURL  from "./components/Input";

const Dashboard = () => {
    return <>
        <div className="flex flex-col items-center justify-center h-screen bg-purple-950 text-white">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <InputURL />
        </div>
    </>
}

export default Dashboard;