import { fakerKO } from '@faker-js/faker';
import dayjs from 'dayjs';

export const fakerBoolean = () => Math.random() >= 0.5;

export const fakerCreatedAt = () => dayjs(fakerKO.date.anytime()).format();
