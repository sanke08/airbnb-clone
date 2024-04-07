import countries from "world-countries"

const formateedcountries = countries.map(country => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlan: country.latlng,
    region: country.region
}))


const useCountries = () => {
    const getAll = () => formateedcountries

    const getByValue = (val: string) => {
        return formateedcountries.find(country => country.value == val)
    }

    return {
        getAll, getByValue
    }

}

export default useCountries