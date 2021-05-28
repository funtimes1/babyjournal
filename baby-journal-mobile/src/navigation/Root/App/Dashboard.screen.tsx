import { format } from 'date-fns';
import React from 'react';
import { AddButton } from '../../../components/AddButton.component';
import { Calendar } from '../../../components/Calendar.component';
import { CategoryPill } from '../../../components/Forms/Fields/CategoryField.component';
import { Layout } from '../../../components/Layout.components';
import { Spacer } from '../../../components/Spacer.components';
import { Mono, OpenSans } from '../../../components/Typography.components';
import { useJournalEntries, useJournalEntryEvents } from '../../../database/journalEntry.database';
import { categories } from '../../../lib/category';
import { dateFormats, timeFormats } from '../../../lib/date';
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

  if (!!events?.length) {
    return (
      <Layout.Scroll>
        <Layout.Column center>
          <Layout.Column bg="primaryHighlight" px py="4xs-4" radius>
            <Mono.Inverse size="xs-12" center weight="bold">
              {format(selectedDay, dateFormats.long)}
            </Mono.Inverse>
          </Layout.Column>
        </Layout.Column>
        {events.map((e, i) => {
          const category = categories.find((c) => c.name === e.category);
          return (
            <Layout.Row key={i} align justify="space-between" py>
              <Layout.Column>
                {!!category && <CategoryPill category={category} />}
                {e.notes ? (
                  <OpenSans.Primary size="s-16">{e.notes}</OpenSans.Primary>
                ) : (
                  <OpenSans.Secondary size="s-16">no notes</OpenSans.Secondary>
                )}
              </Layout.Column>
              <Mono.Primary>{`${format(new Date(e.time), timeFormats.time)}`}</Mono.Primary>
            </Layout.Row>
          );
        })}
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
