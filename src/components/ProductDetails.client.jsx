import {Product, MetafieldPrimitive} from '@shopify/hydrogen/client';

import Layout from './Layout.client';
import ProductOptions from './ProductOptions.client';
import Gallery from './Gallery.client';
import Seo from './Seo.client';

export default function ProductDetails({data}) {
  return (
    <Layout>
      <Seo product={data.product} />
      <Product
        product={data.product}
        initialVariantId={data.product.variants.edges[0].node.id}
      >
        <div className="py-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="md:hidden pb-4 flex justify-between items-top">
            <Product.Title as="h1" className="font-bold text-2xl" />
            <div className="flex items-center gap-1">
              <Product.SelectedVariant.Price className="text-xl" />
              <Product.SelectedVariant.CompareAtPrice className="line-through text-gray-400" />
            </div>
          </div>

          <section className="lg:col-span-2 grid gap-10" aria-label="Gallery">
            <Gallery />
          </section>

          <section
            className="my-4 md:my-0 max-w-md flex flex-col gap-6"
            aria-label="Product details"
          >
            {/* eslint-disable-next-line @shopify/jsx-prefer-fragment-wrappers */}
            <div>
              <Product.Title className="text-gray-900 text-3xl font-medium" />
              <div className="my-4 gap-1 hidden md:block">
                <Product.SelectedVariant.Price className="font-semibold text-gray-900 text-2xl">
                  {({currencyCode, amount, currencyNarrowSymbol}) => {
                    return (
                      <span>{`${currencyCode} ${currencyNarrowSymbol}${amount}`}</span>
                    );
                  }}
                </Product.SelectedVariant.Price>
                <Product.SelectedVariant.CompareAtPrice className="text-gray-400 line-through text-xl">
                  {({amount, currencyNarrowSymbol}) => {
                    return <span>{`${currencyNarrowSymbol}${amount}`}</span>;
                  }}
                </Product.SelectedVariant.CompareAtPrice>
              </div>

              <ProductOptions />

              <div className="my-8 space-y-2">
                <Product.SelectedVariant.AddToCartButton className="rounded-md bg-gray-900 text-white text-center p-4 text-sm uppercase w-full">
                  Add to bag
                </Product.SelectedVariant.AddToCartButton>
                <Product.SelectedVariant.BuyNowButton className="rounded-md bg-white border border-black text-center p-4 text-sm uppercase w-full">
                  Buy it now
                </Product.SelectedVariant.BuyNowButton>
                <Product.SelectedVariant.ShopPayButton className="flex justify-center w-full" />
              </div>

              <Metafields
                metafields={data.product.metafields.edges.map(({node}) => node)}
              />

              <Product.Description className="prose" />
            </div>
          </section>
        </div>
      </Product>
    </Layout>
  );
}

function Metafields({metafields}) {
  return (
    <div className="flex align-center justify-center gap-2">
      {metafields.map((metafield) => {
        return (
          <MetafieldPrimitive key={metafield.id} metafield={metafield}>
            {({value, key}) => {
              if (key === 'made_in_canada' && value) {
                return (
                  <div className="uppercase text-xs bg-red-500 text-white text-center font-semibold rounded-full h-20 w-20 flex items-center justify-center p-3">
                    Made in canada
                  </div>
                );
              }

              if (key === 'renewable_materials' && value) {
                return (
                  <div className="uppercase text-xs bg-green-500 text-white text-center font-semibold rounded-full h-20 w-20 flex items-center justify-center p-3">
                    Renewable materials
                  </div>
                );
              }

              if (key === 'free_shipping' && value) {
                return (
                  <div className="uppercase text-xs bg-purple-600 text-white text-center font-semibold rounded-full h-20 w-20 flex items-center justify-center p-3">
                    Free shipping
                  </div>
                );
              }

              if (key === 'flex' && value > 0) {
                return (
                  <li className="uppercase bg-gray-600 text-white text-center font-semibold rounded-full h-20 w-20 flex flex-col items-center justify-center p-3">
                    <span className="text-xs">Flex</span>
                    <span className="text-4xl">{value}</span>
                  </li>
                );
              }
            }}
          </MetafieldPrimitive>
        );
      })}
    </div>
  );
}
