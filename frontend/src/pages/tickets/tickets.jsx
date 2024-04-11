import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Pagination } from 'flowbite-react';
import { FolderOpenIcon } from '@heroicons/react/solid';
import { debounce, startCase } from 'lodash';
import { Button, Filters, NoRecords, Sorts } from '../../components/common';
import { default as Layout } from '../../components/layout';
import { TicketModal } from '../../components/tickets';
import { getAllTickets } from '../../services';

const Tickets = () => {
    const [ticketRes, setTicketRes] = useState(null);
    const [page, setPage] = useState(1);
    const [filterQuery, setFilterQuery] = useState('');
    const [sortQuery, setSortQuery] = useState('');

    const [showTicketModal, setShowTicketModal] = useState(false);

    const { filters, sorts } = useSelector((store) => store.ui.tickets);

    const navigate = useNavigate();

    const refresh = debounce(() => {
        getAllTickets(filterQuery, sortQuery, page).then(({ data }) => {
            setTicketRes(data);
        });
    }, 300);

    useEffect(() => {
        refresh();
    }, [page, filterQuery, sortQuery]);

    return (
        <Layout title="Tickets">
            <div class="w-screen min-h-screen flex flex-col justify-center items-center">
                {ticketRes && (
                    <>
                        <h2 class="text-4xl font-bold leading-tight lg:text-5xl mt-12">Ticket List</h2>
                        <div class="w-11/12 flex flex-col justify-center items-start mt-12">
                            <Filters filters={filters} setFilterQuery={setFilterQuery} />
                            <Sorts sorts={sorts} setSortQuery={setSortQuery} />
                        </div>
                        <div class="w-11/12 flex justify-end items-center mb-6">
                            <Button
                                className="px-12 py-2 font-semibold md:text-lg focus:outline-none focus:ring focus:ring-offset-1 bg-primary-base focus:ring-black focus:ring-opacity-10"
                                onClick={() => setShowTicketModal(true)}
                            >
                                Create Ticket
                            </Button>
                        </div>
                        <div class="w-11/12 min-h-screen flex flex-col justify-between items-center mb-16">
                            <div class="w-full h-full flex flex-col justify-start items-center gap-y-6">
                                {ticketRes.docs?.length > 0 ? (
                                    <Table striped={true} hoverable={true} class="w-full">
                                        <Table.Head>
                                            <Table.HeadCell>ID</Table.HeadCell>
                                            <Table.HeadCell>User</Table.HeadCell>
                                            <Table.HeadCell>Title</Table.HeadCell>
                                            <Table.HeadCell>Description</Table.HeadCell>
                                            <Table.HeadCell>Status</Table.HeadCell>
                                        </Table.Head>
                                        <Table.Body class="divide-y">
                                            {ticketRes.docs?.map((ticket) => {
                                                return (
                                                    <Table.Row key={ticket._id} class="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer" onClick={() => navigate(`${ticket._id}`)}>
                                                        <Table.Cell class="whitespace-nowrap font-medium text-gray-900 dark:text-white pl-6">{ticket._id}</Table.Cell>
                                                        <Table.Cell>{ticket.user?.name ?? '--'}</Table.Cell>
                                                        <Table.Cell>{ticket.title ?? '--'}</Table.Cell>
                                                        <Table.Cell>{ticket.description ?? '--'}</Table.Cell>
                                                        <Table.Cell>
                                                            <span className={`${ticket.status === "open" ? "bg-red-500" : "bg-green-400"} text-white py-1.5 rounded-full px-4 cursor-default font-medium text-sm`}>{startCase(ticket.status)}</span>
                                                        </Table.Cell>
                                                        <Table.Cell><Link to={`tickets/${ticket._id}`}><FolderOpenIcon className='w-8 h-8' /></Link></Table.Cell>
                                                    </Table.Row>
                                                );
                                            })}
                                        </Table.Body>
                                    </Table>
                                ) : (
                                    <NoRecords text="No tickets found" className="mt-12" />
                                )}
                            </div>
                            <div class="w-full flex justify-end items-center mt-4 md:mt-0">
                                <Pagination
                                    currentPage={page}
                                    onPageChange={(newPage) => {
                                        setPage(newPage);
                                    }}
                                    showIcons={true}
                                    totalPages={ticketRes.totalPages}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
            <TicketModal show={showTicketModal} setShow={setShowTicketModal} refresh={refresh} />
        </Layout>
    );
};

export default Tickets;
