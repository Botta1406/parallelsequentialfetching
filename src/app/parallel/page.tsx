
type Product = {
    id: number;
    title: string;
};

export default async function ParallelPage() {
    // 💡 Parallel fetching with independent error handling
    const productsPromise = fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .catch(err => {
            console.error("Failed to fetch products:", err);
            return null;
        });

    const categoriesPromise = fetch('https://fakestoreapi.com/products/categories') // ❌ intentionally broken
        .then(res => res.json())
        .catch(err => {
            console.error("Failed to fetch categories:", err);
            return null;
        });

    const [products, categories]: [Product[] | null, string[] | null] = await Promise.all([productsPromise, categoriesPromise]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-lg p-8 max-w-md w-full">
                <h1 className="text-4xl font-bold mb-4 text-center">🔁 Parallel Fetching (with partial failure)</h1>

                <div className="mb-6">
                    <p className="text-lg font-bold mb-2 text-center">Products</p>
                    {products ? (
                        <ul className="list-disc list-inside">
                            {products.slice(0, 5).map(product => (
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
                            {categories.map(category => (
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
//
// 'use client';
//
// import Link from 'next/link';
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
//         <div className="min-h-screen p-4 bg-white">
//             <div className="flex justify-center">
//                 <div>
//                     <h1 className="text-4xl font-bold mb-4 text-center">🔁 Parallel Fetching (with partial failure)</h1>
//
//                     <div className=" flex-grow">
//                         <p className="text-lg font-bold mb-2 text-center">Products</p>
//                         {products ? (
//                             <ul className="list-disc list-inside">
//                                 {products.slice(0, 5).map(product => (
//                                     <li key={product.id} className="ml-4 text-center">{product.title}</li>
//                                 ))}
//                             </ul>
//                         ) : (
//                             <p className="text-center text-red-500">Failed to load products.</p>
//                         )}
//                     </div>
//
//                     <div>
//                         <p className="text-lg font-bold mb-2 text-center">Categories</p>
//                         {categories ? (
//                             <ul className="list-disc list-inside">
//                                 {categories.map(category => (
//                                     <li key={category} className="ml-4 text-center">{category}</li>
//                                 ))}
//                             </ul>
//                         ) : (
//                             <p className="text-center text-red-500">Failed to load categories.</p>
//                         )}
//                     </div>
//                 </div>
//             </div>
//             {/* Back Button at the Bottom Center of the Card */}
//             <div className="flex justify-center mt-6">
//                 <Link href="/">
//                     <button className="text-blue-600 hover:underline text-sm flex items-center gap-1">
//                         ⬅️ Back to Home
//                     </button>
//                 </Link>
//             </div>
//         </div>
//     );
// }
