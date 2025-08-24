"use client";

import { useAuth } from '@/hooks/useAuth';
import LoginForm from '@/components/auth/LoginForm';
import NCDsBot from '@/components/bots/ncds/NCDsBot';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function NCDsBotPage() {
  const { user, logout } = useAuth();

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-health-green/5 to-health-blue/5">
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
              <h1 className="text-2xl font-bold text-foreground">NCDs Bot</h1>
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

        {/* NCDs Bot Component */}
        <NCDsBot />
      </div>
    </div>
  );
}