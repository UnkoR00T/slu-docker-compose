<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useToast } from '@/stores/toastController.ts'
const { locale } = useI18n()
const lang = localStorage.getItem('lang') || 'en'
function switchLang(lang: string) {
  locale.value = lang
}
switchLang(lang)
const toastController = useToast();
</script>

<template>
  <div>
    <RouterView />
    <div class="toast toast-end">
      <div class="alert alert-info flex flex-col w-[400px]" v-for="toast in toastController.toasts" @click="toastController.removeToast(toast.id)" :key="toast.id">
        <p>
          <span>{{toast.msg}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
