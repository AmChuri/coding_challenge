import {
  Card,
  CardContent,
  CircularProgress,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { Fragment, ReactElement } from 'react';
import { useFetchStartups } from './useFetchStartups';

export default function StartupList(): ReactElement {
  const { startups, loading, error } = useFetchStartups();

  if (loading) return <CircularProgress />;
  if (error) return <Typography>Error: {error}</Typography>;
  return (
    <Fragment>
      {/* <List component="nav" aria-label="startup list"> */}
      {startups.map((startup, index) => (
        <Card sx={{ mb: 2, p: 0 }} key={startup.id}>
          <CardContent>
            <ListItem sx={{ p: 0 }}>
              <ListItemText
                primary={
                  <Typography variant="h6" sx={{}}>
                    {startup.name}
                  </Typography>
                }
                secondary={
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Founded: {startup.dateFounded.getFullYear()} |{' '}
                    {startup.employees} Employees |{' '}
                    {startup.totalFunding} |{' '}
                    {startup.currentInvestmentStage}
                  </Typography>
                }
              />
            </ListItem>
            <ListItem sx={{ p: 0 }}>
              <Typography>{startup.shortDescription}</Typography>
            </ListItem>
          </CardContent>
        </Card>
      ))}
      {/* </List> */}
    </Fragment>
  );
}
