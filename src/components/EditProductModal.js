import React from 'react';
import { useForm } from 'react-hook-form';

const EditProductModal = ({ product, onSave, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: product.title,
      brand: product.brand,
      price: product.price,
    }
  });

  const submitHandler = (data) => {
    onSave({ ...product, ...data, price: Number(data.price) });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div>
            <label className=" block mb-1">Title</label>
            <input {...register("title", { required: true })} className="border p-2 w-full" />
            {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
          </div>
          <div>
            <label className="block mb-1">Brand</label>
            <input {...register("brand", { required: true })} className="border p-2 w-full" />
            {errors.brand && <p className="text-red-500 text-sm">Brand is required</p>}
          </div>
          <div>
            <label className="block mb-1">Price</label>
            <input type="number" {...register("price", { required: true })} className="border p-2 w-full" />
            {errors.price && <p className="text-red-500 text-sm">Price is required</p>}
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
