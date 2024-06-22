import dataSource from '../migrations/data-source';
import { CategoryEntity } from '../../modules/category/entities/category.entity';

const categories = [
  {
    title: 'Electronics',
    description: 'Electronics description',
  },
  {
    title: 'Clothing',
    description: 'Clothing description',
  },
  {
    title: 'Books',
    description: 'Books description',
  },
  {
    title: 'Furniture',
    description: 'Furniture description',
  },
  {
    title: 'Jewelry',
    description: 'Jewelry description',
  },
];

const seedCategories = async () => {
  const categoryRepository = dataSource.getRepository(CategoryEntity);

  await Promise.all(
    categories.map(async (category) => categoryRepository.save(category)),
  );
};

export default seedCategories;
