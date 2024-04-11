import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from 'flowbite-react';
import { default as Layout } from '../components/layout';
import { Button, Lottie } from '../components/common';
import { getAllProductsWithoutPagination, placeOrder } from '../services';
import toast from '../libs/toastify';
import CartAnimation from '../../public/assets/animations/cart.json';
import NoActivityAnimation from '../../public/assets/animations/no-activity.json';

const Cart = () => {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    if (cart.length) {
      getAllProductsWithoutPagination(`filter[_id]=in(${cart})`).then((data) => {
        if (data) setProducts(data.data);
      });
    }
  }, []);

  const confirmOrder = async () => {
    const order = await placeOrder(
      products.map((p) => ({
        _id: p._id,
        quantity: 1,
      })),
    );
    if (order.data) {
      navigate(`/payment?order=${order.data._id}`);
      toast.success(order.message);
    }
  };

  return (
    <Layout title="Cart">
      <div class={`w-screen min-h-screen flex flex-col ${products?.length > 0 ? 'justify-start' : 'justify-center'} items-center`}>
        {products?.length === 0 && (
          <div>
            <div class="text-5xl md:text-6xl font-semibold opacity-90 text-center px-6">Empty Cart</div>
            <div class="text-xl md:text-2xl font-semibold opacity-90 mt-6 text-center px-6 mb-6">Please go back and add in some items</div>
            <div class="flex justify-center items-center">
              <div class="w-11/12  mb-10">
                <Lottie animationData={NoActivityAnimation} />
              </div>
            </div>
          </div>
        )}
        {products?.length > 0 && (
          <div className="h-full w-full px-6 md:px-12">
            <div class="text-4xl md:text-5xl font-semibold opacity-90 text-center px-6 mt-6 md:mt-20">Your Cart</div>
            <div class="flex justify-center items-center">
              <div class="w-11/12 sm:w-7/12 lg:w-5/12 xl:w-2/12 mt-6 mb-12">
                <Lottie animationData={CartAnimation} />
              </div>
            </div>
            <Table striped={true} hoverable={true} class="w-full">
              <Table.Head>
                <Table.HeadCell>Product Name</Table.HeadCell>
                <Table.HeadCell>Selling Price</Table.HeadCell>
                <Table.HeadCell>Type</Table.HeadCell>
                <Table.HeadCell>Unit</Table.HeadCell>
                <Table.HeadCell>Age Limit</Table.HeadCell>
              </Table.Head>
              <Table.Body class="divide-y">
                {products?.map((product) => {
                  return (
                    <Table.Row class="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell>{product.name}</Table.Cell>
                      <Table.Cell>LKR {product.selling_price.toFixed(2)}</Table.Cell>
                      <Table.Cell>{product.type}</Table.Cell>
                      <Table.Cell>{product.measurement_unit}</Table.Cell>
                      <Table.Cell>{product.age_limit}</Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
            <Button className="w-full py-4 mt-12" onClick={confirmOrder}>
              Confirm and Pay
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
