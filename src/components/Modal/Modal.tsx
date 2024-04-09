import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import useSelectRatio from 'src/zustand/selectRatio';
import SelectRatio from '../SelectRatio';

const App: React.FC = () => {
    const { selectRatio, setGrid } = useSelectRatio();
    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleOk = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const gridMock: string[][] = [];
        for (let i = 0; i < selectRatio; i++) {
            const row: string[] = [];
            for (let j = 0; j < selectRatio; j++) {
                row.push('');
            }
            gridMock.push(row);
        }

        setGrid(gridMock);
    }, [selectRatio]);

    return (
        <>
            <Modal centered open={isModalOpen} destroyOnClose={false} closeIcon={null} footer={[]}>
                <h2>Chào mừng bạn đến với cờ Caro</h2>
                <div style={{ textAlign: 'center' }}>
                    <SelectRatio />
                    <Button onClick={handleOk} type="primary" size="large">
                        Chơi
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default App;
