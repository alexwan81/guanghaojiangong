// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Award, Users, Building, Clock } from 'lucide-react';
// @ts-ignore;
import { Card, CardContent } from '@/components/ui';

export default function AboutStats() {
  const stats = [{
    label: '成立年份',
    value: '2014年',
    icon: Clock
  }, {
    label: '完成项目',
    value: '100+',
    icon: Building
  }, {
    label: '专业团队',
    value: '200+',
    icon: Users
  }, {
    label: '资质等级',
    value: '一级',
    icon: Award
  }];
  return <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
      const Icon = stat.icon;
      return <Card key={index} className="text-center">
            <CardContent className="pt-6">
              <Icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </CardContent>
          </Card>;
    })}
    </div>;
}