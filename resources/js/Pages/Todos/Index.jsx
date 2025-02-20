import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import BlueButton from '@/Components/BlueButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

// import { useForm } from "react-hook-form";


// import { useRef, useState } from 'react';
// import DangerButton from '@/Components/DangerButton';
// import InputLabel from '@/Components/InputLabel';
// import Modal from '@/Components/Modal';
// import SecondaryButton from '@/Components/SecondaryButton';
// import { useForm } from '@inertiajs/react';
// import PrimaryButton from '@/Components/PrimaryButton';
// import GreenButton from '@/Components/GreenButton';
// import TextareaInput from '@/Components/TextareaInput';
// import Select from '@/Components/Select';

export default function Todos({ auth, todos, message }) {
    // チェックボックスの状態を管理するための配列
    const [checkboxes, setCheckboxes] = useState([]);

    // const nameInput = useRef('')

    // const { data, setData, post, processing, errors } = useForm({
    // setdataをつけることでsetされる。resetがないとformから値が消えない
    const { post, setData, reset, data, processing, errors } = useForm({
        name: '',
        category_id: '1',
    })

    const registerTodo = (e) => {
        e.preventDefault(); // フォームのでデフォルト操作をなくす

        // console.count(`TODO名:${nameInput.current.value}`)
        post(route('todo.store'), {
            preserveScroll: true,
            // onSuccess: () => alert("ok"),
            // onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    console.count('レンダリング')

    // const confirmUserDeletion = () => {
    //     setConfirmingBookCreate(true);
    // };

    // const confirmBookUpdate = (id, title, content, category, book) => {
    //     setData({id:id, title:title, content:content, category:category})
    //     setConfirmingBookUpdate(true);
    // };

    // const createBook = (e) => {
    //     e.preventDefault();

    //     post(route('book.store'), {
    //         preserveScroll: true,
    //         onSuccess: () => closeModal(),
    //         onError: () => passwordInput.current.focus(),
    //         onFinish: () => reset(),
    //     });
    // };

    // const updateBook = (e) => {
    //     e.preventDefault();

    //     put(route('book.update', data), {
    //         preserveScroll: true,
    //         onSuccess: () => closeModal_u(),
    //         onError: () => passwordInput.current.focus(),
    //         onFinish: () => reset(),
    //     });
    // };

    // const deleteBook = (id) => {
    //     destroy(route('book.destroy', id), {
    //         preserveScroll: true,
    //         onFinish: () => reset(),
    //     });
    // };

    // const closeModal = () => {
    //     setConfirmingBookCreate(false);

    //     reset();
    // };

    // const closeModal_u = () => {
    //     setConfirmingBookUpdate(false);

    //     reset();
    // };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Todos</h2>}
        >
            <Head title="Todos" />

            <div className="py-12 bg-gray-200">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <form onSubmit={registerTodo} className="p-6">
                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        // ref={nameInput}
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="mb-5 mr-2"
                        isFocused
                        placeholder="新規TODO"
                    />
                    <span>{data.name}</span>
                    {/* <span>{nameInput.current.value}</span> */}
                    {/* processingをつけることで読み込み中にsubmitできない */}
                    <BlueButton className="ms-3" disabled={processing}>
                        登録する
                    </BlueButton>
                <InputError message={errors.name} className="mt-2" />
                </form>
                {todos.map((todo) => (
                    <label key={todo.id} className='flex mb-1'>
                        <input
                            type="checkbox"
                            checked={todo.checked}
                            onChange={() => handleCheckboxChange(todo.id)}
                            className='mt-1'
                        />

                        <span className="ml-2 pb-2">{todo.name}</span>
                    </label>
                ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
