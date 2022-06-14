const defaultUserState = {
  isLogged: false,
  user:{
    name: "",
    email: "",
    gender: "",
    age: 0,
    tasks: [],
    habits: [],
    routines: [],
    schedules: [],
  },
  exercises: []
};

const equipments = [
  "assisted",
  "band",
  "barbell",
  "body weight",
  "bosu ball",
  "cable",
  "dumbbell",
  "elliptical machine",
  "ez barbell",
  "hammer",
  "kettlebell",
  "leverage machine",
  "medicine ball",
  "olympic barbell",
  "resistance band",
  "roller",
  "rope",
  "skierg machine",
  "sled machine",
  "smith machine",
  "stability ball",
  "stationary bike",
  "stepmill machine",
  "tire",
  "trap bar",
  "upper body ergometer",
  "weighted",
  "wheel roller",
];

const bodyparts = [
  "back",
  "cardio",
  "chest",
  "lower arms",
  "lower legs",
  "neck",
  "shoulders",
  "upper arms",
  "upper legs",
  "waist",
];

const targetMuscles = [
  "abductors",
  "abs",
  "adductors",
  "biceps",
  "calves",
  "cardiovascular system",
  "delts",
  "forearms",
  "glutes",
  "hamstrings",
  "lats",
  "levator scapulae",
  "pectorals",
  "quads",
  "serratus anterior",
  "spine",
  "traps",
  "triceps",
  "upper back",
];

const bannerContent = [
  {
    emoji: '✔',
    title: 'Manage Tasks',
    content: 'You can add & manage your tasks here'
  },
  {
    emoji: '💯',
    title: 'Ace the Habit game',
    content: 'We got you there. Create your habits with us in one click everyday'
  },
  {
    emoji: '📅',
    title: 'Create Schedules',
    content: 'Want to note your workouts & monitor them ? Check out Schedules! '
  },
  {
    emoji: '💪',
    title: 'Import Exercises to Schedule',
    content: 'Tired of adding each exercise to schedule ? Make a routine and import exercises to your Schedule'
  },
]


const data = { equipments, bodyparts, targetMuscles, bannerContent, defaultUserState };

export default data;
