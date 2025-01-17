import { Providers } from '@microsoft/mgt';

document.querySelector('mgt-agenda').templateContext = {
  dayFromDateTime: (dateTimeString) => {
    let date = new Date(dateTimeString);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    let monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    let monthIndex = date.getMonth();
    let day = date.getDate();
    let year = date.getFullYear();

    return monthNames[monthIndex] + ' ' + day + ' ' + year;
  },

  timeRangeFromEvent: (event) => {
    if (event.isAllDay) {
      return 'ALL DAY';
    }

    let prettyPrintTimeFromDateTime = (date) => {
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      let minutesStr = minutes < 10 ? '0' + minutes : minutes;
      return hours + ':' + minutesStr + ' ' + ampm;
    };

    let start = prettyPrintTimeFromDateTime(new Date(event.start.dateTime));
    let end = prettyPrintTimeFromDateTime(new Date(event.end.dateTime));

    return start + ' - ' + end;
  },

  declineMeeting: async (e, context, root) => {
    // console.debug(JSON.stringify(context));

    const id = context.event.id;

    try {
      await Providers.globalProvider.graph
        .api(`/me/calendar/events/${id}/decline`)
        .post();
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  },
};
