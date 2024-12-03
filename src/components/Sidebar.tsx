import { Home, Users, BarChart2, Mail, Settings, HelpCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  
  const links = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: Users, path: '/users', label: 'Users' },
    { icon: BarChart2, path: '/stats', label: 'Statistics' },
    { icon: Mail, path: '/messages', label: 'Messages' },
    { icon: Settings, path: '/settings', label: 'Settings' },
    { icon: HelpCircle, path: '/help', label: 'Help' },
  ];

  return (
    <aside className="fixed bottom-0 left-0 right-0 md:right-auto md:top-0 md:bottom-0 md:w-16 bg-white border-t md:border-t-0 md:border-r border-gray-200 md:pt-20 z-40">
      <nav className="flex md:flex-col items-center justify-around md:justify-start md:space-y-8 h-16 md:h-auto">
        {links.map(({ icon: Icon, path, label }) => (
          <Link
            key={path}
            to={path}
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              location.pathname === path ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Icon className="w-5 h-5" />
          </Link>
        ))}
      </nav>
    </aside>
  );
}