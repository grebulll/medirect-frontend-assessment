export const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day}-${hours}:${minutes}`
}

export const decreaseFifteenMinutes = () => {
  const newDate = new Date()
  newDate.setMinutes(newDate.getMinutes() - 15)
  return formatDate(newDate)
}

export const decreaseHour = () => {
  const newDate = new Date()
  newDate.setHours(newDate.getHours() - 1)
  return formatDate(newDate)
}

export const decreaseDay = () => {
  const newDate = new Date()
  newDate.setDate(newDate.getDate() - 1)
  return formatDate(newDate)
}

export const decreaseWeek = () => {
  const newDate = new Date()
  newDate.setDate(newDate.getDate() - 7)
  return formatDate(newDate)
}

export const decreaseMonth = () => {
  const newDate = new Date()
  newDate.setMonth(newDate.getMonth() - 1)
  return formatDate(newDate)
}

export const decreaseOneMinute = (date: Date) => {
  const newDate = new Date(date)
  newDate.setMinutes(newDate.getMinutes() - 1)
  return newDate
}
