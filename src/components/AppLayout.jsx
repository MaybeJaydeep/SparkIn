// src/components/AppLayout.jsx
import React, { useState, useContext } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import {
  HomeIcon,
  PlusCircleIcon,
  UserIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const navItems = [
    {
      key: '/',
      icon: <HomeIcon className="w-5 h-5" />,
      label: 'Home',
      path: '/'
    },
    {
      key: '/new',
      icon: <PlusCircleIcon className="w-5 h-5" />,
      label: 'Create Post',
      path: '/new'
    },
    {
      key: '/author',
      icon: <UserIcon className="w-5 h-5" />,
      label: 'Author Profile',
      path: user ? `/author/${user.username}` : '/login'
    },
    {
      key: '/profile/edit',
      icon: <Cog6ToothIcon className="w-5 h-5" />,
      label: 'Edit Profile',
      path: user ? `/profile/${user.username}/edit` : '/login'
    },
    {
      key: '/admin',
      icon: <ChartBarIcon className="w-5 h-5" />,
      label: 'Admin Dashboard',
      path: '/admin'
    }
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-800">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <BookOpenIcon className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">⚡ SparkIn</span>
        </Link>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 border-r border-gray-800 shadow-xl z-30 transition-transform duration-300 transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <Link to="/" className="flex items-center gap-2" onClick={closeSidebar}>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpenIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">⚡ SparkIn</span>
          </Link>
          <button
            onClick={closeSidebar}
            className="p-1 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors lg:hidden"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          {user && (
            <div className="mb-6 p-3 bg-gray-800/50 rounded-xl border border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {user.username?.charAt(0)?.toUpperCase() || '?'}
                  </span>
                </div>
                <div>
                  <div className="text-white font-medium">{user.username}</div>
                  <div className="text-gray-400 text-xs">Logged in</div>
                </div>
              </div>
            </div>
          )}

          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path
                    ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {user ? (
            <button
              onClick={() => {
                logout();
                closeSidebar();
              }}
              className="flex items-center gap-3 px-4 py-3 mt-6 w-full rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              <span>Logout</span>
            </button>
          ) : (
            <div className="mt-6 space-y-2">
              <Link
                to="/login"
                onClick={closeSidebar}
                className="flex items-center justify-center gap-2 px-4 py-2 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={closeSidebar}
                className="flex items-center justify-center gap-2 px-4 py-2 w-full bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors border border-gray-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64 min-h-screen">
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
