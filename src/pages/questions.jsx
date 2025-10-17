// @ts-ignore;
import React, { useState, useEffect } from 'react';
// @ts-ignore;
import { ChevronLeft, ChevronRight, Flag, RotateCcw } from 'lucide-react';
// @ts-ignore;
import { Button, Card, CardContent, RadioGroup, RadioGroupItem, Label, useToast } from '@/components/ui';

import { BottomNav } from '@/components/BottomNav';
export default function QuestionsPage(props) {
  const {
    $w
  } = props;
  const {
    subjectId,
    subjectName,
    categoryName
  } = $w.page.dataset.params || {};
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('practice');
  const {
    toast
  } = useToast();
  useEffect(() => {
    if (subjectId) {
      loadQuestions();
    }
  }, [subjectId]);
  const loadQuestions = async () => {
    try {
      setLoading(true);
      const result = await $w.cloud.callDataSource({
        dataSourceName: 'questions',
        methodName: 'wedaGetRecordsV2',
        params: {
          filter: {
            where: {
              $and: [{
                subjectId: {
                  $eq: subjectId
                }
              }, {
                status: {
                  $eq: 1
                }
              }]
            }
          },
          select: {
            $master: true
          },
          pageSize: 20,
          pageNumber: 1
        }
      });
      if (result.records) {
        setQuestions(result.records);
      }
    } catch (error) {
      console.error('加载题目失败:', error);
      toast({
        title: "加载失败",
        description: "无法加载题目信息",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const handleAnswerSelect = answer => {
    setSelectedAnswer(answer);
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answer
    }));
  };
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(userAnswers[currentQuestionIndex + 1] || '');
      setShowResult(false);
    }
  };
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(userAnswers[currentQuestionIndex - 1] || '');
      setShowResult(false);
    }
  };
  const handleSubmit = () => {
    setShowResult(true);
    const correct = questions.filter((q, index) => userAnswers[index] === q.answer).length;
    toast({
      title: "答题完成",
      description: `答对 ${correct}/${questions.length} 题`
    });
  };
  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setShowResult(false);
    setUserAnswers({});
  };
  const currentQuestion = questions[currentQuestionIndex];
  if (loading) {
    return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>;
  }
  if (questions.length === 0) {
    return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={() => $w.utils.navigateBack()} className="mr-3">
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {subjectName || '题目练习'}
              </h1>
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400">暂无题目</p>
          </div>
        </main>
      </div>;
  }
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* 顶部导航 */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={() => $w.utils.navigateBack()} className="mr-3">
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                  {subjectName}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  第 {currentQuestionIndex + 1} / {questions.length} 题
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleReset} className="text-gray-600 dark:text-gray-400">
              <RotateCcw className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Card>
          <CardContent className="p-6">
            {/* 题目 */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                {currentQuestion?.question}
              </h2>
              
              <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect} disabled={showResult}>
                {currentQuestion?.options?.map((option, index) => {
                const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
                const isCorrect = optionLetter === currentQuestion.answer;
                const isSelected = selectedAnswer === optionLetter;
                return <div key={index} className="mb-3">
                      <div className={`flex items-center space-x-3 p-3 rounded-lg border ${showResult ? isCorrect ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : isSelected ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-200 dark:border-gray-700' : isSelected ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}>
                        <RadioGroupItem value={optionLetter} id={`option-${index}`} disabled={showResult} />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                          {option}
                        </Label>
                        {showResult && isCorrect && <span className="text-green-600 dark:text-green-400 text-sm font-semibold">
                            正确答案
                          </span>}
                      </div>
                    </div>;
              })}
              </RadioGroup>
            </div>

            {/* 解析 */}
            {showResult && currentQuestion?.analysis && <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">
                  答案解析
                </h3>
                <p className="text-blue-800 dark:text-blue-200">
                  {currentQuestion.analysis}
                </p>
              </div>}

            {/* 操作按钮 */}
            <div className="flex justify-between">
              <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0} variant="outline">
                <ChevronLeft className="w-4 h-4 mr-2" />
                上一题
              </Button>

              {currentQuestionIndex === questions.length - 1 ? <Button onClick={handleSubmit} disabled={showResult}>
                  <Flag className="w-4 h-4 mr-2" />
                  提交答案
                </Button> : <Button onClick={handleNext} disabled={!selectedAnswer} variant="outline">
                  下一题
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* 底部导航 */}
      <BottomNav activeTab={activeTab} onTabChange={() => {}} />
    </div>;
}