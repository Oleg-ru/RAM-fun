import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function CharacterDetailsSkeleton() {
    return (
        <div className="bg-white rounded-xl p-6">
            <div className="space-y-4">
                <Skeleton height={32} width="70%" className="mx-auto mb-3" />
                <div className="relative mb-4">
                    <div className="absolute -inset-1 bg-teal-400 rounded-lg blur opacity-50"></div>
                    <Skeleton height={392} className="relative w-full rounded-lg" />
                </div>
                <div className="space-y-2">
                    <Skeleton height={20} />
                    <Skeleton height={20} />
                    <Skeleton height={20} />
                    <Skeleton height={20} />
                    <Skeleton height={20} />
                </div>
            </div>
            <button
                className="absolute top-4 right-4 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200"
            >
                ✕
            </button>
        </div>
    );
}

export default CharacterDetailsSkeleton;