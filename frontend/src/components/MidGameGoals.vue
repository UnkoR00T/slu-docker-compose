<script setup lang="ts">
import { useMainData } from '@/stores/mainDataStore.ts'
import { mainGameType } from '@/types/mainGameType.ts'
import { onBeforeMount, ref, type Ref } from 'vue'
import type { goalType } from '@/types/goalType.ts'
import { useI18n } from 'vue-i18n'
import { useToast } from '@/stores/toastController.ts'

const mainDataStore = useMainData()

const editGoalTeam: Ref<number> = ref(0)
const editGoalIndex: Ref<number> = ref(-1)

const hostTeamGoals = ref<goalType[]>([])
const guestTeamGoals = ref<goalType[]>([])

const hostPlayers = ref(mainDataStore.tempStorage.hostTeam.players)
const guestPlayers = ref(mainDataStore.tempStorage.guestTeam.players)

const { t } = useI18n()
const toastController = useToast();

const load = () => {
  hostTeamGoals.value = mainDataStore.tempStorage.hostTeam.goals
  guestTeamGoals.value = mainDataStore.tempStorage.guestTeam.goals

  hostPlayers.value = mainDataStore.tempStorage.hostTeam.players
  guestPlayers.value = mainDataStore.tempStorage.guestTeam.players
};

const addGoal = async (team: number) => {
  let index = -1;
  await mainDataStore.goals.add(team, null, null, '', '').then((res) => {
    saveGoals();
    index = res;
  }).catch(() => {});
  editGoalTeam.value = team
  editGoalIndex.value = index
}
const edit = (team: number, index: number) => {
  if (editGoalTeam.value == team && editGoalIndex.value == index) {
    editGoalTeam.value = 0
    editGoalIndex.value = -1
  } else {
    editGoalTeam.value = team
    editGoalIndex.value = index
  }
}
const removeGoal = (team: number, index: number) => {
  if (confirm('Are you sure?')) {
    mainDataStore.goals.remove(team, index).then(() => saveGoals()).catch(()=>{});
  }
}

const saveGoals = async (sendToast: boolean = true) => {
  mainDataStore.data
    .save()
    .then(() => {
      if (sendToast) toastController.addToast(t('global.saved'));
    })
    .catch(() => {
      alert('Something went wrong!')
    })
}

onBeforeMount(() => load());
</script>

