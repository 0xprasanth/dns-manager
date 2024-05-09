import React from 'react'
import { useQueryClient } from "@tanstack/react-query"
import { useAuthContext } from '../hooks/useAuthContext';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

import '../index.css'
// import { ReactComponent as Power} from '../assets/power.svg'

const Header = () => {

    const queryClient = useQueryClient();
    const { handleLoggedIn } = useAuthContext();
    const navigate = useNavigate();
    
    // logic for logout
    const handleLogout = () => {
        queryClient.clear();

        // clear cookies
        Cookies.remove("token");

        handleLoggedIn(false);

        toast.success("Logged out successfully");

        // redirect to login page
        navigate("/login");
    }

  return (
    <header className="header">
        <Breadcrumb className='hidden md:flex' style={{marginTop: "20px"}}>
            <BreadcrumbItem href="#" tag='a'>
                Dashboard
            </BreadcrumbItem>
            <BreadcrumbItem tag='span' active>
                Manage DNS
            </BreadcrumbItem>
        </Breadcrumb>

        <div className="flex gap-4 items-center">
            <UncontrolledDropdown>
                <DropdownToggle color='white' >
                    {/* <Power /> */}
                    <img
                     src='https://raw.githubusercontent.com/ptech12/dns-manager/main/src/assets/power.svg'
                     width={30}
                     height={30}
                     alt='logout-svg'
                     className="overflow-hidden object-cover round full"
                     />
                </DropdownToggle>
                <DropdownMenu dark>
                    <DropdownItem onClick={handleLogout}>
                        Logout
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>

        </div>
    </header>
  )
}

export default Header;