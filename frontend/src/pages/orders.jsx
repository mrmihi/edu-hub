import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Pagination } from 'flowbite-react';
import { debounce, startCase } from 'lodash';
import { Button, Filters, NoRecords, Sorts } from '../components/common';
import { default as Layout } from '../components/layout';
import { getAllOrders, emailOrderReport } from '../services';
import toast from '../libs/toastify';

const Reports = () => {
    const [orderRes, setOrderRes] = useState('');
    const [page, setPage] = useState(1);
    const [filterQuery, setFilterQuery] = useState('');
    const [sortQuery, setSortQuery] = useState('');
    //
    const { filters, sorts } = useSelector((store) => store.ui.orders);
    //
    const refresh = debounce(() => {
        getAllOrders(filterQuery, sortQuery, page).then(({ data }) => {
            setOrderRes(data);
        });
    }, 300);
    useEffect(() => {
        refresh();
    }, [page, filterQuery, sortQuery]);

    const onClickEmailReport = () => {
        emailOrderReport().then((data) => {
            data && toast.success(data.message)
        })
    }

    return (
        <Layout title="Orders">
            <div class="w-screen min-h-screen flex flex-col justify-center items-center">
                {orderRes && (
                    <>
                        <h2 class="text-4xl font-bold leading-tight lg:text-5xl mt-12">Order List</h2>
                        <div class="w-11/12 flex flex-col justify-center items-start mt-12">
                            <Filters filters={filters} setFilterQuery={setFilterQuery} />
                            <Sorts sorts={sorts} setSortQuery={setSortQuery} />
                        </div>
                        <div class="w-11/12 flex justify-end items-center mb-6">
                            <Button
                                className="px-12 py-2 font-semibold md:text-lg focus:outline-none focus:ring focus:ring-offset-1 bg-primary-base focus:ring-black focus:ring-opacity-10"
                                onClick={onClickEmailReport}
                            >
                                Email Report
                            </Button>
                        </div>
                        <div class="w-11/12 min-h-screen flex flex-col justify-between items-center mb-16">
                            <div class="w-full h-full flex flex-col justify-start items-center gap-y-6">
                                {orderRes.docs?.length > 0 ? (
                                    <Table striped={true} hoverable={true} class="w-full">
                                        <Table.Head>
                                            <Table.HeadCell>User</Table.HeadCell>
                                            <Table.HeadCell>Total</Table.HeadCell>
                                            <Table.HeadCell>Status</Table.HeadCell>
                                        </Table.Head>
                                        <Table.Body class="divide-y">
                                            {orderRes.docs?.map((order) => {
                                                return (
                                                    <Table.Row key={order._id} class="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                        <Table.Cell class="whitespace-nowrap font-medium text-gray-900 dark:text-white pl-6">{order.user?.name ?? '--'}</Table.Cell>
                                                        <Table.Cell>LKR {order.total.toFixed(2) ?? '--'}</Table.Cell>
                                                        <Table.Cell>{startCase(order.status) ?? '--'}</Table.Cell>
                                                    </Table.Row>
                                                );
                                            })}
                                        </Table.Body>
                                    </Table>
                                ) : (
                                    <NoRecords text="No orders found" className="mt-12" />
                                )}
                            </div>
                            <div class="w-full flex justify-end items-center mt-4 md:mt-0">
                                <Pagination
                                    currentPage={page}
                                    onPageChange={(newPage) => {
                                        setPage(newPage);
                                    }}
                                    showIcons={true}
                                    totalPages={orderRes.totalPages}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
};

export default Reports;
