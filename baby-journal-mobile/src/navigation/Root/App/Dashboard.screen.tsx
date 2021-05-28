import { format } from 'date-fns';
import React from 'react';
import { AddButton } from '../../../components/AddButton.component';
import { Calendar } from '../../../components/Calendar.component';
import { Layout } from '../../../components/Layout.components';
import { Separator } from '../../../components/Separator.components';
import { Spacer } from '../../../components/Spacer.components';
import { Mono, OpenSans } from '../../../components/Typography.components';
import { useJournalEntries, useJournalEntryEvents } from '../../../database/journalEntry.database';
import { dateFormats } from '../../../lib/date';
import { useDayStore } from '../../../stores/Day.store';

const JournalEntry: React.FC = () => {
  const { selectedDay } = useDayStore();
  // const [data] = useJournalEntries();
  const [events, loading] = useJournalEntryEvents(selectedDay);

  if (loading) {
    return (
      <Layout.Column center>
        <OpenSans.Primary>Loading...</OpenSans.Primary>
      </Layout.Column>
    );
  }
  // const todaysEntry = data
  //   ? data.find((entry) => entry.date === format(selectedDay, dateFormats.database))
  //   : undefined;

  if (events) {
    return (
      <Layout.Scroll>
        <Mono.Primary>{JSON.stringify(events, null, 2)}</Mono.Primary>
      </Layout.Scroll>
    );
  }
  return (
    <Layout.Column center grow>
      <Mono.Primary>{format(selectedDay, dateFormats.long)}</Mono.Primary>
      <Spacer.Vertical />
      <OpenSans.Primary size="l-20" weight="bold" center>
        No Journal Entry yet
      </OpenSans.Primary>
      <Spacer.Vertical />
      <OpenSans.Primary size="s-16" center>
        Tap the '+' to get started!
      </OpenSans.Primary>
    </Layout.Column>
  );
};

export const DashboardScreen: React.FC = () => {
  const { selectedDay, setSelectedDay } = useDayStore();
  const [data] = useJournalEntries();

  return (
    <Layout.ScreenContainer px grow bg="navScreenBackground">
      <Calendar {...{ selectedDay, setSelectedDay }} py />
      <JournalEntry />
      <AddButton />
    </Layout.ScreenContainer>
  );
};
