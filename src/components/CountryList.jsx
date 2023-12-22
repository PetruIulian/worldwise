/* eslint-disable react/prop-types */
import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";

// eslint-disable-next-line no-unused-vars
function CountryList({ cities, isLoading }) {
    if (isLoading) return <Spinner />;
    if (!cities.length)
        return <Message message="Add your first city by clicking on a city from the map" />;

    // create an array with unique countries
    const countries = cities.reduce((arr, city) => {
        if (!arr.map((el) => el.country).includes(city.country)) {
            return [...arr, { country: city.country, emoji: city.emoji, id: city.id }]
        } else {
            return arr
        }
    }, [])
    return (
        <ul className={styles.countryList}>
            {countries.map((country) => (
                <CountryItem key={country.id} country={country} />
            ))}
        </ul>
    );
}

export default CountryList;