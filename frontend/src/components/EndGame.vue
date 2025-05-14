<script setup lang="ts">
import { useMainData } from '@/stores/mainDataStore.ts'
import { ref, type Ref } from 'vue'
import type { gameInfoType } from '@/types/gameInfoType.ts'
import { useI18n } from 'vue-i18n'
import { useToast } from '@/stores/toastController.ts'

const mainDataStore = useMainData()
const localGameInfo: Ref<gameInfoType> = ref(mainDataStore.tempStorage.gameInfo)

const { t } = useI18n()
const toastController = useToast();

const save = () => {
  mainDataStore.tempStorage.gameInfo = localGameInfo.value
  mainDataStore.data
    .save()
    .then(() => {
      toastController.addToast(t('global.saved'));
    })
    .catch(() => {})
}
</script>

<template>
  <h1 class="text-xl mb-2 font-bold">{{ $t('endtab.endinfo') }}:</h1>
  <main class="flex flex-col gap-2">
    <div>
      <p>{{ $t('endtab.ended') }}</p>
      <input
        type="text"
        class="input w-75"
        name="start"
        v-model="localGameInfo.end"
        placeholder="16:59"
      />
    </div>

    <div class="buttons flex gap-3 mt-5">
      <button class="btn btn-primary" @click="save()">
        <p class="text-xl">{{ $t('global.save') }}</p>
      </button>
    </div>
  </main>
</template>

<style scoped></style>
