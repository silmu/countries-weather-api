import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';

const CountryCard = ({ country, countries }) => {
  const { name, languages, currencies, population, timezones, flags } = country;

  return (
    <Card sx={{ width: 300, height: 500 }}>
      {/* The whole card is wrapped in a Link */}
      <CardActionArea>
        <Link
          to={name.common}
          state={{ from: 'countries', country: country, countries: countries }}
        >
          <CardMedia
            component='img'
            height='230'
            image={flags.svg}
            alt={name.common}
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {name.common}
            </Typography>
            <Typography gutterBottom variant='button' component='div'>
              {name.official}
            </Typography>

            <Grid container>
              <Grid item xs={4}>
                <Typography gutterBottom variant='subtitle2' component='div'>
                  Language(s)
                </Typography>
                <Typography gutterBottom variant='body2' component='ul'>
                  {Object.values(languages || {}).map(language => (
                    <li key={language}>{language}</li>
                  ))}
                </Typography>
                <Typography gutterBottom variant='subtitle2' component='div'>
                  Currencie(s)
                </Typography>
                <Typography gutterBottom variant='body2' component='ul'>
                  {Object.values(currencies || {}).map((currency, i) => (
                    <li key={i}>
                      {currency.name} ({currency.symbol})
                    </li>
                  ))}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography gutterBottom variant='subtitle2' component='div'>
                  Timezone(s)
                </Typography>
                <Typography gutterBottom variant='body2' component='ul'>
                  {timezones.map(timezone => (
                    <li key={timezone}>{timezone}</li>
                  ))}
                </Typography>
                <Typography gutterBottom variant='subtitle2' component='div'>
                  Population
                </Typography>
                <Typography gutterBottom variant='body2' component='div'>
                  {population.toLocaleString()}
                </Typography>
              </Grid>
            </Grid>

            {/* {Object.entries(currencies || {}).map(currency =>
                currency.map(entry =>
                  typeof entry !== 'object' ? (
                    ''
                  ) : (
                    <li key={entry.name}>{entry.name}</li>
                  )
                )
              )} */}
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
};
export default CountryCard;
