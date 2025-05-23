import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { v4 as uuidv4 } from 'uuid';

export const generateId = () => {
	return uuidv4();
};

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
