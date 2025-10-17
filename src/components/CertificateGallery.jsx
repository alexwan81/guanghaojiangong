// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Award, CheckCircle } from 'lucide-react';
// @ts-ignore;
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

export default function CertificateGallery({
  certificates
}) {
  return <Card>
      <CardHeader>
        <CardTitle>资质证书</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificates.map((cert, index) => {
          const Icon = cert.icon;
          return <div key={index} className="border rounded-lg p-4 flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{cert.name}</h4>
                  <p className="text-sm text-gray-600">等级：{cert.level}</p>
                </div>
              </div>;
        })}
        </div>
      </CardContent>
    </Card>;
}