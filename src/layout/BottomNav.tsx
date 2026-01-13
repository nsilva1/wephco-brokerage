import { navItems } from '../lib/constants'
import { Link } from 'react-router-dom'

const BottomNav = () => {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 z-20 flex h-16 w-full items-center justify-around border-t border-stone-200 bg-white px-4 pb-safe">
        {navItems.map((item, idx) => (
          <Link
            key={idx}
            to={item.path}
            className="flex flex-col items-center justify-center text-stone-500 hover:text-[#7a3a1e]"
          >
            {<item.icon />}
            <span className="text-[10px] mt-1 uppercase font-semibold tracking-wider">
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
  )
}

export { BottomNav }