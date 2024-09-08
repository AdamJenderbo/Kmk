import { 
    faBars, 
    faCalendar, 
    faCalendarPlus, 
    faHouse, 
    faUser, 
    faCircleCheck,
    faCircleXmark,
    faCaretDown,
    faArrowUp,
    faArrowDown,
    faBell
} from '@fortawesome/free-solid-svg-icons'

import { library } from '@fortawesome/fontawesome-svg-core'

library.add(
    faCalendar, 
    faHouse, 
    faUser, 
    faBars, 
    faCalendarPlus, 
    faCircleCheck, 
    faCircleXmark,
    faCaretDown,
    faArrowUp,
    faArrowDown,
    faBell
);

export const Icons = {
    Bars: faBars,
    Calendar: faCalendar,
    CalendarPlus: faCalendarPlus, 
    House: faHouse, 
    User: faUser, 
    CircleCheck: faCircleCheck,
    CircleXmark: faCircleXmark,
    CaretDown: faCaretDown,
    ArrowUp: faArrowUp,
    ArrowDown: faArrowDown,
    Bell: faBell
};