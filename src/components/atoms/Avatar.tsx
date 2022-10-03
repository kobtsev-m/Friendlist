import React, { forwardRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Avatar as MUIAvatar, AvatarProps } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../hooks/useStores';

interface Props extends AvatarProps {
  children?: React.ReactNode;
  color?: 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
}

export const Avatar: React.FC<Props> = observer(({ color, ...other }) => {
  const { userStore } = useStores();
  return (
    <AvatarWrapper src={''} alt={userStore.fullName} color={'default'} {...other}>
      {userStore.nameAbbreviation}
    </AvatarWrapper>
  );
});

const AvatarWrapper = forwardRef(({ color = 'default', children, sx, ...other }: Props, ref) => {
  const theme = useTheme();

  if (color === 'default') {
    return (
      // @ts-ignore
      <MUIAvatar ref={ref} sx={sx} {...other}>
        {children}
      </MUIAvatar>
    );
  }
  return (
    // @ts-ignore
    <MUIAvatar
      ref={ref}
      sx={{
        fontWeight: theme.typography.fontWeightMedium,
        color: theme.palette[color].contrastText,
        backgroundColor: theme.palette[color].main,
        ...sx
      }}
      {...other}
    >
      {children}
    </MUIAvatar>
  );
});
