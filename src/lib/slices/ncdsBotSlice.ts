import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { NCDsBotState } from '@/types/store';
import { FollowupUser, OsmData } from '@/types/bot';
import { User } from '@/types/auth';
import { botApi } from '@/lib/api';

// Initial state
const initialState: NCDsBotState = {
  isStarting: false,
  botToken: null,
  osmData: null,
  followupUsers: [],
  selectedUsers: [],
  isLoadingUsers: false,
  isProcessing: false,
  processedCount: 0,
  totalCount: 0,
  currentProcessing: '',
};

// Async thunks
export const startBot = createAsyncThunk(
  'ncdsBot/startBot',
  async (user: User, { dispatch, rejectWithValue }) => {
    try {
      const result = await botApi.getOsmToken(user);
      const data = result.data;
      
      // Automatically load followup users after bot starts
      dispatch(loadFollowupUsers(data.token));
      
      return data;
    } catch (error) {
      return rejectWithValue('Failed to start bot');
    }
  }
);

export const loadFollowupUsers = createAsyncThunk(
  'ncdsBot/loadFollowupUsers',
  async (token: string, { rejectWithValue }) => {
    try {
      const users = await botApi.getFollowupUsers(token);
      return users;
    } catch (error) {
      return rejectWithValue('Failed to load followup users');
    }
  }
);

