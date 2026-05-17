import './Character.css'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


function CharacterItemSkeleton() {
    return (
        <div className="w-full border-2 rounded-3xl border-[#4a8c3f] ">
            <Skeleton  height={280} width="100%" className="rounded-3xl" style={{borderRadius: "20px"}}/>
            <div className="p-5">
                <div className="mt-1">
                    <Skeleton  height={24} width="70%" className="mb-3" />
                    <Skeleton height={30} width="35%" style={{ marginBottom: '1rem' }} />
                </div>
                <div className="border-t-gray-300 border-t mt-3">
                    <Skeleton  height={24} width="90%" className="mt-2" />
                    <Skeleton  height={24} width="90%" className="mt-2" />

                </div>
            </div>
        </div>
    );
}

export default CharacterItemSkeleton;