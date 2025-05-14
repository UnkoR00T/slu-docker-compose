import type { mainGameType } from '@/types/mainGameType.ts'
import { type PDFFont, type PDFPage, rgb } from 'pdf-lib'
import { getCords } from '@/functions/PDF/getCords.ts'

const drawTeams = (page: PDFPage, data: mainGameType, font: PDFFont) => {
  page.drawText(data.hostTeam.name, {
    ...getCords(124, 19),
    size: 8,
    font,
    color: rgb(0, 0, 0)
  });
  data.hostTeam.players.forEach((player, index) => {
    if(index > 19){
      return;
    }
    page.drawText(player.name, {
      ...getCords(113, 28+ (3.9 * index - (index > 2 ? 0.7 : 0) - (index > 13 ? 1.2 : 0))),
      size: 7,
      font,
      color: rgb(0, 0, 0)
    });
    page.drawText(player.number.toString(), {
      ...getCords(107, 28+ (3.9 * index - (index > 2 ? 0.7 : 0) - (index > 13 ? 1.2 : 0))),
      size: 7,
      font,
      color: rgb(0, 0, 0)
    });
    page.drawText(player.license, {
      ...getCords(166, 28+ (3.9 * index - (index > 2 ? 0.7 : 0) - (index > 13 ? 1.2 : 0))),
      size: 7,
      font,
      color: rgb(0, 0, 0)
    });
    if(player.capitan){
      page.drawText("K", {
        ...getCords(101, 28+ (3.9 * index - (index > 2 ? 0.7 : 0) - (index > 13 ? 1.2 : 0))),
        size: 7,
        font,
        color: rgb(0, 0, 0)
      });
    }
    if(player.goalkeeper){
      page.drawText("B", {
        ...getCords(98.5, 28+ (3.9 * index - (index > 2 ? 0.7 : 0) - (index > 13 ? 1.2 : 0))),
        size: 7,
        font,
        color: rgb(0, 0, 0)
      });
    }
  })

  page.drawText(data.guestTeam.name, {
    ...getCords(124, 111.5),
    size: 8,
    font,
    color: rgb(0, 0, 0)
  });
  data.guestTeam.players.forEach((player, index) => {
    if(index > 19){
      return;
    }
    page.drawText(player.name, {
      ...getCords(113, 119.5+ (3.9 * index - (index > 2 ? 0.1 : 0) - (index > 11 ? 1.5 : 0))),
      size: 7,
      font,
      color: rgb(0, 0, 0)
    });
    page.drawText(player.number.toString(), {
      ...getCords(107, 119.5+ (3.9 * index - (index > 2 ? 0.1 : 0) - (index > 11 ? 1.5 : 0))),
      size: 7,
      font,
      color: rgb(0, 0, 0)
    });
    page.drawText(player.license, {
      ...getCords(166, 119.5+ (3.9 * index - (index > 2 ? 0.1 : 0) - (index > 11 ? 1.5 : 0))),
      size: 7,
      font,
      color: rgb(0, 0, 0)
    });
    if(player.capitan){
      page.drawText("K", {
        ...getCords(101, 119.5+ (3.9 * index - (index > 2 ? 0.1 : 0) - (index > 11 ? 1.5 : 0))),
        size: 7,
        font,
        color: rgb(0, 0, 0)
      });
    }
    if(player.goalkeeper){
      page.drawText("B", {
        ...getCords(98.5, 119.5+ (3.9 * index - (index > 2 ? 0.1 : 0) - (index > 11 ? 1.5 : 0))),
        size: 7,
        font,
        color: rgb(0, 0, 0)
      });
    }
  })
}

export {drawTeams}
