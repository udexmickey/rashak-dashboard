import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#F8F8F8',
  border: '1px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

interface modalProps { 
    modalName: string; 
    handleClose: () => void;
    children: React.ReactNode;
}

const NestedModal: React.FC<modalProps> = ({ modalName, handleClose, children }) => {
  return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 'auto', maxWidth: 990, maxHeight: 587, height: 'auto' }}>
          <Typography component={'div'}>
            {children}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default NestedModal;