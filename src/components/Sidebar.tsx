
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Camera, 
  Calendar,
  Save,
  Trash2,
  Database,
  DatabaseBackup,
  DatabaseZap
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const userNavItems = [
    { to: '/dashboard', icon: DatabaseZap, label: 'Dashboard' },
    { to: '/capture', icon: Camera, label: 'Capture & Analyze' },
    { to: '/history', icon: Calendar, label: 'History' },
    { to: '/saved', icon: Save, label: 'Saved Detections' },
  ];

  const adminNavItems = [
    { to: '/admin/dashboard', icon: Database, label: 'Admin Dashboard' },
    { to: '/admin/users', icon: DatabaseBackup, label: 'User Management' },
    { to: '/admin/analytics', icon: DatabaseZap, label: 'Analytics' },
    { to: '/capture', icon: Camera, label: 'Capture & Analyze' },
    { to: '/history', icon: Calendar, label: 'History' },
  ];

  const navItems = user?.role === 'admin' ? adminNavItems : userNavItems;

  return (
    <aside className="w-64 bg-white shadow-lg border-r border-gray-200 min-h-screen">
      <div className="p-4">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-blue-50 hover:text-green-700 transition-all duration-200',
                  isActive && 'bg-gradient-to-r from-green-100 to-blue-100 text-green-700 font-medium'
                )
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
