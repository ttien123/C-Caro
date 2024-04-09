import { useEffect, useState } from 'react';
import styles from './InputCheckBox.module.scss';
import classNames from 'classnames/bind';
import useSelectUser from 'src/zustand/user.ztd';
import useSelectRatio from 'src/zustand/selectRatio';
const cx = classNames.bind(styles);

interface Props {
    indexInput: number;
}

function checkWinner(grid: string[][], selectRatio: number): string[] {
    let arr: string[] = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j <= grid[i].length - selectRatio / 2; j++) {
            if (
                grid[j][i] &&
                grid[j][i] === grid[j][i + 1] &&
                grid[j][i] === grid[j][i + 2] &&
                grid[j][i] === grid[j][i + 3] &&
                grid[j][i] === grid[j][i + 4]
            ) {
                for (let t = i; t < i + 5; t++) {
                    arr.push((t * selectRatio + j).toString());
                }
                return arr;
            }
        }
    }

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j <= grid[i].length - selectRatio / 2; j++) {
            if (
                grid[j][i] &&
                grid[j][i] === grid[j + 1][i] &&
                grid[j][i] === grid[j + 2][i] &&
                grid[j][i] === grid[j + 3][i] &&
                grid[j][i] === grid[j + 4][i]
            ) {
                for (let t = j; t < j + 5; t++) {
                    arr.push((i * selectRatio + t).toString());
                }
                return arr;
            }
        }
    }

    for (let i = 0; i <= grid.length - selectRatio / 2; i++) {
        for (let j = 0; j <= grid[i].length - selectRatio / 2; j++) {
            if (
                grid[i][j] &&
                grid[i][j] === grid[i + 1][j + 1] &&
                grid[i][j] === grid[i + 2][j + 2] &&
                grid[i][j] === grid[i + 3][j + 3] &&
                grid[i][j] === grid[i + 4][j + 4]
            ) {
                let x = j;
                for (let t = i; t < i + 5; t++) {
                    arr.push((x * selectRatio + t).toString());
                    x++;
                }

                return arr;
            }
        }
    }

    for (let i = 0; i <= grid.length - 5; i++) {
        for (let j = 4; j < grid[i].length; j++) {
            if (
                grid[i][j] &&
                grid[i][j] === grid[i + 1][j - 1] &&
                grid[i][j] === grid[i + 2][j - 2] &&
                grid[i][j] === grid[i + 3][j - 3] &&
                grid[i][j] === grid[i + 4][j - 4]
            ) {
                let x = j;
                for (let t = i; t < i + 5; t++) {
                    arr.push((x * selectRatio + t).toString());
                    x--;
                }
                return arr;
            }
        }
    }

    return arr;
}

const InputCheckBox = ({ indexInput }: Props) => {
    const { selectUser, setSelectUser, isReset, setIsReset } = useSelectUser();
    const { grid, selectRatio, setGrid, listWin, setListWin } = useSelectRatio();
    const [isCheckEd, setIsChecked] = useState(false);
    const [localGrid, setLocalGrid] = useState(grid);
    const [valueCheck, setValueCheck] = useState('');
    const [colInputInGrid, setColInputInGrid] = useState<null | number>(null);
    const [roWIputInGrid, setRoWIputInGrid] = useState<null | number>(null);
    const [isYellow, setIsYellow] = useState(false);

    const handleChecked = () => {
        setIsChecked(true);
        !isCheckEd && setSelectUser(!selectUser);
        !isCheckEd && setValueCheck(selectUser ? 'X' : 'O');
        isReset && setIsReset(false);
        setColInputInGrid(indexInput % selectRatio);
        setRoWIputInGrid(Math.floor(indexInput / selectRatio));
    };

    useEffect(() => {
        isReset && setIsChecked(false);
        isReset && setValueCheck('');
        isReset && setSelectUser(true);
        isReset && setIsYellow(false);
        isReset && setColInputInGrid(null);
        isReset && setRoWIputInGrid(null);
    }, [isReset, setIsReset]);

    useEffect(() => {
        if (localGrid.length > 0) {
            let mockGrid = localGrid;
            for (let i = 0; i < selectRatio; i++) {
                for (let j = 0; j < selectRatio; j++) {
                    if (i === colInputInGrid && j === roWIputInGrid) {
                        mockGrid[i][j] = valueCheck;
                    }
                }
            }
            setLocalGrid(mockGrid);
        }
    }, [grid, setLocalGrid, valueCheck, colInputInGrid, roWIputInGrid]);

    useEffect(() => {
        const value = checkWinner(localGrid, selectRatio);

        setListWin(value);
    }, [localGrid, selectUser, isReset, grid, setLocalGrid]);

    useEffect(() => {
        if (listWin.length > 0) {
            for (let i = 0; i < listWin.length; i++) {
                if (Number(listWin[i]) === indexInput) {
                    setIsYellow(true);
                }
            }
        } else {
            setIsYellow(false);
        }
    }, [listWin, setListWin, setGrid, grid]);

    useEffect(() => {
        setLocalGrid(grid);
    }, [grid, setGrid]);

    return (
        <button onClick={handleChecked} className={`${cx('visible-check')} ${isYellow && cx('isWined')}`}>
            <div className={`${cx('visible-check')} ${isYellow && cx('isWined')}`}>{valueCheck}</div>
        </button>
    );
};

export default InputCheckBox;
