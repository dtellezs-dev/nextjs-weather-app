import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Home from '../pages/index'
import axios from 'axios'
jest.mock('axios')

describe('Weather App UI', () => {
  beforeEach(() => jest.clearAllMocks())

  test('input and button interact correctly', () => {
    render(<Home />)
    const input = screen.getByLabelText('city-input')
    fireEvent.change(input, { target: { value: 'Madrid' } })
    expect(input.value).toBe('Madrid')
  })

  test('shows weather after successful search', async () => {
    axios.get.mockResolvedValue({ data: { name: 'Madrid', main: { temp: 20, humidity: 50 }, weather: [{ description: 'soleado' }] } })
    render(<Home />)
    fireEvent.change(screen.getByLabelText('city-input'), { target: { value: 'Madrid' } })
    fireEvent.click(screen.getByLabelText('search-button'))
    await waitFor(() => expect(screen.getByLabelText('weather-card')).toBeInTheDocument())
  })

  test('handles invalid city error', async () => {
    axios.get.mockRejectedValue({ response: { data: { message: 'Ciudad no encontrada' }, status: 404 } })
    render(<Home />)
    fireEvent.change(screen.getByLabelText('city-input'), { target: { value: 'InvalidCity' } })
    fireEvent.click(screen.getByLabelText('search-button'))
    await waitFor(() => screen.getByRole('alert'))
  })
})