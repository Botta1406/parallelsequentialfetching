
import Link from "next/link";

interface IProduct {
    id: number;
    title: string;
    category: string;
}

export default async function SequentialPage() {
    let products: IProduct[] | null = null;
    let categories: string[] | null = null;

    try {
        // First fetch products
        // const productsRes = await fetch('https://fakestoreapi.com/product');//uncomment this to see difference
        const productsRes = await fetch('https://fakestoreapi.com/products');
        if (!productsRes.ok) throw new Error("Products fetch failed");
        const productsData = await productsRes.text();
        products = productsData ? JSON.parse(productsData) as IProduct[] : null;

        // Only fetch categories if products fetch succeeds
        if (products) {
            const categoriesRes = await fetch('https://fakestoreapi.com/products/categories');
            if (!categoriesRes.ok) throw new Error("Categories fetch failed");
            const categoriesData = await categoriesRes.text();
            categories = categoriesData ? JSON.parse(categoriesData) as string[] : null;
        }
    } catch (error) {
        console.error("Fetching error:", error);
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative">
            {/* Arrow Button */}
            <Link href="/" className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <button className="w-12 h-12 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50 hover:border-blue-400 active:shadow-inner active:translate-y-0.5">
                    <span className="text-2xl text-gray-700 hover:text-blue-600">←</span>
                </button>
            </Link>

            <div className="bg-gray-100 border border-gray-200 rounded-xl shadow-lg p-8 max-w-lg w-full">
                <h1 className="text-4xl font-bold mb-4 text-center">🔂 Sequential Fetching</h1>

                <div className="mb-6">
                    <div className="flex items-center justify-center mb-2">
                        <p className="text-lg font-bold">Products</p>
                    </div>
                    {products ? (
                        <ul className="list-disc list-inside">
                            {products.slice(0, 5).map((product: IProduct) => (
                                <li key={product.id} className="ml-4 text-center">{product.title}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-red-500 text-center">Failed to load products.</p>
                    )}
                </div>

                <div className="mb-6">
                    <div className="flex items-center justify-center mb-2">
                        <p className="text-lg font-bold">Categories</p>
                    </div>
                    {categories ? (
                        <ul className="list-disc list-inside">
                            {categories.map((category: string) => (
                                <li key={category} className="ml-4 text-center">{category}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-center">
                            {products ? "Failed to load categories" : "Waiting on products..."}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}