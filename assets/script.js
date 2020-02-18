new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  data: () => ({
    // modal
    dialog: false,
    // date picker
    date: new Date().toISOString().substr(0, 10),
    pickerDate: null,
    // notes: [],
    // allNotes: [
    //   "新しいイベント",
    //   "条件の表示",
    //   "あのねのね",
    //   "Global warming discussion cancelled",
    //   "Company changed its location"
    // ],
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Month"
    },
    start: null,
    end: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: [
      "grey",
      "grey darken-2",
      "lightgray",
      "cyan",
      "green",
      "orange",
      "grey darken-1"
    ],
    names: ["坂本春香", "渡辺里佳", "渡辺里佳", "原田舞", "加納千代","石田健一", "佐々木結衣", "宮沢明美", "中島幹"],
    classes: ["看護師", "准看護師", "看護補助者"],
    belongs: ["1A", "1B", "1C", "2A", "2B", "2C", "3A", "3B", "3C", "4A", "4B", "4C", "5A", "5B", "5C"],
    work: "希望",
    works: [
      "日勤 8:30 - 17:30",
      "準夜 16:30 - 23:30",
      "深夜 23:30 - 8:30",
      "早出 7:00 - 16:00",
      "遅出 12:00 - 21:00",
      "半休 8:30 - 13:00",
      "公休",
    ]
  }),
  computed: {
    // date picker
    functionEvents() {
      return this.month ? this.monthFunctionEvents : this.dateFunctionEvents;
    },
    title() {
      const {start, end} = this;
      if (!start || !end) {
        return "";
      }

      const startMonth = this.monthFormatter(start);
      const endMonth = this.monthFormatter(end);
      const suffixMonth = startMonth === endMonth ? "" : endMonth;

      const startYear = start.year;
      const endYear = end.year;
      const suffixYear = startYear === endYear ? "" : endYear;

      const startDay = start.day + this.nth(start.day);
      const endDay = end.day + this.nth(end.day);

      switch (this.type) {
        case "month":
          return `${startMonth} ${startYear}`;
        // case 'week':
        // case '4day':
        //   return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
        // case 'day':
        //   return `${startMonth} ${startDay} ${startYear}`
      }
      return "";
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long"
      });
    }
  },
  watch: {
    // date picker
    pickerDate(val) {
      this.notes = [
        this.allNotes[Math.floor(Math.random() * 5)],
        this.allNotes[Math.floor(Math.random() * 5)],
        this.allNotes[Math.floor(Math.random() * 5)]
      ].filter((value, index, self) => self.indexOf(value) === index);
    }
  },
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    // date picker
    dateFunctionEvents(date) {
      const [, , day] = date.split("-");
      if ([12, 17, 28].includes(parseInt(day, 10))) return true;
      if ([1, 19, 22].includes(parseInt(day, 10))) return ["red", "#00f"];
      return false;
    },
    monthFunctionEvents(date) {
      const month = parseInt(date.split("-")[1], 10);
      if ([1, 3, 7].includes(month)) return true;
      if ([2, 5, 12].includes(month))
        return ["error", "purple", "rgba(0, 128, 0, 0.5)"];
      return false;
    },
    viewDay({date}) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({nativeEvent, event}) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange({start, end}) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 80);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 8 : 4) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          class: this.classes[this.rnd(0, this.classes.length - 1)],
          belong: this.belongs[this.rnd(0, this.belongs.length - 1)],
          start: this.formatDate(first, !allDay),
          end: this.formatDate(second, !allDay),
          color: this.colors[this.rnd(0, this.colors.length - 1)]
        });
      }

      this.start = start;
      this.end = end;
      this.events = events;
    },
    nth(d) {
      return d > 3 && d < 21
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    formatDate(a, withTime) {
      return withTime
        ? `${a.getFullYear()}-${a.getMonth() +
            1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
        : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`;
    }
  }
});
