import { Component } from 'react';
import s from './ReviewCard.module.scss'

type ReviewCardProps = {
    date: string;
    name: string;
    review: string;
};

class ReviewCard extends Component<ReviewCardProps> {
    render() {
        const { date, name, review } = this.props;
        
        return (
            <div className={s.card}>
                <div>{date}</div>
                <div>{name}</div>
                <div>Отзыв: {review}</div>
            </div>
        );
    }
}

export default ReviewCard;