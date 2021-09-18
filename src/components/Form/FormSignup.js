import React from 'react';
import validate from './validateInfo';
import useForm from './useForm';
import './Form.css';

const FormSignup = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );

  return (
    <div className='form-content-right'>
      <form onSubmit={handleSubmit} className='form' noValidate>
        <h1>
          Create
        </h1>
        <div className='form-inputs'>
          <label className='form-label'>Item name</label>
          <input
            className='form-input'
            type='text'
            name='item'
            placeholder='Item name'
            value={values.item}
            onChange={handleChange}
          />
          {errors.item && <p>{errors.item}</p>}
        </div>

        <div className='form-inputs'>
          <label className='form-label'>Description</label>
          <input
            className='form-input'
            type='text'
            name='desc'
            placeholder='Description'
            value={values.name}
            onChange={handleChange}
          />
          {errors.desc && <p>{errors.desc}</p>}
        </div>

        
        <div className='form-inputs'>
          <label className='form-label'>Item price</label>
          <input
            className='form-input'
            type='number'
            name='price'
            placeholder='Item price'
            value={values.price}
            onChange={handleChange}
          />
          {errors.price && <p>{errors.price}</p>}
        </div>

        <div className='form-inputs'>
          <label className='form-label'>Royalty</label>
          <input
            className='form-input'
            type='text'
            name='royalty'
            placeholder='Royalty'
            value={values.royalty}
            onChange={handleChange}
          />
          {errors.royalty && <p>{errors.royalty}</p>}
        </div>
        
        
        <button className='form-input-btn' type='submit'>
          Create
        </button>
      </form>
    </div>
  );
};

export default FormSignup;