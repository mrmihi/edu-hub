import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Pagination } from 'flowbite-react';
import { debounce } from 'lodash';
import { Button, Filters, NoRecords, Sorts } from '../components/common';
import { default as Layout } from '../components/layout';
import { getAllProducts } from '../services/product';

const Home = () => {
  const [productRes, setproductRes] = useState(null);
  const [page, setPage] = useState(1);
  const [filterQuery, setFilterQuery] = useState('');
  const [sortQuery, setSortQuery] = useState('');

  const { filters, sorts } = useSelector((store) => store.ui.products);

  const user = useSelector((store) => store.data.user.authUser);

  const refresh = debounce(() => {
    getAllProducts(filterQuery, sortQuery, page).then(({ data }) => {
      setproductRes(data);
    });
  }, 300);

  useEffect(() => {
    refresh();
  }, [page, filterQuery, sortQuery]);

  const showAddProductBtn = user.role === 'seller' || user.role === 'admin'

  return (
    <Layout title="Home">
      <div class="w-screen flex flex-col justify-center items-center">
        {productRes && (
          <>
            <div class={`w-11/12 flex flex-col justify-center items-start mt-12 ${!showAddProductBtn ? "mb-8" : ""}`}>
              <Filters filters={filters} setFilterQuery={setFilterQuery} />
              <Sorts sorts={sorts} setSortQuery={setSortQuery} />
            </div>
            {showAddProductBtn && (
              <div class="w-11/12 flex justify-end items-center mt-6 lg:mt-0 mb-6">
                <Link to="/product-add">
                  <Button className="py-1.5 px-6 mb-2">Add Product</Button>
                </Link>
              </div>
            )}
            <div class="w-11/12 min-h-[80vh] flex flex-col justify-between items-center mb-16">
              <div class="w-full h-full flex flex-col justify-start items-center gap-y-6">
                {productRes.docs?.length > 0 ? (
                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {productRes.docs?.map((product) => {
                      return (
                        <Link to={`/product-detail/${product._id}`}>
                          <div className="w-full h-[30vh] border-2 border-base-primary relative rounded-md hover:scale-102 transition-all duration-300 cursor-pointer">
                            <img className="w-full h-full object-cover rounded-md" src={product.image} />
                            <div className="w-full absolute bottom-0 py-3 min-h-14 bg-black/80 rounded-b-md flex flex-row justify-between items-center text-white px-6">
                              <span>{product.name}</span>
                              <span>Rs. {product.selling_price.toFixed(2)}</span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <NoRecords text="No Products Found" className="mt-12" />
                )}
              </div>
              <div class="w-full flex justify-end items-center mt-4 md:mt-0">
                <Pagination
                  currentPage={page}
                  onPageChange={(newPage) => {
                    setPage(newPage);
                  }}
                  showIcons={true}
                  totalPages={productRes.totalPages}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Home;
