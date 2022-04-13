import { format,addHours } from 'date-fns'

function DateIsotoString(date) {
    if (window.location.hostname === "localhost") {
        return format(new Date(date), 'dd/MM/yyyy - HH:mm')
    } else {
        const dateProduction = addHours(new Date(date),7)
        return format(dateProduction, 'dd/MM/yyyy - HH:mm')
    }
 
}

export default DateIsotoString
