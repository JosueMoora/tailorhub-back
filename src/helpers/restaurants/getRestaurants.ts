import fs from 'fs'
import path from 'path'
import { Restaurant } from '../../models/Restaurants'
const restaurantsFilePath = path.join(__dirname, '../../data/restaurants.json')
export function readRestaurantsFile (): Restaurant[] {
  try {
    const data = fs.readFileSync(restaurantsFilePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error al leer el archivo de restaurantes:', error)
    return []
  }
}
