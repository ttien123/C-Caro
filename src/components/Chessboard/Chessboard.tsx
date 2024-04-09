import useSelectRatio from 'src/zustand/selectRatio';
import InputCheckBox from '../InputCheckBox';
import styles from './Chessboard.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const Chessboard = () => {
    const { selectRatio } = useSelectRatio();

    return (
        <div
            className={cx('chessboard', {
                'grid-cols-10': selectRatio === 10,
                'grid-cols-8': selectRatio === 8,
                'grid-cols-6': selectRatio === 6,
            })}
        >
            {Array(selectRatio * selectRatio)
                .fill(selectRatio * selectRatio)
                .map((_, index) => {
                    return <InputCheckBox key={index} indexInput={index} />;
                })}
        </div>
    );
};

export default Chessboard;
