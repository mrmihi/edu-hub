const Card = ({ title, value }) => {
    return <div className="w-full min-h-56 flex flex-col justify-center items-center text-center p-12 border-2 border-primary-base/10 cursor-default shadow-sm hover:shadow-lg rounded-md transition-all duration-300">
        <div class="font-semibold text-3xl mb-3">{title}</div>
        <div class="font-semibold text-3xl">{value} </div>
    </div>
}

export default Card