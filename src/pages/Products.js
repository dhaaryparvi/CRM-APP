import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct, addProduct, updateProduct } from '../redux/slices/productSlice';
import Navbar from '../components/Navbar';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products || {products: [], loading: false  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const onSubmit = (data) => {
    if (editingProduct) {
      dispatch(updateProduct({ id: editingProduct.id, data }));
      toast.success('Product updated!');
    } else {
      dispatch(addProduct(data));
      toast.success('Product added!');
    }
    reset();
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    reset(product); // fill modal form
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    toast.success('Product deleted!');
  };

  const handleAddNew = () => {
    reset();
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Product Management</h2>

        <button
          onClick={handleAddNew}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Product
        </button>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Title</th>
                <th className="p-2">Price</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod, index) => (
                <tr key={`${prod.id}-${index}`} className="text-center border-t">
                  <td className="p-2">{prod.id}</td>
                  <td className="p-2">{prod.title}</td>
                  <td className="p-2">${prod.price}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleEdit(prod)}
                      className="bg-yellow-400 px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(prod.id)}
                      className="bg-red-500 px-3 py-1 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
              <h3 className="text-xl mb-4">
                {editingProduct ? 'Edit Product' : 'Add Product'}
              </h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label className="block mb-1">Title</label>
                  <input
                    className="w-full border px-3 py-2"
                    {...register('title', { required: 'Title is required' })}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm">{errors.title.message}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label className="block mb-1">Price</label>
                  <input
                    type="number"
                    className="w-full border px-3 py-2"
                    {...register('price', {
                      required: 'Price is required',
                      min: { value: 1, message: 'Minimum price is 1' },
                    })}
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm">{errors.price.message}</p>
                  )}
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditingProduct(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    {editingProduct ? 'Update' : 'Add'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
