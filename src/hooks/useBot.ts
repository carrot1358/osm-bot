"use client";
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { 
  startBot, 
  loadFollowupUsers, 
  processSelectedUsers,
  selectUser,
  deselectUser,
  selectAllUsers,
  deselectAllUsers,
  setSelectedUsers,
  selectBotState,
  selectBotToken,
  selectFollowupUsers,
  selectSelectedUsers,
  selectIsProcessing,
  selectProcessingProgress
} from '@/lib/slices/ncdsBotSlice';
import { User } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';

export function useBot() {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  
  // Selectors
  const botState = useAppSelector(selectBotState);
  const botToken = useAppSelector(selectBotToken);
  const followupUsers = useAppSelector(selectFollowupUsers);
  const selectedUsers = useAppSelector(selectSelectedUsers);
  const isProcessing = useAppSelector(selectIsProcessing);
  const processingProgress = useAppSelector(selectProcessingProgress);

  // Actions
  const handleStartBot = async (user: User) => {
    try {
      const result = await dispatch(startBot(user));
      if (startBot.fulfilled.match(result)) {
        toast({
          title: "เริ่มต้นบอทสำเร็จ",
          description: "เชื่อมต่อกับระบบ 3doctor เรียบร้อยแล้ว",
        });
      } else {
        toast({
          title: "เริ่มต้นบอทไม่สำเร็จ",
          description: "ไม่สามารถเชื่อมต่อกับระบบได้ กรุณาลองใหม่อีกครั้ง",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "เริ่มต้นบอทไม่สำเร็จ",
        description: "เกิดข้อผิดพลาดในระบบ",
        variant: "destructive",
      });
    }
  };

  const handleLoadFollowupUsers = async (token: string) => {
    try {
      const result = await dispatch(loadFollowupUsers(token));
      if (loadFollowupUsers.fulfilled.match(result)) {
        toast({
          title: "โหลดข้อมูลสำเร็จ",
          description: `พบข้อมูลผู้ป่วยที่ต้องติดตาม ${result.payload.length} ราย`,
        });
      } else {
        toast({
          title: "โหลดข้อมูลไม่สำเร็จ",
          description: "ไม่สามารถโหลดรายชื่อผู้ป่วยได้",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "โหลดข้อมูลไม่สำเร็จ",
        description: "เกิดข้อผิดพลาดในระบบ",
        variant: "destructive",
      });
    }
  };

  const handleProcessSelectedUsers = async () => {
    try {
      const result = await dispatch(processSelectedUsers());
      if (processSelectedUsers.fulfilled.match(result)) {
        toast({
          title: "ประมวลผลเสร็จสิ้น",
          description: `ประมวลผลแบบสอบถามสำหรับผู้ป่วย ${result.payload} รายเรียบร้อยแล้ว`,
        });
      } else {
        toast({
          title: "ประมวลผลไม่สำเร็จ",
          description: "เกิดข้อผิดพลาดระหว่างการประมวลผล",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "ประมวลผลไม่สำเร็จ",
        description: "เกิดข้อผิดพลาดในระบบ",
        variant: "destructive",
      });
    }
  };

  const handleUserSelection = (cid: string, checked: boolean) => {
    if (checked) {
      dispatch(selectUser(cid));
    } else {
      dispatch(deselectUser(cid));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      dispatch(selectAllUsers());
    } else {
      dispatch(deselectAllUsers());
    }
  };

  const handleUpdateSelectedUsers = (users: Set<string>) => {
    dispatch(setSelectedUsers(Array.from(users)));
  };

  return {
    // State
    isStarting: botState.isStarting,
    botToken,
    osmData: botState.osmData,
    followupUsers,
    selectedUsers: new Set(selectedUsers), // Convert back to Set for compatibility
    isLoadingUsers: botState.isLoadingUsers,
    isProcessing,
    processedCount: processingProgress.processed,
    totalCount: processingProgress.total,
    currentProcessing: processingProgress.current,
    
    // Actions
    startBot: handleStartBot,
    loadFollowupUsers: handleLoadFollowupUsers,
    processSelectedUsers: handleProcessSelectedUsers,
    updateSelectedUsers: handleUpdateSelectedUsers,
    userSelection: handleUserSelection,
    selectAll: handleSelectAll,
  };
}