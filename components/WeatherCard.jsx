export default function WeatherCard({ name, temp, humidity, description }) {
  return (<section aria-label="weather-card" style={{ marginTop: 20, border: '1px solid #ddd', padding: 12, borderRadius: 8 }}>
    <h2>{name}</h2><p>Temperatura: {temp} °C</p><p>Humedad: {humidity}%</p><p>Descripción: {description}</p></section>)
}