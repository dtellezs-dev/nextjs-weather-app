import axios from 'axios'

export default async function handler(req, res) {
  const { city } = req.query
  const apiKey = process.env.OPENWEATHER_API_KEY
  if (!apiKey) return res.status(500).json({ message: 'Falta API key en el servidor' })
  if (!city) return res.status(400).json({ message: 'Ciudad requerida' })

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`
    const response = await axios.get(url)
    res.status(200).json(response.data)
  } catch (err) {
    if (err.response?.status === 404) return res.status(404).json({ message: 'Ciudad no encontrada' })
    res.status(500).json({ message: 'Error en la API de clima' })
  }
}