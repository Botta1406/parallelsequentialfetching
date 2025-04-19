//
// type Product = {
//     id: number;
//     title: string;
// };
//
// export default async function ParallelPage() {
//     // 💡 Parallel fetching with independent error handling
//     const productsPromise = fetch('https://fakestoreapi.com/products')
//         .then(res => res.json())
//         .catch(err => {
//             console.error("Failed to fetch products:", err);
//             return null;
//         });
//
//     const categoriesPromise = fetch('https://fakestoreapi.com/products/categories') // ❌ intentionally broken
//         .then(res => res.json())
//         .catch(err => {
//             console.error("Failed to fetch categories:", err);
//             return null;
//         });
//
//     const [products, categories]: [Product[] | null, string[] | null] = await Promise.all([productsPromise, categoriesPromise]);
//
//     return (
//         <div className="min-h-screen flex items-center justify-center p-4">
//             <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-lg p-8 max-w-md w-full">
//                 <h1 className="text-4xl font-bold mb-4 text-center">🔁 Parallel Fetching (with partial failure)</h1>
//
//                 <div className="mb-6">
//                     <p className="text-lg font-bold mb-2 text-center">Products</p>
//                     {products ? (
//                         <ul className="list-disc list-inside">
//                             {products.slice(0, 5).map(product => (
//                                 <li key={product.id} className="ml-4 text-center">{product.title}</li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p className="text-center text-red-500">Failed to load products.</p>
//                     )}
//                 </div>
//
//                 <div>
//                     <p className="text-lg font-bold mb-2 text-center">Categories</p>
//                     {categories ? (
//                         <ul className="list-disc list-inside">
//                             {categories.map(category => (
//                                 <li key={category} className="ml-4 text-center">{category}</li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p className="text-center text-red-500">Failed to load categories.</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

import Link from 'next/link';

interface IProduct {
    id: number;
    title: string;
}

export default async function ParallelPage() {
    // Parallel fetching with better error handling
    const fetchWithHandling = async <T,>(url: string): Promise<T | null> => {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Failed to fetch ${url}`);
            const text = await res.text();
            return text ? JSON.parse(text) as T : null;
        } catch (err) {
            console.error(`Error fetching ${url}:`, err);
            return null;
        }
    };

    const [products, categories] = await Promise.all([
        // fetchWithHandling<IProduct[]>('https://fakestoreapi.com/product'),//uncomment this to see difference in o/p
        fetchWithHandling<IProduct[]>('https://fakestoreapi.com/products'),
        fetchWithHandling<string[]>('https://fakestoreapi.com/products/categories')
    ]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative">
            {/* 3D Arrow Button */}
            <Link href="/" className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <button className="w-12 h-12 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50 hover:border-blue-400 active:shadow-inner active:translate-y-0.5">
                    <span className="text-2xl text-gray-700 hover:text-blue-600">←</span>
                </button>
            </Link>

            <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-lg p-8 max-w-md w-full">
                <h1 className="text-4xl font-bold mb-4 text-center">🔁 Parallel Fetching</h1>

                <div className="mb-6">
                    <p className="text-lg font-bold mb-2 text-center">Products</p>
                    {products ? (
                        <ul className="list-disc list-inside">
                            {products.slice(0, 5).map((product: IProduct) => (
                                <li key={product.id} className="ml-4 text-center">{product.title}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-red-500">Failed to load products.</p>
                    )}
                </div>

                <div>
                    <p className="text-lg font-bold mb-2 text-center">Categories</p>
                    {categories ? (
                        <ul className="list-disc list-inside">
                            {categories.map((category: string) => (
                                <li key={category} className="ml-4 text-center">{category}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-center text-red-500">Failed to load categories.</p>
                    )}
                </div>
            </div>
        </div>
    );
}