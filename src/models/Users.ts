export interface User {
  id: number
  name: string
  username: string
  password: string
  favorite: FavoriteRestaurant[]
}
interface FavoriteRestaurant {
  id: number
  name: string
  neighborhood: string
  address: string
  image: string
  cuisineType: string
}
