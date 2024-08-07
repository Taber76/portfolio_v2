import { Link } from 'react-router-dom';
import { BsPersonWorkspace } from "react-icons/bs";

import { NavMobile } from '../nav-mobile';
import { NavDesktop } from '../nav-desktop';
import { useMediaQuery } from 'react-responsive';


export const NavBar = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <header className="bg-blue-500 py-1 md:py-2">
      <div className="flex items-center justify-between px-4 md:px-6">

        <Link className="flex items-center space-x-2" to="/">
          <BsPersonWorkspace className="h-5 w-5 text-gray-400" />
          <span className="font-semibold text-gray-400">Tabaré Bermúdez</span>
        </Link>

        {/* Renderiza NavMobile si el dispositivo es móvil, de lo contrario, renderiza NavDesktop */}
        {isMobile ?
          <div className='flex items-center z-10'>
            {/* Botón de login */}
            <div className="md:flex items-center">
              <button
                onClick={() => console.log('Login')}
              />
            </div>
            <NavMobile />
          </div>
          :
          <div className='flex items-center'>
            <NavDesktop />
            {/* Botón de login */}
            <div className="md:flex items-center ml-4">
              <Link to="/Login">
                <button
                  onClick={() => console.log('Login')}
                />
              </Link>
            </div>
          </div>
        }

      </div>
    </header>
  );
};


