import { format } from '@/utils'

export function dateFormatter(val) {
  return format(val, 'yyyy/MM/dd')
}

export function timeFormatter(val) {
  return format(val, 'yyyy/MM/dd hh:mm:ss')
}
