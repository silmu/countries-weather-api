import React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './Header.module.css';

import Search from './SearchBar';

const Header = ({ search }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const favsList = useSelector(state => state.favorites.favoritesList);
  const links = [
    { name: 'Home', link: '/' },
    { name: 'Countries', link: '/countries' },
    { name: `Favorites (${favsList.length ?? 0})`, link: '/favorites' },
  ];

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position='sticky'
      sx={{
        backgroundColor: 'black',
      }}
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            {/* ..............Hamburger icon........... */}
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            {/* ..............Hamburger icon end............ */}
            {/* ...............Mobile menu..................... */}
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {/* ...............Mobile menu end............... */}
              {/* ...................Menu links................ */}
              {links.map(link => (
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>
                    <Link className={styles.hamburgerLink} to={link.link}>
                      {link.name}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
              {/* .................Menu links end................... */}
            </Menu>
          </Box>
          {/* ................Menu............... */}
          {links.map(link => (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link className={styles.link} to={link.link}>
                  {link.name}
                </Link>
              </Button>
            </Box>
          ))}
          {/* ................Menu end................. */}
          <Search search={search} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