<template>
  <h1 class="text-xl mb-2 font-bold">{{ $t('midtab.midgame') }}:</h1>
  <div class="teamSeparator">
    <div class="mb-4">
      <h2 class="text-lg font-bold mb-2">{{ $t('midtab.hostgoals') }}</h2>
      <div class="overflow-x-auto">
        <table class="table table-zebra table-sm">
          <thead>
            <tr>
              <th class="w-[160px]">{{ $t('global.actions') }}</th>
              <th class="w-[100px]">{{ $t('midtab.goal') }} #</th>
              <th class="w-[5rem]">{{ $t('midtab.time') }}</th>
              <th>{{ $t('midtab.player') }}</th>
              <th>{{ $t('midtab.assist') }}</th>
              <th>{{ $t('midtab.code') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(goal, index) in hostTeamGoals" :key="index">
              <td>
                <button class="btn btn-primary btn-sm mr-1" @click="edit(1, index)">
                  {{ $t('global.edit') }}
                </button>
                <button class="btn btn-sm btn-error" @click="removeGoal(1, index)">
                  {{ $t('global.delete') }}
                </button>
              </td>
              <td>{{ goal.goalNumber }}</td>
              <td>
                <span v-if="editGoalTeam === 1 && editGoalIndex === index">
                  <input
                    type="text"
                    v-model="goal.time"
                    placeholder="17:99"
                    class="input input-sm w-24"
                  />
                </span>
                <span v-else>{{ goal.time }}</span>
              </td>
              <td>
                <span v-if="editGoalTeam === 1 && editGoalIndex === index">
                  <input list="players" class="input input-sm" v-model="goal.playerId" />
                  <datalist id="players">
                    <option
                      v-for="player in hostPlayers"
                      :key="player.number"
                      :value="player.number"
                    >
                      {{ player.number }} - {{ player.name }}
                    </option>
                  </datalist>
                </span>
                <span v-else>{{ goal.playerId }}</span>
              </td>
              <td>
                <span v-if="editGoalTeam === 1 && editGoalIndex === index">
                  <input list="players2" class="input input-sm" v-model="goal.assistId" />
                  <datalist id="players2">
                    <option
                      v-for="player in hostPlayers"
                      :key="player.number"
                      :value="player.number"
                    >
                      {{ player.number }} - {{ player.name }}
                    </option>
                  </datalist>
                </span>
                <span v-else>{{ !goal.assistId ? 'None' : goal.assistId }}</span>
              </td>
              <td>
                <span v-if="editGoalTeam === 1 && editGoalIndex === index">
                  <input list="codes" class="input input-sm" v-model="goal.code" />
                  <datalist id="codes">
                    <option value="PP">{{ $t('codes.powerplay') }}</option>
                    <option value="SH">{{ $t('codes.shorthanded') }}</option>
                    <option value="ESH">{{ $t('codes.esh') }}</option>
                    <option value="DP">{{ $t('codes.delayedPenalty') }}</option>
                    <option value="PS">{{ $t('codes.penaltyShot') }}</option>
                    <option value="MPS">{{ $t('codes.missedPenaltyShot') }}</option>
                    <option value="WG">{{ $t('codes.emptyNet') }}</option>
                    <option value="EN">{{ $t('codes.emptyGoal') }}</option>
                    <option value="OG">{{ $t('codes.ownGoal') }}</option>
                    <option value="ET">{{ $t('codes.overtime') }}</option>
                  </datalist>
                </span>
                <span v-else>{{ goal.code }}</span>
              </td>
            </tr>
            <tr>
              <td colspan="6">
                <button @click="addGoal(1)" class="text-blue-600 hover:underline cursor-pointer">
                  + {{ $t('midtab.addgoal') }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div>
      <h2 class="text-lg font-bold mb-2">{{ $t('midtab.guestgoals') }}</h2>
      <div class="overflow-x-auto">
        <table class="table table-zebra table-sm">
          <thead>
            <tr>
              <th class="w-[160px]">{{ $t('global.actions') }}</th>
              <th class="w-[100px]">{{ $t('midtab.goal') }} #</th>
              <th class="w-[5rem]">{{ $t('midtab.time') }}</th>
              <th>{{ $t('midtab.player') }}</th>
              <th>{{ $t('midtab.assist') }}</th>
              <th>{{ $t('midtab.code') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(goal, index) in guestTeamGoals" :key="index">
              <td>
                <button class="btn btn-sm btn-primary mr-1" @click="edit(2, index)">
                  {{ $t('global.edit') }}
                </button>
                <button class="btn btn-sm btn-error" @click="removeGoal(2, index)">
                  {{ $t('global.delete') }}
                </button>
              </td>
              <td>{{ goal.goalNumber }}</td>
              <td>
                <span v-if="editGoalTeam === 2 && editGoalIndex === index">
                  <input
                    type="text"
                    v-model="goal.time"
                    placeholder="17:99"
                    class="input input-sm w-24"
                  />
                </span>
                <span v-else>{{ goal.time }}</span>
              </td>
              <td>
                <span v-if="editGoalTeam === 2 && editGoalIndex === index">
                  <input list="players" class="input input-sm" v-model="goal.playerId" />
                  <datalist id="players">
                    <option
                      v-for="player in guestPlayers"
                      :key="player.number"
                      :value="player.number"
                    >
                      {{ player.number }} - {{ player.name }}
                    </option>
                  </datalist>
                </span>
                <span v-else>{{ goal.playerId }}</span>
              </td>
              <td>
                <span v-if="editGoalTeam === 2 && editGoalIndex === index">
                  <input list="players2" class="input input-sm" v-model="goal.assistId" />
                  <datalist id="players2">
                    <option
                      v-for="player in guestPlayers"
                      :key="player.number"
                      :value="player.number"
                    >
                      {{ player.number }} - {{ player.name }}
                    </option>
                  </datalist>
                </span>
                <span v-else>{{ !goal.assistId ? 'None' : goal.assistId }}</span>
              </td>
              <td>
                <span v-if="editGoalTeam === 2 && editGoalIndex === index">
                  <input list="codes" class="input input-sm" v-model="goal.code" />
                  <datalist id="codes">
                    <option value="PP">{{ $t('codes.powerplay') }}</option>
                    <option value="SH">{{ $t('codes.shorthanded') }}</option>
                    <option value="ESH">{{ $t('codes.esh') }}</option>
                    <option value="DP">{{ $t('codes.delayedPenalty') }}</option>
                    <option value="PS">{{ $t('codes.penaltyShot') }}</option>
                    <option value="MPS">{{ $t('codes.missedPenaltyShot') }}</option>
                    <option value="WG">{{ $t('codes.emptyNet') }}</option>
                    <option value="EN">{{ $t('codes.emptyGoal') }}</option>
                    <option value="OG">{{ $t('codes.ownGoal') }}</option>
                    <option value="ET">{{ $t('codes.overtime') }}</option>
                  </datalist>
                </span>
                <span v-else>{{ goal.code }}</span>
              </td>
            </tr>
            <tr>
              <td colspan="6">
                <button @click="addGoal(2)" class="text-blue-600 hover:underline cursor-pointer">
                  + {{ $t('midtab.addgoal') }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="buttons flex gap-3 mt-5">
    <button class="btn btn-primary" @click="saveGoals()">
      <p class="text-xl">{{ $t('global.save') }}</p>
    </button>
  </div>
</template>

<style scoped></style>
