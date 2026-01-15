import { navItems } from '../lib/constants'
import { NavLink } from 'react-router-dom'

const BottomNav = () => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 z-20 flex h-16 w-full items-center justify-around border-t border-stone-200 bg-white px-4 pb-safe">
        {navItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
            `flex flex-col items-center justify-center ${
              isActive ? 'text-white bg-primary rounded-full p-3' : 'text-stone-500'
            }`
          }
          >
            {<item.icon />}
          </NavLink>
        ))}
      </nav>
  )
}

export { BottomNav }