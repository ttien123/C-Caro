import { IoReloadOutline } from 'react-icons/io5';
import { Button } from 'antd';
import Chessboard from './components/Chessboard';
import styles from './App.module.scss';
import classNames from 'classnames/bind';
import useSelectUser from './zustand/user.ztd';
import Modal from './components/Modal';
import useSelectRatio from './zustand/selectRatio';
import SelectRatio from './components/SelectRatio';
const cx = classNames.bind(styles);

function App() {
    const { selectUser, setIsReset } = useSelectUser();
    const { setListWin, setGrid } = useSelectRatio();
    let gridMock: string[][] = [];
    for (let i = 0; i < 10; i++) {
        const row: string[] = [];
        for (let j = 0; j < 10; j++) {
            row.push('');
        }
        gridMock.push(row);
    }
    return (
        <div className={cx('app')}>
            <div className={cx('app-container')}>
                <Modal />
                <h1 className={cx('title')}>Cờ Caro</h1>
                <div className={cx('description')}>
                    <div>
                        <SelectRatio />
                        <div>Lượt người chơi: {selectUser ? 'X' : 'O'}</div>
                    </div>
                    <Button
                        onClick={() => {
                            setIsReset(true);
                            setGrid(gridMock);
                            setListWin([]);
                        }}
                        type="primary"
                        className={cx('box-icon-reset')}
                    >
                        <IoReloadOutline />
                    </Button>
                </div>
                <Chessboard />
            </div>
        </div>
    );
}

export default App;
