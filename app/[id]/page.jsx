import React, { Suspense } from 'react'
import Header from './components/Header'
import RelatedProds from './components/RelatedProds'
import ImagesSec from './components/ImagesSec'
import Links from './components/Links'
import fetchingDate from './components/fetchingData'
import Loading from './components/Loading'

const ProductDetails = async ({ params }) => {
  const { id } = params;
  const result = await fetchingDate(id);

  if (!result.success) {
    return (
      <div className="p-6 bg-red-50 rounded-lg text-red-700">
        <p className="font-bold">Error</p>
        <p>{result.error}</p>
      </div>
    );
  }

  const product = result.data;

  return (
    <section className='bg-gray-50'>
      <Header />

      {/* Suspense */}
      <Suspense fallback={<Loading />}>
        <div className='flex flex-col lg:flex-row gap-8 lg:gap-16 px-4 md:px-8 lg:px-16 py-8'>
          <ImagesSec imgs={product.images} />
          <Links details={product} />
        </div>
        <RelatedProds />
      </Suspense>
    </section>
  )
}

export default ProductDetails
