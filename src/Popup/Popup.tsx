import React from 'react';
import './Popup.scss';
import { usePauseExtension } from './hooks';
import { Box, Typography, Switch, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CloseIcon } from '../ui';

function Popup() {
    const { palette } = useTheme();
    const { isEnabled, handleExtensionStatusChange } = usePauseExtension();

    return (
        <div>
            <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" fontWeight="bold" sx={{ color: palette.primary.main }}>
                        polyglotter
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography>{isEnabled ? 'On' : 'Paused'}</Typography>
                        <Switch checked={isEnabled} onChange={handleExtensionStatusChange} />
                        <IconButton size="small" sx={{ color: palette.common.white }} onClick={() => window.close()}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Box>

                {/* <Divider sx={{ my: 2, borderColor: '#444' }} /> */}

                {/* <Box>
                    <Typography fontWeight="bold">Allow on mui.com</Typography>
                    <Typography variant="caption" color="gray">
                        See blocked sites
                    </Typography>
                    <Switch checked />
                </Box> */}

                {/* <Box>
                    <Typography fontWeight="bold">English</Typography>
                    <Button size="small" variant="text" sx={{ mt: 0.5 }}>
                        Change (coming soon)
                    </Button>
                </Box> */}
            </Box>
        </div>
    );
}

export default Popup;
