<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import api from '@/functions/api/auth.service.ts'

const router = useRouter();
const route = useRoute();
const token = route.query.token;
const onload = async () => {
  if(!token){
    window.location.href = `${import.meta.env.VITE_MAIN_SSO}/site?app=Unihokej`;
  }else{
    api.verify(token.toString()).then(() => {
      router.push('/info');
    })
  }
}
onload();
</script>
<template>
  <main></main>
</template>

<style scoped>

</style>
