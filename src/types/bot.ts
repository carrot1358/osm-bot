export interface FollowupUser {
  cid: string;
  full_name: string;
  gender: 'M' | 'F';
  age: number;
  address_no: string | null;
  init_assessment_date: string;
  latest_assessment_date: string;
  total_assessment: number;
  days_since_latest_assessment: number;
}

export interface OsmData {
  province_id: string;
  ampur_id: string;
  tambon_id: string;
  token: string;
}

export interface BotState {
  isStarting: boolean;
  botToken: string | null;
  osmData: OsmData | null;
  followupUsers: FollowupUser[];
  selectedUsers: Set<string>;
  isLoadingUsers: boolean;
  isProcessing: boolean;
  processedCount: number;
  totalCount: number;
  currentProcessing: string;
}