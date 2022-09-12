import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';

import LanguageIcon from '@mui/icons-material/Language';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const CountryCard = ({ country, countries }) => {
  const { name, languages, currencies, population, timezones, flags } = country;
  const isFavorite = false;

  return (
    <Card sx={{ width: 300, height: 500 }}>
      {/* The whole card is wrapped in a Link */}
      <CardActionArea>
        <Link
          to={name.common}
          state={{ from: 'countries', country: country, countries: countries }}
          style={{ color: 'black' }}
        >
          <CardMedia
            component='img'
            height='230'
            image={flags.svg}
            alt={name.common}
          />
          <CardContent>
            <Typography variant='h5' fontSize='1.2rem'>
              {name.common}
            </Typography>
            <Typography gutterBottom variant='button' fontSize='0.8rem'>
              {name.official}
            </Typography>

            <Grid container marginTop='0.5rem'>
              <Grid item sx={{ width: '45%', marginRight: '10%' }}>
                <Typography gutterBottom variant='subtitle2'>
                  <LanguageIcon fontSize='16px' /> Language(s)
                </Typography>
                <Typography
                  gutterBottom
                  variant='caption'
                  sx={{ color: 'gray' }}
                >
                  {Object.values(languages || {}).map(language => (
                    <div key={language}>{language}</div>
                  ))}
                </Typography>
                <Typography gutterBottom variant='subtitle2'>
                  <AttachMoneyIcon fontSize='16px' />
                  Currencie(s)
                </Typography>
                <Typography gutterBottom variant='caption' color='gray'>
                  {Object.values(currencies || {}).map(currency => (
                    <div key={currency.name}>
                      {currency.symbol} - {currency.name}
                    </div>
                  ))}
                </Typography>
              </Grid>
              <Grid item sx={{ width: '45%' }}>
                <Typography gutterBottom variant='subtitle2'>
                  <AccessTimeIcon fontSize='16px' /> Timezone(s)
                </Typography>
                <Typography gutterBottom variant='caption' color='gray'>
                  <div>{timezones[0]}</div>
                  <div>{timezones?.[1]}</div>
                  {timezones?.[2] ? '...' : ''}
                </Typography>
                <Typography gutterBottom variant='subtitle2'>
                  <PeopleIcon fontSize='16px' /> Population
                </Typography>
                <Typography
                  gutterBottom
                  variant='caption'
                  component='div'
                  color='gray'
                >
                  {population.toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Link>
      </CardActionArea>
      {isFavorite ? (
        <IconButton>
          <FavoriteIcon />
        </IconButton>
      ) : (
        <IconButton>
          <FavoriteBorderIcon />
        </IconButton>
      )}
    </Card>
  );
};
export default CountryCard;
