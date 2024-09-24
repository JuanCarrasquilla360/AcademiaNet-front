import { Typography } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

const AcademicExamsRouter = () => {
    return (
        <Routes>
          <Route index element={<Typography>list</Typography>} />
          <Route path="create" element={<Typography>create</Typography>} />
        </Routes>
      );
}

export default AcademicExamsRouter
