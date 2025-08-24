"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export default function LoginForm() {
  const [pid, setPid] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pid || !password) {
      toast({
        title: "กรอกข้อมูลไม่ครบ",
        description: "กรุณากรอกเลขบัตรประชาชนและรหัสผ่าน",
        variant: "destructive",
      });
      return;
    }

    const success = await login(pid, password);
    if (success) {
      toast({
        title: "เข้าสู่ระบบสำเร็จ",
        description: "ยินดีต้อนรับเข้าสู่ระบบ OSM Bot",
      });
      // Force a router refresh to re-evaluate authentication state
      router.refresh();
    } else {
      toast({
        title: "เข้าสู่ระบบไม่สำเร็จ",
        description: "เลขบัตรประชาชนหรือรหัสผ่านไม่ถูกต้อง",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-health-green/10 to-health-blue/10">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">เข้าสู่ระบบ OSM Bot</CardTitle>
          <CardDescription>
            กรุณาเข้าสู่ระบบด้วยบัญชี Smart OSM ของคุณ
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="pid" className="text-sm font-medium">
                เลขบัตรประชาชน
              </label>
              <Input
                id="pid"
                type="text"
                placeholder="เลขบัตรประชาชน 13 หลัก"
                value={pid}
                onChange={(e) => setPid(e.target.value)}
                maxLength={13}
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                รหัสผ่าน
              </label>
              <Input
                id="password"
                type="password"
                placeholder="รหัสผ่าน"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  กำลังเข้าสู่ระบบ...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  เข้าสู่ระบบ
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}