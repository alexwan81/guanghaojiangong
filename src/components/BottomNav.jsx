// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Home, BookOpen, BarChart3, User } from 'lucide-react';

export function BottomNav({
  activeTab,
  onTabChange
}) {
  const navItems = [{
    id: 'home',
    label: '首页',
    icon: Home
  }, {
    id: 'practice',
    label: '题库',
    icon: BookOpen
  }, {
    id: 'progress',
    label: '学习',
    icon: BarChart3
  }, {
    id: 'profile',
    label: '我的',
    icon: User
  }];
  return <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="flex justify-around items-center h-16">
        {navItems.map(item => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return <button key={item.id} onClick={() => onTabChange(item.id)} className={`flex flex-col items-center justify-center space-y-1 px-3 py-2 rounded-lg transition-colors ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'}`}>
              <Icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </button>;
      })}
      </div>
    </div>;
}