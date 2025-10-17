// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { ChevronLeft, ChevronRight, Phone, MapPin, Building, Award, Users, Menu } from 'lucide-react';
// @ts-ignore;
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from '@/components/ui';

import TabBar from '@/components/TabBar';
export default function HomePage(props) {
  const {
    $w,
    style
  } = props;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const slides = [{
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=400&fit=crop',
    title: '广昊建工 - 品质铸就未来',
    subtitle: '专业建筑工程服务提供商'
  }, {
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop',
    title: '现代化建筑解决方案',
    subtitle: '创新技术与传统工艺完美结合'
  }, {
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop',
    title: '值得信赖的合作伙伴',
    subtitle: '10年行业经验，100+成功案例'
  }];
  const projects = [{
    id: 1,
    title: '商业综合体项目',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
    category: '商业建筑',
    description: '现代化商业综合体，总建筑面积5万平方米'
  }, {
    id: 2,
    title: '高端住宅小区',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
    category: '住宅建筑',
    description: '高品质住宅项目，打造舒适居住环境'
  }, {
    id: 3,
    title: '工业厂房建设',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop',
    category: '工业建筑',
    description: '标准化工业厂房，满足现代化生产需求'
  }];
  const advantages = [{
    icon: <Award className="w-8 h-8" />,
    title: '专业资质',
    description: '拥有建筑工程施工总承包一级资质'
  }, {
    icon: <Users className="w-8 h-8" />,
    title: '专业团队',
    description: '200+专业技术人员，经验丰富'
  }, {
    icon: <Building className="w-8 h-8" />,
    title: '品质保证',
    description: '严格质量控制，确保工程品质'
  }];
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  };
  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);
  };
  const handleCall = () => {
    window.location.href = 'tel:400-123-4567';
  };
  const handleProjectClick = projectId => {
    $w.utils.navigateTo({
      pageId: 'project-detail',
      params: {
        id: projectId
      }
    });
  };
  return <div style={style} className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <header className="bg-blue-900 text-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold">广昊建工</h1>
              <p className="text-xs text-blue-200">品质铸就未来</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </header>

      {/* 轮播图 */}
      <section className="relative h-64 md:h-96 overflow-hidden">
        {slides.map((slide, index) => <div key={index} className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-2xl md:text-4xl font-bold mb-2">{slide.title}</h2>
                <p className="text-lg md:text-xl">{slide.subtitle}</p>
              </div>
            </div>
          </div>)}
        
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full">
          <ChevronRight className="w-6 h-6" />
        </button>
        
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => <button key={index} onClick={() => setCurrentSlide(index)} className={`w-2 h-2 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'}`} />)}
        </div>
      </section>

      {/* 企业简介 */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">关于广昊建工</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              广昊建工有限公司成立于2014年，是一家具有建筑工程施工总承包一级资质的专业建筑企业。
              公司专注于商业建筑、住宅建筑、工业建筑等领域，为客户提供从设计到施工的全方位服务。
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              凭借专业的技术团队、严格的质量管理和优质的客户服务，广昊建工已成功完成100+建筑项目，
              赢得了客户的广泛认可和信赖。
            </p>
          </div>
        </div>
      </section>

      {/* 核心优势 */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">核心优势</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    {advantage.icon}
                  </div>
                  <CardTitle className="text-xl">{advantage.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {advantage.description}
                  </CardDescription>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* 项目展示 */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">精选项目</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map(project => <Card key={project.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleProjectClick(project.id)}>
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-t-lg" />
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <Badge variant="secondary">{project.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{project.description}</CardDescription>
                </CardContent>
              </Card>)}
          </div>
          <div className="text-center mt-8">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600" onClick={() => $w.utils.navigateTo({
            pageId: 'projects'
          })}>
              查看更多项目
            </Button>
          </div>
        </div>
      </section>

      {/* 快速联系 */}
      <section className="py-12 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">立即联系我们</h2>
          <p className="text-xl mb-8">专业团队为您提供建筑解决方案</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-orange-500 hover:bg-orange-600 text-white" onClick={handleCall}>
              <Phone className="w-5 h-5 mr-2" />
              400-123-4567
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900" onClick={() => $w.utils.navigateTo({
            pageId: 'contact'
          })}>
              <MapPin className="w-5 h-5 mr-2" />
              查看地址
            </Button>
          </div>
        </div>
      </section>

      {/* 底部导航 */}
      <TabBar currentPage="home" onNavigate={$w.utils.navigateTo} />
    </div>;
}