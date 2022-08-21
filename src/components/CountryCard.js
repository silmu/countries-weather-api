import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CountryCard.module.css';

const CountryCard = ({ country, countries }) => {
  const { name, languages, currencies, population, timezones, flags } = country;
  //   console.log(props);

  return (
    <div className={styles.countryCard}>
      {/* The whole card is wrapped in a Link */}
      <Link
        to={name.common}
        state={{ from: 'countries', country: country, countries: countries }}
      >
        <div className={styles.image_countryCard}>
          <img src={flags.svg} alt={name.common} />
        </div>
        <div className={styles.container_header_countryCard}>
          <h2>{name.common}</h2>
          <h3>{name.official}</h3>
        </div>

        <div className={styles.content_countryCard}>
          <div className={styles.content_section}>
            <h3>Language(s)</h3>
            <ul className={styles.list_properties}>
              {Object.values(languages || {}).map(language => (
                <li key={language}>{language}</li>
              ))}
            </ul>
          </div>
          <div className={styles.content_section}>
            <h3>Currencie(s)</h3>
            <ul className={styles.list_properties}>
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
          <div className={styles.content_section}>
            <h3>Timezone(s)</h3>
            <ul className={styles.list_properties}>
              {timezones.map(timezone => (
                <li key={timezone}>{timezone}</li>
              ))}
            </ul>
          </div>
          <div className={styles.content_section}>
            <h3>Population</h3>
            <p>{population.toLocaleString()}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default CountryCard;
