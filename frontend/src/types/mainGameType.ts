import type { teamType } from '@/types/teamType.ts'
import type { gameInfoType } from '@/types/gameInfoType.ts'

class mainGameType {
  hostTeam: teamType = {
    name: '',
    players: [],
    trainers: [],
    goals: [],
    fouls: [],
    goalkeeps: [],
  }
  guestTeam: teamType = {
    name: '',
    players: [],
    trainers: [],
    goals: [],
    fouls: [],
    goalkeeps: [],
  }
  gameInfo: gameInfoType = {
    organizer: '',
    games: '',
    place: '',
    date: new Date().toDateString(),
    game_number: 0,
    start: '16:00',
    end: '17:00',
    halfTime: 15,
    halfCount: 3
  }

  constructor() {
    return this
  }
}

export { mainGameType }
