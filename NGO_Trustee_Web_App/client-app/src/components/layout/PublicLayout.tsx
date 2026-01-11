import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const PublicLayout = () => {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            {/* Main Content */}
            <main className="min-h-screen">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default PublicLayout;
