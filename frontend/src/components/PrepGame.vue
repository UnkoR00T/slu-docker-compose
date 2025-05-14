<script setup lang="ts">
import { useMainData } from '@/stores/mainDataStore.ts'
import type { playerType } from '@/types/playerType.ts'
import { onBeforeMount, ref, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from '@/stores/toastController.ts'

const mainDataStore = useMainData()

const editTeam: Ref<number> = ref(0)
const editIndex: Ref<number> = ref(-1)

const { t } = useI18n()
const toastController = useToast();

const hostTeamName: Ref<string> = ref('')
const guestTeamName: Ref<string> = ref('')
const hostTeamPlayers: Ref<playerType[]> = ref([])
const guestTeamPlayers: Ref<playerType[]> = ref([])
const hostTeamTrainers: Ref<string[]> = ref([])
const guestTeamTrainers: Ref<string[]> = ref([])
const load = () => {
  hostTeamName.value = mainDataStore.tempStorage.hostTeam.name
  guestTeamName.value = mainDataStore.tempStorage.guestTeam.name

  hostTeamPlayers.value = mainDataStore.tempStorage.hostTeam.players
  guestTeamPlayers.value = mainDataStore.tempStorage.guestTeam.players

  hostTeamTrainers.value = mainDataStore.tempStorage.hostTeam.trainers
  guestTeamTrainers.value = mainDataStore.tempStorage.guestTeam.trainers
};

const save = async () => {
  try {
    mainDataStore.tempStorage.hostTeam.name = hostTeamName.value
    mainDataStore.tempStorage.guestTeam.name = guestTeamName.value

    mainDataStore.tempStorage.hostTeam.players = hostTeamPlayers.value
    mainDataStore.tempStorage.guestTeam.players = guestTeamPlayers.value

    mainDataStore.tempStorage.hostTeam.trainers = hostTeamTrainers.value
    mainDataStore.tempStorage.guestTeam.trainers = guestTeamTrainers.value

    await mainDataStore.data.save()
    toastController.addToast(t('global.saved'));
  } catch (e) {
    alert('Error: ' + e)
  }
}

const addPlayer = (team: number) => {
  if (team == 1) {
    hostTeamPlayers.value.push({
      number: -1,
      name: '',
      capitan: false,
      goalkeeper: false,
      license: '',
    })
    editTeam.value = team
    editIndex.value = hostTeamPlayers.value.length - 1
  } else {
    guestTeamPlayers.value.push({
      number: -1,
      name: '',
      capitan: false,
      goalkeeper: false,
      license: '',
    })
    editTeam.value = team
    editIndex.value = guestTeamPlayers.value.length - 1
  }
}
const edit = (team: number, index: number) => {
  if (editTeam.value == team && editIndex.value == index) {
    editTeam.value = 0
    editIndex.value = -1
  } else {
    editTeam.value = team
    editIndex.value = index
  }
}
const remove = (team: number, index: number) => {
  if (confirm('Are you sure?')) {
    if (team == 1) {
      hostTeamPlayers.value.splice(index, 1)
    } else if (team == 2) {
      guestTeamPlayers.value.splice(index, 1)
    } else if (team == 3) {
      hostTeamTrainers.value.splice(index, 1)
    } else {
      guestTeamTrainers.value.splice(index, 1)
    }
  }
}

const addTrainer = (team: number) => {
  if (team == 1) {
    hostTeamTrainers.value.push('')
    edit(3, hostTeamTrainers.value.length - 1)
  } else {
    guestTeamTrainers.value.push('')
    edit(4, guestTeamTrainers.value.length - 1)
  }
}
onBeforeMount(()=>load());
</script>

<template>
  <main>
    <div>
      <div class="mb-3">
        <h1 class="text-2xl font-bold">{{ $t('pretab.host') }}:</h1>
        <input type="text" v-model="hostTeamName" class="input input-sm" />
      </div>

      <!-- Host Team Players Table -->
      <div class="overflow-x-auto mb-4">
        <h1 class="text-lg mt-2">{{ $t('pretab.players') }}:</h1>
        <table class="table table-zebra table-sm">
          <thead>
            <tr>
              <th class="w-[150px]">{{ $t('global.actions') }}</th>
              <th class="w-[100px]">#</th>
              <th>{{ $t('pretab.playername') }}</th>
              <th>{{ $t('pretab.capitan') }}</th>
              <th>{{ $t('pretab.goalkeeper') }}</th>
              <th>{{ $t('pretab.playerlicense') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(player, index) in hostTeamPlayers" :key="index">
              <td class="whitespace-nowrap">
                <button class="btn btn-primary btn-sm mr-1" @click="edit(1, index)">
                  {{ $t('global.edit') }}
                </button>
                <button class="btn btn-error btn-sm" @click="remove(1, index)">
                  {{ $t('global.delete') }}
                </button>
              </td>
              <td>
                <span v-if="editTeam === 1 && editIndex === index">
                  <input
                    type="number"
                    v-model="player.number"
                    :placeholder="t('pretab.playernumber')"
                    class="input input-sm w-20"
                  />
                </span>
                <span v-else>{{ player.number }}</span>
              </td>
              <td>
                <span v-if="editTeam === 1 && editIndex === index">
                  <input
                    type="text"
                    v-model="player.name"
                    :placeholder="t('pretab.playername')"
                    class="input input-sm"
                  />
                </span>
                <span v-else>{{ player.name }}</span>
              </td>
              <td>
                <span v-if="editTeam === 1 && editIndex === index">
                  <input type="checkbox" v-model="player.capitan" class="checkbox checkbox-sm" />
                </span>
                <span v-else>{{ player.capitan ? t('global.yes') : t('global.no') }}</span>
              </td>
              <td>
                <span v-if="editTeam === 1 && editIndex === index">
                  <input type="checkbox" v-model="player.goalkeeper" class="checkbox checkbox-sm" />
                </span>
                <span v-else>{{ player.goalkeeper ? t('global.yes') : t('global.no') }}</span>
              </td>
              <td>
                <span v-if="editTeam === 1 && editIndex === index">
                  <input
                    type="text"
                    v-model="player.license"
                    :placeholder="t('pretab.playerlicense')"
                    class="input input-sm"
                  />
                </span>
                <span v-else>{{ player.license }}</span>
              </td>
            </tr>
            <tr>
              <td colspan="6">
                <span class="textInteractable text-blue-600 cursor-pointer" @click="addPlayer(1)">
                  + {{ $t('pretab.addplayer') }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Host Team Trainers Table -->
      <h1 class="text-lg mt-2">{{ $t('pretab.trainers') }}:</h1>
      <div class="overflow-x-auto">
        <table class="table table-zebra table-sm">
          <thead>
            <tr>
              <th class="w-[150px]">{{ $t('global.actions') }}</th>
              <th>{{ $t('pretab.trainer') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(trainer, index) in hostTeamTrainers" :key="index">
              <td>
                <button class="btn btn-primary btn-sm mr-1" @click="edit(3, index)">
                  {{ $t('global.edit') }}
                </button>
                <button class="btn btn-error btn-sm" @click="remove(3, index)">
                  {{ $t('global.delete') }}
                </button>
              </td>
              <td>
                <span v-if="editTeam === 3 && editIndex === index">
                  <input
                    type="text"
                    v-model="hostTeamTrainers[index]"
                    :placeholder="t('pretab.trainer')"
                    class="input input-sm"
                  />
                </span>
                <span v-else>{{ trainer !== '' ? trainer : t('global.none') }}</span>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <span class="textInteractable text-blue-600 cursor-pointer" @click="addTrainer(1)">
                  + {{ $t('pretab.addtrainer') }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="mt-5">
      <div class="mb-3">
        <h1 class="text-xl font-bold">{{ $t('pretab.guest') }}:</h1>
        <input type="text" v-model="guestTeamName" class="input input-sm" />
      </div>

      <!-- Guest Team Players Table -->
      <div class="overflow-x-auto mb-4">
        <h1 class="text-lg mt-2">{{ $t('pretab.players') }}:</h1>
        <table class="table table-zebra table-sm">
          <thead>
            <tr>
              <th class="w-[150px]">{{ $t('global.actions') }}</th>
              <th class="w-[100px]">#</th>
              <th>{{ $t('pretab.playername') }}</th>
              <th>{{ $t('pretab.capitan') }}</th>
              <th>{{ $t('pretab.goalkeeper') }}</th>
              <th>{{ $t('pretab.playerlicense') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(player, index) in guestTeamPlayers" :key="index">
              <td>
                <button class="btn btn-primary btn-sm mr-1" @click="edit(2, index)">
                  {{ $t('global.edit') }}
                </button>
                <button class="btn btn-error btn-sm" @click="remove(2, index)">
                  {{ $t('global.delete') }}
                </button>
              </td>
              <td>
                <span v-if="editTeam === 2 && editIndex === index">
                  <input
                    type="number"
                    v-model="player.number"
                    :placeholder="t('pretab.playernumber')"
                    class="input input-sm w-20"
                  />
                </span>
                <span v-else>{{ player.number }}</span>
              </td>
              <td>
                <span v-if="editTeam === 2 && editIndex === index">
                  <input
                    type="text"
                    v-model="player.name"
                    :placeholder="t('pretab.playername')"
                    class="input input-sm"
                  />
                </span>
                <span v-else>{{ player.name }}</span>
              </td>
              <td>
                <span v-if="editTeam === 2 && editIndex === index">
                  <input type="checkbox" v-model="player.capitan" class="checkbox checkbox-sm" />
                </span>
                <span v-else>{{ player.capitan ? t('global.yes') : t('global.no') }}</span>
              </td>
              <td>
                <span v-if="editTeam === 2 && editIndex === index">
                  <input type="checkbox" v-model="player.goalkeeper" class="checkbox checkbox-sm" />
                </span>
                <span v-else>{{ player.goalkeeper ? t('global.yes') : t('global.no') }}</span>
              </td>
              <td>
                <span v-if="editTeam === 2 && editIndex === index">
                  <input
                    type="text"
                    v-model="player.license"
                    :placeholder="t('pretab.playerlicense')"
                    class="input input-sm"
                  />
                </span>
                <span v-else>{{ player.license }}</span>
              </td>
            </tr>
            <tr>
              <td colspan="6">
                <span class="textInteractable text-blue-600 cursor-pointer" @click="addPlayer(2)">
                  + {{ $t('pretab.addplayer') }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Guest Team Trainers Table -->
      <div class="overflow-x-auto">
        <h1 class="text-lg mt-2">{{ $t('pretab.trainers') }}:</h1>
        <table class="table table-zebra table-sm">
          <thead>
            <tr>
              <th class="w-[150px]">{{ $t('global.actions') }}</th>
              <th>{{ $t('pretab.trainer') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(trainer, index) in guestTeamTrainers" :key="index">
              <td>
                <button class="btn btn-primary btn-sm mr-1" @click="edit(4, index)">
                  {{ $t('global.edit') }}
                </button>
                <button class="btn btn-error btn-sm" @click="remove(4, index)">
                  {{ $t('global.delete') }}
                </button>
              </td>
              <td>
                <span v-if="editTeam === 4 && editIndex === index">
                  <input
                    type="text"
                    v-model="guestTeamTrainers[index]"
                    :placeholder="t('pretab.trainer')"
                    class="input input-sm"
                  />
                </span>
                <span v-else>{{ trainer !== '' ? trainer : t('global.none') }}</span>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <span class="textInteractable text-blue-600 cursor-pointer" @click="addTrainer(2)">
                  + {{ $t('pretab.addtrainer') }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="buttons flex gap-3 mt-5">
      <button class="btn btn-primary" @click="save()">
        <p class="text-xl">{{ $t('global.save') }}</p>
      </button>
    </div>
  </main>
</template>

<style scoped></style>
