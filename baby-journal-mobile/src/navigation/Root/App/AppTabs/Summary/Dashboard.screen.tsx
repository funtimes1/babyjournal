import React from 'react';
import { AddButton } from '../../../../../components/AddButton.component';
import { Calendar } from '../../../../../components/Calendar.component';
import { Layout } from '../../../../../components/Layout.components';
import { Separator } from '../../../../../components/Separator.components';
import { Spacer } from '../../../../../components/Spacer.components';
import { OpenSans } from '../../../../../components/Typography.components';

export const DashboardScreen: React.FC = () => {
  const [selectedDay, setSelectedDay] = React.useState(new Date());
  return (
    <Layout.Column px grow bg="navScreenBackground">
      <Calendar {...{ selectedDay, setSelectedDay }} py />
      <Separator.Horizontal />
      <Layout.Column center grow>
        <OpenSans.Primary size="l-20" weight="bold" center>
          No Journal Entry yet
        </OpenSans.Primary>
        <Spacer.Vertical units={2} />
        <OpenSans.Primary size="s-16" center>
          Tap the '+' to get started!
        </OpenSans.Primary>
      </Layout.Column>
      <AddButton />
    </Layout.Column>
  );
};
