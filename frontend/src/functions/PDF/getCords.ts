const getCords = (xMm: number, yMm: number): { x: number, y: number } => {
  const mmToPt = (mm: number) => mm * 2.83465;
  const pageHeightPt = 595.32;

  return {
    x: mmToPt(xMm),
    y: pageHeightPt - mmToPt(yMm),
  };
};

export {getCords};
