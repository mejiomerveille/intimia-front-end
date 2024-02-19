import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCategories } from '@/app/services';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then(response => {
        setCategories(response.category);
        // console.log(response.category);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des catégories:', error);
      });
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
      {Array.isArray(categories) &&
        categories.map((category, index) => (
          <Link key={index} href={`/category/${category.slug}`} passHref
          className={`cursor-pointer block ${(index === categories.length - 1) ? 'border-b-0' : 'border-b'} pb-3 mb-3`}>
              {category.title}
          </Link>
        ))}
    </div>
  );
};

export default Categories;