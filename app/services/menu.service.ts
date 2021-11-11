import { CreateMenu } from '../validators/interfaces/menu.interface';
import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const Menu = prisma.menu;

class MenuService {
    constructor() { }

    // find all menus
    async listMenus() {
      const menus = await Menu.findMany()
      return menus
    }

    async findById(id: number) {
      const menu = await Menu.findUnique({
        where: { id }
      })

      return menu
    }

    async findByIdWithRelations(id: number, relations: string[]) {
      let _relations: any = {}
      relations.forEach(relation => 
        _relations[relation] = true
      )
  
      const menuWithRelation = await Menu.findUnique({
        where: { id },
        include: {
          ..._relations
        }
      })
      return menuWithRelation
    }

    async createMenu(menu: CreateMenu) {
      const newMenu = await Menu.create({
        data: {
          ...menu
        }
      })

      return newMenu
    }
}

export default new MenuService();
