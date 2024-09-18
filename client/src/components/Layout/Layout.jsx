import { useState } from 'react'; 
import Navbar from '../Navbar/Navbar'; 
import Sidebar from '../Sidebar/Sidebar'; 
import MobileSidebar from '../MobileSidebar/MobileSidebar'; 
import OpenROs from '../OpenROs/OpenROs';
// Layout component that wraps around the main content
const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false); // State to control the visibility of the mobile sidebar

    return (
        <>
            {/* Mobile sidebar, controlled by sidebarOpen state */}
            <MobileSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
            {/* Sidebar for larger screens */}
            <Sidebar />
            {/* Main content area with padding for the sidebar */}
            <div className="lg:pl-72">
                {/* Navbar with a button to toggle the mobile sidebar */}
                
                <Navbar setSidebarOpen={setSidebarOpen} />
                
                <OpenROs/>
                <main className="py-10">
                    <div className="px-4 sm:px-6 lg:px-8">
                        {children} {/* Content passed as children */}
                    </div>
                </main>
            </div>
        </>
    );
};

export default Layout;  
