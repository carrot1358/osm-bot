"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useBot } from '@/hooks/useBot';
import NCDsBotHeader from './NCDsBotHeader';
import ProcessingProgress from './ProcessingProgress';
import UserSelectionControls from './UserSelectionControls';
import FollowupUsersTable from './FollowupUsersTable';

export default function NCDsBot() {
  const { user } = useAuth();
  const {
    isStarting,
    botToken,
    followupUsers,
    selectedUsers,
    isLoadingUsers,
    isProcessing,
    processedCount,
    totalCount,
    currentProcessing,
    startBot,
    loadFollowupUsers,
    processSelectedUsers,
    userSelection,
    selectAll,
  } = useBot();

  const handleStartBot = () => {
    if (user) {
      startBot(user);
    }
  };

  const handleRefreshUsers = () => {
    if (botToken) {
      loadFollowupUsers(botToken);
    }
  };

  const handleUserSelection = (cid: string, checked: boolean) => {
    userSelection(cid, checked);
  };

  const handleSelectAll = (checked: boolean) => {
    selectAll(checked);
  };

  return (
    <div className="space-y-6">
      <NCDsBotHeader
        botToken={botToken}
        isStarting={isStarting}
        isLoadingUsers={isLoadingUsers}
        isProcessing={isProcessing}
        followupUsersCount={followupUsers.length}
        onStartBot={handleStartBot}
        onRefreshUsers={handleRefreshUsers}
      />

      {isProcessing && (
        <ProcessingProgress
          processedCount={processedCount}
          totalCount={totalCount}
          currentProcessing={currentProcessing}
        />
      )}

      {followupUsers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>รายชื่อผู้ป่วยที่ต้องติดตาม ({followupUsers.length} ราย)</span>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <UserSelectionControls
              selectedCount={selectedUsers.size}
              totalCount={followupUsers.length}
              isProcessing={isProcessing}
              isLoadingUsers={isLoadingUsers}
              onSelectAll={() => handleSelectAll(true)}
              onDeselectAll={() => handleSelectAll(false)}
              onProcessSelected={processSelectedUsers}
            />

            <FollowupUsersTable
              users={followupUsers}
              selectedUsers={selectedUsers}
              onUserSelection={handleUserSelection}
              onSelectAll={handleSelectAll}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}