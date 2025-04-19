import Link from "next/link";

type Product = {
    id: number;
    title: string;
    category: string;
};

export default async function SequentialPage() {
    let products: Product[] | null = null;
    let categories: string[] | null = null;

    try {
        // 🔂 First fetch (intentional typo can be fixed later)
        const res1 = await fetch('https://fakestoreapi.com/products'); // ❌ Intentional typo
        if (!res1.ok) throw new Error("Products fetch failed");
        products = await res1.json();

        // ✅ Only fetch categories if products fetch succeeds
        const res2 = await fetch('https://fakestoreapi.com/products/categories');
        if (!res2.ok) throw new Error("Categories fetch failed");
        categories = await res2.json();
    } catch (error) {
        console.error("Sequential fetching error:", error);
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-lg p-8 max-w-lg w-full">
                <h1 className="text-4xl font-bold mb-4 text-center">🔂 Sequential Fetching (with dependency)</h1>

                <div className="mb-6">
                    <div className="flex items-center justify-center mb-2">
                        <p className="text-lg font-bold">Products</p>
                    </div>
                    {products ? (
                        <ul className="list-disc list-inside">
                            {products.slice(0, 5).map(product => (
                                <li key={product.id} className="ml-4 text-center">{product.title}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-red-500 text-center">Failed to load products. Categories not fetched.</p>
                    )}
                </div>

                <div className="mb-6">
                    <div className="flex items-center justify-center mb-2">
                        <p className="text-lg font-bold">Categories (only fetched after products)</p>
                    </div>
                    {categories ? (
                        <ul className="list-disc list-inside">
                            {categories.map(category => (
                                <li key={category} className="ml-4 text-center">{category}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-center">Waiting on products... or skipped due to error.</p>
                    )}
                </div>


            </div>
            {/* Back to Home Button */}
            <div className="text-center mt-6">
                <Link href="/">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md transition duration-200">
                        ⬅️ Back to Home
                    </button>
                </Link>
            </div>
        </div>
    );
}
