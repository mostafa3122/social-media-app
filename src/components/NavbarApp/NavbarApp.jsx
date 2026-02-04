
import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext/UserContext";

function NavbarApp() {
  const { token, setToken, userData,setUserData } = useContext(UserContext)
  let navigate = useNavigate()
  function handleSignOut() {
    localStorage.removeItem("token")
    setToken(null)
    setUserData(null)
    navigate("/login")
  }
  return (
    <Navbar className="container shadow-md">
      <NavbarBrand as={Link} to="/">
        <span className="self-center whitespace-nowrap text-xl text-sky-600 font-bold dark:text-white">Social app</span>
      </NavbarBrand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            userData?
            <Avatar className="cursor-pointer" alt="User settings" img={"https://linked-posts.routemisr.com/uploads/default-profile.png"} rounded />

          :
          <Avatar className="cursor-pointer" alt="User settings" img={"https://linked-posts.routemisr.com/uploads/default-profile.png"} rounded />

          }
        >
          {userData &&
            <DropdownHeader>

              <span className="block text-sm">{userData.name}</span>
              <span className="block truncate text-sm font-medium">{userData.email}</span>
            </DropdownHeader>}
          {
            !token ?
              <>
                <DropdownItem as={Link} to={'register'} >Register</DropdownItem>
                <DropdownItem as={Link} to={'/'} >Login</DropdownItem>

              </>
              :
              <>
                <DropdownItem as={Link} to={'profile'} >Profile</DropdownItem><DropdownDivider />
                <DropdownItem  as="button" onClick={handleSignOut}>Sign out</DropdownItem>

              </>

          }
        </Dropdown>
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        {
          token && <>
           
            <NavbarLink as={NavLink} to='/posts'>Posts</NavbarLink>
          </>
        }


      </NavbarCollapse>
    </Navbar>
  );
}


export default NavbarApp