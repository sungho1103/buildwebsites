export function money(value: number) {
  return new Intl.NumberFormat("ko-KR").format(value) + "원";
}

export function date(value: string | null | undefined) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("ko-KR").format(new Date(value));
}
