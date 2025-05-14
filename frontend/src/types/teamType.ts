import type { playerType } from '@/types/playerType.ts'
import type { goalType } from '@/types/goalType.ts'
import type { foulType } from '@/types/foulType.ts'
import type { goalkeepType } from '@/types/goalkeepType.ts'

type teamType = {
  name: string
  players: playerType[]
  trainers: string[]
  goals: goalType[]
  fouls: foulType[]
  goalkeeps: goalkeepType[]
}

export type { teamType }
