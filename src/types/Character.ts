/**
 * Персонаж из вселенной Rick and Morty
 *
 * @example
 * ```typescript
 * const rick: Character = {
 *   id: 1,
 *   name: 'Rick Sanchez',
 *   status: 'Alive',
 *   species: 'Human',
 *   type: '',
 *   gender: 'Male',
 *   origin: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1' },
 *   location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
 *   image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
 *   episode: ['https://rickandmortyapi.com/api/episode/1', 'https://rickandmortyapi.com/api/episode/2'],
 *   url: 'https://rickandmortyapi.com/api/character/1',
 *   created: '2017-11-04T18:48:46.250Z'
 * };
 * ```
 */
export interface Character {
    /** The id of the character */
    id: number;

    /** The name of the character */
    name: string;

    /**
     * The status of the character
     * - `'Alive'` - Персонаж жив
     * - `'Dead'` - Персонаж мёртв
     * - `'unknown'` - Статус неизвестен
     */
    status: 'Alive' | 'Dead' | 'unknown';

    /** The species of the character (e.g., 'Human', 'Alien', 'Robot') */
    species: string;

    /** The type or subspecies of the character (e.g., 'Humanoid', 'Clone', 'Parasite') */
    type: string;

    /**
     * The gender of the character
     * - `'Female'` - Женский
     * - `'Male'` - Мужской
     * - `'Genderless'` - Бесполый
     * - `'unknown'` - Неизвестно
     */
    gender: 'Female' | 'Male' | 'Genderless' | 'unknown';

    /** Name and link to the character's origin location */
    origin: LocationInfo;

    /** Name and link to the character's last known location endpoint */
    location: LocationInfo;

    /**
     * Link to the character's image
     * @remarks All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars
     * @example "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
     */
    image: string;

    /** List of episodes in which this character appeared (array of URLs) */
    episode: string[];

    /** Link to the character's own URL endpoint */
    url: string;

    /** Time at which the character was created in the database (ISO 8601 format) */
    created: string;
}

/**
 * Информация о локации персонажа
 */
interface LocationInfo {
    /** Name of the location */
    name: string;

    /** Link to the location's endpoint (URL) */
    url: string;
}