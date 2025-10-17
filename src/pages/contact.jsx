// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
// @ts-ignore;
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';

import TabBar from '@/components/TabBar';
export default function ContactPage(props) {
  const {
    $w,
    style
  } = props;
  const contactInfo = {
    phone: '400-123-4567',
    email: 'info@guanghao.com',
    address: '北京市朝阳区建国路88号广昊大厦',
    workHours: '周一至周五 9:00-18:00',
    wechat: 'guanghao2024'
  };
  const handleCall = () => {
    window.location.href = `tel:${contactInfo.phone}`;
  };
  const handleEmail = () => {
    window.location.href = `mailto:${contactInfo.email}`;
  };
  const handleMap = () => {
    // 打开地图应用
    window.open(`https://maps.apple.com/?q=${encodeURIComponent(contactInfo.address)}`);
  };
  return <div style={style} className="min-h-screen bg-gray-50 pb-16">
      {/* 顶部标题 */}
      <header className="bg-blue-900 text-white">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold">联系我们</h1>
          <p className="text-blue-200 mt-1">专业团队随时为您服务</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* 联系卡片 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>联系方式</CardTitle>
            <CardDescription>多种方式联系我们，获取专业服务</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium">电话</p>
                <p className="text-gray-600">{contactInfo.phone}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium">邮箱</p>
                <p className="text-gray-600">{contactInfo.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium">地址</p>
                <p className="text-gray-600">{contactInfo.address}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium">工作时间</p>
                <p className="text-gray-600">{contactInfo.workHours}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <MessageCircle className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium">微信</p>
                <p className="text-gray-600">{contactInfo.wechat}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 快速操作 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleCall}>
            <Phone className="w-5 h-5 mr-2" />
            立即致电
          </Button>
          
          <Button size="lg" variant="outline" className="w-full" onClick={handleEmail}>
            <Mail className="w-5 h-5 mr-2" />
            发送邮件
          </Button>
          
          <Button size="lg" variant="outline" className="w-full" onClick={handleMap}>
            <MapPin className="w-5 h-5 mr-2" />
            查看地图
          </Button>
          
          <Button size="lg" variant="outline" className="w-full">
            <MessageCircle className="w-5 h-5 mr-2" />
            微信咨询
          </Button>
        </div>

        {/* 地图位置 */}
        <Card>
          <CardHeader>
            <CardTitle>公司位置</CardTitle>
            <CardDescription>欢迎来访，期待与您面对面交流</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">地图加载中...</p>
                <p className="text-sm text-gray-400 mt-1">{contactInfo.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <TabBar currentPage="contact" onNavigate={$w.utils.navigateTo} />
    </div>;
}