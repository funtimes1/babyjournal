import { format } from 'date-fns';
import React from 'react';
import { AddButton } from '../../../components/AddButton.component';
import { Calendar } from '../../../components/Calendar.component';
import { Layout } from '../../../components/Layout.components';
import { Separator } from '../../../components/Separator.components';
import { Spacer } from '../../../components/Spacer.components';
import { Mono, OpenSans } from '../../../components/Typography.components';

export const DashboardScreen: React.FC = () => {
  const [selectedDay, setSelectedDay] = React.useState(new Date());
  return (
    <Layout.ScreenContainer px grow bg="navScreenBackground">
      <Calendar {...{ selectedDay, setSelectedDay }} py />
      <Separator.Horizontal />
      <Layout.Column center grow>
        <Mono.Primary>{format(selectedDay, 'EEEE, MMMM do yyyy')}</Mono.Primary>
        <Spacer.Vertical />
        <OpenSans.Primary size="l-20" weight="bold" center>
          No Journal Entry yet
        </OpenSans.Primary>
        <Spacer.Vertical />
        <OpenSans.Primary size="s-16" center>
          Tap the '+' to get started!
        </OpenSans.Primary>
      </Layout.Column>
      <AddButton />
    </Layout.ScreenContainer>
  );
};
