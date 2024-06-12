
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from './productsSlice';

const Curd = () => {
  const dispatch = useDispatch();
  const  products = useSelector((state) => state.products);

  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [editId, setEditID] = useState(-1);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editId === -1) {
      dispatch(addProduct({ title, brand }))
        setTitle('');
        setBrand('');
        alert('Product added successfully!');
      
    } else {
      dispatch(updateProduct({ id: editId, title, brand }))
        setEditID(-1);
        setTitle('');
        setBrand('');
        alert('Product updated successfully!');
    
    }
  };

  const handleEdit = (id) => {
    const product = products.find(p => p.id === id);
    setTitle(product.title);
    setBrand(product.brand);
    setEditID(id);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id))
      alert('Product deleted successfully!');
 
  };

  return (
    <div className='container'>
      <div className='form-div'>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Enter Title' value={title} onChange={e => setTitle(e.target.value)} />
          <input type='text' placeholder='Enter Brand' value={brand} onChange={e => setBrand(e.target.value)} />
          <button type='submit'>{editId === -1 ? 'Add' : 'Update'}</button>
        </form>
      </div>
    
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Brand</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.brand}</td>
                <td >
                  {/* <button onClick={() => handleEdit(product.id)}>Edit</button>
                  <button onClick={() => handleDelete(product.id)}>Delete</button> */}
                  <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => handleEdit(product.id)}>Edit</button>
                <button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => handleDelete(product.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      
    </div>
  );
};

export default Curd;

