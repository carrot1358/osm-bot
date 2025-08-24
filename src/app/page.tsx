"use client";

import { useAuth } from '@/hooks/useAuth';
import LoginForm from '@/components/auth/LoginForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, Bug, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { user, logout } = useAuth();

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-health-green/5 to-health-blue/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">OSM Bot Dashboard</h1>
            <p className="text-muted-foreground">
              ยินดีต้อนรับ {user.fname} {user.lname} | {user.hospital_name}
            </p>
          </div>
          <Button variant="outline" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            ออกจากระบบ
          </Button>
        </div>

        {/* Bot Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* NCDs Bot Card */}
          <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-health-green/10 rounded-full w-fit mb-4">
                <Bot className="h-8 w-8 text-health-green" />
              </div>
              <CardTitle className="text-xl">NCDs Bot</CardTitle>
              <CardDescription className="text-base">
                บอทสำหรับแบบคัดกรองโรคไม่ติดต่อเรื้อรัง (NCDs) 
                ติดตามและประเมินผู้ป่วยอัตโนมัติ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                <div className="text-sm text-muted-foreground">
                  • ติดตามผู้ป่วย NCDs อัตโนมัติ
                </div>
                <div className="text-sm text-muted-foreground">
                  • ส่งแบบสอบถามประเมิน
                </div>
                <div className="text-sm text-muted-foreground">
                  • บันทึกข้อมูลเข้าระบบ 3doctor
                </div>
              </div>
              <Link href="/bots/ncds">
                <Button className="w-full bg-gradient-to-r from-health-green to-health-green/80 hover:shadow-glow transition-all duration-300">
                  <Bot className="mr-2 h-4 w-4" />
                  เข้าใช้งาน NCDs Bot
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Mosquito Bot Card - Placeholder */}
          <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 opacity-60">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-health-blue/10 rounded-full w-fit mb-4">
                <Bug className="h-8 w-8 text-health-blue" />
              </div>
              <CardTitle className="text-xl">Mosquito Bot</CardTitle>
              <CardDescription className="text-base">
                บอทสำหรับติดตามและควบคุมยุง
                (กำลังพัฒนา)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                <div className="text-sm text-muted-foreground">
                  • ติดตามข้อมูลยุง
                </div>
                <div className="text-sm text-muted-foreground">
                  • วิเคราะห์พื้นที่เสี่ยง
                </div>
                <div className="text-sm text-muted-foreground">
                  • รายงานสถานการณ์
                </div>
              </div>
              <Link href="/bots/mosquito">
                <Button disabled className="w-full">
                  <Bug className="mr-2 h-4 w-4" />
                  กำลังพัฒนา...
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Future Bot Card Placeholder */}
          <Card className="hover:shadow-lg transition-all duration-300 border-2 border-dashed border-muted-foreground/20">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-muted/10 rounded-full w-fit mb-4">
                <Bot className="h-8 w-8 text-muted-foreground" />
              </div>
              <CardTitle className="text-xl text-muted-foreground">Bot อื่น ๆ</CardTitle>
              <CardDescription>
                บอทเพิ่มเติมจะเปิดให้ใช้งานในอนาคต
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground">
                พื้นที่สำหรับบอทใหม่
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-muted-foreground">
          <p>OSM Bot System - ระบบบอทสำหรับ อสม</p>
        </div>
      </div>
    </div>
  );
}
