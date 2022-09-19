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

import { useDispatch, useSelector } from 'react-redux';
import {
  addToFavorites,
  removeFromFavorites,
} from '../features/countries/favsSlice';

const CountryCard = ({ country }) => {
  const favsList = useSelector(state => state.favorites.favoritesList);
  const countries = useSelector(state => state.countries.countriesList);
  const { name, languages, currencies, population, timezones, flags } = country;
  const dispatch = useDispatch();

  const addToFavs = country => {
    dispatch(addToFavorites(country));
    // Set localStorage to favsList and new country
    localStorage.setItem('favorites', JSON.stringify([...favsList, country]));
  };

  const removeFromFavs = country => {
    dispatch(removeFromFavorites(country));
    // Filter out country and set localStorage
    const filteredFavs = JSON.parse(localStorage.getItem('favorites')).filter(
      c => c.name.common !== country.name.common
    );
    localStorage.setItem('favorites', JSON.stringify([...filteredFavs]));
  };

  const checkIfInFavs = () => {
    const arr = favsList.filter(c => c.name.common === country.name.common);

    return arr.length > 0;
  };

  return (
    <Card sx={{ width: 300, height: 500, position: 'relative' }}>
      {/* The whole card is wrapped in a Link */}
      <CardActionArea>
        <Link
          to={`/countries/${name.common}`}
          state={{ from: 'countries', country: country, countries: countries }}
          style={{ color: 'black' }}
        >
          <CardMedia
            component='img'
            height='230'
            image={flags.svg}
            alt={name.common}
            loading='lazy'
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
                  {/* {Object.values(languages || {}).map(language => (
                    <div key={language}>{language}</div>
                  ))} */}
                  <div>{Object.values(languages || {})?.[0]}</div>
                  <div>{Object.values(languages || {})?.[1]}</div>
                  {Object.values(languages || {})?.[2] ? '...' : ''}
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
      {checkIfInFavs() ? (
        <IconButton
          onClick={() => removeFromFavs(country)}
          sx={{ position: 'absolute', bottom: '0', zindex: '4' }}
        >
          <FavoriteIcon />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => addToFavs(country)}
          sx={{ position: 'absolute', bottom: '0', zindex: '3' }}
        >
          <FavoriteBorderIcon />
        </IconButton>
      )}
    </Card>
  );
};
export default CountryCard;
