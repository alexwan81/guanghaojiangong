// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Award, Users, Building, Clock, Target, Shield, CheckCircle, Star } from 'lucide-react';
// @ts-ignore;
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';

import TabBar from '@/components/TabBar';
import AboutStats from '@/components/AboutStats';
import ServiceList from '@/components/ServiceList';
import CertificateGallery from '@/components/CertificateGallery';
export default function AboutPage(props) {
  const {
    $w,
    style
  } = props;
  const values = [{
    icon: <Target className="w-8 h-8" />,
    title: '专业专注',
    description: '专注于建筑工程领域，精益求精，追求卓越品质'
  }, {
    icon: <Shield className="w-8 h-8" />,
    title: '诚信负责',
    description: '以诚为本，对客户负责，对社会负责，对质量负责'
  }, {
    icon: <Users className="w-8 h-8" />,
    title: '团队协作',
    description: '凝聚团队力量，发挥集体智慧，共创优质工程'
  }];
  const certificates = [{
    name: '建筑工程施工总承包一级资质',
    level: '一级',
    icon: Award
  }, {
    name: '建筑装饰装修工程专业承包一级',
    level: '一级',
    icon: Award
  }, {
    name: '钢结构工程专业承包二级',
    level: '二级',
    icon: Award
  }, {
    name: '地基与基础工程专业承包一级',
    level: '一级',
    icon: Award
  }, {
    name: 'ISO9001质量管理体系认证',
    level: '认证',
    icon: CheckCircle
  }, {
    name: 'ISO14001环境管理体系认证',
    level: '认证',
    icon: CheckCircle
  }];
  return <div style={style} className="min-h-screen bg-gray-50 pb-16">
      {/* 顶部标题 */}
      <header className="bg-blue-900 text-white">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold">关于广昊</h1>
          <p className="text-blue-200 mt-1">了解我们的故事与实力</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* 企业简介 */}
        <Card>
          <CardHeader>
            <CardTitle>企业简介</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 leading-relaxed">
              广昊建工有限公司成立于2014年，注册资本1亿元人民币，是一家具有建筑工程施工总承包一级资质的专业建筑企业。
              公司总部位于北京，在上海、广州、深圳等地设有分支机构，业务覆盖全国主要城市。
            </p>
            <p className="text-gray-600 leading-relaxed">
              公司专注于商业建筑、住宅建筑、工业建筑、公共建筑等领域，为客户提供从规划设计到施工交付的全方位服务。
              凭借专业的技术团队、严格的质量管理和优质的客户服务，广昊建工已成为行业内的知名品牌。
            </p>
          </CardContent>
        </Card>

        {/* 核心数据 */}
        <AboutStats />

        {/* 企业价值观 */}
        <Card>
          <CardHeader>
            <CardTitle>企业价值观</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((value, index) => <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    {value.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </div>)}
            </div>
          </CardContent>
        </Card>

        {/* 服务范围 */}
        <ServiceList />

        {/* 资质证书 */}
        <CertificateGallery certificates={certificates} />
      </main>

      <TabBar currentPage="about" onNavigate={$w.utils.navigateTo} />
    </div>;
}