  export const formatDate = (rawDate: string) => {
    const utcDate = new Date(rawDate)
  
    const dateTimeFormat = new Intl.DateTimeFormat('ja-JP', {
      timeZone: 'Asia/Tokyo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
  
    return dateTimeFormat.format(utcDate)
  }
  
  export const decodeDateTime = (date: string | undefined) => {
    if (date) {
      const dateTime = new Date(date)
      const year = dateTime.getFullYear()
      const month = dateTime.getMonth() + 1
      const day = dateTime.getDate()
      //auto cast 2 digit
      const hour = dateTime.getHours()
      const minute = dateTime.getMinutes()
  
      return {
        date: `${year}/${('0' + month).slice(-2)}/${('0' + day).slice(-2)}`,
        time: `${('0' + hour).slice(-2)}:${('0' + minute).slice(-2)}`,
      }
    } else {
      return {
        date: '',
        time: '',
      }
    }
  }
  