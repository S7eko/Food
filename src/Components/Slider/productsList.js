import React, { useEffect, useState } from 'react';
import Product from './product'; // تأكد من أن مسار الاستيراد صحيح

const ProductsList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // حالة تحميل
    const [error, setError] = useState(null); // حالة الخطأ
    const apiUrl = "https://fakestoreapi.com/products";

    useEffect(() => {
        fetch(apiUrl)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>; // عرض رسالة تحميل
    if (error) return <p>Error: {error.message}</p>; // عرض رسالة خطأ

    return (
        <>
            <h2 className="text-center p-3">Products</h2>
            <div className='container'>
                <div className="row">
                    {products.map(product => (
                        <div className="col-md-4 mt-3" key={product.id}>
                            <Product product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProductsList;
