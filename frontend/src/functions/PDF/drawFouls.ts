import { type PDFFont, type PDFPage, rgb } from 'pdf-lib'
import type { mainGameType } from '@/types/mainGameType.ts'
import { getCords } from '@/functions/PDF/getCords.ts'

const drawFouls = (page: PDFPage, data: mainGameType, font: PDFFont) => {
  data.hostTeam.fouls.forEach((goal, index) => {
    if (index >= 13) {
      return
    }
    if(goal.playerId){
      page.drawText(goal.playerId?.toString(), {
        ...getCords(242.5, 54.5 + (3.9 * index - (index > 2 ? 0.7 : 0) - (index > 13 ? 1.2 : 0))),
        size: 7,
        font,
        color: rgb(0, 0, 0),
      })
    }
    if(goal.time){
      page.drawText(goal.time.toString(), {
        ...getCords(252.5, 54.5 + (3.9 * index - (index > 2 ? 0.7 : 0) - (index > 13 ? 1.2 : 0))),
        size: 7,
        font,
        color: rgb(0, 0, 0),
      })
    }
    page.drawText(goal.start, {
      ...getCords(269, 54.5 + (3.9 * index - (index > 2 ? 0.7 : 0) - (index > 13 ? 1.2 : 0))),
      size: 7,
      font,
      color: rgb(0, 0, 0),
    })

    page.drawText(goal.end, {
      ...getCords(281, 54.5 + (3.9 * index - (index > 2 ? 0.7 : 0) - (index > 13 ? 1.2 : 0))),
      size: 7,
      font,
      color: rgb(0, 0, 0),
    })
    page.drawText(goal.code, {
      ...getCords(260, 54.5 + (3.9 * index - (index > 2 ? 0.7 : 0) - (index > 13 ? 1.2 : 0))),
      size: 7,
      font,
      color: rgb(0, 0, 0),
    })
  })
  data.guestTeam.fouls.forEach((goal, index) => {
    const offset = (3.9 * index - (index > 4 ? 1.5 : 0));
    if (index >= 13) {
      return
    }
    if(goal.playerId) {
      page.drawText(goal.playerId?.toString(), {
        ...getCords(242.5, 147 + offset),
        size: 7,
        font,
        color: rgb(0, 0, 0),
      })
    }
    if(goal.time){
      page.drawText(goal.time.toString(), {
        ...getCords(252.5, 147+ offset),
        size: 7,
        font,
        color: rgb(0, 0, 0),
      })
    }
    page.drawText(goal.start, {
      ...getCords(269, 147 + offset),
      size: 7,
      font,
      color: rgb(0, 0, 0),
    })

    page.drawText(goal.end, {
      ...getCords(281, 147+ offset),
      size: 7,
      font,
      color: rgb(0, 0, 0),
    })
    page.drawText(goal.code, {
      ...getCords(260, 147 + offset),
      size: 7,
      font,
      color: rgb(0, 0, 0),
    })
  })
}

export { drawFouls }
