import { api } from '@/lib/api';
import {
  CreateSessionData,
  Session,
} from '../types/session.types';

export const sessionService = {
  create(data: CreateSessionData) {
    return api.post<Session>('/sessions', data);
  },

  getById(id: string) {
    return api.get<Session>(`/sessions/${id}`);
  },

  update(sessionId: string){
    return api.patch(
      `/sessions/${sessionId}/complete`,
        {},
    );
  }
  
};


