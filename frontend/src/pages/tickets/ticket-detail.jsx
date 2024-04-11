import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { startCase } from 'lodash';
import { BsFillSendFill } from 'react-icons/bs';
import { Layout } from '../../components/layout';
import { Button, Input } from '../../components/common';
import { getTicket, addReply, closeTicket } from '../../services';
import toast from '../../libs/toastify';

function TicketDetail() {
    const { ticket_id: ticketId } = useParams();
    const [ticket, setTicket] = useState({});
    const [reply, setReply] = useState("");

    const user = useSelector((store) => store.data.user.authUser);

    const refresh = async () => {
        const response = await getTicket(ticketId);
        setTicket(response.data);
    };

    useEffect(() => {
        refresh();
    }, [ticketId]);

    const onAddReply = (e) => {
        e.preventDefault()
        addReply(ticketId, reply).then((data) => {
            if (data) {
                toast.success(data.message)
                refresh()
            }
        })
    };

    const onClickCloseTicket = () => {
        closeTicket(ticketId).then((data) => {
            if (data) {
                toast.success(data.message)
                refresh()
            }
        })
    };

    return (
        <Layout title="Home">
            <div class=" bg-gray-100/10 rounded-xl shadow border-2 mx-6 md:mx-24 my-6 p-8 relative">
                <div class="font-bold text-4xl">{ticket.title}</div>
                <div class="font-semibold text-xl mt-2 text-ellipsis break-all">{ticket.description}</div>
                <div className='w-full flex mt-4 gap-x-4 mb-4'>
                    <span className={`${ticket.status === "open" ? "bg-red-500" : "bg-green-400"} text-white py-2 rounded-md px-4 md:text-lg cursor-default font-medium text-sm`}>
                        {startCase(ticket.status)}
                    </span>
                    {
                        user.role === "admin" && ticket.status === "open" && <Button
                            className="px-12 py-2 font-semibold md:text-lg focus:outline-none focus:ring focus:ring-offset-1 bg-primary-base focus:ring-black focus:ring-opacity-10"
                            onClick={onClickCloseTicket}
                        >
                            Resolve and Close
                        </Button>
                    }
                </div>
                {
                    ticket.replies?.map((reply) => {
                        return <div key={reply._id} className='my-6 border-b-2' dir={user._id === reply.user?._id ? "rtl" : "ltr"}>
                            <div class="font-semibold text-md mt-2">{reply.user?.name}</div>
                            <div class="font-normal text-xs mt-2">{new Date(reply.timestamp).toLocaleString()}</div>
                            <div class="font-semibold text-md mt-2 mb-6 text-ellipsis break-all">{reply.message}</div>
                        </div>
                    })
                }
                {
                    ticket.status === "open" && <form className='w-full flex mt-4 gap-x-6' onSubmit={onAddReply}>
                        <Input
                            placeholder="Type something here..."
                            value={reply}
                            className="h-12 sm:h-14"
                            wrapperclasses="w-full"
                            onChange={(e) => setReply(e.target.value)}
                            required
                        />
                        <Button className='p-3 rounded-full w-16 h-16' type="submit">
                            <BsFillSendFill className='w-6 h-6' />
                        </Button>
                    </form>
                }
            </div>
        </Layout>
    );
}

export default TicketDetail;