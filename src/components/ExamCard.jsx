// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Card, CardContent, Progress } from '@/components/ui';
// @ts-ignore;
import { BookOpen, Clock } from 'lucide-react';

export function ExamCard({
  exam,
  onClick
}) {
  const calculateDaysLeft = examDate => {
    const today = new Date();
    const exam = new Date(examDate);
    const diffTime = exam - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };
  const totalQuestions = exam.subjects?.reduce((sum, subject) => sum + subject.questionCount, 0) || 0;
  return <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-white dark:bg-gray-800" onClick={() => onClick(exam)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{exam.icon}</div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{exam.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{exam.description}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400">
              <Clock className="w-4 h-4" />
              <span>考试倒计时</span>
            </div>
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {calculateDaysLeft(exam.examDate)}天
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
              <BookOpen className="w-4 h-4" />
              <span>题目总数</span>
            </div>
            <span className="font-semibold text-green-600 dark:text-green-400">
              {totalQuestions}题
            </span>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">学习进度</span>
              <span className="text-gray-600 dark:text-gray-300">45%</span>
            </div>
            <Progress value={45} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>;
}