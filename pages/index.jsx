import { useState } from 'react'
import axios from 'axios'
import WeatherCard from '../components/WeatherCard'

export default function Home() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSearch(e) {
    e.preventDefault()
    setError(null)
    setWeather(null)
    if (!city.trim()) { setError('Por favor ingresa el nombre de una ciudad'); return }
    setLoading(true)
    try {
      const res = await axios.get(`/api/weather?city=${encodeURIComponent(city)}`)
      setWeather(res.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Error al obtener el clima')
    } finally { setLoading(false) }
  }

  return (
    <main style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>App de Clima - Next.js</h1>
      <form onSubmit={handleSearch} aria-label="search-form">
        <input aria-label="city-input" placeholder="Ingresa la ciudad" value={city} onChange={(e) => setCity(e.target.value)} />
        <button type="submit" aria-label="search-button">Buscar</button>
      </form>
      {loading && <p>Buscando...</p>}
      {error && <p role="alert">{error}</p>}
      {weather && <WeatherCard name={weather.name} temp={weather.main.temp} humidity={weather.main.humidity} description={weather.weather[0].description} />}
    </main>
  )
}