function dateIsBetween(date, start, end, unit='days') {
  return (date.diff(start, unit) >= 0 && end.diff(date, unit) >= 0)
}

export {dateIsBetween}
