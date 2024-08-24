import { TextField } from '@mui/material';

export const AnswerField = () => {
    return (
      <TextField
        label="Your Answer"
        variant="outlined"
        InputProps={{
          sx: {
            height: '100%',
            textAlign: 'center', 
            fontSize: '1.5rem',  
            display: 'flex',
            alignItems: 'center',
          }
        }}
        sx={{
          height: '20vh',
          width: '30vw',
          '& .MuiInputBase-root': {
            height: '100%',
          },
          '& .MuiInputLabel-root': {
            fontSize: '1.2rem', // Adjusts the label text size if necessary
          }
        }}
      />
    );
}