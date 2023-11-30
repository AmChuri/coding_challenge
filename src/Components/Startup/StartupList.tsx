import {
  Card,
  CardContent,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Typography,
} from '@mui/material';
import { Fragment, ReactElement, useState } from 'react';
import { useFetchStartups } from './useFetchStartups';

export default function StartupList(): ReactElement {
  const { startups, loading, error } = useFetchStartups();
  const startupsPerRow = 21;
  const totalStartups = startups.length;
  const [currentPage, setCurrentPage] = useState(0);

  if (loading) return <CircularProgress />;
  if (error) return <Typography>Error: {error}</Typography>;
  return (
    <Fragment>
      <List
        component="nav"
        aria-label="startup list"
        id="startup-list"
      >
        {startups
          .slice(
            currentPage * startupsPerRow,
            currentPage * startupsPerRow + startupsPerRow
          )
          .map((startup) => (
            <Card sx={{ mb: 2, p: 0 }} key={startup.id}>
              <CardContent>
                <ListItem sx={{ p: 0 }}>
                  <ListItemText
                    primary={
                      <Typography variant="h6" sx={{}}>
                        {startup.name} | {startup.id}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        sx={{ mb: 1.5 }}
                        color="text.secondary"
                      >
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
      </List>
      <Pagination
        count={Math.ceil(totalStartups / startupsPerRow)}
        onChange={(event, page) => setCurrentPage(page - 1)}
      />
    </Fragment>
  );
}
