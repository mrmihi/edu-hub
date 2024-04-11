import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Pagination } from 'flowbite-react';
import { debounce, startCase } from 'lodash';
import { Button, Filters, NoRecords, Sorts } from '../components/common';
import { default as Layout } from '../components/layout';
import { UserModal } from '../components/users';
import { getAllUsers, updateUser } from '../services/user';
import toast from '../libs/toastify';

const Users = () => {
  const [userRes, setUserRes] = useState(null);
  const [page, setPage] = useState(1);
  const [filterQuery, setFilterQuery] = useState('');
  const [sortQuery, setSortQuery] = useState('');

  const [showUserModal, setShowUserModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const { filters, sorts } = useSelector((store) => store.ui.users);

  const refresh = debounce(() => {
    getAllUsers(filterQuery, sortQuery, page).then(({ data }) => {
      setUserRes(data);
    });
  }, 300);

  useEffect(() => {
    refresh();
  }, [page, filterQuery, sortQuery]);

  useEffect(() => {
    if (userToEdit) {
      setShowUserModal(true);
    }
  }, [userToEdit]);

  const toggleActiveState = async (user) => {
    await updateUser(user._id, { is_active: !user.is_active }).then((data) => {
      if (data) {
        toast.success(`User ${user.is_active ? 'deactivated' : 'activated'} successfully`);
        refresh();
      }
    });
  };

  const approveSeller = async (user) => {
    await updateUser(user._id, {
      business: {
        ...user.business,
        is_approved: true,
      },
    }).then((data) => {
      if (data) {
        toast.success(`Seller registration approved`);
        refresh();
      }
    });
  };

  return (
    <Layout title="Users">
      <div class="w-screen min-h-screen flex flex-col justify-center items-center">
        {userRes && (
          <>
            <div class="w-11/12 flex flex-col justify-center items-start mt-12">
              <Filters filters={filters} setFilterQuery={setFilterQuery} />
              <Sorts sorts={sorts} setSortQuery={setSortQuery} />
            </div>
            <div class="w-11/12 flex justify-end items-center mb-6">
              <Button
                className="px-12 py-2 font-semibold md:text-lg focus:outline-none focus:ring focus:ring-offset-1 bg-primary-base focus:ring-black focus:ring-opacity-10"
                onClick={() => {
                  setUserToEdit({});
                }}
              >
                Add Admin User
              </Button>
            </div>
            <div class="w-11/12 min-h-screen flex flex-col justify-between items-center mb-16">
              <div class="w-full h-full flex flex-col justify-start items-center gap-y-6">
                {userRes.docs?.length > 0 ? (
                  <Table striped={true} hoverable={true} class="w-full">
                    <Table.Head>
                      <Table.HeadCell>Name</Table.HeadCell>
                      <Table.HeadCell>Email</Table.HeadCell>
                      <Table.HeadCell>Mobile</Table.HeadCell>
                      <Table.HeadCell>Address</Table.HeadCell>
                      <Table.HeadCell>Role</Table.HeadCell>
                      <Table.HeadCell>Registration Status</Table.HeadCell>
                      <Table.HeadCell>
                        <span class="sr-only">Edit</span>
                      </Table.HeadCell>
                    </Table.Head>
                    <Table.Body class="divide-y">
                      {userRes.docs?.map((user) => {
                        return (
                          <Table.Row key={user._id} class="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell class="whitespace-nowrap font-medium text-gray-900 dark:text-white pl-6">{user.name ?? '--'}</Table.Cell>
                            <Table.Cell>{user.email ?? '--'}</Table.Cell>
                            <Table.Cell>{user.mobile ?? '--'}</Table.Cell>
                            <Table.Cell>{user.address ?? '--'}</Table.Cell>
                            <Table.Cell>
                              <a href="/tables" class="font-medium text-primary-base hover:underline">
                                Edit
                              </a>
                            </Table.Cell>
                            <Table.Cell>{startCase(user.role)}</Table.Cell>
                            <Table.Cell>
                              <span class="font-medium text-sm">
                                {user.role !== 'seller' || (user.role === 'seller' && user.business?.is_approved) ? (
                                  <span class={'bg-green-400 text-white py-1.5 rounded-full px-4 cursor-default'}>Success</span>
                                ) : (
                                  <span onClick={() => approveSeller(user)} class={'bg-red-500 hover:bg-red-600 transition-all duration-300 text-white py-1.5 rounded-full px-4 cursor-pointer'}>
                                    Approve
                                  </span>
                                )}
                              </span>
                            </Table.Cell>
                            <Table.Cell>
                              <span onClick={() => toggleActiveState(user)} class="cursor-pointer font-medium hover:underline">
                                {user.is_active ? <span class={'text-red-500'}>Deactivate</span> : <span class="text-green-500">Activate</span>}
                              </span>
                            </Table.Cell>
                            <Table.Cell>
                              <span class="font-medium text-primary-base cursor-default">
                                {user.role === 'admin' ? (
                                  <span class="hover:underline cursor-pointer" onClick={() => setUserToEdit({ ...user })}>
                                    Edit
                                  </span>
                                ) : (
                                  '---'
                                )}
                              </span>
                            </Table.Cell>
                          </Table.Row>
                        );
                      })}
                    </Table.Body>
                  </Table>
                ) : (
                  <NoRecords text="No users found" className="mt-12" />
                )}
              </div>
              <div class="w-full flex justify-end items-center mt-4 md:mt-0">
                <Pagination
                  currentPage={page}
                  onPageChange={(newPage) => {
                    setPage(newPage);
                  }}
                  showIcons={true}
                  totalPages={userRes.totalPages}
                />
              </div>
            </div>
          </>
        )}
      </div>
      <UserModal user={userToEdit} show={showUserModal} setShow={setShowUserModal} refresh={refresh} />
    </Layout>
  );
};

export default Users;
