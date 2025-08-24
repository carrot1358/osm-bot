"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckSquare, Square, Play, Loader2 } from 'lucide-react';

interface UserSelectionControlsProps {
  selectedCount: number;
  totalCount: number;
  isProcessing: boolean;
  isLoadingUsers: boolean;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onProcessSelected: () => void;
}

export default function UserSelectionControls({
  selectedCount,
  totalCount,
  isProcessing,
  isLoadingUsers,
  onSelectAll,
  onDeselectAll,
  onProcessSelected,
}: UserSelectionControlsProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-muted/30 rounded-lg">
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="bg-background">
          เลือกแล้ว {selectedCount} จาก {totalCount} ราย
        </Badge>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onSelectAll}
            disabled={isProcessing || isLoadingUsers}
          >
            <CheckSquare className="mr-1 h-4 w-4" />
            เลือกทั้งหมด
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onDeselectAll}
            disabled={isProcessing || isLoadingUsers}
          >
            <Square className="mr-1 h-4 w-4" />
            ยกเลิกทั้งหมด
          </Button>
        </div>
      </div>
      
      <Button
        onClick={onProcessSelected}
        disabled={selectedCount === 0 || isProcessing || isLoadingUsers}
        className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all duration-300"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            กำลังประมวลผล...
          </>
        ) : (
          <>
            <Play className="mr-2 h-4 w-4" />
            ประมวลผลที่เลือก ({selectedCount})
          </>
        )}
      </Button>
    </div>
  );
}