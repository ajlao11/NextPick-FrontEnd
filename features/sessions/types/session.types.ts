export type SessionStatus =
  | 'DRAFT'
  | 'UPCOMING'
  | 'LIVE'
  | 'COMPLETED'
  | 'CANCELLED';

export type GameFormat =
  | 'SINGLES'
  | 'DOUBLES';

export type MatchingStyle =
  | 'RANDOM_ROUND_ROBIN'
  | 'WINNERS_LOSERS'
  | 'KING_OF_THE_COURT'
  | 'WINNER_STAYS'
  | 'BALANCED_SKILL';

export interface Session {
  id: string;
  name: string;
  date: string;
  startTime?: string | null;
  endTime?: string | null;
  courtCount: number;
  maxPlayers?: number | null;
  gameFormat: GameFormat;
  matchingStyle: MatchingStyle;
  status: SessionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSessionData {
  name: string;
  date: string;
  startTime?: string;
  endTime?: string;
  courtCount: number;
  maxPlayers?: number;
  gameFormat: GameFormat;
  matchingStyle: MatchingStyle;
}

export interface Player {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface SessionPlayer {
  id: string;
  sessionId: string;
  playerId: string;
  skillRating: number | null;
  checkedIn: boolean;
  createdAt: string;
  player: Player;
}

export interface CreatePlayerData {
  name: string;
  skillRating?: number;
}

export type QueueStatus =
  | 'WAITING'
  | 'PLAYING'
  | 'SKIPPED';

export interface QueuePlayer {
  id: string;
  sessionId: string;
  sessionPlayerId: string;
  position: number;
  status: QueueStatus;
  createdAt: string;
  updatedAt: string;
  sessionPlayer: SessionPlayer;
}

export type CourtStatus =
  | 'AVAILABLE'
  | 'PLAYING'
  | 'MAINTENANCE';

export interface Court {
  id: string;
  sessionId: string;
  number: number;
  name: string;
  status: CourtStatus;
  createdAt: string;
  updatedAt: string;
}

export type MatchStatus =
  | 'PENDING'
  | 'LIVE'
  | 'COMPLETED'
  | 'CANCELLED';

export interface MatchPlayer {
  id: string;
  matchId: string;
  playerId: string;
  team: number;
  position: number;
  createdAt: string;

  player: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface Match {
  id: string;
  sessionId: string;
  courtId: string | null;

  round: number;
  status: MatchStatus;

  team1Score: number | null;
  team2Score: number | null;
  winningTeam: number | null;

  startedAt: string | null;
  completedAt: string | null;

  createdAt: string;
  updatedAt: string;

  court: Court | null;
  players: MatchPlayer[];
}