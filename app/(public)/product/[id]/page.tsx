const ProductPage = ({ params }: { params: { id: string } }) => {
  return <div>Product Page for ID: {params.id}</div>;
};

export default ProductPage;
