import { Box, Dialog, Grid, IconButton, Typography } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid-premium';
import React from 'react';
import PanoramaIcon from '@mui/icons-material/Panorama';
import {
  LoadError,
  SpecialZoomLevel,
  Viewer,
  Worker,
} from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/search/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import ru_RU from '@react-pdf-viewer/locales/lib/ru_RU.json';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import { searchPlugin } from '@react-pdf-viewer/search';
import getDocuments from '../../../../api/ScannerDocsApi/getDocuments';
import { changeMime } from '../../../../utils/fileConvert';
import DialogFile from './DialogFile';
import Close from '@mui/icons-material/Close';

interface DialogFileProps {
  id: number;
  title: string;
}

export default function OpenDocuments({ id }: DialogFileProps) {
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState<number | null>(null);

  const handleOpen = () => {
    setOpen(true);
    setFile(id);
  };

  const handleClose = () => {
    setOpen(false);
    setFile(null);
  };

  React.useEffect(() => {}, [open]);
  return (
    <>
      <IconButton onClick={handleOpen}>
        <PanoramaIcon />
      </IconButton>
      {file && <DialogFile open={open} file={file} onClose={handleClose} />}
    </>
  );
}
