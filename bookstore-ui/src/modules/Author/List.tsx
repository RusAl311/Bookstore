import { Modal, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

const { confirm } = Modal;
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { FilterHeader } from '../../components/Filters/FilterHeader';
import IAuthor from '../../interfaces/Author';
import AuthorService from '../../services/AuthorService';
import AuthorCreate from './Create';
import AuthorEdit from './Edit';

const AuthorList: React.FC = () => {
    const [authId, setAuthId] = useState(0);
    const [isCreateVisible, setIsCreateVisible] = useState(false);
    const [isEditVisible, setIsEditVisible] = useState(false);

    const { data } = useQuery('authors', async () => {
        return await (
            await AuthorService.getAll()
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

    const columns: ColumnsType<IAuthor> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Surname',
            dataIndex: 'surname',
            key: 'surname',
        },
        {
            title: '',
            key: 'action',
            render: (text, record) => (
                <>
                    <Tag color="error">
                        <a
                            onClick={() =>
                                showDeleteConfirm(
                                    record.authorId,
                                    record.name,
                                    record.surname,
                                )
                            }
                        >
                            Delete
                        </a>
                    </Tag>
                    <Tag color="blue">
                        <a
                            onClick={() => {
                                setIsEditVisible(true);
                                setAuthId(record.authorId);
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
                title="Create a new Author"
                visible={isCreateVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1300}
                style={{ top: 20 }}
                footer={''}
            >
                <AuthorCreate setIsCreateVisible={setIsCreateVisible} />
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
                <AuthorEdit
                    authId={authId}
                    setIsEditVisible={setIsEditVisible}
                />
            </Modal>
            <Table columns={columns} dataSource={data} />
        </>
    );
};

function showDeleteConfirm(authorId: number, name: string, surname: string) {
    confirm({
        title: 'Do you want to delete this author?',
        icon: <ExclamationCircleOutlined />,
        content: `Author: ${name} ${surname} `,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
            AuthorService.remove(authorId);
        },
        onCancel() {
            console.log('Cancel');
        },
    });
}

export default AuthorList;
