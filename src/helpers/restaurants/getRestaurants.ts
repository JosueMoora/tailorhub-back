import fs from 'fs'
import path from 'path'
import { Restaurant } from '../../models/Restaurant'
const restaurantsFilePath = path.join(__dirname, '../../data/restaurants.json')
export function readRestaurantsFile (): Restaurant[] {
  try {
    const data = fs.readFileSync(restaurantsFilePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading the restaurant file:', error)
    return []
  }
}
