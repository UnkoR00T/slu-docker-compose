import type { mainGameType } from '@/types/mainGameType.ts'
import { type PDFFont, type PDFPage, rgb } from 'pdf-lib'
import { getCords } from '@/functions/PDF/getCords.ts'

const drawGoals = (page: PDFPage, data: mainGameType, font: PDFFont) => {
  data.hostTeam.goals.forEach((goal, index) => {
    if(index >= 25){
      return;
    }
    if (index <= 19){
      page.drawText((index + 1).toString(), {
        ...getCords(187, 28+ (3.9 * index - (index > 2 ? 0.7 : 0) - (index > 13 ? 1.2 : 0))),
        size: 7,
        font,
        color: rgb(0, 0, 0)
      });
      page.drawText(goal.time.toString(), {
        ...getCords(197, 28+ (3.9 * index - (index > 2 ? 0.7 : 0) - (index > 13 ? 1.2 : 0))),
        size: 7,
        font,
        color: rgb(0, 0, 0)
      });
      if(goal.playerId){
        page.drawText(goal.playerId.toString(), {
          ...getCords(210, 28+ (3.9 * index - (index > 2 ? 0.7 : 0) - (index > 13 ? 1.2 : 0))),
          size: 7,
          font,
          color: rgb(0, 0, 0)
        });
      }
      if(goal.assistId){
        page.drawText(goal.assistId.toString(), {
          ...getCords(219, 28+ (3.9 * index - (index > 2 ? 0.7 : 0) - (index > 13 ? 1.2 : 0))),
          size: 7,
          font,
          color: rgb(0, 0, 0)
        });
      }
      if(goal.code){
        page.drawText(goal.code.toString(), {
          ...getCords(229, 28+ (3.9 * index - (index > 2 ? 0.7 : 0) - (index > 13 ? 1.2 : 0))),
          size: 7,
          font,
          color: rgb(0, 0, 0)
        });
      }
    }else{
      const index2 = index - 20;
      page.drawText((index + 1).toString(), {
        ...getCords(240, 28+ (3.9 * index2 - (index2 > 2 ? 0.7 : 0) - (index2 > 13 ? 1.2 : 0))),
        size: 7,
        font,
        color: rgb(0, 0, 0)
      });
      page.drawText(goal.time.toString(), {
        ...getCords(250, 28+ (3.9 * index2 - (index2 > 2 ? 0.7 : 0) - (index2 > 13 ? 1.2 : 0))),
        size: 7,
        font,
        color: rgb(0, 0, 0)
      });
      if(goal.playerId){
        page.drawText(goal.playerId.toString(), {
          ...getCords(260, 28+ (3.9 * index2 - (index2 > 2 ? 0.7 : 0) - (index2 > 13 ? 1.2 : 0))),
          size: 7,
          font,
          color: rgb(0, 0, 0)
        });
      }
      if(goal.assistId){
        page.drawText(goal.assistId.toString(), {
          ...getCords(270, 28+ (3.9 * index2 - (index2 > 2 ? 0.7 : 0) - (index2 > 13 ? 1.2 : 0))),
          size: 7,
          font,
          color: rgb(0, 0, 0)
        });
      }
      if(goal.code){
        page.drawText(goal.code.toString(), {
          ...getCords(280, 28+ (3.9 * index2 - (index2 > 2 ? 0.7 : 0) - (index2 > 13 ? 1.2 : 0))),
          size: 7,
          font,
          color: rgb(0, 0, 0)
        });
      }
    }
  })
  data.guestTeam.goals.forEach((goal, index) => {
    if(index >= 25){
      return;
    }
    if (index <= 19) {
      page.drawText((index + 1).toString(), {
        ...getCords(187, 119.5+ (3.9 * index - (index > 2 ? 0.1 : 0) - (index > 11 ? 1.5 : 0))),
        size: 7,
        font,
        color: rgb(0, 0, 0)
      });
      page.drawText(goal.time.toString(), {
        ...getCords(197, 119.5+ (3.9 * index - (index > 2 ? 0.1 : 0) - (index > 11 ? 1.5 : 0))),
        size: 7,
        font,
        color: rgb(0, 0, 0)
      });
      if(goal.playerId){
        page.drawText(goal.playerId.toString(), {
          ...getCords(210, 119.5+ (3.9 * index - (index > 2 ? 0.1 : 0) - (index > 11 ? 1.5 : 0))),
          size: 7,
          font,
          color: rgb(0, 0, 0)
        });
      }
      if(goal.assistId){
        page.drawText(goal.assistId.toString(), {
          ...getCords(219, 119.5+ (3.9 * index - (index > 2 ? 0.1 : 0) - (index > 11 ? 1.5 : 0))),
          size: 7,
          font,
          color: rgb(0, 0, 0)
        });
      }
      if(goal.code){
        page.drawText(goal.code.toString(), {
          ...getCords(229, 119.5+ (3.9 * index - (index > 2 ? 0.1 : 0) - (index > 11 ? 1.5 : 0))),
          size: 7,
          font,
          color: rgb(0, 0, 0)
        });
      }
    }else{
      const index2 = index - 20;
      page.drawText((index + 1).toString(), {
        ...getCords(240, 119.5+ (3.9 * index2 - (index2 > 2 ? 0.1 : 0) - (index2 > 11 ? 1.5 : 0))),
        size: 7,
        font,
        color: rgb(0, 0, 0)
      });
      page.drawText(goal.time.toString(), {
        ...getCords(250, 119.5+ (3.9 * index2 - (index2 > 2 ? 0.1 : 0) - (index2 > 11 ? 1.5 : 0))),
        size: 7,
        font,
        color: rgb(0, 0, 0)
      });
      if(goal.playerId){
        page.drawText(goal.playerId.toString(), {
          ...getCords(260, 119.5+ (3.9 * index2 - (index2 > 2 ? 0.1 : 0) - (index2 > 11 ? 1.5 : 0))),
          size: 7,
          font,
          color: rgb(0, 0, 0)
        });
      }
      if(goal.assistId){
        page.drawText(goal.assistId.toString(), {
          ...getCords(270, 119.5+ (3.9 * index2 - (index2 > 2 ? 0.1 : 0) - (index2 > 11 ? 1.5 : 0))),
          size: 7,
          font,
          color: rgb(0, 0, 0)
        });
      }
      if(goal.code){
        page.drawText(goal.code.toString(), {
          ...getCords(280, 119.5+ (3.9 * index2 - (index2 > 2 ? 0.1 : 0) - (index2 > 11 ? 1.5 : 0))),
          size: 7,
          font,
          color: rgb(0, 0, 0)
        });
      }
    }

  })
}

export {drawGoals};
