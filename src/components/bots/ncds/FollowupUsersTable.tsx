"use client";
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { FollowupUser } from '@/types/bot';

interface FollowupUsersTableProps {
  users: FollowupUser[];
  selectedUsers: Set<string>;
  onUserSelection: (cid: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
}

export default function FollowupUsersTable({
  users,
  selectedUsers,
  onUserSelection,
  onSelectAll,
}: FollowupUsersTableProps) {
  const allSelected = users.length > 0 && users.every(user => selectedUsers.has(user.cid));

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={allSelected}
                onCheckedChange={(checked) => onSelectAll(checked as boolean)}
                aria-label="เลือกทั้งหมด"
              />
            </TableHead>
            <TableHead>ชื่อ-นามสกุล</TableHead>
            <TableHead>เพศ</TableHead>
            <TableHead>อายุ</TableHead>
            <TableHead>บ้านเลขที่</TableHead>
            <TableHead>ประเมินครั้งแรก</TableHead>
            <TableHead>ประเมินครั้งล่าสุด</TableHead>
            <TableHead>จำนวนครั้ง</TableHead>
            <TableHead>ห่างเหิน (วัน)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.cid}>
              <TableCell>
                <Checkbox
                  checked={selectedUsers.has(user.cid)}
                  onCheckedChange={(checked) => 
                    onUserSelection(user.cid, checked as boolean)
                  }
                  aria-label={`เลือก ${user.full_name}`}
                />
              </TableCell>
              <TableCell className="font-medium">{user.full_name}</TableCell>
              <TableCell>
                <Badge variant="outline" className={user.gender === 'M' ? 'bg-blue-50 text-blue-700' : 'bg-pink-50 text-pink-700'}>
                  {user.gender === 'M' ? 'ชาย' : 'หญิง'}
                </Badge>
              </TableCell>
              <TableCell>{user.age} ปี</TableCell>
              <TableCell>{user.address_no || '-'}</TableCell>
              <TableCell className="text-sm">
                {new Date(user.init_assessment_date).toLocaleDateString('th-TH')}
              </TableCell>
              <TableCell className="text-sm">
                {new Date(user.latest_assessment_date).toLocaleDateString('th-TH')}
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{user.total_assessment}</Badge>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={user.days_since_latest_assessment > 90 ? "destructive" : "default"}
                  className={user.days_since_latest_assessment > 90 ? "" : "bg-green-100 text-green-700"}
                >
                  {user.days_since_latest_assessment}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}