export const processSelectedUsers = createAsyncThunk(
  'ncdsBot/processSelectedUsers',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as { ncdsBot: NCDsBotState };
    const { botToken, osmData, selectedUsers, followupUsers } = state.ncdsBot;

    if (!botToken || !osmData || selectedUsers.length === 0) {
      return rejectWithValue('Missing required data');
    }

    const usersToProcess = followupUsers.filter(user => selectedUsers.includes(user.cid));
    
    dispatch(setProcessingState({ 
      isProcessing: true, 
      processedCount: 0, 
      totalCount: usersToProcess.length 
    }));

    try {
      for (let i = 0; i < usersToProcess.length; i++) {
        const user = usersToProcess[i];
        dispatch(setCurrentProcessing(`${user.full_name} (${user.cid})`));

        try {
          const person = await botApi.getPersonData(botToken, user.cid);
          
          if (!person.province_id || !person.house_number || !person.moo) {
            throw new Error('Person data is not valid');
          }
          
          const assessmentData = {
            personal_info: {
              address: {
                province: person.province_id?.toString() || osmData.province_id,
                no: person.house_number || "",
                moo: person.moo || "2",
                amphur: person.ampur_id?.toString() || osmData.ampur_id,
                tambon: person.tambon_id || osmData.tambon_id
              },
              title_name: person.prename || "นาย",
              first_name: person.fname || "",
              last_name: person.lname || "",
              gender: person.gender || "M",
              pid: person.cid,
              age: person.age || 30
            },
            assessment_info: {
              fiscal_year: 2025,
              assessment_type: 2,
              assessment_date: new Date().toISOString()
            },
            assessment_response: {
              medical_history_details: [],
              family_medical_history_details: [],
              q31: "3",
              q32: "3",
              q33: "2",
              q34: "4",
              "q35-1": "2",
              "q35-2": "2",
              "q36-1": "1",
              "q36-2": "1",
              "q36-3": "1",
              "q36-4": "1",
              "q36-5": "1",
              "q37-1": "2",
              "q37-2": "2",
              "q37-3": "2",
              "q37-4": "2",
              "q37-5": "3",
              "q37-6": "3",
              "q37-7": "2",
              "q37-8": "3",
              "q37-9": "2",
              exercise_activity: "4",
              osk_details: {},
              height_cm: person.height || 170,
              weight_kg: person.weight || 75,
              bmi: person.weight && person.height ? 
                   Math.round((person.weight / Math.pow(person.height / 100, 2)) * 100) / 100 : 25.95,
              medical_history: "no",
              drug_allergy_history: "no",
              drug_allergy_history_details: "",
              food_allergy_history: "no",
              food_allergy_history_details: "",
              family_medical_history: "no",
              waist_cm: 88,
              systolic_bp: 88,
              diastolic_bp: 88,
              pulse_rate: 88,
              blood_sugar: 88
            },
            osm_tambon_id: osmData.tambon_id,
            osm_province_id: osmData.province_id,
            osm_amphur_id: osmData.ampur_id
          };

          await botApi.submitAssessment(botToken, assessmentData);
        } catch (error) {
          console.error(`Error processing ${user.full_name}:`, error);
        }

        dispatch(setProcessedCount(i + 1));
        
        if (i < usersToProcess.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      dispatch(setProcessingState({ 
        isProcessing: false, 
        currentProcessing: '',
        processedCount: usersToProcess.length,
        totalCount: usersToProcess.length
      }));

      return usersToProcess.length;
    } catch (error) {
      dispatch(setProcessingState({ isProcessing: false, currentProcessing: '' }));
      return rejectWithValue('Processing failed');
    }
  }
);

// NCDs Bot slice
const ncdsBotSlice = createSlice({
  name: 'ncdsBot',
  initialState,
  reducers: {
    // User selection actions
    selectUser: (state, action: PayloadAction<string>) => {
      if (!state.selectedUsers.includes(action.payload)) {
        state.selectedUsers.push(action.payload);
      }
    },
    deselectUser: (state, action: PayloadAction<string>) => {
      state.selectedUsers = state.selectedUsers.filter(cid => cid !== action.payload);
    },
    selectAllUsers: (state) => {
      state.selectedUsers = state.followupUsers.map(user => user.cid);
    },
    deselectAllUsers: (state) => {
      state.selectedUsers = [];
    },
    setSelectedUsers: (state, action: PayloadAction<string[]>) => {
      state.selectedUsers = action.payload;
    },

    // Processing state actions
    setProcessingState: (state, action: PayloadAction<Partial<{
      isProcessing: boolean;
      processedCount: number;
      totalCount: number;
      currentProcessing: string;
    }>>) => {
      Object.assign(state, action.payload);
    },
    setCurrentProcessing: (state, action: PayloadAction<string>) => {
      state.currentProcessing = action.payload;
    },
    setProcessedCount: (state, action: PayloadAction<number>) => {
      state.processedCount = action.payload;
    },

    // Reset bot state
    resetBotState: (state) => {
      return { ...initialState };
    },

    // Clear token (for logout)
    clearBotToken: (state) => {
      state.botToken = null;
      state.osmData = null;
      state.followupUsers = [];
      state.selectedUsers = [];
      state.isProcessing = false;
      state.processedCount = 0;
      state.totalCount = 0;
      state.currentProcessing = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Start bot
      .addCase(startBot.pending, (state) => {
        state.isStarting = true;
      })
      .addCase(startBot.fulfilled, (state, action) => {
        state.isStarting = false;
        state.botToken = action.payload.token;
        state.osmData = action.payload;
      })
      .addCase(startBot.rejected, (state) => {
        state.isStarting = false;
      })

      // Load followup users
      .addCase(loadFollowupUsers.pending, (state) => {
        state.isLoadingUsers = true;
      })
      .addCase(loadFollowupUsers.fulfilled, (state, action) => {
        state.isLoadingUsers = false;
        state.followupUsers = action.payload;
        state.selectedUsers = []; // Clear previous selections
      })
      .addCase(loadFollowupUsers.rejected, (state) => {
        state.isLoadingUsers = false;
      });
  },
});

// Export actions
export const {
  selectUser,
  deselectUser,
  selectAllUsers,
  deselectAllUsers,
  setSelectedUsers,
  setProcessingState,
  setCurrentProcessing,
  setProcessedCount,
  resetBotState,
  clearBotToken,
} = ncdsBotSlice.actions;

// Export selectors
export const selectBotState = (state: { ncdsBot: NCDsBotState }) => state.ncdsBot;
export const selectBotToken = (state: { ncdsBot: NCDsBotState }) => state.ncdsBot.botToken;
export const selectFollowupUsers = (state: { ncdsBot: NCDsBotState }) => state.ncdsBot.followupUsers;
export const selectSelectedUsers = (state: { ncdsBot: NCDsBotState }) => state.ncdsBot.selectedUsers;
export const selectIsProcessing = (state: { ncdsBot: NCDsBotState }) => state.ncdsBot.isProcessing;
export const selectProcessingProgress = (state: { ncdsBot: NCDsBotState }) => ({
  processed: state.ncdsBot.processedCount,
  total: state.ncdsBot.totalCount,
  current: state.ncdsBot.currentProcessing,
});

// Export reducer
export default ncdsBotSlice.reducer;