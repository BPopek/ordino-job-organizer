import React, { useContext} from 'react';
import { Link } from 'react-router-dom';
import { JobContext } from './JobProvider';
import ordino from './Images/ordino.png';

function Navbar(props){
    const { logout, token } = useContext(JobContext)

    return(
        <nav className='nav'>
            {
                !token ? 
                <>
                    <div className='navLink'>
                    <img src={ordino} className='navLogo' alt='logo'/>
                        <Link to='/signup' className='navLink'>Sign Up</Link>
                    </div>
                    <div className='navLink'>
                        <Link to='/login' className='navLink'>Log In</Link>
                    </div>
                </>
                :
                <>
                    <img src={ordino} className='navLogo' alt='logo'/>
                    <div className='navLink'>
                        <Link to='/jobs' className='navLink'>My Job List</Link>
                    </div>
                    <div className='navLink'>
                        <button onClick={() => logout()} className='logoutButton'>Log Out</button>
                    </div>
                </>
            }
        </nav>
    )
}

export default Navbar;