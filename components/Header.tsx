import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <header className="flex flex-row justify-between items-center py-5 ">
            <h1 className="text-2xl font-bold">image uploader</h1>
            {user ? (
                <div className="flex items-center gap-5">
                    <span>{user.displayName}</span>
                    <button
                        className="px-3 py-1.5 bg-red-500 text-white rounded-xl hover:bg-red-700"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <></>
            )}
        </header>
    );
};

export default Header;
