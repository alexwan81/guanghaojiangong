// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { ChevronLeft, BookOpen, Clock, Target } from 'lucide-react';
// @ts-ignore;
import { Button, Card, CardContent, useToast } from '@/components/ui';

import { BottomNav } from '@/components/BottomNav';
export default function PracticePage(props) {
  const {
    $w
  } = props;
  const {
    categoryId,
    categoryName
  } = $w.page.dataset.params || {};
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('practice');
  const {
    toast
  } = useToast();
  useEffect(() => {
    if (categoryId) {
      loadSubjects();
    }
  }, [categoryId]);
  const loadSubjects = async () => {
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
          }
        }
      });
      if (result.records && result.records.length > 0) {
        const firstExam = result.records[0];
        if (firstExam.categories) {
          const category = firstExam.categories.find(cat => cat.id === categoryId);
          if (category && category.subjects) {
            setSubjects(category.subjects);
          }
        }
      }
    } catch (error) {
      console.error('加载科目信息失败:', error);
      toast({
        title: "加载失败",
        description: "无法加载科目信息",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const handleSubjectClick = subject => {
    $w.utils.navigateTo({
      pageId: 'questions',
      params: {
        subjectId: subject.id,
        subjectName: subject.name,
        categoryName: categoryName
      }
    });
  };
  const handleTabChange = tab => {
    setActiveTab(tab);
    $w.utils.navigateTo({
      pageId: tab,
      params: {}
    });
  };
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* 顶部导航 */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => $w.utils.navigateBack()} className="mr-3">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {categoryName || '选择科目'}
            </h1>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {loading ? <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div> : <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjects.map(subject => <Card key={subject.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleSubjectClick(subject)}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                        {subject.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {categoryName}专业
                      </p>
                    </div>
                    <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400">
                        <BookOpen className="w-4 h-4" />
                        <span>题目数量</span>
                      </div>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {subject.questionCount}题
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                        <Clock className="w-4 h-4" />
                        <span>预计用时</span>
                      </div>
                      <span className="font-semibold text-green-600 dark:text-green-400">
                        {Math.ceil(subject.questionCount * 2 / 60)}小时
                      </span>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4" variant="default">
                    开始练习
                  </Button>
                </CardContent>
              </Card>)}
          </div>}
      </main>

      {/* 底部导航 */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}