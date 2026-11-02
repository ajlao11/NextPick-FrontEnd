'use client';

import { useState } from 'react';
import {
  GameFormat,
  MatchingStyle,
} from '../types/session.types';

export function useCreateSessionForm() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [courtCount, setCourtCount] = useState(4);
  const [maxPlayers, setMaxPlayers] = useState(16);

  const [gameFormat, setGameFormat] =
    useState<GameFormat>('DOUBLES');

  const [matchingStyle, setMatchingStyle] =
    useState<MatchingStyle>('RANDOM_ROUND_ROBIN');

  const decreaseCourts = () => {
    setCourtCount((current) => Math.max(1, current - 1));
  };

  const increaseCourts = () => {
    setCourtCount((current) => current + 1);
  };

  const formData = {
    name,
    date,
    startTime,
    endTime,
    courtCount,
    maxPlayers,
    gameFormat,
    matchingStyle,
  };

  return {
    name,
    setName,

    date,
    setDate,

    startTime,
    setStartTime,

    endTime,
    setEndTime,

    courtCount,
    decreaseCourts,
    increaseCourts,

    maxPlayers,
    setMaxPlayers,

    gameFormat,
    setGameFormat,

    matchingStyle,
    setMatchingStyle,

    formData,
  };
}