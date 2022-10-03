import React from 'react';
import { BoxProps, Card, CardContent, Theme, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

interface HeaderCardProps {
  getBackground: (theme: Theme) => string;
}

interface Props extends HeaderCardProps {
  title: string;
  subtitle: string;
  Svg: React.JSXElementConstructor<BoxProps>;
  getTextColor?: (theme: Theme) => string;
}

const HeaderCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'getBackground'
})<HeaderCardProps>(({ theme, getBackground }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: getBackground(theme),
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));

export const PageHeader: React.FC<Props> = ({
  title,
  subtitle,
  Svg,
  getTextColor,
  getBackground
}) => {
  const theme = useTheme();
  return (
    <HeaderCard getBackground={getBackground}>
      <CardContent sx={{ color: getTextColor ? getTextColor(theme) : 'background.default', p: 5 }}>
        <Typography gutterBottom variant='h4'>
          {title}
        </Typography>
        <Typography variant='subtitle1' sx={{ pb: 3, maxWidth: 480, mx: 'auto' }}>
          {subtitle}
        </Typography>
      </CardContent>
      <Svg
        sx={{
          p: 5,
          height: 300,
          margin: { xs: 'auto', md: 'inherit' }
        }}
      />
    </HeaderCard>
  );
};
