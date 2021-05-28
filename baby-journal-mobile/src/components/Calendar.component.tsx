import {
  addMonths,
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import React from 'react';
import { useNav } from '../navigation/useNav';
import { useDayStore } from '../stores/Day.store';

import { Color, LayoutProps } from '../theme/theme';
import { Icon } from './Icons/Icon';
import { Layout } from './Layout.components';
import { Separator } from './Separator.components';
import { Circle, Square } from './Shape.components';
import { Spacer } from './Spacer.components';
import { OpenSans } from './Typography.components';

export const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const CIRCLE_SIZE = 36;
const HEADING_SIZE = CIRCLE_SIZE + 16;

type CalendarHeaderProps = {
  selectedDay: Date;
  formatString: string;
  leftPress?: () => void;
  rightPress?: () => void;
  calendarButtonPress?: () => void;
  showCalendarButton?: boolean;
  leftButton?: JSX.Element;
};

export const CalendarHeader: React.FC<CalendarHeaderProps> = (props) => {
  const {
    selectedDay,
    formatString,
    leftPress,
    rightPress,
    calendarButtonPress,
    showCalendarButton,
  } = props;
  const { setSelectedDay } = useDayStore();
  const { navigate } = useNav<'Journal'>();
  return (
    <Layout.Row center bg="primaryHighlight" radius>
      <Layout.Row grow align>
        <Square squareSize={HEADING_SIZE} center>
          <Layout.PressableRow
            onPress={() => navigate('Settings', { screen: 'Menu' })}
            grow
            center
            size={HEADING_SIZE}
            style={{ width: HEADING_SIZE }}
            hitSlop={{ right: 40 }}
          >
            <Icon name="menu-outline" size={30} iconColor="inverse" />
          </Layout.PressableRow>
        </Square>
        <Layout.Row grow reverse size={40} align>
          <Layout.PressableRow onPress={leftPress} size={40} style={{ width: 40 }} center>
            <Icon name="chevron-back-circle" size={28} iconColor="inverse" />
          </Layout.PressableRow>
        </Layout.Row>
      </Layout.Row>
      <Layout.PressableColumn
        onPress={() => setSelectedDay(new Date())}
        px
        style={{ minWidth: 150 }}
        center
      >
        <OpenSans.Inverse weight="bold">{format(selectedDay, formatString)}</OpenSans.Inverse>
      </Layout.PressableColumn>
      <Layout.Row grow align>
        <Layout.Row grow size={40} align>
          <Layout.PressableRow onPress={rightPress} size={40} style={{ width: 40 }} center>
            <Icon name="chevron-forward-circle" size={28} iconColor="inverse" />
          </Layout.PressableRow>
        </Layout.Row>
        {showCalendarButton && (
          <Square squareSize={HEADING_SIZE} center>
            <Layout.PressableRow
              onPress={calendarButtonPress}
              grow
              center
              size={HEADING_SIZE}
              style={{ width: HEADING_SIZE }}
              hitSlop={{ right: 40 }}
            >
              <Icon name="calendar" size={22} iconColor="inverse" />
            </Layout.PressableRow>
          </Square>
        )}
      </Layout.Row>
    </Layout.Row>
  );
};

type CalendarProps = {
  selectedDay: Date;
  setSelectedDay: (day: Date) => void;
  calendarTheme?: {
    calendarSelectedDay: Color;
    calendarDayBackgroundInactive: Color;
    calendarDayBorder: Color;
    calendarDayText: Color;
    calendarDayTextInactive: Color;
  };
  headerFormatString?: string;
  syncSelectedDayWithMonth?: boolean;
} & LayoutProps;

const TodayCalTheme: CalendarProps['calendarTheme'] = {
  calendarSelectedDay: 'calendarSelectedDay',
  calendarDayBackgroundInactive: 'calendarDayBackgroundInactive',
  calendarDayBorder: 'calendarDayBorder',
  calendarDayText: 'calendarDayText',
  calendarDayTextInactive: 'calendarDayTextInactive',
};

export const Calendar: React.FC<CalendarProps> = (props) => {
  const {
    selectedDay,
    setSelectedDay,
    calendarTheme = TodayCalTheme,
    headerFormatString,
    syncSelectedDayWithMonth,
    ...rest
  } = props;
  const [currentMonth, setCurrentMonth] = React.useState(startOfMonth(selectedDay));
  const [showCalendar, setShowCalendar] = React.useState(true);

  const startDay = startOfWeek(currentMonth);
  const endDay = endOfWeek(endOfMonth(currentMonth));
  const weeks = eachWeekOfInterval({ start: startDay, end: endDay }).map((start) =>
    eachDayOfInterval({ start, end: endOfWeek(start) }),
  );

  React.useEffect(() => {
    setCurrentMonth(startOfMonth(selectedDay));
  }, [selectedDay]);

  const header = (
    <CalendarHeader
      selectedDay={syncSelectedDayWithMonth ? selectedDay : currentMonth}
      formatString={headerFormatString ?? 'MMM yyyy'}
      leftPress={() => {
        const prevMonth = startOfMonth(subMonths(currentMonth, 1));
        setCurrentMonth(prevMonth);
        if (syncSelectedDayWithMonth) {
          setSelectedDay(prevMonth);
        }
      }}
      rightPress={() => {
        const nextMonth = startOfMonth(addMonths(currentMonth, 1));
        setCurrentMonth(nextMonth);
        if (syncSelectedDayWithMonth) {
          setSelectedDay(nextMonth);
        }
      }}
      calendarButtonPress={() => {
        setShowCalendar(!showCalendar);
      }}
      showCalendarButton
    />
  );

  const daysOfWeek = (
    <Layout.Row style={{ justifyContent: 'space-between' }} size={CIRCLE_SIZE} py={6}>
      {days.map((d, i) => {
        return (
          <Layout.Column key={`${d}${i}`} size={CIRCLE_SIZE} center>
            <OpenSans.Primary size="s-16" weight="regular">
              {d}
            </OpenSans.Primary>
          </Layout.Column>
        );
      })}
    </Layout.Row>
  );

  const monthDays = (
    <Layout.Column>
      {weeks.map((w, i) => {
        return (
          <Layout.Row key={`week-${i}`} style={{ justifyContent: 'space-between' }} py={6}>
            {w.map((d, i) => {
              const day = format(d, 'd');
              const isInMonth = isSameMonth(currentMonth, d);
              const isSelectedDay = isSameDay(selectedDay, d);
              const isToday = isSameDay(new Date(), d);
              return (
                <Layout.PressableColumn
                  key={`day-${day}-${i}`}
                  onPress={() => {
                    setSelectedDay(d);
                    setCurrentMonth(startOfMonth(d));
                  }}
                >
                  <Circle
                    circleSize={CIRCLE_SIZE}
                    center
                    bg={
                      isSelectedDay
                        ? calendarTheme.calendarSelectedDay
                        : isInMonth || isToday
                        ? undefined
                        : calendarTheme['calendarDayBackgroundInactive']
                    }
                    border={
                      isToday
                        ? [2, 'solid', calendarTheme.calendarSelectedDay]
                        : isInMonth && !isSelectedDay
                        ? [1, 'solid', calendarTheme.calendarDayBorder]
                        : undefined
                    }
                  >
                    <OpenSans.Primary
                      size="s-16"
                      weight={isToday ? 'bold' : 'regular'}
                      color={
                        isSelectedDay
                          ? 'inverse'
                          : isToday
                          ? calendarTheme.calendarSelectedDay
                          : isInMonth
                          ? calendarTheme['calendarDayText']
                          : calendarTheme['calendarDayTextInactive']
                      }
                    >
                      {format(d, 'd')}
                    </OpenSans.Primary>
                  </Circle>
                </Layout.PressableColumn>
              );
            })}
          </Layout.Row>
        );
      })}
    </Layout.Column>
  );

  return (
    <Layout.Column {...rest}>
      {header}
      {showCalendar && (
        <>
          <Layout.Column px={8} py>
            {daysOfWeek}
            {monthDays}
          </Layout.Column>
          <Separator.Horizontal />
        </>
      )}
    </Layout.Column>
  );
};
