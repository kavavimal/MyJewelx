"use client";
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { post } from '@/utils/api';

const ReviewForm = ({product_id, user_id}) => {
    const [rating, setRating] = useState(0); // State to manage rating

  const formik = useFormik({
    initialValues: {
      recommendation: 'Recommended',
      review: '',
      file: null,
    },
    validationSchema: Yup.object({
      review: Yup.string().required('First name is required'),
    }),
    onSubmit: async (values) => {
      console.log(values);
        const saveres = await post('/api/review/product', {
            productId: product_id,
            userId: user_id,
            rating: rating,
            review: values.review,
            recommandation: values.recommendation,
        });
        console.log("response", saveres);
    },
  });

  const handleFileChange = (event) => {
    formik.setFieldValue('file', event.currentTarget.files[0]);
  };

  const handleStarClick = (star) => {
    setRating(star);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto p-4 shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Write a review</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Rating</label>
        <div className="flex space-x-1 mt-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <span  key={star}
            className={`text-gray-400 cursor-pointer ${
              star <= rating ? 'text-yellow-500' : ''
            }`}
            onClick={()=>handleStarClick(star)}>★</span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Recommendation</label>
        <select
          name="recommendation"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.recommendation}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
        >
          <option value="Recommended">Recommended</option>
          <option value="Not Recommended">Not Recommended</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Review</label>
        <textarea
          name="review"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.review}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Picture/video optional</label>
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          className="mt-1 block w-full text-gray-700 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
        />
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          Submit review
        </button>
        <button
          type="button"
          className="py-2 px-4 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
