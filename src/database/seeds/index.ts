import dataSource from '../migrations/data-source';
import seedCategories from './category.seed';
import * as process from 'process';

(async () => {
  try {
    console.log('Starting to seed...');

    await dataSource.initialize();

    console.log('Connection initialized with database...');

    await seedCategories();

    console.log('Successfully seeded');

    process.exit();
  } catch (e) {
    console.error(e);
  }
})();
