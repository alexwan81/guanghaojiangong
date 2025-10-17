// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Home, Building, Phone, User } from 'lucide-react';
// @ts-ignore;
import { Button } from '@/components/ui';

export default function TabBar({
  currentPage,
  onNavigate
}) {
  const tabs = [{
    id: 'home',
    label: '首页',
    icon: Home
  }, {
    id: 'projects',
    label: '项目',
    icon: Building
  }, {
    id: 'contact',
    label: '联系',
    icon: Phone
  }, {
    id: 'about',
    label: '关于',
    icon: User
  }];
  return <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around py-2">
        {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = currentPage === tab.id;
        return <Button key={tab.id} variant="ghost" className={`flex flex-col items-center space-y-1 px-3 py-2 ${isActive ? 'text-blue-600' : 'text-gray-600'}`} onClick={() => onNavigate({
          pageId: tab.id
        })}>
              <Icon className="w-5 h-5" />
              <span className="text-xs">{tab.label}</span>
            </Button>;
      })}
      </div>
    </nav>;
}