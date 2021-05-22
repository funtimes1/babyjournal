import { DefaultTextProps } from '@easy-expense/ui/native';
import { styled } from '@easy-expense/ui/theme';
import { Text, View } from 'react-native';

export const JsonComponents = {
  Text: styled(Text).attrs({
    ...DefaultTextProps,
    numberOfLines: 1,
    ellipsizeMode: 'middle',
    pointerEvents: 'none',
  })`
    color: ${({ theme }) => theme.colors.inverse};
    font-size: 10px;
    font-family: ${({ theme }) => theme.fonts['plex-mono'].regular};
    padding: 6px 8px;
    margin: 1.5px 0px;
  `,
  ExpandText: styled(Text).attrs({
    ...DefaultTextProps,
    numberOfLines: 1,
    ellipsizeMode: 'middle',
  })`
    color: ${({ theme }) => theme.colors.inverse};
    font-size: 10px;
    font-family: ${({ theme }) => theme.fonts['plex-mono'].regular};
    padding: 6px 8px;
    margin: 1.5px 0px;
    background-color: #fff1;
    border-radius: 8px;
    overflow: hidden;
  `,
  View: styled(View)``,
  ExpandView: styled(View)<{ level: number }>`
    padding: 0px 0px 0px 16px;
  `,
};
