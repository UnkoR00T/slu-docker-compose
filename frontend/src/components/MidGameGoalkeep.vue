<script setup lang="ts">
import { useMainData } from '@/stores/mainDataStore.ts'
import { onBeforeMount, ref, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from '@/stores/toastController.ts'
import type { goalkeepType } from '@/types/goalkeepType.ts'

const mainDataStore = useMainData()

const editGoalKeepTeam: Ref<number> = ref(0)
const editGoalKeepIndex: Ref<number> = ref(-1)

const hostTeamGoalkeeps = ref<goalkeepType[]>([])
const guestTeamGoalkeeps = ref<goalkeepType[]>([])

const hostPlayers = ref(mainDataStore.tempStorage.hostTeam.players)
const guestPlayers = ref(mainDataStore.tempStorage.guestTeam.players)

const { t } = useI18n()
const toastController = useToast();

const load = () => {
  hostTeamGoalkeeps.value = mainDataStore.tempStorage.hostTeam.goalkeeps
  guestTeamGoalkeeps.value = mainDataStore.tempStorage.guestTeam.goalkeeps
  hostPlayers.value = mainDataStore.tempStorage.hostTeam.players
  guestPlayers.value = mainDataStore.tempStorage.guestTeam.players
}

const addGoalkeep = async (team: number) => {
  let index = -1;
  await mainDataStore.goalKeeps.add(team, null, '').then((res)=>{
    save();
    index = res;
  }).catch(() => {});
  editGoalKeepTeam.value = team;
  editGoalKeepIndex.value = index;
}
const edit = (team: number, index: number) => {
  if (editGoalKeepTeam.value == team && editGoalKeepIndex.value == index) {
    editGoalKeepTeam.value = 0
    editGoalKeepIndex.value = -1
  } else {
    editGoalKeepTeam.value = team
    editGoalKeepIndex.value = index
  }
}
const remove = (team: number, index: number) => {
  if (confirm('Are you sure?')) {
    mainDataStore.goalKeeps.remove(team, index).then(() => save()).catch(()=>{});
  }
}

const save = async (sendToast: boolean = true) => {
  mainDataStore.data
    .save()
    .then(() => {
      if (sendToast) toastController.addToast(t('global.saved'));
    })
    .catch(() => {
      alert('Something went wrong!')
    })
}
onBeforeMount(() => load())
</script>

<template>
  <h1 class="text-xl mb-2 font-bold">{{ $t('midtab.midgame') }}:</h1>
  <div class="teamSeparator">
    <div class="mb-4">
      <h2 class="text-lg font-bold mb-2">{{ $t('midtab.hostfoul') }}</h2>
      <div class="overflow-x-auto">
        <table class="table table-zebra table-sm">
          <thead>
          <tr>
            <th class="w-45">{{ $t('global.actions') }}</th>
            <th class="w-75">{{ $t('midtab.player') }}</th>
            <th class="w-25">{{ $t('midtab.time') }}</th>
            <th>{{ $t('midtab.first_third') }}</th>
            <th>{{ $t('midtab.second_third') }}</th>
            <th>{{ $t('midtab.third_third') }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(goalkeep, index) in hostTeamGoalkeeps" :key="index">
            <td>
              <button class="btn btn-primary btn-sm mr-1" @click="edit(1, index)">
                {{ $t('global.edit') }}
              </button>
              <button class="btn btn-sm btn-error" @click="remove(1, index)">
                {{ $t('global.delete') }}
              </button>
            </td>
            <td>
                <span v-if="editGoalKeepTeam === 1 && editGoalKeepIndex === index">
                  <input list="players_fouls" class="input input-sm" v-model="goalkeep.playerId" />
                  <datalist id="players_fouls">
                    <option
                      v-for="player in hostPlayers"
                      :key="player.number"
                      :value="player.number"
                    >
                      {{ player.number }} - {{ player.name }}
                    </option>
                  </datalist>
                </span>
              <span v-else>{{ goalkeep.playerId }}</span>
            </td>
            <td>
                <span v-if="editGoalKeepTeam === 1 && editGoalKeepIndex === index">
                  <input
                    type="text"
                    v-model="goalkeep.time"
                    placeholder="00:00"
                    class="input input-sm w-24"
                  />
                </span>
              <span v-else>{{ goalkeep.time }}</span>
            </td>
            <td>
                <span v-if="editGoalKeepTeam === 1 && editGoalKeepIndex === index">
                  <input
                    type="number"
                    v-model="goalkeep.count[0]"
                    placeholder="12"
                    class="input input-sm w-24"
                  />
                </span>
              <span v-else>{{ goalkeep.count[0] }}</span>
            </td>
            <td>
                <span v-if="editGoalKeepTeam === 1 && editGoalKeepIndex === index">
                  <input
                    type="number"
                    v-model="goalkeep.count[1]"
                    placeholder="12"
                    class="input input-sm w-24"
                  />
                </span>
              <span v-else>{{ goalkeep.count[1] }}</span>
            </td>
            <td>
                <span v-if="editGoalKeepTeam === 1 && editGoalKeepIndex === index">
                  <input
                    type="number"
                    v-model="goalkeep.count[2]"
                    placeholder="12"
                    class="input input-sm w-24"
                  />
                </span>
              <span v-else>{{ goalkeep.count[2] }}</span>
            </td>
          </tr>
          <tr>
            <td colspan="6">
              <button @click="addGoalkeep(1)" class="text-blue-600 hover:underline cursor-pointer">
                + {{ $t('midtab.addgoalkeep') }}
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div>
      <h2 class="text-lg font-bold mb-2">{{ $t('midtab.guestfoul') }}</h2>
      <div class="overflow-x-auto">
        <table class="table table-zebra table-sm">
          <thead>
          <tr>
            <th class="w-45">{{ $t('global.actions') }}</th>
            <th class="w-75">{{ $t('midtab.player') }}</th>
            <th class="w-24">{{ $t('midtab.time') }}</th>
            <th>{{ $t('midtab.first_third') }}</th>
            <th>{{ $t('midtab.second_third') }}</th>
            <th>{{ $t('midtab.third_third') }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(goalkeep, index) in guestTeamGoalkeeps" :key="index">
            <td>
              <button class="btn btn-primary btn-sm mr-1" @click="edit(2, index)">
                {{ $t('global.edit') }}
              </button>
              <button class="btn btn-sm btn-error" @click="remove(2, index)">
                {{ $t('global.delete') }}
              </button>
            </td>
            <td>
                <span v-if="editGoalKeepTeam === 2 && editGoalKeepIndex === index">
                  <input list="players_fouls" class="input input-sm" v-model="goalkeep.playerId" />
                  <datalist id="players_fouls">
                    <option
                      v-for="player in guestPlayers"
                      :key="player.number"
                      :value="player.number"
                    >
                      {{ player.number }} - {{ player.name }}
                    </option>
                  </datalist>
                </span>
              <span v-else>{{ goalkeep.playerId }}</span>
            </td>
            <td>
                <span v-if="editGoalKeepTeam === 2 && editGoalKeepIndex === index">
                  <input
                    type="text"
                    v-model="goalkeep.time"
                    class="input input-sm w-24"
                  />
                </span>
              <span v-else>{{ goalkeep.time }}</span>
            </td>
            <td>
                <span v-if="editGoalKeepTeam === 2 && editGoalKeepIndex === index">
                  <input
                    type="number"
                    v-model="goalkeep.count[0]"
                    placeholder="12"
                    class="input input-sm w-24"
                  />
                </span>
              <span v-else>{{ goalkeep.count[0] }}</span>
            </td>
            <td>
                <span v-if="editGoalKeepTeam === 2 && editGoalKeepIndex === index">
                  <input
                    type="number"
                    v-model="goalkeep.count[1]"
                    placeholder="12"
                    class="input input-sm w-24"
                  />
                </span>
              <span v-else>{{ goalkeep.count[1] }}</span>
            </td>
            <td>
                <span v-if="editGoalKeepTeam === 2 && editGoalKeepIndex === index">
                  <input
                    type="number"
                    v-model="goalkeep.count[2]"
                    placeholder="12"
                    class="input input-sm w-24"
                  />
                </span>
              <span v-else>{{ goalkeep.count[2] }}</span>
            </td>
          </tr>
          <tr>
            <td colspan="6">
              <button @click="addGoalkeep(2)" class="text-blue-600 hover:underline cursor-pointer">
                + {{ $t('midtab.addgoalkeep') }}
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="buttons flex gap-3 mt-5">
    <button class="btn btn-primary" @click="save()">
      <p class="text-xl">{{ $t('global.save') }}</p>
    </button>
  </div>
</template>

<style scoped></style>
