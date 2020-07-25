import { format } from '@/utils'

export function dateFormatter(val) {
  return isNaN(Date.parse(val)) ? val : format(Date.parse(val), 'yyyy/MM/dd')
}

export function timeFormatter(val) {
  return isNaN(Date.parse(val)) ? val : format(Date.parse(val), 'yyyy/MM/dd hh:mm:ss')
}
