import { Modal, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

const { confirm } = Modal;
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { FilterHeader } from '../../components/Filters/FilterHeader';
import IBook from '../../interfaces/Book';
import BookService from '../../services/BookService';
import BookCreate from './Create';
import BookEdit from './Edit';

const BookList: React.FC = () => {
    const [booId, setBooId] = useState(0);
    const [isCreateVisible, setIsCreateVisible] = useState(false);
    const [isEditVisible, setIsEditVisible] = useState(false);

    const { data } = useQuery('books', async () => {
        return await (
            await BookService.getAll()
        ).data;
    });

    const onClickaddButton = () => {
        setIsCreateVisible(true);
    };

    const handleOk = () => {
        setIsCreateVisible(false);
    };

    const handleCancel = () => {
        setIsCreateVisible(false);
        setIsEditVisible(false);
    };

    const closeEdit = () => {
        setIsEditVisible(false);
    };

    const columns: ColumnsType<IBook> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Pages',
            dataIndex: 'pages',
            key: 'pages',
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
            render: (text, record) =>
                record.author
                    ? record.author.name + ' ' + record.author.surname
                    : '',
        },
        {
            title: '',
            key: 'action',
            render: (text, record) => (
                <>
                    <Tag color="error">
                        <a
                            onClick={() =>
                                showDeleteConfirm(record.bookId, record.name)
                            }
                        >
                            Delete
                        </a>
                    </Tag>
                    <Tag color="blue">
                        <a
                            onClick={() => {
                                setIsEditVisible(true);
                                setBooId(record.bookId);
                            }}
                        >
                            Edit
                        </a>
                    </Tag>
                </>
            ),
        },
    ];

    return (
        <>
            <FilterHeader filter={0} setOffset={18} add={onClickaddButton} />
            <Modal
                title="Create a new Book"
                visible={isCreateVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1300}
                style={{ top: 20 }}
                footer={''}
            >
                <BookCreate setIsCreateVisible={setIsCreateVisible} />
            </Modal>
            <Modal
                title="Edit"
                visible={isEditVisible}
                onOk={closeEdit}
                onCancel={handleCancel}
                width={1300}
                style={{ top: 20 }}
                footer={''}
            >
                <BookEdit booId={booId} setIsEditVisible={setIsEditVisible} />
            </Modal>
            <Table columns={columns} dataSource={data} />
        </>
    );
};

function showDeleteConfirm(bookId: number, name: string) {
    confirm({
        title: 'Do you want to delete this book?',
        icon: <ExclamationCircleOutlined />,
        content: `Book: ${name} `,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
            BookService.remove(bookId);
        },
        onCancel() {
            console.log('Cancel');
        },
    });
}

export default BookList;
