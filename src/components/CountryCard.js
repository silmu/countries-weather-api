import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CountryCard.module.css';

const CountryCard = props => {
  const { name, languages, currencies, population, timezones } = props;
  //   console.log(props);

  return (
    <div className={styles.countryCard}>
      <div className={styles.container_header_countryCard}>
        <h2>{name.common}</h2>
        <h3>{name.official}</h3>
      </div>
      <div className={styles.content_countryCard}>
        <div>
          <h3>Language(s)</h3>
          <ul>
            {Object.values(languages || {}).map(language => (
              <li key={language}>{language}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Currencie(s)</h3>
          <ul>
            {Object.entries(currencies || {}).map(currency =>
              currency.map(entry =>
                typeof entry !== 'object' ? (
                  ''
                ) : (
                  <li key={entry.name}>{entry.name}</li>
                )
              )
            )}
          </ul>
        </div>
        <div>
          <h3>Timezone(s)</h3>
          <ul>
            {timezones.map(timezone => (
              <li key={timezone}>{timezone}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Population</h3>
          <div>{population}</div>
        </div>
      </div>
      <Link to={name.common} state={{ from: 'countries', data: props }}>
        {' '}
        Read more...
      </Link>
    </div>
  );
};
export default CountryCard;
