export enum GENDER_BOOK_FILTER {
  RECENT_ADDED = "recently added",
  FICTION = "fiction",
  NONFICTION = "nonfiction",
  EDUCATION = "education",
  MAGAZINE_COMICS = "magazine & comics",
  CHILDREN = "children's literature",
}

export type GENDER_BOOK_FILTER_ITEM = {
  id: number;
  value: GENDER_BOOK_FILTER;
  iconURL: string;
};

export const GENDER_BOOK_FILTER_ITEMS: GENDER_BOOK_FILTER_ITEM[] = [
  {
    iconURL: "/assets/icons/history.svg",
    value: GENDER_BOOK_FILTER.RECENT_ADDED,
    id: 0,
  },
  {
    iconURL: "/assets/icons/brush.svg",
    value: GENDER_BOOK_FILTER.FICTION,
    id: 1,
  },
  {
    iconURL: "/assets/icons/lightbulb.svg",
    value: GENDER_BOOK_FILTER.NONFICTION,
    id: 2,
  },
  {
    iconURL: "/assets/icons/graduation-cap.svg",
    value: GENDER_BOOK_FILTER.EDUCATION,
    id: 3,
  },
  {
    iconURL: "/assets/icons/cone.svg",
    value: GENDER_BOOK_FILTER.MAGAZINE_COMICS,
    id: 4,
  },
  {
    iconURL: "/assets/icons/baby.svg",
    value: GENDER_BOOK_FILTER.CHILDREN,
    id: 5,
  },
];

export const EUROPE_COUNTRIES: string[] = [
  "Albania",
  "Andorra",
  "Austria",
  "Belarus",
  "Belgium",
  "Bosnia and Herzegovina",
  "Bulgaria",
  "Croatia",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Estonia",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Hungary",
  "Iceland",
  "Ireland",
  "Italy",
  "Kosovo",
  "Latvia",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Malta",
  "Moldova",
  "Monaco",
  "Montenegro",
  "Netherlands",
  "North Macedonia",
  "Norway",
  "Poland",
  "Portugal",
  "Romania",
  "Russia",
  "San Marino",
  "Serbia",
  "Slovakia",
  "Slovenia",
  "Spain",
  "Sweden",
  "Switzerland",
  "Ukraine",
  "United Kingdom",
  "Vatican City",
];

export enum FILTER_URL_PARAMS {
  COUNTRY = "country",
  GENDER = "gender",
  PAGE = "page",
  PROFILE = "profile",
  ROOM = "room-query",
}
