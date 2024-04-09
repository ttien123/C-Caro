import { Select, Space } from 'antd';
import useSelectRatio from 'src/zustand/selectRatio';
import useSelectUser from 'src/zustand/user.ztd';

const SelectRatio = () => {
    const { setSelectRatio, setGrid, setListWin, selectRatio } = useSelectRatio();
    const { setIsReset } = useSelectUser();
    let gridMock: string[][] = [];
    for (let i = 0; i < 10; i++) {
        const row: string[] = [];
        for (let j = 0; j < 10; j++) {
            row.push('');
        }
        gridMock.push(row);
    }
    const handleChangeSelect = (value: string) => {
        setSelectRatio(Number(value));
        setIsReset(true);
        setGrid(gridMock);
        setListWin([]);
    };
    return (
        <Space wrap style={{ marginRight: '16px' }}>
            <Select
                // defaultValue={`${selectRatio}:${selectRatio}`}
                value={`${selectRatio}:${selectRatio}`}
                style={{ width: 'auto', minWidth: '150px', textAlign: 'center' }}
                onChange={handleChangeSelect}
                options={[
                    { value: '6', label: '6:6' },
                    { value: '8', label: '8:8' },
                    { value: '10', label: '10:10' },
                ]}
            />
        </Space>
    );
};

export default SelectRatio;
