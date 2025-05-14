import { type PDFFont, type PDFPage, rgb } from 'pdf-lib'
import type { mainGameType } from '@/types/mainGameType.ts'
import { getCords } from '@/functions/PDF/getCords.ts'

const drawTrainers = (page: PDFPage, data: mainGameType, font: PDFFont) => {
  if(data.hostTeam.trainers[0]) {
    page.drawText(data.hostTeam.trainers[0]?.toString(), {
      ...getCords(131, 106),
      size: 10,
      font,
      color: rgb(0, 0, 0)
    });
  }
  if(data.hostTeam.trainers[1]) {
    page.drawText(data.hostTeam.trainers[1]?.toString(), {
      ...getCords(181.5, 103.5),
      size: 7,
      font,
      color: rgb(0, 0, 0)
    });
  }
  if(data.hostTeam.trainers[2]) {
    page.drawText(data.hostTeam.trainers[2]?.toString(), {
      ...getCords(181.5, 107.8),
      size: 7,
      font,
      color: rgb(0, 0, 0)
    });
  }
  if(data.hostTeam.trainers[3]) {
    page.drawText(data.hostTeam.trainers[3]?.toString(), {
      ...getCords(235, 103.5),
      size: 7,
      font,
      color: rgb(0, 0, 0)
    });
  }
  if(data.hostTeam.trainers[4]) {
    page.drawText(data.hostTeam.trainers[4]?.toString(), {
      ...getCords(235, 107.8),
      size: 7,
      font,
      color: rgb(0, 0, 0)
    });
  }



  if(data.guestTeam.trainers[0]){
    page.drawText(data.guestTeam.trainers[0]?.toString(), {
      ...getCords(131, 197),
      size: 10,
      font,
      color: rgb(0, 0, 0)
    });
  }
  if(data.guestTeam.trainers[1]){
    page.drawText(data.guestTeam.trainers[1]?.toString(), {
      ...getCords(181.5, 195.5),
      size: 7,
      font,
      color: rgb(0, 0, 0)
    });
  }
  if(data.guestTeam.trainers[2]) {
    page.drawText(data.guestTeam.trainers[2]?.toString(), {
      ...getCords(181.5, 199),
      size: 7,
      font,
      color: rgb(0, 0, 0)
    });
  }
  if(data.guestTeam.trainers[3]) {
    page.drawText(data.guestTeam.trainers[3]?.toString(), {
      ...getCords(235, 195.5),
      size: 7,
      font,
      color: rgb(0, 0, 0)
    });
  }
  if(data.guestTeam.trainers[4]) {
    page.drawText(data.guestTeam.trainers[4]?.toString(), {
      ...getCords(235, 199),
      size: 7,
      font,
      color: rgb(0, 0, 0)
    });
  }
}

export {drawTrainers}
