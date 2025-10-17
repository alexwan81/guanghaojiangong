// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { ChevronLeft, MapPin, Calendar, Ruler, Users, Star, Heart, Share2 } from 'lucide-react';
// @ts-ignore;
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from '@/components/ui';

import TabBar from '@/components/TabBar';
export default function ProjectDetailPage(props) {
  const {
    $w,
    style
  } = props;
  const projectId = props.$w.page.dataset.params?.id || '1';

  // 模拟项目数据
  const project = {
    id: 1,
    title: '万达广场商业综合体',
    category: '商业建筑',
    location: '北京市朝阳区建国路93号',
    area: '50000㎡',
    year: '2023',
    duration: '24个月',
    team: '50人',
    rating: 4.8,
    images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'],
    description: '万达广场商业综合体是广昊建工2023年的重点项目，总建筑面积5万平方米，包含购物中心、写字楼和酒店三大功能区。项目采用现代化设计理念，融合绿色建筑技术，打造城市商业新地标。',
    features: ['绿色建筑三星级认证', '智能化楼宇管理系统', '地下三层停车场', '屋顶花园设计', '24小时安保系统', '中央空调系统'],
    challenges: ['地处繁华商圈，施工场地受限', '地下水位高，基础施工难度大', '工期紧张，需多工种协调作业'],
    solutions: ['采用BIM技术优化施工方案', '实施24小时轮班作业制度', '建立多方协调机制，确保进度']
  };
  const [currentImage, setCurrentImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const handleBack = () => {
    $w.utils.navigateBack();
  };
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project.title,
        text: project.description,
        url: window.location.href
      });
    }
  };
  return <div style={style} className="min-h-screen bg-gray-50 pb-16">
      {/* 顶部导航 */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-lg font-semibold">项目详情</h1>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" onClick={() => setIsLiked(!isLiked)}>
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* 图片轮播 */}
        <div className="relative h-64 md:h-96 mb-6">
          <img src={project.images[currentImage]} alt={project.title} className="w-full h-full object-cover rounded-lg" />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {project.images.map((_, index) => <button key={index} onClick={() => setCurrentImage(index)} className={`w-2 h-2 rounded-full ${index === currentImage ? 'bg-white' : 'bg-white bg-opacity-50'}`} />)}
          </div>
        </div>

        {/* 项目信息 */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{project.title}</CardTitle>
                <CardDescription className="mt-1">{project.category}</CardDescription>
              </div>
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{project.rating}</span>
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Ruler className="w-4 h-4 text-gray-500" />
                <span>{project.area}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>{project.year}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span>{project.team}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 项目描述 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>项目介绍</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 leading-relaxed">{project.description}</p>
          </CardContent>
        </Card>

        {/* 项目特色 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>项目特色</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {project.features.map((feature, index) => <li key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">{feature}</span>
                </li>)}
            </ul>
          </CardContent>
        </Card>

        {/* 挑战与解决方案 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>项目挑战</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {project.challenges.map((challenge, index) => <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{challenge}</span>
                  </li>)}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>解决方案</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {project.solutions.map((solution, index) => <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{solution}</span>
                  </li>)}
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      <TabBar currentPage="projects" onNavigate={$w.utils.navigateTo} />
    </div>;
}