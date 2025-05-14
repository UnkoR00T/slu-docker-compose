import type { mainGameType } from '@/types/mainGameType.ts'
import { type PDFFont, type PDFPage, rgb } from 'pdf-lib'
import { getCords } from '@/functions/PDF/getCords.ts'

const drawInfo = (page: PDFPage, data: mainGameType, font: PDFFont) => {
  page.drawText(data.gameInfo.organizer, {
    ...getCords(31, 38),
    size: 10,
    font,
    color: rgb(0, 0, 0)
  });
  page.drawText(data.gameInfo.games, {
    ...getCords(31, 45),
    size: 10,
    font,
    color: rgb(0, 0, 0)
  });
  page.drawText(data.gameInfo.place, {
    ...getCords(31, 53),
    size: 10,
    font,
    color: rgb(0, 0, 0)
  });
  page.drawText(data.gameInfo.place, {
    ...getCords(31, 53),
    size: 10,
    font,
    color: rgb(0, 0, 0)
  });
  page.drawText(data.gameInfo.date, {
    ...getCords(26, 61),
    size: 10,
    font,
    color: rgb(0, 0, 0)
  });
  page.drawText(data.gameInfo.game_number.toString(), {
    ...getCords(74, 61),
    size: 10,
    font,
    color: rgb(0, 0, 0)
  });
  page.drawText(data.gameInfo.start.toString(), {
    ...getCords(27, 68),
    size: 10,
    font,
    color: rgb(0, 0, 0)
  });
  page.drawText(data.gameInfo.end.toString(), {
    ...getCords(71, 68),
    size: 10,
    font,
    color: rgb(0, 0, 0)
  });
}

export {drawInfo}
