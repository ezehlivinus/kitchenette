import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const Restaurant = prisma.restaurant;


class RestaurantService {
  async find() {
    const restaurants = await Restaurant.findMany({})
    return restaurants
  }

  async findById(id: number) {
    const restaurant = await Restaurant.findUnique({
      where: { id }
    })
    return restaurant
  }

  async findByIdWithRelations(id: number, relations: string[]) {
    let _relations: any = {}
    relations.forEach(relation => 
      _relations[relation] = true
    )

    const restaurant = await Restaurant.findUnique({
      where: { id },
      include: {
        ..._relations
      }
    })
    return restaurant
  }

  async create(restaurant: any) { 
    const newRestaurant = await Restaurant.create({
      data: {
        ...restaurant
      }
    })
    return newRestaurant
  }

}

export default new RestaurantService();
