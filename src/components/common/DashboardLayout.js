import { useSelector } from "react-redux"; 
import CommonDropDown from "./CommonDropDown";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { logOut } from "../../utills/common";
import { useEffect, useState } from "react";
export const DashboardLayout = ({ children }) => {
    const userData = useSelector(state => state.globalState.user);
    const navigateTo = useNavigate();
    const pathData = useLocation()
    const [activeTab, setActiveTab] = useState("")
    const optionList = [
        { title: "Reset Password", action: () => navigateTo('/resetPassword') },
        { title: "Log Out", action: logOut },
    ]

    useEffect(() => {
        let activeTabSlug = ''
        const pathname = pathData.pathname
        if (pathname.includes('studentList')) {
            activeTabSlug = 'studentList'
        } else if (pathname.includes('examList')) {
            activeTabSlug = 'examList'
        } else if (pathname.includes('applyExam')) {
            activeTabSlug = 'applyExam'
        } 
        setActiveTab(activeTabSlug) 
    }, [pathData])
    return (
        <div style={{ height: '100vh', display: 'flex' }} className="content-body"  >

            {/* Main Content Area */}
            <div style={{ flex: 1 }}>
                {/* Navbar */}
                <nav
                    className='navbar navbar-light d-flex justify-content-end'
                    style={{ background: '#18283b' }}
                >
                    <div className="navbar-content">
                        <div className="navbar-item-list">
                            {
                                userData?.role === 'teacher' &&
                                <>
                                    <Link to={'/examList'}><span className={activeTab == "examList" ? "active" : ""}>Exam list</span> </Link>
                                    <Link to={'/studentList'}><span className={activeTab == "studentList" ? "active" : ""}>Student list</span> </Link>
                                </> 
                            }
                            {
                                userData?.role === 'student' &&
                                <Link to={'/applyExam'}><span className={activeTab == "applyExam" ? "active" : ""}>Apply for exam</span> </Link>
                            }  
                        </div>

                        <div className='navbar-brand'  > 
                            <CommonDropDown
                                childElement={
                                    <span style={{ textTransform: 'capitalize' }}>{`${userData.name}`}</span>
                                }
                                optionList={optionList}
                            />
                        </div>
                    </div> 
                </nav>

                {/* Content */}
                <main style={{ padding: '1rem' }}>{children}</main>

            </div>
        </div>
    );
};