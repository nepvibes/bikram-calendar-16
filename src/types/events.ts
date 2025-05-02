
export interface CalendarEvent {
  date: string; // Format: "YYYY/MM/DD" for fixed events or "MM/DD" for recurring
  event: string;
  detail: string;
  startYear?: number;
  endYear?: number;
  showOnDay?: boolean;
  type?: 'bikram' | 'gregorian' | 'recurring';
}
