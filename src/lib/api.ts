import { User } from '@/types/auth';
import { FollowupUser } from '@/types/bot';

const API_BASE_URL = 'https://smart-osm.com/api/v1';
const DOCTOR_API_BASE = 'https://gw1.hss.moph.go.th/api/3doctor';

const API_KEYS = {
  applicationKey: '3J8m4Bxio1WXzKBQx24R6sBDsbagdTw4jy4fvZhEAyWP',
  applicationSecret: '8ofBZXjHBddcm4zxkFLqWXyaKGEpM68QW61ac19DRCSf.7csP2y3Nq1dKn2juV8VYU3NsTZYXnQiRH7TJkpsagAR4'
};

export const authApi = {
  login: async (pid: string, password: string): Promise<{ success: boolean; user?: User }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/osm/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pid, password }),
      });

      const data = await response.json();

      if (data.code === 200 && data.user_osm) {
        const user: User = {
          pid: data.user_osm.pid,
          fname: data.user_osm.fname,
          lname: data.user_osm.lname,
          uid: data.user_osm.uid,
          access_token: data.user_osm.auth.access_token,
          hospital_name: data.user_osm.hospital_name,
          province_name: data.user_osm.province_name,
        };
        return { success: true, user };
      }
      return { success: false };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false };
    }
  }
};

export const botApi = {
  getOsmToken: async (user: User) => {
    const response = await fetch(`${DOCTOR_API_BASE}/osm`, {
      method: 'POST',
      headers: {
        ...API_KEYS,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cid: user.pid,
        uid: user.uid,
      }),
    });

    const data = await response.json();
    if (data.statusCode === 200 && data.data.token) {
      return { success: true, data: data.data };
    }
    throw new Error('Failed to get bot token');
  },

  getFollowupUsers: async (token: string): Promise<FollowupUser[]> => {
    const response = await fetch(`${DOCTOR_API_BASE}/ncds/followup`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        ...API_KEYS,
      },
    });

    const data = await response.json();
    if (data.statusCode === 200 && data.data) {
      return data.data;
    }
    throw new Error('Failed to load followup users');
  },

  getPersonData: async (token: string, cid: string) => {
    const response = await fetch(`${DOCTOR_API_BASE}/carb/person`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        ...API_KEYS,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cid }),
    });

    const data = await response.json();
    if (data.statusCode === 200 && data.data) {
      return data.data;
    }
    throw new Error('Person data is not valid');
  },

  submitAssessment: async (token: string, assessmentData: object) => {
    const response = await fetch(`${DOCTOR_API_BASE}/ncds/assessments`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        ...API_KEYS,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(assessmentData),
    });

    const result = await response.json();
    return result.statusCode === 200;
  }
};