import dayjs from 'dayjs'

export const DateDisplay = ({
  date,
  format = 'DD/MM/YYYY',
}: {
  date: string
  format?: string
}) => <>{dayjs(date).format(format)}</>
