// import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';

const Modal = ({ handleClose, content, header }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.modalBox}>
        <div style={styles.header}>
          <h2 style={styles.title}>{header}</h2>
          <ClearIcon
            onClick={handleClose}
            sx={{ cursor: 'pointer', color: '#334155', fontSize: 28 }}
          />
        </div>

        <div style={styles.content}>
          {content}
        </div>
      </div>
    </div>
  );
};

export default Modal;

const styles = {
  overlay: {
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '50%',
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    animation: 'fadeIn 0.3s ease-in-out',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '12px',
  },
  title: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#1e293b',
    margin: 0,
  },
  content: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#334155',
    lineHeight: 1.6,
  },
};