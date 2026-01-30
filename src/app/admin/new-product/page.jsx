'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewProductPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!title) return setError('Title required');
    setLoading(true);
    try {
      const form = new FormData();
      form.append('title', title);
      form.append('description', description);
      form.append('price', price);
      if (image) form.append('image', image);

      const res = await fetch('/api/products', { method: 'POST', body: form });
      if (!res.ok) throw new Error('Failed to create product');
      const data = await res.json();
      // Redirect to product page
      router.push(`/products/${data._id}`);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Create Product</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium">Price</label>
          <input value={price} onChange={(e)=>setPrice(e.target.value)} className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium">Image</label>
          <input type="file" accept="image/*" onChange={(e)=>setImage(e.target.files[0])} />
        </div>

        {error && <div className="text-red-500">{error}</div>}

        <div>
          <button disabled={loading} className="bg-black text-white px-4 py-2 rounded">
            {loading ? 'Uploading...' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
