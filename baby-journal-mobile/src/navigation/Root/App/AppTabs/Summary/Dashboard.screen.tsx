import React from 'react';
import { Calendar } from '../../../../../components/Calendar.component';
import { Layout } from '../../../../../components/Layout.components';

export const DashboardScreen: React.FC = () => {
  const [selectedDay, setSelectedDay] = React.useState(new Date());
  return (
    <Layout.Column px grow bg="navScreenBackground">
      <Calendar {...{ selectedDay, setSelectedDay }} />
    </Layout.Column>
  );
};
