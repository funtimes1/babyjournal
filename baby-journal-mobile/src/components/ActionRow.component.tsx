import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Color, LayoutProps, styled } from '../theme/theme';
import { useThrottle } from '../hooks/useThrottle';
import { Icon, IconName } from './Icons/Icon';
import { OpenSans } from './Typography.components';
import { Layout } from './Layout.components';
import { Spacer } from './Spacer.components';

const LoadingIndicator = styled(ActivityIndicator).attrs(({ theme }) => ({
  size: 'small',
  color: theme.colors.primary,
}))``;

type ActionRowProps = {
  content?: string; // action text (leave out to render own content)
  icon?: IconName; // name of MapleIcon
  color?: Color; // text should be default or red or custom
  onPress: () => void | Promise<void>; // action on press
  layout?: LayoutProps;
  showChevron?: boolean;
};

/**
 * Examples:
 * ```
 * <ActionRow content="Do Action" icon="icon-name" onPress={()=> doAction()} />
 * <ActionRow content="Do Action" icon="icon-name" color="destructive" onPress={()=> doAction()} />
 * <ActionRow content="Do Action" onPress={()=> doAction()} />
 * <ActionRow onPress={onPress} icon="icon-name">
 *    <Display.Primary accessibilityLabel={text} size="l-20">
 *      My Custom Text
 *    </Display.Primary>
 * </ActionRow>
 * ```
 */
export const ActionRow: React.FC<ActionRowProps> = (props) => {
  const { icon, color, showChevron = true, onPress, layout, children } = props;
  const [actionLoading, setActionLoading] = React.useState(false);

  const onActionRowPress = useThrottle(async () => {
    try {
      setActionLoading(true);
      await onPress();
    } finally {
      setActionLoading(false);
    }
  }, 1000);

  let textContent = children;
  if (props.content) {
    textContent = (
      <>
        <OpenSans.Custom color={color} size="l-20">
          {props.content}
        </OpenSans.Custom>
        <Spacer.Flex />
      </>
    );
  }

  const chevron = showChevron ? (
    <>
      <Spacer.Horizontal />
      <Icon name="chevron-forward" iconColor={color} size={20} />
    </>
  ) : null;

  return (
    <Layout.PressableRow onPress={onActionRowPress} px="s-16" py="s-16" align {...layout}>
      {!!icon && (
        <>
          <Icon name={icon} size={20} iconColor={color} />
          <Spacer.Horizontal units={2} />
        </>
      )}
      <Layout.Row grow align>
        {textContent}
      </Layout.Row>

      {actionLoading ? <LoadingIndicator /> : chevron}
    </Layout.PressableRow>
  );
};
