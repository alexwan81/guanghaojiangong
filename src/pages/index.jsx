// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { Search, Bell, User } from 'lucide-react';
// @ts-ignore;
import { Input, Button, useToast } from '@/components/ui';

import { ExamCard } from '@/components/ExamCard';
import { BottomNav } from '@/components/BottomNav';
export default function HomePage(props) {
  const {
    $w
  } = props;
  const [exams, setExams] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(true);
  const {
    toast
  } = useToast();
  useEffect(() => {
    loadExams();
  }, []);
  const loadExams = async () => {
    try {
      setLoading(true);
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'exams',
        methodName: 'wedaGetRecordsV2',
        params: {
          filter: {
            where: {}
          },
          select: {
            $master: true
          },
          orderBy: [{
            sort: 'asc'
          }]
        }
      });
      if (result.records && result.records.length > 0) {
        // 解析第一个记录的categories字段
        const firstExam = result.records[0];
        if (firstExam.categories) {
          setExams(firstExam.categories.map(cat => ({
            ...cat,
            icon: cat.id === 'category_001' ? '️' : cat.id === 'category_002' ? '️' : cat.id === 'category_003' ? '' : cat.id === 'category_004' ? '️' : cat.id === 'category_005' ? '' : cat.id === 'category_006' ? '' : cat.id === 'category_007' ? '️' : cat.id === 'category_008' ? '' : cat.id === 'category_009' ? '️' : cat.id === 'category_010' ? '️' : '',
            name: cat.name,
            description: `一级建造师${cat.name}专业`,
            examDate: '2024-09-15',
            subjects: cat.subjects
          })));
        }
      }
    } catch (error) {
      console.error('加载考试信息失败:', error);
      toast({
        title: "加载失败",
        description: "无法加载考试信息，请检查网络连接",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const handleExamClick = exam => {
    $w.utils.navigateTo({
      pageId: 'practice',
      params: {
        categoryId: exam.id,
        categoryName: exam.name
      }
    });
  };
  const handleTabChange = tab => {
    setActiveTab(tab);
    if (tab !== 'home') {
      $w.utils.navigateTo({
        pageId: tab,
        params: {}
      });
    }
  };
  const filteredExams = exams.filter(exam => exam.name.toLowerCase().includes(searchTerm.toLowerCase()));
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* 顶部导航 */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              一级建造师
            </h1>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-400">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-400" onClick={() => $w.utils.navigateTo({
              pageId: 'profile',
              params: {}
            })}>
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 搜索栏 */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input type="text" placeholder="搜索专业类别..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 w-full" />
        </div>
      </div>

      {/* 主要内容 */}
      <main className="max-w-7xl mx-auto px-4">
        {loading ? <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExams.map(exam => <ExamCard key={exam.id} exam={exam} onClick={handleExamClick} />)}
          </div>}
        
        {filteredExams.length === 0 && !loading && <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">未找到匹配的专业类别</p>
          </div>}
      </main>

      {/* 底部导航 */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}