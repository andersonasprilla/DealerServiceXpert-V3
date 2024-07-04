import { navigation, teams } from '../../utils/constants' // Import navigation and teams arrays from the constants file
import { Cog6ToothIcon } from '@heroicons/react/24/outline' 

// Utility function to join class names
function classNames(...classes) {
  return classes.filter(Boolean).join(' ') 
}

// Sidebar component
const Sidebar = () => {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col"> {/* Fixed sidebar for large screens */}
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4"> {/* Sidebar container */}
        <div className="flex h-16 shrink-0 items-center"> {/* Logo container */}
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />
        </div>
        <nav className="flex flex-1 flex-col"> {/* Navigation container */}
          <ul role="list" className="flex flex-1 flex-col gap-y-7"> {/* Main list container */}
            <li>
              <ul role="list" className="-mx-2 space-y-1"> {/* Navigation items */}
                {navigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                      )}
                    >
                      <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" /> {/* Icon for navigation item */}
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div> {/* Teams section title */}
              <ul role="list" className="-mx-2 mt-2 space-y-1"> {/* Teams items */}
                {teams.map((team) => (
                  <li key={team.name}>
                    <a
                      href={team.href}
                      className={classNames(
                        team.current
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                      )}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                        {team.initial} {/* Initials for the team */}
                      </span>
                      <span className="truncate">{team.name}</span> {/* Team name */}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            <li className="mt-auto"> {/* Settings item positioned at the bottom */}
              <a
                href="#"
                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                <Cog6ToothIcon className="h-6 w-6 shrink-0" aria-hidden="true" /> {/* Settings icon */}
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
