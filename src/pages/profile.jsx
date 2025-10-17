// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { User, Award, BookOpen, Clock, Target, TrendingUp } from 'lucide-react';
// @ts-ignore;
import { Card, CardContent, CardHeader, CardTitle, Button, Progress, useToast } from '@/components/ui';

import { BottomNav } from '@/components/BottomNav';
export default function ProfilePage(props) {
  const {
    $w
  } = props;
  const [userStats, setUserStats] = useState({
    totalQuestions: 0,
    correctAnswers: 0,
    totalStudyTime: 0,
    streakDays: 0,
    level: 1
  });
  const [activeTab, setActiveTab] = useState('profile');
  const {
    toast
  } = useToast();
  useEffect(() => {
    loadUserStats();
  }, []);
  const loadUserStats = async () => {
    try {
      // 这里可以从用户学习记录中获取统计数据
      setUserStats({
        totalQuestions: 1250,
        correctAnswers: 987,
        totalStudyTime: 45.5,
        streakDays: 15,
        level: 3
      });
    } catch (error) {
      console.error('加载用户统计失败:', error);
    }
  };
  const handleTabChange = tab => {
    setActiveTab(tab);
    $w.utils.navigateTo({
      pageId: tab,
      params: {}
    });
  };
  const accuracy = userStats.totalQuestions > 0 ? Math.round(userStats.correctAnswers / userStats.totalQuestions * 100) : 0;
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* 顶部导航 */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            个人中心
          </h1>
        </div>
      </header>

      {/* 用户信息 */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {$w.auth.currentUser?.name || '考生'}
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  一级建造师备考学员
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-semibold text-yellow-600">
                    Lv.{userStats.level} 学习达人
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 学习统计 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userStats.totalQuestions}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  总做题数
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {accuracy}%
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  正确率
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userStats.totalStudyTime}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  学习时长(小时)
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {userStats.streakDays}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  连续学习(天)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 学习进度 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>学习进度</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>总体进度</span>
                  <span>68%</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>建设工程经济</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>建设工程法规</span>
                  <span>62%</span>
                </div>
                <Progress value={62} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 功能按钮 */}
        <div className="space-y-3">
          <Button className="w-full" variant="outline">
            学习记录
          </Button>
          <Button className="w-full" variant="outline">
            错题本
          </Button>
          <Button className="w-full" variant="outline">
            收藏题目
          </Button>
          <Button className="w-full" variant="outline">
            设置
          </Button>
        </div>
      </div>

      {/* 底部导航 */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>;
}