import type { IProperty } from '../interfaces/UserInterface';
import { faker } from '@faker-js/faker';
import type { EntitySchema } from './dataGenerator';

export const PropertySchema: EntitySchema<IProperty> = {
	id: () => faker.string.uuid(),
	title: () => faker.lorem.words({ min: 3, max: 7 }),
	developer: () => faker.company.name(),
	location: () => `${faker.location.city()}, ${faker.location.country()}`,
	price: () => faker.number.int({ min: 50000, max: 1000000 }),
	yield: () => faker.number.int({ min: 4, max: 12 }),
	status: () =>
		faker.helpers.arrayElement([
			'Selling Fast',
			'Exclusive',
			'New Launch',
			'Sold Out',
		]),
	description: () => faker.lorem.paragraphs({ min: 2, max: 5 }),
	image: () =>
		faker.image.urlLoremFlickr({
			category: 'real-estate',
			width: 640,
			height: 480,
		}),
	createdAt: () => faker.date.past().toISOString(),
};
