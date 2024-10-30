import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { 
  Home,
  Building2,
  FileText,
  Settings,
  LogOut,
  MessageCircle,
  Boxes,
  Receipt,
  LifeBuoy,
  X
} from 'lucide-react';

interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const { signOut } = useAuthStore();

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      window.location.href = '/login';
    }
  };

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'الرئيسية' },
    { path: '/dashboard/company', icon: Building2, label: 'شركتي' },
    { path: '/dashboard/documents', icon: FileText, label: 'المستندات' },
    { path: '/dashboard/transactions', icon: Receipt, label: 'تتبع المعاملات' },
    { path: '/dashboard/support', icon: LifeBuoy, label: 'الدعم الفني' },
    { path: '/dashboard/settings', icon: Settings, label: 'الإعدادات' },
  ];

  const handleWhatsAppSupport = () => {
    window.open('https://wa.me/hulul', '_blank');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Boxes className="h-8 w-8 text-accent" />
          <h1 className="text-xl font-bold text-white">حلول فورميشنز</h1>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-400 hover:text-accent transition-colors ${
                isActive ? 'bg-primary-dark/50 text-accent' : ''
              }`
            }
          >
            <item.icon className="h-5 w-5 ml-3" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <button
        onClick={handleWhatsAppSupport}
        className="fixed bottom-8 left-8 bg-accent hover:bg-accent-light text-primary p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center z-50 lg:static lg:rounded-none lg:shadow-none lg:p-0 lg:bg-transparent lg:text-gray-400 lg:hover:text-accent lg:hover:scale-100 lg:mb-4 lg:mx-6"
      >
        <MessageCircle className="h-6 w-6 lg:h-5 lg:w-5 lg:ml-3" />
        <span className="hidden lg:inline">تواصل معنا</span>
      </button>

      <div className="p-6 border-t border-gray-800">
        <button
          onClick={handleSignOut}
          className="flex items-center text-gray-400 hover:text-red-400 w-full transition-colors"
        >
          <LogOut className="h-5 w-5 ml-3" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </div>
  );
};