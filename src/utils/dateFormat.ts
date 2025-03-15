export const formatDate = (date: Date) => date.toISOString().replace('T', '-').slice(0, 16)

export const decreaseTime = (
  unit: 'minutes' | 'hours' | 'days' | 'weeks' | 'months',
  amount: number = 1,
) => {
  const newDate = new Date()
  switch (unit) {
    case 'minutes':
      newDate.setMinutes(newDate.getMinutes() - amount)
      break
    case 'hours':
      newDate.setHours(newDate.getHours() - amount)
      break
    case 'days':
      newDate.setDate(newDate.getDate() - amount)
      break
    case 'weeks':
      newDate.setDate(newDate.getDate() - amount * 7)
      break
    case 'months':
      newDate.setMonth(newDate.getMonth() - amount)
      break
  }
  return formatDate(newDate)
}

export const decreaseFifteenMinutes = () => decreaseTime('minutes', 15)
export const decreaseHour = () => decreaseTime('hours')
export const decreaseDay = () => decreaseTime('days')
export const decreaseWeek = () => decreaseTime('weeks')
export const decreaseMonth = () => decreaseTime('months')
