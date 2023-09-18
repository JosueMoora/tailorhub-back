import fs from 'fs'
import path from 'path'
import { Restaurant } from '../../models/Restaurants'
const restaurantsFilePath = path.join(__dirname, '../../data/restaurants.json')

export function saveRestaurantsFile (data: Restaurant[]): void {
  try {
    fs.writeFileSync(restaurantsFilePath, JSON.stringify(data, null, 2), 'utf8')
  } catch (error) {
    console.error('Error al guardar en el archivo de restaurantes:', error)
  }
}
