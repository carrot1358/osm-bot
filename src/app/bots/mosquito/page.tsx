"use client";

import { useAuth } from '@/hooks/useAuth';
import LoginForm from '@/components/auth/LoginForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Bug, Construction, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function MosquitoBotPage() {
  const { user, logout } = useAuth();

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-health-blue/5 to-health-green/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                กลับหน้าหลัก
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Mosquito Bot</h1>
              <p className="text-muted-foreground">
                {user.fname} {user.lname} | {user.hospital_name}
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            ออกจากระบบ
          </Button>
        </div>

        {/* Coming Soon Card */}
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto p-4 bg-health-blue/10 rounded-full w-fit mb-4">
                <Bug className="h-12 w-12 text-health-blue" />
              </div>
              <CardTitle className="text-3xl">Mosquito Bot</CardTitle>
              <CardDescription className="text-lg">
                บอทสำหรับติดตามและควบคุมยุง
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="p-6 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Construction className="h-6 w-6 text-orange-600" />
                  <h3 className="text-lg font-semibold text-orange-800">กำลังพัฒนา</h3>
                </div>
                <p className="text-orange-700">
                  ระบบ Mosquito Bot กำลังอยู่ในระหว่างการพัฒนา 
                  กรุณารอการอัพเดทในเวอร์ชันถัดไป
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Bug className="h-4 w-4 mr-2" />
                    ฟีเจอร์ที่จะมี
                  </h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• ติดตามข้อมูลยุง</li>
                    <li>• วิเคราะห์พื้นที่เสี่ยง</li>
                    <li>• รายงานสถานการณ์</li>
                    <li>• แจ้งเตือนการระบาด</li>
                  </ul>
                </div>

                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2">สถานะการพัฒนา</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>การออกแบบ UI</span>
                      <span className="text-green-600">100%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>API Integration</span>
                      <span className="text-orange-600">0%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>การทดสอบ</span>
                      <span className="text-orange-600">0%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-muted-foreground">
                  หากต้องการใช้งาน บอทอื่น ๆ สามารถกลับไปที่หน้าหลักได้
                </p>
                <Link href="/" className="inline-block mt-4">
                  <Button>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    กลับหน้าหลัก
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}