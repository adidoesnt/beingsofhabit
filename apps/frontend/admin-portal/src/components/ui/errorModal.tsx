type ErrorModalProps = {
    title: string;
    description: string;
    children: React.ReactNode;
}

export const ErrorModal = ({ children, title, description }: ErrorModalProps) => {
    return <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-lg">
        <div className="z-10 flex flex-col gap-4 rounded-md border border-red-600 bg-red-100 text-red-900 p-4 items-center">
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="text-sm">{description}</p>
            { children }
        </div>
    </div>
}