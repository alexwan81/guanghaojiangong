// @ts-ignore;
import React, { useState } from 'react';
// @ts-ignore;
import { Search, Filter, ChevronRight } from 'lucide-react';
// @ts-ignore;
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Input } from '@/components/ui';

import TabBar from '@/components/TabBar';
export default function ProjectsPage(props) {
  const {
    $w,
    style
  } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const projects = [{
    id: 1,
    title: '万达广场商业综合体',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
    category: '商业建筑',
    location: '北京市朝阳区',
    area: '50000㎡',
    year: '2023',
    description: '现代化商业综合体，包含购物中心、写字楼和酒店'
  }, {
    id: 2,
    title: '绿城高端住宅小区',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
    category: '住宅建筑',
    location: '上海市浦东新区',
    area: '80000㎡',
    year: '2023',
    description: '高品质住宅项目，打造舒适宜居的生活环境'
  }, {
    id: 3,
    title: '华为工业生产基地',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop',
    category: '工业建筑',
    location: '深圳市龙岗区',
    area: '120000㎡',
    year: '2022',
    description: '现代化工业厂房，满足高科技生产需求'
  }, {
    id: 4,
    title: '三甲医院扩建工程',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    category: '公共建筑',
    location: '广州市天河区',
    area: '30000㎡',
    year: '2022',
    description: '现代化医疗建筑，提升医疗服务水平'
  }, {
    id: 5,
    title: '国际学校建设项目',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
    category: '教育建筑',
    location: '杭州市西湖区',
    area: '25000㎡',
    year: '2023',
    description: '国际化教育设施，打造优质学习环境'
  }, {
    id: 6,
    title: '五星级酒店装修工程',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
    category: '装修工程',
    location: '成都市锦江区',
    area: '15000㎡',
    year: '2023',
    description: '豪华酒店装修，彰显高端品质'
  }];
  const categories = ['all', '商业建筑', '住宅建筑', '工业建筑', '公共建筑', '教育建筑', '装修工程'];
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  const handleProjectClick = projectId => {
    $w.utils.navigateTo({
      pageId: 'project-detail',
      params: {
        id: projectId
      }
    });
  };
  return <div style={style} className="min-h-screen bg-gray-50 pb-16">
      {/* 顶部搜索栏 */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input type="text" placeholder="搜索项目..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-5 h-5" />
            </Button>
          </div>
          
          {/* 分类筛选 */}
          <div className="flex space-x-2 mt-4 overflow-x-auto">
            {categories.map(category => <Button key={category} variant={selectedCategory === category ? 'default' : 'outline'} size="sm" onClick={() => setSelectedCategory(category)} className="whitespace-nowrap">
                {category === 'all' ? '全部' : category}
              </Button>)}
          </div>
        </div>
      </header>

      {/* 项目列表 */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map(project => <Card key={project.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleProjectClick(project.id)}>
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-t-lg" />
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <Badge variant="secondary">{project.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-3">{project.description}</CardDescription>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{project.location}</span>
                  <span>{project.year}</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-600">{project.area}</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>)}
        </div>
        
        {filteredProjects.length === 0 && <div className="text-center py-12">
            <p className="text-gray-500">未找到相关项目</p>
          </div>}
      </main>

      <TabBar currentPage="projects" onNavigate={$w.utils.navigateTo} />
    </div>;
}