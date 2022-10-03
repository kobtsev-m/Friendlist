import React from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Box, Dialog, DialogProps, Paper, SxProps } from '@mui/material';
import { varFade } from '../../utils/animate.utils';

interface Props extends DialogProps {
  children: React.ReactNode;
  sx?: SxProps;
  onClose: () => void;
}

export const DialogAnimate: React.FC<Props> = ({
  open = false,
  onClose,
  children,
  sx,
  ...other
}) => {
  return (
    // @ts-ignore
    <AnimatePresence>
      {open && (
        <Dialog
          fullWidth
          maxWidth='xs'
          open={open}
          onClose={onClose}
          PaperComponent={(props) => (
            <Box
              component={m.div}
              {...varFade({
                distance: 120,
                durationIn: 0.32,
                durationOut: 0.24,
                easeIn: 'easeInOut'
              }).inUp}
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Box onClick={onClose} sx={{ width: '100%', height: '100%', position: 'fixed' }} />
              <Paper sx={sx} {...props}>
                {props.children}
              </Paper>
            </Box>
          )}
          {...other}
        >
          {children}
        </Dialog>
      )}
    </AnimatePresence>
  );
};
