const weekdaysDefault = [1, 2, 3, 4, 5, 6, 0];

const intervalsDefault = {
  first: 0,
  minutes: 60,
  count: 24,
  height: 48
};

const stylings = {
  default(interval) {
    return undefined;
  },
  workday(interval) {
    const inactive =
      interval.weekday === 0 ||
      interval.weekday === 6 ||
      interval.hour < 9 ||
      interval.hour >= 17;
    const startOfHour = interval.minute === 0;
    const dark = this.dark;
    const mid = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";

    return {
      backgroundColor: inactive
        ? dark
          ? "rgba(0,0,0,0.4)"
          : "rgba(0,0,0,0.05)"
        : undefined,
      borderTop: startOfHour ? undefined : "1px dashed " + mid
    };
  },
  past(interval) {
    return {
      backgroundColor: interval.past
        ? this.dark
          ? "rgba(0,0,0,0.4)"
          : "rgba(0,0,0,0.05)"
        : undefined
    };
  }
};

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

    typeOptions: [
      // { text: "Day", value: "day" },
      // { text: "4 Day", value: "4day" },
      {text: "シフト一覧", value: "month"},
      {text: "詳細", value: "week"}
      // { text: "Custom Daily", value: "custom-daily" },
      // { text: "Custom Weekly", value: "custom-weekly" }
    ],
    mode: "stack",
    modeOptions: [
      {text: "Stack", value: "stack"},
      {text: "Column", value: "column"}
    ],

    weekdays: weekdaysDefault,
    weekdaysOptions: [
      {text: "Sunday - Saturday", value: weekdaysDefault},
      {text: "Mon, Wed, Fri", value: [1, 3, 5]},
      {text: "Mon - Fri", value: [1, 2, 3, 4, 5]},
      {text: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0]}
    ],

    intervals: intervalsDefault,
    intervalsOptions: [
      {text: "Default", value: intervalsDefault},
      {text: "Workday", value: {first: 16, minutes: 30, count: 20, height: 48}}
    ],

    maxDays: 7,
    maxDaysOptions: [
      {text: "7 days", value: 7},
      {text: "5 days", value: 5},
      {text: "4 days", value: 4},
      {text: "3 days", value: 3}
    ],

    styleInterval: "default",
    styleIntervalOptions: [
      {text: "Default", value: "default"},
      {text: "Workday", value: "workday"},
      {text: "Past", value: "past"}
    ],

    color: "primary",
    colorOptions: [
      {text: "Primary", value: "primary"},
      {text: "Secondary", value: "secondary"},
      {text: "Accent", value: "accent"},
      {text: "Red", value: "red"},
      {text: "Pink", value: "pink"},
      {text: "Purple", value: "purple"},
      {text: "Deep Purple", value: "deep-purple"},
      {text: "Indigo", value: "indigo"},
      {text: "Blue", value: "blue"},
      {text: "Light Blue", value: "light-blue"},
      {text: "Cyan", value: "cyan"},
      {text: "Teal", value: "teal"},
      {text: "Green", value: "green"},
      {text: "Light Green", value: "light-green"},
      {text: "Lime", value: "lime"},
      {text: "Yellow", value: "yellow"},
      {text: "Amber", value: "amber"},
      {text: "Orange", value: "orange"},
      {text: "Deep Orange", value: "deep-orange"},
      {text: "Brown", value: "brown"},
      {text: "Blue Gray", value: "blue-gray"},
      {text: "Gray", value: "gray"},
      {text: "Black", value: "black"}
    ],

    shortIntervals: true,
    shortMonths: false,
    shortWeekdays: false,
    dialog: false,
    select: [
      {text: "日勤"},
      {text: "早出"},
      {text: "遅出"},
      {text: "午前休"},
      {text: "午後休"},
      {text: "深夜"},
      {text: "明け"},
      {text: "準夜"},
      {text: "公休"}
    ],

    typeToLabel: {
      month: "Month"
    },
    start: null,
    end: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,

    date: "",
    days: "",
    day: "",
    dark: false,
    startMenu: false,
    start: "2020-03-1",
    endMenu: false,
    // end: "2020-03-31",
    minWeeks: 1,
    now: null,
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1"
    ],

    shifts: ["日勤", "夜勤", "準夜", "早出", "遅出", "半休", "全休", "明け"],
    names: [
      "山田太郎",
      "吉田花子",
      "斎藤綾乃",
      "本山茂",
      "迫美香子",
      "伊集院進ノ介",
      "三輪幸子",
      "結城純"
    ],
    members: [
      "山田太郎 看護師 上級",
      "吉田花子　准看護師　中級",
      "斎藤綾乃　看護補助者　初級",
      "本山茂　看護師 上級",
      "迫美香子　准看護師　中級",
      "伊集院進ノ介　看護補助者　初級",
      "三輪幸子　准看護師　中級",
      "結城純　准看護師　中級"
    ],

    classes: ["上級", "中級", "初級"],
    jobs: ["看護師", "准看護師", "看護"],
    belongs: [
      "1A",
      "1B",
      "1C",
      "2A",
      "2B",
      "2C",
      "3A",
      "3B",
      "3C",
      "4A",
      "4B",
      "4C",
      "5A",
      "5B",
      "5C"
    ],
    work: "希望",
    works: [
      "日勤 8:30 - 17:30",
      "準夜 16:30 - 23:30",
      "深夜 23:30 - 8:30",
      "早出 7:00 - 16:00",
      "遅出 12:00 - 21:00",
      "半休 8:30 - 13:00",
      "公休"
    ]
  }),
  computed: {
    // Calendar
    intervalStyle() {
      return stylings[this.styleInterval].bind(this);
    },
    hasIntervals() {
      return (
        this.type in
        {
          week: 1,
          day: 1,
          "4day": 1,
          "custom-daily": 1
        }
      );
    },
    hasEnd() {
      return (
        this.type in
        {
          "custom-weekly": 1,
          "custom-daily": 1
        }
      );
    },

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
    testEv({add}) {
      // alert("Add Event");
      // this.date = date;
      this.event = event;
      // this.members　= members
      // alert(this.members[0] + "を" + this.date + "に追加します");
      // alert(this.members[0] + "を" + this.date + "に追加します");
      alert(
        this.members[this.rnd(0, this.members.length - 1)] +
          "を" +
          this.date +
          "に追加します"
      );

      this.dialog = false;
    },
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
      // this.type = "day";
      // add
      this.dialog = true;
      this.date = date;
    },
    viewMore({more}) {
      this.focus = more;
      this.type = "day";
      //this.dialog = true;
    },

    getEventColor(event) {
      return event.color;
    },
    // add
    showIntervalLabel(interval) {
      return interval.minute === 0;
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
          job: this.jobs[this.rnd(0, this.jobs.length - 1)],
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
