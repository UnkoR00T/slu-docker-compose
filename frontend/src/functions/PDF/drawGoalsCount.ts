import { PDFDocument, PDFFont, PDFPage, rgb } from 'pdf-lib'
import type { mainGameType } from '@/types/mainGameType.ts'
import { getCords } from '@/functions/PDF/getCords.ts'
import { countGoals } from '@/functions/countGoals.ts'

const drawGoalsCount = (page: PDFPage, data: mainGameType, font: PDFFont) => {
  page.drawText(data.hostTeam.goals.length.toString(), {
    ...getCords(10, 79.5),
    size: 10,
    font,
    color: rgb(0, 0, 0)
  });
  page.drawText(data.guestTeam.goals.length.toString(), {
    ...getCords(23, 79.5),
    size: 10,
    font,
    color: rgb(0, 0, 0)
  });
  page.drawText(countGoals(data.hostTeam.goals, 1, data.gameInfo.halfTime).toString(), {
    ...getCords(37, 79.5),
    size: 10,
    font,
    color: rgb(0, 0, 0)
  });
  page.drawText(countGoals(data.guestTeam.goals, 1, data.gameInfo.halfTime).toString(), {
    ...getCords(45.5, 79.5),
    size: 10,
    font,
    color: rgb(0, 0, 0)
  });
  page.drawText(countGoals(data.hostTeam.goals, 2, data.gameInfo.halfTime).toString(), {
    ...getCords(54, 79.5),
    size: 10,
    font,
    color: rgb(0, 0, 0)
  });
  page.drawText(countGoals(data.guestTeam.goals, 2, data.gameInfo.halfTime).toString(), {
    ...getCords(62.5, 79.5),
    size: 10,
    font,
    color: rgb(0, 0, 0)
  });
  page.drawText(countGoals(data.hostTeam.goals, 3, data.gameInfo.halfTime).toString(), {
    ...getCords(70, 79.5),
    size: 10,
    font,
    color: rgb(0, 0, 0)
  });
  page.drawText(countGoals(data.guestTeam.goals, 3, data.gameInfo.halfTime).toString(), {
    ...getCords(79, 79.5),
    size: 10,
    font,
    color: rgb(0, 0, 0)
  });
}
export {drawGoalsCount}
