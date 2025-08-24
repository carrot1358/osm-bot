"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Play, Loader2, Users, RefreshCw } from 'lucide-react';

interface NCDsBotHeaderProps {
  botToken: string | null;
  isStarting: boolean;
  isLoadingUsers: boolean;
  isProcessing: boolean;
  followupUsersCount: number;
  onStartBot: () => void;
  onRefreshUsers: () => void;
}

export default function NCDsBotHeader({
  botToken,
  isStarting,
  isLoadingUsers,
  isProcessing,
  followupUsersCount,
  onStartBot,
  onRefreshUsers,
}: NCDsBotHeaderProps) {
  return (
    <Card className="bg-gradient-to-r from-health-green/10 to-health-blue/10 border-primary/20">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Bot className="h-8 w-8 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl">บอท แบบคัดกรองโรคไม่ติดต่อเรื้อรัง (NCDs)</CardTitle>
            <CardDescription className="text-base">
              ระบบติดตามและคัดกรองโรคไม่ติดต่อเรื้อรัง สำหรับ อสม
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-wrap items-center gap-4">
          {!botToken ? (
            <Button
              onClick={onStartBot}
              disabled={isStarting}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all duration-300"
            >
              {isStarting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  กำลังเริ่มต้นบอท...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5" />
                  เริ่มต้นบอท
                </>
              )}
            </Button>
          ) : (
            <>
              <Badge variant="secondary" className="bg-health-green text-white px-4 py-2">
                <Bot className="mr-2 h-4 w-4" />
                บอทพร้อมใช้งาน
              </Badge>
              <Button
                onClick={onRefreshUsers}
                disabled={isLoadingUsers || isProcessing}
                variant="outline"
                className="hover:bg-primary/5"
              >
                {isLoadingUsers ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="mr-2 h-4 w-4" />
                )}
                รีเฟรชข้อมูล
              </Button>
              {followupUsersCount > 0 && (
                <Badge variant="outline" className="bg-background">
                  <Users className="mr-2 h-4 w-4" />
                  ผู้ป่วยที่ต้องติดตาม {followupUsersCount} ราย
                </Badge>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}