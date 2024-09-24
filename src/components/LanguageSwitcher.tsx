import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<string>(i18n.language);

  const changeLanguage = (event: SelectChangeEvent<string>) => {
    const newLang = event.target.value;
    i18n.changeLanguage(newLang);
    setLanguage(newLang);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Select<string>
        value={language}
        onChange={changeLanguage}
        size="small"
        style={{ minWidth: '120px', backgroundColor: '#FFF' }}
      >
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="es">Español</MenuItem>
      </Select>
    </div>
  );
};

export default LanguageSwitcher;