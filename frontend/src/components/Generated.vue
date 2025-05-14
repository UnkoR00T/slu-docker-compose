<script setup lang="ts">
import { PDFDocument } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { onMounted, ref } from 'vue';
import { useMainData } from '@/stores/mainDataStore.ts'
import { drawGoalsCount } from '@/functions/PDF/drawGoalsCount.ts'
import { drawGoals } from '@/functions/PDF/drawGoals.ts'
import { drawTeams } from '@/functions/PDF/drawTeams.ts'
import { drawInfo } from '@/functions/PDF/drawInfo.ts'
import { drawFouls } from '@/functions/PDF/drawFouls.ts'
import { drawGoalKeeps } from '@/functions/PDF/drawGoalKeeps.ts'
import { drawTrainers } from '@/functions/PDF/drawTrainers.ts'

const pdfUrl = '/site/pdf.pdf';
const editedPdfUrl = ref('');

const mainDataStore = useMainData();

const loadAndEditPDF = async () => {
  const existingPdfBytes = await fetch(pdfUrl).then(res => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);
  const fontBytes = await fetch('Roboto-Regular.ttf').then(res => res.arrayBuffer());
  const font = await pdfDoc.embedFont(fontBytes);


  const page = pdfDoc.getPages()[0];
  console.log(page.getHeight())

  // Info
  drawInfo(page, mainDataStore.tempStorage, font);

  // Goals count
  drawGoalsCount(page, mainDataStore.tempStorage, font);

  // Teams
  drawTeams(page, mainDataStore.tempStorage, font);

  // Goals
  drawGoals(page, mainDataStore.tempStorage, font);

  // Fouls
  drawFouls(page, mainDataStore.tempStorage, font);

  // Goalkeeps
  drawGoalKeeps(page, mainDataStore.tempStorage, font);

  // Trainers
  drawTrainers(page, mainDataStore.tempStorage, font);

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  editedPdfUrl.value = URL.createObjectURL(blob);
};

onMounted(() => {
  loadAndEditPDF();
});
</script>
<template>
    <iframe v-if="editedPdfUrl" :src="editedPdfUrl"></iframe>
</template>

<style scoped>
  iframe{
    height: 100dvh;
    width: 100%;
  }
</style>
