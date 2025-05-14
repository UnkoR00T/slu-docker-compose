<script setup lang="ts">
import { useMainData } from '@/stores/mainDataStore.ts'
import { onBeforeMount, ref, type Ref } from 'vue'
import type { foulType } from '@/types/foulType.ts'
import { useI18n } from 'vue-i18n'
import { useToast } from '@/stores/toastController.ts'

const mainDataStore = useMainData()

const editGoalTeam: Ref<number> = ref(0)
const editGoalIndex: Ref<number> = ref(-1)

const hostTeamFouls = ref<foulType[]>([])
const guestTeamFouls = ref<foulType[]>([])

const hostPlayers = ref(mainDataStore.tempStorage.hostTeam.players)
const guestPlayers = ref(mainDataStore.tempStorage.guestTeam.players)

const { t } = useI18n()
const toastController = useToast();

const load = () => {
  hostTeamFouls.value = mainDataStore.tempStorage.hostTeam.fouls
  guestTeamFouls.value = mainDataStore.tempStorage.guestTeam.fouls
  hostPlayers.value = mainDataStore.tempStorage.hostTeam.players
  guestPlayers.value = mainDataStore.tempStorage.guestTeam.players
}

const addFoul = async (team: number) => {
  let index = -1;
  await mainDataStore.fouls.add(team, null, 2, '', '').then((res)=>{
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
    mainDataStore.fouls.remove(team, index).then(() => saveGoals()).catch(()=>{});
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
            <th class="w-24">{{ $t('midtab.start') }}</th>
            <th class="w-24">{{ $t('midtab.end') }}</th>
            <th class="w-24">{{ $t('midtab.time') }}</th>
            <th>{{ $t('midtab.player') }}</th>
            <th>{{ $t('midtab.code') }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(goal, index) in hostTeamFouls" :key="index">
            <td>
              <button class="btn btn-primary btn-sm mr-1" @click="edit(1, index)">
                {{ $t('global.edit') }}
              </button>
              <button class="btn btn-sm btn-error" @click="removeGoal(1, index)">
                {{ $t('global.delete') }}
              </button>
            </td>
            <td>
                <span v-if="editGoalTeam === 1 && editGoalIndex === index">
                  <input
                    type="text"
                    v-model="goal.start"
                    placeholder="17:99"
                    class="input input-sm w-24"
                  />
                </span>
              <span v-else>{{ goal.start }}</span>
            </td>
            <td>
                <span v-if="editGoalTeam === 1 && editGoalIndex === index">
                  <input
                    type="text"
                    v-model="goal.end"
                    placeholder="17:99"
                    class="input input-sm w-24"
                  />
                </span>
              <span v-else>{{ goal.end }}</span>
            </td>
            <td>
                <span v-if="editGoalTeam === 1 && editGoalIndex === index">
                  <input
                    type="text"
                    v-model="goal.time"
                    placeholder="2"
                    class="input input-sm w-24"
                  />
                </span>
              <span v-else>{{ goal.time }}min</span>
            </td>
            <td>
                <span v-if="editGoalTeam === 1 && editGoalIndex === index">
                  <input list="players_fouls" class="input input-sm" v-model="goal.playerId" />
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
              <span v-else>{{ goal.playerId }}</span>
            </td>
            <td>
                <span v-if="editGoalTeam === 1 && editGoalIndex === index">
                  <input list="codes_foul" class="input input-sm" v-model="goal.code" />
                  <datalist id="codes_foul">
                    <option value="201">201 - {{$t('fouls.201')}}</option>
                    <option value="201">202 - {{$t('fouls.202')}}</option>
                    <option value="203">203 - {{$t('fouls.203')}}</option>
                    <option value="205">205 - {{$t('fouls.205')}}</option>
                    <option value="206">206 - {{$t('fouls.206')}}</option>
                    <option value="209">209 - {{$t('fouls.209')}}</option>
                    <option value="210">210 - {{$t('fouls.210')}}</option>
                    <option value="211">211 - {{$t('fouls.211')}}</option>
                    <option value="212">212 - {{$t('fouls.212')}}</option>
                    <option value="213">213 - {{$t('fouls.213')}}</option>
                    <option value="215">215 - {{$t('fouls.215')}}</option>
                    <option value="216">216 - {{$t('fouls.216')}}</option>
                    <option value="217">217 - {{$t('fouls.217')}}</option>
                    <option value="218">218 - {{$t('fouls.218')}}</option>
                    <option value="219">219 - {{$t('fouls.219')}}</option>
                    <option value="220">220 - {{$t('fouls.220')}}</option>
                    <option value="221">221 - {{$t('fouls.221')}}</option>
                    <option value="222">222 - {{$t('fouls.222')}}</option>
                    <option value="224">224 - {{$t('fouls.224')}}</option>
                    <option value="225">225 - {{$t('fouls.225')}}</option>
                    <option value="501">501 - {{$t('fouls.501')}}</option>
                    <option value="502">502 - {{$t('fouls.502')}}</option>
                    <option value="503">503 - {{$t('fouls.503')}}</option>
                    <option value="504">504 - {{$t('fouls.504')}}</option>
                    <option value="101">101 - {{$t('fouls.101')}}</option>
                    <option value="102">102 - {{$t('fouls.102')}}</option>
                    <option value="301">301 - {{$t('fouls.301')}}</option>
                    <option value="302">302 - {{$t('fouls.302')}}</option>
                  </datalist>
                </span>
              <span v-else>{{ goal.code }}</span>
            </td>
          </tr>
          <tr>
            <td colspan="6">
              <button @click="addFoul(1)" class="text-blue-600 hover:underline cursor-pointer">
                + {{ $t('midtab.addfoul') }}
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
            <th class="w-24">{{ $t('midtab.start') }}</th>
            <th class="w-24">{{ $t('midtab.end') }}</th>
            <th class="w-24">{{ $t('midtab.time') }}</th>
            <th>{{ $t('midtab.player') }}</th>
            <th>{{ $t('midtab.code') }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(goal, index) in guestTeamFouls" :key="index">
            <td>
              <button class="btn btn-primary btn-sm mr-1" @click="edit(2, index)">
                {{ $t('global.edit') }}
              </button>
              <button class="btn btn-sm btn-error" @click="removeGoal(2, index)">
                {{ $t('global.delete') }}
              </button>
            </td>
            <td>
                <span v-if="editGoalTeam === 2 && editGoalIndex === index">
                  <input
                    type="text"
                    v-model="goal.start"
                    placeholder="17:99"
                    class="input input-sm w-24"
                  />
                </span>
              <span v-else>{{ goal.start }}</span>
            </td>
            <td>
                <span v-if="editGoalTeam === 2 && editGoalIndex === index">
                  <input
                    type="text"
                    v-model="goal.end"
                    placeholder="17:99"
                    class="input input-sm w-24"
                  />
                </span>
              <span v-else>{{ goal.end }}</span>
            </td>
            <td>
                <span v-if="editGoalTeam === 2 && editGoalIndex === index">
                  <input
                    type="text"
                    v-model="goal.time"
                    placeholder="2"
                    class="input input-sm w-24"
                  />
                </span>
              <span v-else>{{ goal.time }}min</span>
            </td>
            <td>
                <span v-if="editGoalTeam === 2 && editGoalIndex === index">
                  <input list="players_fouls2" class="input input-sm" v-model="goal.playerId" />
                  <datalist id="players_fouls2">
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
                  <input list="codes_foul2" class="input input-sm" v-model="goal.code" />
                  <datalist id="codes_foul2">
                    <option value="201">201 - {{$t('fouls.201')}}</option>
                    <option value="201">202 - {{$t('fouls.202')}}</option>
                    <option value="203">203 - {{$t('fouls.203')}}</option>
                    <option value="205">205 - {{$t('fouls.205')}}</option>
                    <option value="206">206 - {{$t('fouls.206')}}</option>
                    <option value="209">209 - {{$t('fouls.209')}}</option>
                    <option value="210">210 - {{$t('fouls.210')}}</option>
                    <option value="211">211 - {{$t('fouls.211')}}</option>
                    <option value="212">212 - {{$t('fouls.212')}}</option>
                    <option value="213">213 - {{$t('fouls.213')}}</option>
                    <option value="215">215 - {{$t('fouls.215')}}</option>
                    <option value="216">216 - {{$t('fouls.216')}}</option>
                    <option value="217">217 - {{$t('fouls.217')}}</option>
                    <option value="218">218 - {{$t('fouls.218')}}</option>
                    <option value="219">219 - {{$t('fouls.219')}}</option>
                    <option value="220">220 - {{$t('fouls.220')}}</option>
                    <option value="221">221 - {{$t('fouls.221')}}</option>
                    <option value="222">222 - {{$t('fouls.222')}}</option>
                    <option value="224">224 - {{$t('fouls.224')}}</option>
                    <option value="225">225 - {{$t('fouls.225')}}</option>
                    <option value="501">501 - {{$t('fouls.501')}}</option>
                    <option value="502">502 - {{$t('fouls.502')}}</option>
                    <option value="503">503 - {{$t('fouls.503')}}</option>
                    <option value="504">504 - {{$t('fouls.504')}}</option>
                    <option value="101">101 - {{$t('fouls.101')}}</option>
                    <option value="102">102 - {{$t('fouls.102')}}</option>
                    <option value="301">301 - {{$t('fouls.301')}}</option>
                    <option value="302">302 - {{$t('fouls.302')}}</option>
                  </datalist>
                </span>
              <span v-else>{{ goal.code }}</span>
            </td>
          </tr>
          <tr>
            <td colspan="6">
              <button @click="addFoul(2)" class="text-blue-600 hover:underline cursor-pointer">
                + {{ $t('midtab.addfoul') }}
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
