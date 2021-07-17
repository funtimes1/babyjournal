import { format } from 'date-fns';
import React from 'react';
import { Dimensions, Image, ImageProps, ImageURISource } from 'react-native';
import { AddButton } from '../../../components/AddButton.component';
import { PopDown } from '../../../components/Animations/PopDown.component';
import { Calendar } from '../../../components/Calendar.component';
import { CategoryPill } from '../../../components/Forms/Fields/CategoryField.component';
import { Layout } from '../../../components/Layout.components';
import { LoadingIndicator } from '../../../components/Loading.component';
import { Spacer } from '../../../components/Spacer.components';
import { Mono, OpenSans } from '../../../components/Typography.components';
import { useJournalEntries, useJournalEntryEvents } from '../../../database/journalEntry.database';
import { categories } from '../../../lib/category';
import { dateFormats, timeFormats } from '../../../lib/date';
import { getImageContentUri } from '../../../lib/Images';
import { useDayStore } from '../../../stores/Day.store';

const JournalEntry: React.FC = () => {
  const { selectedDay } = useDayStore();
  const [events, loading] = useJournalEntryEvents(selectedDay);
  const [data] = useJournalEntries();
  const todaysEntry = data
    ? data.find((entry) => entry.date === format(selectedDay, dateFormats.database))
    : undefined;

  if (loading) {
    return (
      <Layout.Column center>
        <OpenSans.Primary>Loading...</OpenSans.Primary>
      </Layout.Column>
    );
  }

  if (!!events?.length) {
    return (
      <Layout.Scroll>
        <Layout.Row>
          <Layout.Scroll horizontal py>
            {todaysEntry?.photos?.map((photo) => {
              return (
                <Layout.Column key={photo.url} style={{ paddingRight: 8 }}>
                  <Layout.Column radius style={{ overflow: 'hidden' }}>
                    <Photo source={{ uri: photo.url }} resizeMode="contain" width={100} />
                  </Layout.Column>
                </Layout.Column>
              );
            })}
          </Layout.Scroll>
        </Layout.Row>
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
  return (
    <Layout.ScreenContainer px grow bg="navScreenBackground">
      <Calendar {...{ selectedDay, setSelectedDay }} py />
      <Layout.Column center>
        <Layout.Column bg="primaryHighlight" px py="4xs-4" radius>
          <Mono.Inverse size="xs-12" center weight="bold">
            {format(selectedDay, dateFormats.long)}
          </Mono.Inverse>
        </Layout.Column>
      </Layout.Column>
      <JournalEntry />
      <AddButton />
    </Layout.ScreenContainer>
  );
};

export const Photo: React.FC<ImageProps> = (props) => {
  const { source, width, height, ...imageProps } = props;
  const [localUri, setLocalUri] = React.useState('');
  const [imageDimensions, setImageDimensions] = React.useState({ width: 0, height: 0, aspect: 0 });
  React.useEffect(() => {
    const getCachedAsync = async (remoteUrl: string) => {
      const cachedUrl = await getImageContentUri(remoteUrl);
      Image.getSize(cachedUrl, (measuredWidth, measuredHeight) =>
        setImageDimensions({
          width: measuredWidth,
          height: measuredHeight,
          aspect: measuredWidth / measuredHeight,
        }),
      );
      setLocalUri(cachedUrl);
    };
    const uri = (source as ImageURISource).uri;
    if (uri) {
      getCachedAsync(uri);
    }
  }, [(source as ImageURISource).uri]);
  return !localUri ? (
    <LoadingIndicator />
  ) : (
    <Image
      source={{ uri: localUri }}
      style={{
        width: width
          ? width
          : height && !!imageDimensions.aspect
          ? height * imageDimensions.aspect
          : 100,
        height: height
          ? height
          : width && !!imageDimensions.aspect
          ? width / imageDimensions.aspect
          : 100,
      }}
      {...imageProps}
    />
  );
};
