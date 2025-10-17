// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { CheckCircle } from 'lucide-react';
// @ts-ignore;
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

export default function ServiceList() {
  const services = ['建筑工程施工总承包', '建筑装饰装修工程', '钢结构工程', '地基与基础工程', '机电安装工程', '市政公用工程', '建筑幕墙工程', '消防设施工程'];
  return <Card>
      <CardHeader>
        <CardTitle>服务范围</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {services.map((service, index) => <div key={index} className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">{service}</span>
            </div>)}
        </div>
      </CardContent>
    </Card>;
}