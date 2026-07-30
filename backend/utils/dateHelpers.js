const { addDays, startOfToday, getDay, parseISO, format } = require('date-fns');

function getUpcomingPickups(schedules, holidays, daysAhead = 14) {
  const today = startOfToday();
  const holidayDates = new Set(holidays.map(h => h.date));
  const pickups = [];

  const dayMap = {
    sunday: 0, monday: 1, tuesday: 2, wednesday: 3,
    thursday: 4, friday: 5, saturday: 6
  };

  for (let i = 0; i <= daysAhead; i++) {
    const currentDate = addDays(today, i);
    const dateString = format(currentDate, 'yyyy-MM-dd');
    const dayNumber = getDay(currentDate);

    schedules.forEach(schedule => {
      const scheduleDayNumber = dayMap[schedule.day_of_week.toLowerCase()];
      if (scheduleDayNumber !== dayNumber) return;

      if (schedule.frequency === 'biweekly') {
        if (!schedule.start_date) return;
        const start = parseISO(schedule.start_date);
        const diffDays = Math.floor((currentDate - start) / (1000 * 60 * 60 * 24));
        const diffWeeks = Math.floor(diffDays / 7);
        if (diffWeeks % 2 !== 0) return;
      }

      if (holidayDates.has(dateString)) return;

      pickups.push({
        date: dateString,
        type: schedule.waste_type
      });
    });
  }

  pickups.sort((a, b) => a.date.localeCompare(b.date));
  return pickups;
}

module.exports = { getUpcomingPickups };