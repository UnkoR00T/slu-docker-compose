import { defineStore } from 'pinia'
import { mainGameType } from '@/types/mainGameType.ts'
import { ref, type Ref } from 'vue'
import type { teamType } from '@/types/teamType.ts'
import type { goalType } from '@/types/goalType.ts'
import type { foulType } from '@/types/foulType.ts'
import { useToast } from '@/stores/toastController.ts'
import { useI18n } from 'vue-i18n'
import type { goalkeepType } from '@/types/goalkeepType.ts'

export const useMainData = defineStore('main', () => {
  const { t } = useI18n()
  const toastController = useToast();

  const tempStorage: Ref<mainGameType> = ref({
    guestTeam: {
      name: '',
      players: [],
      trainers: [],
      goals: [],
      fouls: [],
      goalkeeps: [],
    },
    hostTeam: {
      name: '',
      players: [],
      trainers: [],
      goals: [],
      fouls: [],
      goalkeeps: [],
    },
    gameInfo: {
      organizer: '',
      games: '',
      place: '',
      date: '2000-01-01',
      game_number: 0,
      start: '',
      end: '',
      halfTime: 15,
      halfCount: 3
    },
  });

  setInterval(async () => {
    await data.save().then(() => {}).catch(() => {
      alert("Something went wrong!");
    });
    toastController.addToast(t('global.autosaved'));
  }, 2000 * 60);

  const fouls = {
    /**
     * Add foul to team
     * @param {number} team
     * @param {number | null} playerId
     * @param {string} time
     * @param {string} code
     * @param {string} starts
     */
    add: (
      team: number,
      playerId: number | null,
      time: number,
      code: string,
      starts: string,
    ): Promise<number> => {
      return new Promise<number>((resolve, reject) => {
        if (team != 1 && team != 2)
          reject(`Team: ${team} isnt supported. Team should be 1 (hosts) or 2 (guests).`)
        const target: teamType =
          team == 1 ? tempStorage.value.hostTeam : tempStorage.value.guestTeam
        if (!target) reject(`Failed to fetch target team.`)
        const foul: foulType = {
          playerId: playerId,
          time: time,
          code: code,
          start: starts,
          end: '',
        }
        const index = target.fouls.push(foul)
        resolve(index - 1)
      })
    },
    /** Marks fouls as ended.
     * @deprecated
     * @param {number} team number of team 1 - Host 2 - Guest
     * @param {number} foulIndex index of foul
     * @param {string} ends end time of foul
     */
    endFoul: (team: number, foulIndex: number, ends: string): Promise<void> => {
      return new Promise<void>((resolve, reject) => {
        if (team != 1 && team != 2)
          reject(`Team: ${team} isnt supported. Team should be 1 (hosts) or 2 (guests).`)
        const target: teamType =
          team == 1 ? tempStorage.value.hostTeam : tempStorage.value.guestTeam
        if (!target) reject(`Failed to fetch target team.`)
        if (!target.fouls[foulIndex]) reject(`Foul index is out of bounds.`)
        target.fouls[foulIndex].end = ends
        resolve()
      })
    },
    /**
     * Removes foul from list
     * @param {number} team number of team 1 - Host 2 - Guest
     * @param {number} foulIndex index of foul
     */
    remove: (team: number, foulIndex: number): Promise<void> => {
      return new Promise<void>((resolve, reject) => {
        if (team != 1 && team != 2)
          reject(`Team: ${team} isnt supported. Team should be 1 (hosts) or 2 (guests).`)
        const target: teamType =
          team == 1 ? tempStorage.value.hostTeam : tempStorage.value.guestTeam
        if (!target) reject(`Failed to fetch target team.`)
        if (!target.fouls[foulIndex]) reject(`Foul index is out of bounds.`)
        target.fouls.splice(foulIndex, 1);
        resolve()
      })
    },
  }
  const goals = {
    add: (
      team: number,
      playerId: number | null,
      assistId: number | null,
      time: string,
      code: string,
    ): Promise<number> => {
      return new Promise<number>((resolve, reject) => {
        if (team != 1 && team != 2)
          reject(`Team: ${team} isn't supported. Team should be 1 (hosts) or 2 (guests).`)
        const target: teamType =
          team == 1 ? tempStorage.value.hostTeam : tempStorage.value.guestTeam
        const goal: goalType = {
          goalNumber: target.goals.length,
          playerId: playerId,
          assistId: assistId,
          time: time,
          code: code,
        }
        const index = target.goals.push(goal)
        resolve(index - 1)
      })
    },
    remove: (team: number, goalIndex: number): Promise<void> => {
      return new Promise<void>((resolve, reject) => {
        const target: teamType =
          team == 1 ? tempStorage.value.hostTeam : tempStorage.value.guestTeam
        if (goalIndex >= target.goals.length) reject('Given goal index is out of bounds')
        target.goals.splice(goalIndex, 1);
        resolve()
      })
    },
  }
  const goalKeeps = {
    add: (team: number, playerId: number | null, time: string): Promise<number> => {
      return new Promise<number>((resolve, reject) => {
        if (team != 1 && team != 2)
          reject(`Team: ${team} isn't supported. Team should be 1 (hosts) or 2 (guests).`)
        const target: teamType =
          team == 1 ? tempStorage.value.hostTeam : tempStorage.value.guestTeam
        const goalkeep: goalkeepType = {
          playerId,
          time,
          count: [0,0,0]
        }
        const index = target.goalkeeps.push(goalkeep)
        resolve(index - 1)
      })
    },
    remove: (team: number, goalIndex: number): Promise<void> => {
      return new Promise<void>((resolve, reject) => {
        const target: teamType =
          team == 1 ? tempStorage.value.hostTeam : tempStorage.value.guestTeam
        if (goalIndex >= target.goalkeeps.length) reject('Given goalkeep index is out of bounds')
        target.goalkeeps.splice(goalIndex, 1);
        resolve()
      })
    },
  }
  const data = {
    save: (): Promise<void> => {
      return new Promise((resolve, reject) => {
        const json = JSON.stringify(tempStorage.value)
        localStorage.setItem('mainData', json)
        resolve()
      })
    },

    load: (): Promise<mainGameType> => {
      return new Promise((resolve, reject) => {
        const json = localStorage.getItem('mainData')
        if (json) {
          const temp = JSON.parse(json)
          tempStorage.value = temp
          resolve(temp)
        }
        reject('Failed to load main data')
      })
    },
    download: (): Promise<void> => {
      return new Promise<void>((resolve, reject) => {
        const jsonString = JSON.stringify(tempStorage.value, null, 2)
        const blob = new Blob([jsonString], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.download =
          tempStorage.value.gameInfo.game_number +
          '_' +
          tempStorage.value.gameInfo.organizer +
          '.json' // Desired file name
        document.body.appendChild(a) // Required for Firefox
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        resolve()
      })
    },
  }

  data
    .load()
    .then((res) => {
      console.log('Loaded data!')
    })
    .catch((err) => {
      alert(err + '. Generating!')
      data.save().then(() => {
        console.log('Generated and saved blank info!')
      })
    })

  return { tempStorage, data, goals, fouls, goalKeeps }
})
