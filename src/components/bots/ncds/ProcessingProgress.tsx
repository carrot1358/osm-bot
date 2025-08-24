"use client";
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Activity, Clock } from 'lucide-react';

interface ProcessingProgressProps {
  processedCount: number;
  totalCount: number;
  currentProcessing: string;
}

export default function ProcessingProgress({
  processedCount,
  totalCount,
  currentProcessing,
}: ProcessingProgressProps) {
  const progressPercentage = totalCount > 0 ? (processedCount / totalCount) * 100 : 0;

  return (
    <Card className="border-orange-200 bg-orange-50/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-orange-600" />
            <CardTitle className="text-lg text-orange-900">กำลังประมวลผล</CardTitle>
          </div>
          <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">
            {processedCount} / {totalCount}
          </Badge>
        </div>
        <CardDescription className="text-orange-700">
          กำลังดำเนินการส่งแบบสอบถามให้กับผู้ป่วย
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-orange-700">ความคืบหน้า</span>
            <span className="text-orange-900 font-medium">{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
        
        {currentProcessing && (
          <div className="flex items-center space-x-2 p-3 bg-orange-100/50 rounded-lg border border-orange-200">
            <Clock className="h-4 w-4 text-orange-600 animate-pulse" />
            <span className="text-sm text-orange-800">
              กำลังประมวลผล: <span className="font-medium">{currentProcessing}</span>
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}