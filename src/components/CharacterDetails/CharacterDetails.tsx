import {useEffect, useState} from "react";
import {fetchCharacterDetails} from "../../api/getCharacterDetails.ts";
import type {Character} from "../../types/Character.ts";

function CharacterDetails({id, setCloseModal}: {id: number}) {

    const [character, setCharacter] = useState<Character>();
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const data = await fetchCharacterDetails(id);
                setCharacter(data.data);
            } catch (error) {
                throw new Error("Ошибка получения детальной информации о персонаже");
            } finally {
                setIsLoading(false);
            }
        };
        void getData();
    }, []);

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center transition-opacity duration-100 backdrop-blur-sm" onClick={() => {setCloseModal(null)}}>
            <div className="bg-linear-to-br from-teal-500 via-blue-500 to-purple-600 rounded-2xl p-1 max-w-md w-full mx-4 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
                <div className="bg-white rounded-xl p-6 relative">
                    {isLoading && (
                        <div className="flex items-center justify-center py-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent"></div>
                            <span className="ml-3 text-teal-600 font-medium">Loading from dimension...</span>
                        </div>
                    )}
                    {character && (
                        <>
                            {/* Заголовок - имя с градиентом */}
                            <h2 className="text-2xl font-bold mb-4 text-center bg-linear-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                                {character.name}
                            </h2>

                            {/* Изображение с рамкой и эффектом портала */}
                            <div className="relative mb-4">
                                <div className="absolute -inset-1 bg-linear-to-r from-teal-400 to-blue-500 rounded-lg blur opacity-50"></div>
                                <img
                                    src={character.image}
                                    alt={character.name}
                                    className="relative w-full rounded-lg object-cover border-2 border-teal-400"
                                />
                                {/* Бейдж статуса */}
                                <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold text-white ${
                                    character.status === 'Alive' ? 'bg-green-500' :
                                        character.status === 'Dead' ? 'bg-red-500' : 'bg-gray-500'
                                }`}>
                                    {character.status}
                                </div>
                            </div>

                            <div className="mb-6 space-y-2">
                                {/* Status */}
                                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                    <span className="font-semibold text-gray-600">Status:</span>
                                    <span className={`font-medium ${
                                        character.status === 'Alive' ? 'text-green-600' :
                                            character.status === 'Dead' ? 'text-red-600' : 'text-gray-500'
                                    }`}>{character.status}</span>
                                </div>

                                {/* Species */}
                                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                    <span className="font-semibold text-gray-600">Species:</span>
                                    <span className="text-gray-800 font-medium">{character.species}</span>
                                </div>

                                {/* Gender */}
                                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                    <span className="font-semibold text-gray-600">Gender:</span>
                                    <span className="text-gray-800 font-medium">{character.gender}</span>
                                </div>

                                {/* Origin.name */}
                                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                    <span className="font-semibold text-gray-600">Origin:</span>
                                    <span className="text-teal-600 font-medium">{character.origin?.name || 'Unknown'}</span>
                                </div>

                                {/* Location.name */}
                                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                    <span className="font-semibold text-gray-600">Location:</span>
                                    <span className="text-blue-600 font-medium">{character.location?.name || 'Unknown'}</span>
                                </div>
                            </div>
                        </>
                    )}

                    <button
                        onClick={() => setCloseModal(null)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200"
                    >
                        ✕
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CharacterDetails;