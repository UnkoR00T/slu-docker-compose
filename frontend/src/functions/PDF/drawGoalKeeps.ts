import type { mainGameType } from '@/types/mainGameType.ts'
import { type PDFFont, type PDFPage, rgb } from 'pdf-lib'
import { getCords } from '@/functions/PDF/getCords.ts'

const drawGoalKeeps = (page: PDFPage, data: mainGameType, font: PDFFont) => {
  data.hostTeam.goalkeeps.forEach((goal, index) => {
    if(index <= 2 && goal.playerId){
      const offset = 3.9 * index;
      page.drawText(goal.playerId?.toString(), {
        ...getCords(10, 92 + offset),
        size: 7,
        font,
        color: rgb(0, 0, 0)
      });
      page.drawText(goal.time?.toString(), {
        ...getCords(25, 92 + offset),
        size: 7,
        font,
        color: rgb(0, 0, 0)
      });
      page.drawText(goal.count[0]?.toString(), {
        ...getCords(44.5, 92 + offset),
        size: 7,
        font,
        color: rgb(0, 0, 0)
      });
      page.drawText(goal.count[1]?.toString(), {
        ...getCords(55.5, 92 + offset),
        size: 7,
        font,
        color: rgb(0, 0, 0)
      });
      page.drawText(goal.count[2]?.toString(), {
        ...getCords(66, 92 + offset),
        size: 7,
        font,
        color: rgb(0, 0, 0)
      });
      const count = goal.count.reduce((a: number, b: number) => a + b, 0);
      page.drawText(count.toString(), {
        ...getCords(88.5, 92 + offset),
        size: 7,
        font,
        color: rgb(0, 0, 0)
      });
    }
  })
  data.guestTeam.goalkeeps.forEach((goal, index) => {
    if(index <= 2 && goal.playerId){
      const offset = 3.9 * index;
      page.drawText(goal.playerId?.toString(), {
        ...getCords(10, 111.5 + offset),
        size: 7,
        font,
        color: rgb(0, 0, 0)
      });
      page.drawText(goal.time?.toString(), {
        ...getCords(25, 111.5 + offset),
        size: 7,
        font,
        color: rgb(0, 0, 0)
      });
      page.drawText(goal.count[0]?.toString(), {
        ...getCords(44.5, 111.5 + offset),
        size: 7,
        font,
        color: rgb(0, 0, 0)
      });
      page.drawText(goal.count[1]?.toString(), {
        ...getCords(55.5, 111.5 + offset),
        size: 7,
        font,
        color: rgb(0, 0, 0)
      });
      page.drawText(goal.count[2]?.toString(), {
        ...getCords(66, 111.5 + offset),
        size: 7,
        font,
        color: rgb(0, 0, 0)
      });
      const count = goal.count.reduce((a: number, b: number) => a + b, 0);
      page.drawText(count.toString(), {
        ...getCords(88.5, 111.5 + offset),
        size: 7,
        font,
        color: rgb(0, 0, 0)
      });
    }
  })
}

export {drawGoalKeeps}
